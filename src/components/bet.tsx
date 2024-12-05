import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as constants from "utils/constants";
import { contractABI } from "utils/abi";
import { parseEther } from "viem";
import { Button, Typography, message } from "antd";
import styles from "../app/game/Game.module.scss";
import { Players } from "interfaces/players";
import { NoticeType } from "antd/es/message/interface";
// Dummy change
const { Text } = Typography;

type BetStatusMessage = {
  content: ReactNode,
  duration: number
  type: NoticeType
}

type BetProps = {
  playerId: number | null;
  betAmount: number;
  roundNumber: number;
  playerName: string;
  onBettingStateChange: (state: string) => void;
  minimumAllowedBetAmount: number;
};

export const Bet: React.FC<BetProps> = ({
  playerId,
  betAmount,
  roundNumber,
  playerName,
  onBettingStateChange,
  minimumAllowedBetAmount,
}) => {
  const { isConnected, address } = useAccount();
  const [hash, setHash] = useState<string | null>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const betMessageKey = "betMessageKey";
  const [betStatusMessage, setBetStatusMessage] = useState<BetStatusMessage | null>(null);

  // Call simulation hook with disabled state
  const { refetch: simulateContract } = useSimulateContract({
    address: constants.CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName:
      playerId === 0
        ? constants.CONTRACT_METHOD_APES_BET // Apes
        : constants.CONTRACT_METHOD_PUNKS_BET, // Punks
    args: [roundNumber ?? 0],
    value: parseEther(betAmount.toString()),
    account: address,
    query: { enabled: false }
  });

  // call write contract hook to get writeContractAsync action to be called after simulation
  const { writeContractAsync } = useWriteContract();
  const {
    status: transactionStatus,
    error: transactionError,
    data: transactionData,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  useEffect(() => {
    if (betStatusMessage != null) {
      messageApi.open({
        key: betMessageKey,
        type: betStatusMessage.type,
        content: betStatusMessage.content,
        duration: betStatusMessage.duration,
      });
    }
  }, [betStatusMessage, messageApi]);

  useEffect(() => {
    if (playerId === Players.None || betAmount === 0) {
      setDisabled(true);
    } else if (betAmount < minimumAllowedBetAmount) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [playerId, betAmount, minimumAllowedBetAmount]);

  // wait for transaction status changes
  useEffect(() => {
    if (transactionStatus === "success") {
      setBetStatusMessage({
        type: 'success',
        content:
          <>Bet on {playerName} success with hash:
            <Text copyable={{ text: transactionData?.transactionHash }}>{transactionData?.transactionHash.slice(0, 6)}</Text>
          </>,
        duration: 3,
      });
    } else if (transactionStatus === "error") {
      setBetStatusMessage({
        type: 'error',
        content: `Error while placing bet on ${playerName}`,
        duration: 3
      });
    }
  }, [
    onBettingStateChange,
    transactionStatus,
    transactionData,
    transactionError,
    playerName
  ]);

  // handler called when bet button is clicked
  const handleBetOnPlayer = useCallback(async () => {
    setRequestInProgress(true);
    try {
      setBetStatusMessage({
        type: 'loading',
        content: `Placing bet on ${playerName} called`,
        duration: 0
      });

      // Simulate contract
      const { data: localSimulateData, error: simulateError } =
        await simulateContract();

      setBetStatusMessage({
        type: simulateError != null ? 'error' : 'loading',
        content: `Place bet on ${playerName} ${simulateError != null ? 'failed' : 'started'}`,
        duration: simulateError != null ? 3 : 0
      });

      if (simulateError != null || !localSimulateData?.request) {
        return;
      }

      // Write contract
      const writeResult = await writeContractAsync(localSimulateData.request);

      const content: ReactNode = writeResult == null ? `Error placing bet on ${playerName}`
        : `Placed bet on ${playerName}, waiting for transaction confirmation`;

      setBetStatusMessage({
        type: writeResult != null ? 'loading' : 'error',
        content: content,
        duration: writeResult != null ? 0 : 3
      })
      if (writeResult) {
        setHash(writeResult);
      }
    } catch (error) {
      console.log('Error placing bet on player', error);
      setBetStatusMessage({
        type: 'error',
        content: `Place bet on ${playerName} failed`,
        duration: 3
      })
    } finally {
      setRequestInProgress(false);
    }
  }, [playerName, roundNumber, betAmount, playerId, address, simulateContract, writeContractAsync]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        htmlType="submit"
        block
        className={styles.BetFormCTA}
        loading={requestInProgress}
        disabled={disabled || !isConnected}
        onClick={handleBetOnPlayer}
      >
        Bet on {playerName}
      </Button>
    </>
  );
};
