"use client";

import { Col, Flex, Row } from "antd";
import { useState } from "react";
import styles from "./Game.module.scss";
import FlipCard from "@components/FlipCard";
import Image from "next/image";

const GameCards = () => {
  const [selectedCard, setSelectedCard] = useState<string>("");
  return (
    <Row
      align={"middle"}
      justify={"space-between"}
      className={styles.GameCards}
    >
      {/* Red Card */}
      <Col span={10}>
        <Flex vertical align="center" gap={14}>
          <Flex
            className={`${styles.WinPercentageStrip} ${styles.WinPercentageStripRed}`}
          >
            Red Win Percentage: 45%
          </Flex>
          {/* Card Container */}
          <Flex
            className={`${styles.GameCardsContainer} ${
              styles.WinPercentageStripRed
            } ${
              selectedCard === "red" ? styles.GameCardsContainerSelectedRed : ""
            }`}
            onClick={() => setSelectedCard("red")}
          >
            <Row gutter={14} style={{ width: "100%", margin: 0 }}>
              <Col span={12}>
                <FlipCard
                  width={"100%"}
                  height={150}
                  frontContent={
                    <Image
                      src="/images/seven_of_hearts.png"
                      alt="two_of_clubs"
                      width={117}
                      height={150}
                      className={styles.FlopCard}
                    />
                  }
                  backContent={
                    <Image
                      src="/images/card_back_side.svg"
                      alt="two_of_clubs"
                      width={117}
                      height={150}
                      className={styles.FlopCard}
                    />
                  }
                />
              </Col>
              <Col span={12}>
                <FlipCard
                  width={`100%`}
                  frontContent={
                    <Image
                      src="/images/seven_of_hearts.png"
                      alt="two_of_clubs"
                      width={117}
                      height={150}
                      className={styles.FlopCard}
                    />
                  }
                  backContent={
                    <Image
                      src="/images/card_back_side.svg"
                      alt="two_of_clubs"
                      width={117}
                      height={150}
                      className={styles.FlopCard}
                    />
                  }
                />
              </Col>
            </Row>
          </Flex>
          {/* Pool and Bets */}
          <Flex
            gap={50}
            align="center"
            justify="space-between"
            className={styles.GameCardsPool}
          >
            <Flex vertical>
              <Flex className={styles.GameCardsPoolAmount}>23 ETH</Flex>
              <Flex className={styles.GameCardsAmountTitle}>Amount Pool</Flex>
            </Flex>
            <Flex style={{ border: "0.5px solid #fff", height: 40 }}> </Flex>
            <Flex vertical>
              <Flex className={styles.GameCardsPoolAmount}>976</Flex>
              <Flex className={styles.GameCardsAmountTitle}>Bets Placed</Flex>
            </Flex>
          </Flex>
        </Flex>
      </Col>

      {/* Blue Card */}
      <Col span={10}>
        <Flex vertical align="center" gap={14}>
          <Flex
            className={`${styles.WinPercentageStrip} ${styles.WinPercentageStripBlue}`}
          >
            Blue Win Percentage: 45%
          </Flex>
          {/* Card Container */}
          <Flex
            className={`${styles.GameCardsContainer} ${
              styles.WinPercentageStripBlue
            } ${
              selectedCard === "blue"
                ? styles.GameCardsContainerSelectedBlue
                : ""
            }`}
            onClick={() => setSelectedCard("blue")}
          >
            <Row gutter={14} style={{ width: "100%", margin: 0 }}>
              <Col span={12}>
                <FlipCard
                  width={"100%"}
                  height={150}
                  frontContent={
                    <Image
                      src="/images/seven_of_hearts.png"
                      alt="two_of_clubs"
                      width={117}
                      height={150}
                      className={styles.FlopCard}
                    />
                  }
                  backContent={
                    <Image
                      src="/images/card_back_side.svg"
                      alt="two_of_clubs"
                      width={117}
                      height={150}
                      className={styles.FlopCard}
                    />
                  }
                />
              </Col>
              <Col span={12}>
                <FlipCard
                  width={`100%`}
                  frontContent={
                    <Image
                      src="/images/seven_of_hearts.png"
                      alt="two_of_clubs"
                      width={117}
                      height={150}
                      className={styles.FlopCard}
                    />
                  }
                  backContent={
                    <Image
                      src="/images/card_back_side.svg"
                      alt="two_of_clubs"
                      width={117}
                      height={150}
                      className={styles.FlopCard}
                    />
                  }
                />
              </Col>
            </Row>
          </Flex>
          {/* Pool and Bets */}
          <Flex
            gap={50}
            align="center"
            justify="space-between"
            className={styles.GameCardsPool}
          >
            <Flex vertical>
              <Flex className={styles.GameCardsPoolAmount}>23 ETH</Flex>
              <Flex className={styles.GameCardsAmountTitle}>Amount Pool</Flex>
            </Flex>
            <Flex style={{ border: "0.5px solid #fff", height: 40 }}> </Flex>
            <Flex vertical>
              <Flex className={styles.GameCardsPoolAmount}>976</Flex>
              <Flex className={styles.GameCardsAmountTitle}>Bets Placed</Flex>
            </Flex>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};

export default GameCards;
