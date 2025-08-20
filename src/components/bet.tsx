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
  content: ReactNode;
  duration: number;
  type: NoticeType;
};

type BetProps = {
  playerName: string;
  playerId: number;
  roundNumber: number;
  betAmount: number;
  minimumAllowedBetAmount: number;
  forceDisabled?: boolean;
  onBettingStateChange: (state: string) => void;
  // NEW: how many rounds to auto-play including the current one
  rounds?: number;
};

export const Bet: React.FC<BetProps> = ({
  playerName,
  playerId,
  roundNumber,
  betAmount,
  minimumAllowedBetAmount,
  forceDisabled = false,
  onBettingStateChange,
  rounds = 1,
}) => {
  const { isConnected, address } = useAccount();
  const [hash, setHash] = useState<string | null>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const betMessageKey = "betMessageKey";
  const [betStatusMessage, setBetStatusMessage] =
    useState<BetStatusMessage | null>(null);
  const [remainingAutoRounds, setRemainingAutoRounds] = React.useState(0);
  const lastBetRoundRef = React.useRef<number | null>(null);

  const startAutoPlayIfNeeded = React.useCallback(() => {
    // Set up remaining rounds after the initial manual click
    const n = Math.max(1, Math.floor(rounds));
    setRemainingAutoRounds(n - 1); // we've already placed one for the current round
    lastBetRoundRef.current = roundNumber;
  }, [rounds, roundNumber]);

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
    query: { enabled: false },
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
        type: "success",
        content: (
          <>
            Bet on {playerName} success with hash:
            <Text copyable={{ text: transactionData?.transactionHash }}>
              {transactionData?.transactionHash.slice(0, 6)}
            </Text>
          </>
        ),
        duration: 3,
      });
    } else if (transactionStatus === "error") {
      setBetStatusMessage({
        type: "error",
        content: `Error while placing bet on ${playerName}`,
        duration: 3,
      });
    }
  }, [
    onBettingStateChange,
    transactionStatus,
    transactionData,
    transactionError,
    playerName,
  ]);

  // handler called when bet button is clicked
  const handleBetOnPlayer = useCallback(async () => {
    setRequestInProgress(true);
    try {
      setBetStatusMessage({
        type: "loading",
        content: `Placing bet on ${playerName} called`,
        duration: 0,
      });

      // Simulate contract
      const { data: localSimulateData, error: simulateError } =
        await simulateContract();

      setBetStatusMessage({
        type: simulateError != null ? "error" : "loading",
        content: `Place bet on ${playerName} ${
          simulateError != null ? "failed" : "started"
        }`,
        duration: simulateError != null ? 3 : 0,
      });

      if (simulateError != null || !localSimulateData?.request) {
        return;
      }

      // Write contract
      const writeResult = await writeContractAsync(localSimulateData.request);

      const content: ReactNode =
        writeResult == null
          ? `Error placing bet on ${playerName}`
          : `Placed bet on ${playerName}, waiting for transaction confirmation`;

      setBetStatusMessage({
        type: writeResult != null ? "loading" : "error",
        content: content,
        duration: writeResult != null ? 0 : 3,
      });
      if (writeResult) {
        setHash(writeResult);
      }
      // Detect if this invocation is for a new (auto) round
      const isAutoForNewRound =
        lastBetRoundRef.current !== null &&
        lastBetRoundRef.current !== roundNumber;

      // Update the last bet round after a successful send
      lastBetRoundRef.current = roundNumber;

      // If this was triggered by auto for a new round, decrement
      if (isAutoForNewRound) {
        setRemainingAutoRounds((prev) => Math.max(prev - 1, 0));
      }
    } catch (error) {
      console.log("Error placing bet on player", error);
      setBetStatusMessage({
        type: "error",
        content: `Place bet on ${playerName} failed`,
        duration: 3,
      });
    } finally {
      setRequestInProgress(false);
    }
  }, [
    playerName,
    roundNumber,
    betAmount,
    playerId,
    address,
    simulateContract,
    writeContractAsync,
  ]);
  // When the user clicks, place the bet for the current round and prime auto-play
  const handleClick = React.useCallback(async () => {
    await handleBetOnPlayer();
    if (rounds > 1) {
      startAutoPlayIfNeeded();
    }
  }, [handleBetOnPlayer, rounds, startAutoPlayIfNeeded]);

  // Auto place for subsequent rounds when the round number changes
  React.useEffect(() => {
    const canAutoBet =
      remainingAutoRounds > 0 &&
      lastBetRoundRef.current !== null &&
      roundNumber !== lastBetRoundRef.current &&
      !forceDisabled &&
      isConnected;

    if (canAutoBet) {
      // Attempt to place the same bet automatically for the new round
      handleBetOnPlayer();
    }
  }, [
    roundNumber,
    remainingAutoRounds,
    forceDisabled,
    isConnected,
    handleBetOnPlayer,
  ]);

  const isBlockingNav =
    remainingAutoRounds > 0 && !forceDisabled && isConnected;

  React.useEffect(() => {
    if (!isBlockingNav) return;

    // 1) Block tab close/refresh
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 2) Block in-app link clicks
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") || "";
      // allow hash-only links and new-tab links
      if (href.startsWith("#") || link.target === "_blank") return;

      e.preventDefault();
      messageApi.warning(
        "Auto-play in progress. Navigation is disabled until it finishes."
      );
    };
    document.addEventListener("click", handleDocumentClick);

    // 3) Block back/forward
    const pushState = () => {
      try {
        history.pushState(null, "", window.location.href);
      } catch {}
    };
    pushState();

    const handlePopState = () => {
      pushState();
      messageApi.warning(
        "Auto-play in progress. Navigation is disabled until it finishes."
      );
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isBlockingNav, messageApi]);

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        htmlType="submit"
        block
        className={styles.BetFormCTA}
        loading={requestInProgress}
        disabled={disabled || !isConnected || forceDisabled}
        onClick={handleClick}
      >
        Bet on {playerName}
      </Button>
    </>
  );
};
