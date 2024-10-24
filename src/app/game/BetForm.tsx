"use client";

import { Button, Col, Flex, Form, InputNumber, Radio } from "antd";
import styles from "./Game.module.scss";
import { FaEthereum } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";
import { Bet } from "@components/bet";
import { useAccount, useBalance } from "wagmi";
import { Players } from "interfaces/players";

interface BetFormProps {
  roundId: number;
  minimumAllowedBetAmount: number;
  blindBetCloseTimestamp: number;
  bettingEndTimestamp: number;
  selectedPlayer: Players;
  handlePlayerSelection: (player: Players) => void;
}

const BetForm: React.FC<BetFormProps> = React.memo(({
  roundId,
  minimumAllowedBetAmount,
  blindBetCloseTimestamp,
  bettingEndTimestamp,
  selectedPlayer,
  handlePlayerSelection
}) => {
  const { isConnected, address } = useAccount();
  const [BetForm] = Form.useForm();
  const [betAmount, setBetAmount] = useState(0.001);
  const [rounds, setRounds] = useState(1);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [multiplier, setMultiplier] = useState(0);

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
        return (4 - (3 / (bettingEndTimestamp - blindBetCloseTimestamp)) * (currentTimestamp - blindBetCloseTimestamp));
      }
    };

    setMultiplier(calculateMultiplier());

    // Set up an interval to run the calculateMultiplier function every second
    const intervalId = setInterval(() => {
      console.log(selectedPlayer);
      setMultiplier(calculateMultiplier());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [blindBetCloseTimestamp, bettingEndTimestamp]);

  const handlePlayerChange = useCallback((e) => {
    console.log("changed");
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
      className={styles.BetForm}
      requiredMark={false}
      colon
      initialValues={{
        amount: betAmount || 0,
        rounds: rounds || 1,
      }}
    >
      {/* Side */}
      <Flex
        align="center"
        justify="center"
        style={{ lineHeight: "14px", marginBottom: "20px", fontSize: "16px" }}
      >
        {`Points multiplier: ${multiplier.toFixed(2)}`}
      </Flex>
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
        >
          <Radio.Button
            key={Players.Apes}
            value={Players.Apes}
            style={{ background: "red", borderColor: selectedPlayer === Players.Apes ? "white" : "red" }}
          >
            Apes
          </Radio.Button>
          <Radio.Button
            key={Players.Punks}
            value={Players.Punks}
            style={{ background: "blue", borderColor: selectedPlayer == Players.Punks ? "white" : "blue" }}
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
        <Flex align="center" gap={6} className="flex-wrap">
          {[0.01, 0.05, 0.1].map((item) => (
            <Button
              key={item}
              className={styles.BetFormButton}
              onClick={() => {
                BetForm.setFieldsValue({ amount: Number(item) });
                setBetAmount(item);
              }}
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
        >
          {[1, 2, 5, 10, 15]?.map((item) => (
            <Radio.Button key={item} value={item}>{item}</Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item help="test" label={`Total Amount: ${betAmount * rounds}ETH`}
        className={styles.BetFormItem}>
        <Bet
          playerId={selectedPlayer}
          betAmount={betAmount}
          roundNumber={roundId}
          playerName={selectedPlayer === Players.None ? '' : selectedPlayer == Players.Apes ? "Apes" : "Punks"}
          onBettingStateChange={handleLogs}
          minimumAllowedBetAmount={minimumAllowedBetAmount}
        />
      </Form.Item>
    </Form>
  );
});

BetForm.displayName = "BetForm";

export default BetForm;
