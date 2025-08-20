import React, { useEffect, useState } from "react";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as constants from "utils/constants";
import { contractABI } from "utils/abi";
import { Button } from "antd";

type ClaimWinningProps = {
  roundNumber: number;
  onClaimWinningsStateChange: (state: string) => void;
  hasClaimed: boolean;
  isWinner: boolean;
};

export const ClaimWinnings: React.FC<ClaimWinningProps> = ({
  roundNumber,
  onClaimWinningsStateChange,
  hasClaimed,
  isWinner,
}) => {
  const { isConnected, address } = useAccount();
  const [hash, setHash] = useState<string | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);

  // Call simulation hook with disabled state
  const { refetch: simulateContract } = useSimulateContract({
    address: constants.CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: constants.CONTRACT_METHOD_CLAIM_WINNINGS,
    args: [[roundNumber ?? 0]],
    account: address,
    query: { enabled: false },
  });

  // call write contract hook to get writeContractAsync action to be called after simulation
  const { writeContractAsync, error: writeError } = useWriteContract();
  const {
    status: transactionStatus,
    error: transactionError,
    data: transactionData,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  // wait for transaction status changes
  useEffect(() => {
    if (transactionStatus === "success") {
      onClaimWinningsStateChange(
        `Winning claim for round:${roundNumber} successful with gas:${transactionData?.gasUsed}`
      );
    } else if (transactionStatus === "error") {
      onClaimWinningsStateChange(
        `Winning claim for round:${roundNumber} failed with error:${transactionError?.message}`
      );
    }
  }, [
    onClaimWinningsStateChange,
    transactionStatus,
    roundNumber,
    transactionData,
    transactionError,
  ]);

  // handler called when bet button is clicked
  const handleClaimWinnings = async () => {
    // Guard: do nothing if already claimed or not a winner
    if (hasClaimed || !isWinner) return;

    try {
      setIsClaiming(true);
      onClaimWinningsStateChange(
        `Claim winnings for round:${roundNumber} called`
      );

      // Simulate contract
      const { data: localSimulateData, error: simulateError } =
        await simulateContract();
      if (simulateError || !localSimulateData?.request) {
        onClaimWinningsStateChange(
          `Claim winnings for round:${roundNumber} failed with error:${simulateError?.message}`
        );
        return;
      } else {
        onClaimWinningsStateChange(
          `Claim winnings for round:${roundNumber} started`
        );
      }

      // Write contract
      const writeResult = await writeContractAsync(localSimulateData.request);
      if (!writeResult) {
        onClaimWinningsStateChange(
          `Claim winnigs for round:${roundNumber} failed with error:${writeError}`
        );
      } else {
        setHash(writeResult);
        onClaimWinningsStateChange(
          `Claim winnigs for round:${roundNumber} success with hash:${writeResult}`
        );
      }
    } catch (error) {
      onClaimWinningsStateChange(
        `Claim winnings for round:${roundNumber} failed with error:${error}`
      );
    } finally {
      setIsClaiming(false);
    }
  };

  if (!isConnected) {
    return null;
  } else {
    return (
      <div>
        <Button
          type="primary"
          onClick={handleClaimWinnings}
          disabled={hasClaimed || !isWinner}
          loading={isClaiming}
        >
          {hasClaimed ? "Claimed" : isWinner ? "Claim Winnings" : "Unclaimable"}
        </Button>
      </div>
    );
  }
};
