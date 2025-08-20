"use client";

import { Button, Flex, Modal, Table, Typography } from "antd";
import styles from "./UserWinModal.module.scss";
import { useEffect, useState, useMemo, useCallback } from "react";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useQuery } from "@apollo/client";
import { GET_USER_WINNINGS_QUERY } from "graphQueries/getUserWinnings";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoIosClose } from "react-icons/io";
import { FaWallet } from "react-icons/fa";
import useColumnDefinitions from "./useColumnDefinitions";
import { transformRoundData } from "./utils";
import { DataType } from "./dataType";
import * as constants from "utils/constants";
import { contractABI } from "utils/abi";

const { Text } = Typography;

const PAGE_SIZE = 5;

interface UserBetModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function UserBetModal({ open, setOpen }: UserBetModalProps) {
  // State
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Hooks
  const { isConnected, address } = useAccount();

  // Query user's betting data
  const { data: queryData, refetch } = useQuery(GET_USER_WINNINGS_QUERY, {
    variables: { address },
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000,
    skip: !address,
  });

  // Transform and set data when query completes
  useEffect(() => {
    if (queryData) {
      const transformedData = transformRoundData(queryData);
      setDataSource(transformedData);
    }
  }, [queryData]);

  // Compute claimables
  const claimableRounds = useMemo(
    () =>
      dataSource
        .filter((r) => r.isWinner && !r.hasClaimed)
        .map((r) => parseInt(r.roundNumber, 10))
        .filter((n) => !Number.isNaN(n)),
    [dataSource]
  );
  const claimableCount = claimableRounds.length;

  // Re-fetch handler to be invoked after any claim interaction/response
  const handleClaimEvent = useCallback(
    async (_msg?: string) => {
      await refetch();
    },
    [refetch]
  );

  const {
    desktopColumns,
    tabletColumns,
    mobileMediumColumns,
    mobileSmallColumns,
  } = useColumnDefinitions(handleClaimEvent);

  // Pagination config
  const paginationConfig = useMemo(
    () => ({
      pageSize: PAGE_SIZE,
      current: currentPage,
      total: dataSource.length,
      onChange: (page: number) => setCurrentPage(page),
    }),
    [currentPage, dataSource.length]
  );

  // Claim All hooks/state
  const [isClaimAllLoading, setIsClaimAllLoading] = useState(false);
  const [hashAll, setHashAll] = useState<string | null>(null);

  const { refetch: simulateClaimAll } = useSimulateContract({
    address: constants.CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: constants.CONTRACT_METHOD_CLAIM_WINNINGS,
    // Contract supports claiming multiple rounds in a single call
    args: [claimableRounds],
    account: address,
    query: { enabled: false },
  });

  const { writeContractAsync } = useWriteContract();
  const { status: txAllStatus, error: txAllError } =
    useWaitForTransactionReceipt({
      hash: hashAll as `0x${string}`,
    });

  useEffect(() => {
    if (!hashAll) return;
    // Refetch on any receipt status change (success or error)
    if (txAllStatus === "success" || txAllStatus === "error") {
      refetch();
    }
  }, [txAllStatus, hashAll, refetch]);

  const handleClaimAll = async () => {
    if (!isConnected || claimableCount === 0) return;
    setIsClaimAllLoading(true);
    // Refetch on interaction start
    await refetch();

    try {
      const { data, error } = await simulateClaimAll();
      if (error || !data?.request) {
        await refetch();
        setIsClaimAllLoading(false);
        return;
      }
      const txHash = await writeContractAsync(data.request);
      setHashAll(txHash);
    } catch (_e) {
      await refetch();
    } finally {
      setIsClaimAllLoading(false);
    }
  };

  // Render table based on screen size
  const renderTable = (columns: any) => (
    <Table
      className="w-fit"
      dataSource={dataSource}
      columns={columns}
      pagination={paginationConfig}
    />
  );

  // Render connect wallet message if not connected
  if (!isConnected) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <Flex vertical align="center" gap={16}>
          <Text style={{ color: "white", fontSize: "20px" }}>
            Connect your wallet to view your bets
          </Text>
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <Button
                type="primary"
                icon={<FaWallet />}
                onClick={openConnectModal}
                size="large"
              >
                Connect Wallet
              </Button>
            )}
          </ConnectButton.Custom>
        </Flex>
      </div>
    );
  }

  return (
    <Modal
      open={open}
      centered
      title={null}
      footer={null}
      closable
      closeIcon={<IoIosClose className="text-white text-[32px]" />}
      onCancel={() => setOpen(false)}
      className="w-[auto_!important] max-w-[100vw_!important] lg:p-[40px_50px_!important] p-[0_!important]"
      styles={{
        content: {
          borderRadius: 24,
          border: "1px solid #312A5E",
          background: "#1F1C37",
          boxShadow: "0px 0px 97.6px 0px rgba(142, 72, 255, 0.30)",
          color: "#fff",
        },
      }}
    >
      <Flex justify="space-between" align="center" className={styles.Title}>
        <Text
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "white",
            textAlign: "left",
          }}
          className="pb-2 md:pb-4"
        >
          My Bets
        </Text>
      </Flex>

      {/* Responsive Tables */}
      <div className="hidden xl:block">{renderTable(desktopColumns)}</div>
      <div className="hidden sm:hidden md:block xl:hidden">
        {renderTable(tabletColumns)}
      </div>
      <div className="hidden sm:block md:hidden">
        {renderTable(mobileMediumColumns)}
      </div>
      <div className="block sm:hidden">{renderTable(mobileSmallColumns)}</div>
      <div className="w-full flex justify-center items-center">
        <Button
          type="primary"
          onClick={handleClaimAll}
          disabled={claimableCount === 0}
          loading={isClaimAllLoading}
          className="mx-auto"
        >
          Claim All ({claimableCount})
        </Button>
      </div>
    </Modal>
  );
}
