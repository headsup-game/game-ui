import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import * as constants from "utils/constants";
import { contractABI } from "utils/abi";
import { parseUnits } from "viem";
import { Button, Typography, message } from "antd";
import styles from "../app/game/Game.module.scss";
import { Players } from "interfaces/players";
import { NoticeType } from "antd/es/message/interface";
import { erc20Abi, DARK_TOKEN_ADDRESS, DARK_TOKEN_DECIMALS } from "utils/tokenConstants";
import { useDarkAllowance } from "hooks/useDarkAllowance";

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
  
  // NEW: Token allowance state
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const { allowance, refetch: refetchAllowance } = useDarkAllowance();

  // Convert bet amount to token units
  const betAmountInTokenUnits = parseUnits(betAmount.toString(), DARK_TOKEN_DECIMALS);

  // Check if approval is needed
  useEffect(() => {
    if (allowance !== undefined && betAmountInTokenUnits) {
      setNeedsApproval(allowance < betAmountInTokenUnits);
    }
  }, [allowance, betAmountInTokenUnits]);

  const startAutoPlayIfNeeded = React.useCallback(() => {
    // Set up remaining rounds after the initial manual click
    const n = Math.max(1, Math.floor(rounds));
    setRemainingAutoRounds(n - 1); // we've already placed one for the current round
    lastBetRoundRef.current = roundNumber;
  }, [rounds, roundNumber]);

  // Approval simulation
  const { refetch: simulateApproval } = useSimulateContract({
    address: DARK_TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: "approve",
    args: [
      constants.CONTRACT_ADDRESS as `0x${string}`,
      constants.MAX_UINT256,
    ],
    account: address,
    query: { enabled: false },
  });

  // Bet simulation (now without value parameter)
  const { refetch: simulateContract } = useSimulateContract({
    address: constants.CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName:
      playerId === 0
        ? constants.CONTRACT_METHOD_APES_BET
        : constants.CONTRACT_METHOD_PUNKS_BET,
    args: [roundNumber ?? 0, betAmountInTokenUnits],
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
            {isApproving ? "Approval" : "Bet"} on {playerName} success with hash:
            <Text copyable={{ text: transactionData?.transactionHash }}>
              {transactionData?.transactionHash.slice(0, 6)}
            </Text>
          </>
        ),
        duration: 3,
      });
      
      // Refetch allowance after approval
      if (isApproving) {
        setIsApproving(false);
        refetchAllowance();
      }
    } else if (transactionStatus === "error") {
      setBetStatusMessage({
        type: "error",
        content: `Error while ${isApproving ? "approving" : "placing bet on"} ${playerName}`,
        duration: 3,
      });
      setIsApproving(false);
    }
  }, [
    onBettingStateChange,
    transactionStatus,
    transactionData,
    transactionError,
    playerName,
    isApproving,
    refetchAllowance,
  ]);

  // Handle token approval
  const handleApproval = useCallback(async () => {
    setIsApproving(true);
    setRequestInProgress(true);
    
    try {
      setBetStatusMessage({
        type: "loading",
        content: `Approving $DARK token for betting...`,
        duration: 0,
      });

      const { data: localSimulateData, error: simulateError } = await simulateApproval();

      if (simulateError != null || !localSimulateData?.request) {
        setBetStatusMessage({
          type: "error",
          content: `Token approval failed: ${simulateError?.message}`,
          duration: 3,
        });
        return;
      }

      const writeResult = await writeContractAsync(localSimulateData.request);

      if (writeResult) {
        setHash(writeResult);
        setBetStatusMessage({
          type: "loading",
          content: `Approval transaction submitted, waiting for confirmation...`,
          duration: 0,
        });
      }
    } catch (error) {
      console.error("Error approving token", error);
      setBetStatusMessage({
        type: "error",
        content: `Token approval failed`,
        duration: 3,
      });
    } finally {
      setRequestInProgress(false);
    }
  }, [simulateApproval, writeContractAsync]);

  // handler called when bet button is clicked
  const handleBetOnPlayer = useCallback(async () => {
    // Check if approval is needed first
    if (needsApproval) {
      await handleApproval();
      return;
    }

    setRequestInProgress(true);
    try {
      setBetStatusMessage({
        type: "loading",
        content: `Placing bet on ${playerName}...`,
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
    needsApproval,
    handleApproval,
  ]);
  // When the user clicks, place the bet for the current round and prime auto-play
  const handleClick = React.useCallback(async () => {
    await handleBetOnPlayer();
    if (rounds > 1 && !needsApproval) {
      startAutoPlayIfNeeded();
    }
  }, [handleBetOnPlayer, rounds, startAutoPlayIfNeeded, needsApproval]);

  // Auto place for subsequent rounds when the round number changes
  React.useEffect(() => {
    const canAutoBet =
      remainingAutoRounds > 0 &&
      lastBetRoundRef.current !== null &&
      roundNumber !== lastBetRoundRef.current &&
      !forceDisabled &&
      isConnected &&
      !needsApproval;

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
    needsApproval,
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
        {needsApproval ? `Approve $DARK` : `Bet on ${playerName}`}
      </Button>
    </>
  );
};
