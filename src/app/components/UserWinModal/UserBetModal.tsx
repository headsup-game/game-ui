"use client";

import { Button, Flex, Modal, Table, Typography } from "antd";
import styles from "./UserWinModal.module.scss";
import { useEffect, useState, useMemo } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import { GET_USER_WINNINGS_QUERY } from "graphQueries/getUserWinnings";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoIosClose } from "react-icons/io";
import { FaWallet } from "react-icons/fa";
import useColumnDefinitions from "./useColumnDefinitions";
import { transformRoundData } from "./utils";
import { DataType } from "./dataType";

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
  const { data: queryData } = useQuery(GET_USER_WINNINGS_QUERY, {
    variables: { address },
    notifyOnNetworkStatusChange: true,
    skip: !address,
  });

  const {
    desktopColumns,
    tabletColumns,
    mobileMediumColumns,
    mobileSmallColumns,
  } = useColumnDefinitions();

  // Transform and set data when query completes
  useEffect(() => {
    if (queryData) {
      const transformedData = transformRoundData(queryData);
      setDataSource(transformedData);
    }
  }, [queryData]);

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
      <Flex justify="center" className={styles.Title}>
        <Text
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "white",
            textAlign: "center",
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
    </Modal>
  );
}
