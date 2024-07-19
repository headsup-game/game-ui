"use client";

import { Button, Col, Flex, Form, InputNumber, Radio, Row } from "antd";
import styles from "./Game.module.scss";
import { FaEthereum } from "react-icons/fa";
import { useState } from "react";

const BetForm = () => {
  const [BetForm] = Form.useForm();
  const [requestInProgress, setRequestInProgress] = useState(false);

  const submitBet = (values) => {
    setRequestInProgress(true);
    const { amount, side, rounds } = values;
    const postObj = {
      amount,
      side,
      rounds,
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
      initialValues={{
        amount: 0,
      }}
    >
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
        <Radio.Group>
          <Radio.Button value={"red"}>Red</Radio.Button>
          <Radio.Button value={"blue"}>Blue</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Flex
        style={{
          cursor: "pointer",
        }}
        onClick={() => BetForm.setFieldValue("amount", 0.003)}
      >
        Current Balance: 0.003 ETH
      </Flex>

      {/* Bet Amount */}
      <Form.Item
        label="Enter Bet Amount in ETH"
        name="amount"
        className={styles.BetFormItem}
      >
        <InputNumber
          min={0}
          step={0.001}
          precision={3}
          prefix={<FaEthereum />}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      {/* Play for rounds */}
      <Form.Item
        label="Play for (x rounds):"
        name="rounds"
        className={styles.BetFormItem}
      >
        <Radio.Group>
          <Radio.Button value={1}>1</Radio.Button>
          <Radio.Button value={2}>2</Radio.Button>
          <Radio.Button value={5}>5</Radio.Button>
          <Radio.Button value={10}>10</Radio.Button>
          <Radio.Button value={20}>20</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Row>
        <Col span={16}>TOTAL AMOUNT: 0.03 ETH</Col>
        <Col span={8}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.BetFormButton}
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
