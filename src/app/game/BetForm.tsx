"use client";

import { Button, Col, Flex, Form, InputNumber, Radio, Row } from "antd";
import styles from "./Game.module.scss";
import { FaEthereum } from "react-icons/fa";
import { useState } from "react";
import { CurrencyFormatter } from "utils/formatters";

const BetForm = () => {
  const [BetForm] = Form.useForm();
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [betAmountFiat, setBetAmountFiat] = useState(0);
  const [rounds, setRounds] = useState(1);

  const submitBet = (values) => {
    setRequestInProgress(true);
    const { side, amount } = values;
    const postObj = {
      amount: amount,
      side,
      rounds: rounds,
    };
    setTimeout(() => {
      setRequestInProgress(false);
    }, 2000);
    console.log("Post Obj: ", postObj);
  };

  return (
    <Form
      form={BetForm}
      layout="vertical"
      className={styles.BetForm}
      onFinish={submitBet}
      requiredMark={false}
      colon
      initialValues={{
        amount: betAmountFiat || 0,
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
        <Radio.Group className={styles.BetFormRadio}>
          <Radio.Button
            value={"red"}
            style={{ background: "red", borderColor: "red" }}
          >
            Red
          </Radio.Button>
          <Radio.Button
            value={"blue"}
            style={{ background: "blue", borderColor: "blue" }}
          >
            Blue
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      {/* Current balance */}
      <Flex
        className={styles.BetFormBalance}
        onClick={() => setBetAmountFiat(0.003)}
      >
        Current Balance: 0.003 ETH
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
          onChange={(val) => setBetAmountFiat(Number(val))}
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
        {CurrencyFormatter(betAmountFiat * 3500, 2, "USD")}
        <Flex align="center" gap={6}>
          {[0.01, 0.05, 0.1].map((item) => (
            <Button
              key={item}
              className={styles.BetFormButton}
              onClick={() => {
                BetForm.setFieldsValue({ amount: Number(item) });
                setBetAmountFiat(item);
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
              className={`${styles.BetFormButton} ${
                item === rounds && styles.BetFormButtonActive
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
          <Button
            type="primary"
            htmlType="submit"
            block
            className={styles.BetFormCTA}
            loading={requestInProgress}
            disabled={requestInProgress}
          >
            Place Bet
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default BetForm;
