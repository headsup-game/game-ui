"use client";

import { Button, Col, Flex, Form, InputNumber, Radio } from "antd";
import styles from "./Game.module.scss";
import { FaCoins } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";
import { Bet } from "@components/bet";
import { useAccount } from "wagmi";
import { useTokenBalance } from "hooks/useTokenBalance";
import { useTokenDecimals } from "hooks/useTokenDecimals";
import { useNetworkCheck } from "hooks/useNetworkCheck";
import { Players } from "interfaces/players";
import { GameState, RoundState } from "interfaces/gameState";
import { TOKEN_SYMBOL } from "utils/constants";

interface BetFormProps {
  roundId: number;
  minimumAllowedBetAmount: number;
  blindBetCloseTimestamp: number;
  bettingEndTimestamp: number;
  selectedPlayer: Players;
  handlePlayerSelection: (player: Players) => void;
  gameState: GameState;
}

const BetForm: React.FC<BetFormProps> = React.memo(
  ({
    roundId,
    minimumAllowedBetAmount,
    blindBetCloseTimestamp,
    bettingEndTimestamp,
    selectedPlayer,
    handlePlayerSelection,
    gameState,
  }) => {
    const { isConnected, address } = useAccount();
    const { formattedBalance } = useTokenBalance();
    const { decimals } = useTokenDecimals();
    const { isCorrectNetwork, switchToCorrectNetwork } = useNetworkCheck();
    const [BetForm] = Form.useForm();
    const [betAmount, setBetAmount] = useState(0.001);
    const [rounds, setRounds] = useState(1);
    const [logMessages, setLogMessages] = useState<string[]>([]);
    const [multiplier, setMultiplier] = useState(0);

    const isBettingOver = (gameState: GameState) => {
      return (
        gameState.state > RoundState.BlindBettingClosedAndHoleCardsRevealed
      );
    };

    // Check if user has already placed a bet for this round
    const hasPlacedBet = React.useMemo(() => {
      const apesBetAmount = parseFloat(gameState.apesData.totalSelfBetAmount || "0.0");
      const punksBetAmount = parseFloat(gameState.punksData.totalSelfBetAmount || "0.0");
      return apesBetAmount > 0 || punksBetAmount > 0;
    }, [gameState.apesData.totalSelfBetAmount, gameState.punksData.totalSelfBetAmount]);

    // Determine which player the user bet on based on confirmed bets
    const confirmedBetPlayer = React.useMemo(() => {
      const apesBetAmount = parseFloat(gameState.apesData.totalSelfBetAmount || "0.0");
      const punksBetAmount = parseFloat(gameState.punksData.totalSelfBetAmount || "0.0");
      if (apesBetAmount > 0) return Players.Apes;
      if (punksBetAmount > 0) return Players.Punks;
      return Players.None;
    }, [gameState.apesData.totalSelfBetAmount, gameState.punksData.totalSelfBetAmount]);

    // Get the confirmed bet amount
    const confirmedBetAmount = React.useMemo(() => {
      const apesBetAmount = parseFloat(gameState.apesData.totalSelfBetAmount || "0.0");
      const punksBetAmount = parseFloat(gameState.punksData.totalSelfBetAmount || "0.0");
      return apesBetAmount > 0 ? apesBetAmount : punksBetAmount > 0 ? punksBetAmount : 0;
    }, [gameState.apesData.totalSelfBetAmount, gameState.punksData.totalSelfBetAmount]);

    // Update selectedPlayer and betAmount when bet is confirmed
    useEffect(() => {
      if (hasPlacedBet && confirmedBetPlayer !== Players.None) {
        handlePlayerSelection(confirmedBetPlayer);
        if (confirmedBetAmount > 0) {
          setBetAmount(confirmedBetAmount);
          BetForm.setFieldsValue({ amount: confirmedBetAmount });
        }
      }
    }, [hasPlacedBet, confirmedBetPlayer, confirmedBetAmount, handlePlayerSelection, BetForm]);

    // Calculate the multiplier on component mount and then every second
    useEffect(() => {
      const calculateMultiplier = (): number => {
        if (blindBetCloseTimestamp == 0 || bettingEndTimestamp == 0) {
          return 0;
        }

        const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current timestamp in milliseconds
        if (currentTimestamp <= blindBetCloseTimestamp) {
          return 8;
        } else if (currentTimestamp > bettingEndTimestamp) {
          return 1;
        } else {
          return (
            4 -
            (3 / (bettingEndTimestamp - blindBetCloseTimestamp)) *
              (currentTimestamp - blindBetCloseTimestamp)
          );
        }
      };

      setMultiplier(calculateMultiplier());

      // Set up an interval to run the calculateMultiplier function every second
      const intervalId = setInterval(() => {
        setMultiplier(calculateMultiplier());
      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }, [blindBetCloseTimestamp, bettingEndTimestamp]);

    const handlePlayerChange = useCallback((e) => {
      const selectedPlayer = e.target.value;
      handlePlayerSelection(selectedPlayer);
    }, [handlePlayerSelection]);

    // Reset form when round changes
    useEffect(() => {
      if (selectedPlayer === Players.None) {
        BetForm.setFieldsValue({ side: undefined });
      }
    }, [roundId, selectedPlayer, BetForm]);

    const handleLogs = useCallback(
      (state: string) => {
        setLogMessages((prev) => [...prev, state]);
      },
      [setLogMessages]
    );

    return (
      <Form
        form={BetForm}
        layout="vertical"
        className={`${styles.BetForm} ${styles.blurElement} ${
          isBettingOver(gameState) || hasPlacedBet ? styles.disabled : ""
        }`}
        requiredMark={false}
        colon
        initialValues={{
          amount: betAmount || 0,
          // COMMENTED OUT: rounds field (multi-round betting disabled)
          // rounds: rounds || 1,
        }}
      >
        {/* Side */}
        {isConnected ? (
          <>
            {!isCorrectNetwork && (
              <Flex
                align="center"
                justify="center"
                style={{
                  lineHeight: "14px",
                  marginBottom: "10px",
                  fontSize: "14px",
                  color: "#ff4d4d",
                  fontWeight: "bold",
                }}
              >
                ⚠️ Wrong Network!
                <Button
                  size="small"
                  type="link"
                  onClick={switchToCorrectNetwork}
                  style={{ color: "#4d9fff", padding: "0 8px" }}
                >
                  Switch to Base Sepolia
                </Button>
              </Flex>
            )}
            <Flex
              align="center"
              justify="center"
              style={{
                lineHeight: "14px",
                marginBottom: "10px",
                fontSize: "12px",
                color: "#888",
              }}
            >
              Balance: {formattedBalance} {TOKEN_SYMBOL}
            </Flex>
            {!isBettingOver(gameState) && !hasPlacedBet ? (
            <Flex
              align="center"
              justify="center"
              style={{
                lineHeight: "14px",
                marginBottom: "20px",
                fontSize: "16px",
                animation: multiplier > 1 ? "pulse 2s infinite" : "none",
              }}
            >
              Points multiplier:{" "}
              <b
                style={{
                  color:
                    multiplier > 4
                      ? "#00ff00"
                      : multiplier > 2
                      ? "#ffff00"
                      : "#ffffff",
                  textShadow: "0 0 10px currentColor",
                  marginLeft: "5px",
                  fontSize: "18px",
                }}
              >
                {multiplier.toFixed(2)}x
              </b>
            </Flex>
          ) : hasPlacedBet ? (
            <Flex
              align="center"
              justify="center"
              style={{
                lineHeight: "14px",
                marginBottom: "20px",
                fontSize: "16px",
                color: "#00ff00",
              }}
            >
              ✓ Bet confirmed for this round
            </Flex>
          ) : (
            <Flex
              align="center"
              justify="center"
              style={{
                lineHeight: "14px",
                marginBottom: "20px",
                fontSize: "16px",
                color: "#ff4d4d",
              }}
            >
              Betting is currently closed
            </Flex>
          )}
          </>
        ) : (
          <Flex
            align="center"
            justify="center"
            style={{
              lineHeight: "14px",
              marginBottom: "20px",
              fontSize: "16px",
              color: "#ff4d4d",
            }}
          >
            Please connect your wallet to place bets
          </Flex>
        )}
        <Form.Item
          name="side"
          label="Pick A Side"
          className={styles.BetFormItem}
          rules={[
            {
              required: true,
              message: "Please enter an amount",
            },
          ]}
        >
          <Radio.Group
            className={styles.BetFormRadio}
            onChange={handlePlayerChange}
            value={
              hasPlacedBet && confirmedBetPlayer !== Players.None
                ? confirmedBetPlayer
                : selectedPlayer === Players.None
                ? undefined
                : selectedPlayer
            }
            buttonStyle="outline"
            disabled={isBettingOver(gameState) || hasPlacedBet}
          >
            <Radio.Button
              key={Players.Apes}
              value={Players.Apes}
              style={{
                background: "red",
                borderColor: 
                  (hasPlacedBet && confirmedBetPlayer === Players.Apes) ||
                  (!hasPlacedBet && selectedPlayer === Players.Apes)
                    ? "white"
                    : "red",
              }}
              disabled={isBettingOver(gameState) || hasPlacedBet}
            >
              Apes
            </Radio.Button>
            <Radio.Button
              key={Players.Punks}
              value={Players.Punks}
              style={{
                background: "blue",
                borderColor:
                  (hasPlacedBet && confirmedBetPlayer === Players.Punks) ||
                  (!hasPlacedBet && selectedPlayer === Players.Punks)
                    ? "white"
                    : "blue",
              }}
              disabled={isBettingOver(gameState) || hasPlacedBet}
            >
              Punks
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Bet Amount */}
        <Form.Item
          label={`Enter Bet Amount in ${TOKEN_SYMBOL}`}
          name="amount"
          className={styles.BetFormItem}
          style={{
            marginBottom: 0,
          }}
        >
          <InputNumber
            min={0}
            step={0.001}
            precision={3}
            prefix={<FaCoins color="#FFD700" />}
            style={{
              width: "100%",
            }}
            value={hasPlacedBet && confirmedBetAmount > 0 ? confirmedBetAmount : betAmount}
            onChange={(val) => setBetAmount(Number(val))}
            disabled={isBettingOver(gameState) || hasPlacedBet}
          />
        </Form.Item>

        {/* Bet Amount */}
        <Flex
          align="center"
          justify="space-between"
          style={{
            marginTop: 8,
            marginBottom: 24,
          }}
        >
          <Flex align="center" gap={6}>
            {[0.01, 0.05, 0.1].map((item) => (
              <Button
                key={item}
                className={styles.BetFormButton}
                onClick={() => {
                  BetForm.setFieldsValue({ amount: Number(item) });
                  setBetAmount(item);
                }}
                disabled={isBettingOver(gameState) || hasPlacedBet}
              >
                {item}
              </Button>
            ))}
          </Flex>
        </Flex>

        {/* COMMENTED OUT: Play for rounds */}
        {/* <Form.Item
          label="Play for (x rounds):"
          name="rounds"
          className={styles.BetFormItem}
        >
          <Radio.Group
            className={styles.BetFormRoundsRadio}
            value={rounds}
            buttonStyle="solid"
            onChange={(e) => setRounds(e.target.value)}
            disabled={isBettingOver(gameState)}
          >
            {[1, 2, 5, 10, 15]?.map((item) => (
              <Radio.Button
                key={item}
                value={item}
                disabled={isBettingOver(gameState)}
              >
                {item}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item> */}
       {/* COMMENTED OUT: Total Amount display for multi-round betting */}
       {/* <Form.Item
          help="test"
          label={
            <span>
              Total Amount:{" "}
              <span
                style={{
                  color: "#00E000",
                  fontWeight: "bold",
                  fontSize: "1.25em",
                  lineHeight: "1.5em",
                  textShadow: "0 0 5px currentColor",
                }}
              >
                {(betAmount * rounds).toFixed(3)} {TOKEN_SYMBOL}
              </span>
            </span>
          }
          className={styles.BetFormItem}
        > */}
       <Form.Item
          className={styles.BetFormItem}
        >
          <Bet
            playerId={
              hasPlacedBet && confirmedBetPlayer !== Players.None
                ? confirmedBetPlayer
                : selectedPlayer
            }
            betAmount={hasPlacedBet && confirmedBetAmount > 0 ? confirmedBetAmount : betAmount}
            roundNumber={roundId}
            playerName={
              hasPlacedBet && confirmedBetPlayer !== Players.None
                ? confirmedBetPlayer === Players.Apes
                  ? "Apes"
                  : "Punks"
                : selectedPlayer === Players.None
                ? ""
                : selectedPlayer == Players.Apes
                ? "Apes"
                : "Punks"
            }
            onBettingStateChange={handleLogs}
            minimumAllowedBetAmount={minimumAllowedBetAmount}
            forceDisabled={isBettingOver(gameState) || hasPlacedBet}
            // COMMENTED OUT: Multi-round auto-play disabled
            // rounds={rounds}
            rounds={1}
          />
        </Form.Item>
      </Form>
    );
  }
);

BetForm.displayName = "BetForm";

export default BetForm;
