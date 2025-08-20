"use client";

import { Button, Col, Flex, Form, InputNumber, Radio } from "antd";
import styles from "./Game.module.scss";
import { FaEthereum } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";
import { Bet } from "@components/bet";
import { useAccount, useBalance } from "wagmi";
import { Players } from "interfaces/players";
import { GameState, RoundState } from "interfaces/gameState";

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
    }, []);

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
          isBettingOver(gameState) ? styles.disabled : ""
        }`}
        requiredMark={false}
        colon
        initialValues={{
          amount: betAmount || 0,
          rounds: rounds || 1,
        }}
      >
        {/* Side */}
        {isConnected ? (
          !isBettingOver(gameState) ? (
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
          )
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
            value={selectedPlayer == Players.None ? null : selectedPlayer}
            buttonStyle="outline"
            disabled={isBettingOver(gameState)}
          >
            <Radio.Button
              key={Players.Apes}
              value={Players.Apes}
              style={{
                background: "red",
                borderColor: selectedPlayer === Players.Apes ? "white" : "red",
              }}
              disabled={isBettingOver(gameState)}
            >
              Apes
            </Radio.Button>
            <Radio.Button
              key={Players.Punks}
              value={Players.Punks}
              style={{
                background: "blue",
                borderColor: selectedPlayer == Players.Punks ? "white" : "blue",
              }}
              disabled={isBettingOver(gameState)}
            >
              Punks
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Bet Amount */}
        <Form.Item
          label="Enter Bet Amount in ETH"
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
            prefix={<FaEthereum color="#fff" />}
            style={{
              width: "100%",
            }}
            value={betAmount}
            onChange={(val) => setBetAmount(Number(val))}
            disabled={isBettingOver(gameState)}
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
                disabled={isBettingOver(gameState)}
              >
                {item}
              </Button>
            ))}
          </Flex>
        </Flex>

        {/* Play for rounds */}
        <Form.Item
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
        </Form.Item>
       <Form.Item
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
                {(betAmount * rounds).toFixed(3)} ETH
              </span>
            </span>
          }
          className={styles.BetFormItem}
        >
          <Bet
            playerId={selectedPlayer}
            betAmount={betAmount}
            roundNumber={roundId}
            playerName={
              selectedPlayer === Players.None
                ? ""
                : selectedPlayer == Players.Apes
                ? "Apes"
                : "Punks"
            }
            onBettingStateChange={handleLogs}
            minimumAllowedBetAmount={minimumAllowedBetAmount}
            forceDisabled={isBettingOver(gameState)}
            // NEW: pass selected rounds to enable auto-play
            rounds={rounds}
          />
        </Form.Item>
      </Form>
    );
  }
);

BetForm.displayName = "BetForm";

export default BetForm;
