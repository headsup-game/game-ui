"use client";

import { Button, Col, Flex, Form, InputNumber, Radio, Row } from "antd";
import styles from "./Game.module.scss";
import { FaEthereum } from "react-icons/fa";
import React, { useCallback, useState } from "react";
import { CurrencyFormatter } from "utils/formatters";
import { Bet } from "@components/bet";
import {useAccount, useBalance, UseBalanceReturnType} from "wagmi";

enum PlayerName {
  Red,
  Blue
}

const BetForm = ({roundId, minimumAllowedBetAmount}) => {
  const { isConnected, address } = useAccount()
  const [BetForm] = Form.useForm();
  const [betAmount, setBetAmount] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [playerId, setPlayerId] = useState<number | null>(null);
  const {data: walletBalance} = useBalance({
    address,
  })
  const [logMessages, setLogMessages] = useState<string[]>([]);

  const handlePlayerChange = (e) => {
    const id = e.target.value;
    setPlayerId(id);
  };


  const handleLogs = useCallback((state: string) => {
    setLogMessages(prev => [...prev, state]);
  }, [setLogMessages]);


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
        <Radio.Group className={styles.BetFormRadio} onChange={handlePlayerChange}>
          <Radio.Button
            value={0}
            style={{ background: "red", borderColor: "red" }}
          >
            Red
          </Radio.Button>
          <Radio.Button
            value={1}
            style={{ background: "blue", borderColor: "blue" }}
          >
            Blue
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      {/* Current balance */}
      <Flex
        className={styles.BetFormBalance}
      >
        Current Balance: Formatted: {walletBalance?.formatted}
      </Flex>

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
        <Flex align="center" gap={6}>
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
        <Flex align="center" gap={6}>
          {[1, 2, 5, 10, 15]?.map((item) => (
            <Button
              key={item}
              className={`${styles.BetFormButton} ${item === rounds && styles.BetFormButtonActive
                }`}
              onClick={() => setRounds(item)}
            >
              {item}
            </Button>
          ))}
        </Flex>
      </Form.Item>
      <Row gutter={12}>
        <Col span={13} className={styles.BetFormTotal}>
          TOTAL AMOUNT:{" "}
          {BetForm?.getFieldValue("amount") > 0
            ? BetForm?.getFieldValue("amount") * rounds
            : 0}
          ETH
        </Col>
        <Col span={11}>
          <Bet playerId={playerId} betAmount={betAmount} roundNumber={roundId} playerName={playerId !== null ? PlayerName[playerId] : ""} onBettingStateChange={handleLogs} minimumAllowedBetAmount={minimumAllowedBetAmount} />
        </Col>
      </Row>
      <Row gutter={12}>
        {logMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </Row>
    </Form>
  );
};

export default BetForm;
