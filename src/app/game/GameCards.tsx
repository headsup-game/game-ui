import { Col, Flex, Row } from "antd";
import { useEffect, useState } from "react";
import styles from "./Game.module.scss";
import FlipCard from "@components/FlipCard";
import Image from "next/image";
import { Color, Card, Rank, Suit, getRankValue, getSuitShortForm } from "interfaces/card";
import CardSet from "@components/CardSet";
import { red } from "colorette";
import { TexasHoldem } from "poker-odds-calc";

const GameCards = ({
  redCardsInput,
  blueCardsInput,
  redCardsNumberOfBets,
  redCardsTotalAmount,
  blueCardsNumberOfBets,
  blueCardsTotalAmout,
}: {
  redCardsInput: Card[];
  blueCardsInput: Card[];
  redCardsNumberOfBets: number;
  redCardsTotalAmount: string;
  blueCardsNumberOfBets: number;
  blueCardsTotalAmout: string;
}) => {
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [faceDown, setFaceDown] = useState<boolean>(true);
  const [redWinPercentage, setRedWinPercentage] = useState<number>(50);
  const [blueWinPercentage, setBlueWinPercentage] = useState<number>(50);

  useEffect(() => {
    setTimeout(() => {
      setFaceDown(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (redCardsInput.length == 2 && blueCardsInput.length == 2) {
      const table = new TexasHoldem();
      if (redCardsInput[0].rank == Rank.None
        || redCardsInput[1].rank == Rank.None
        || blueCardsInput[0].rank == Rank.None
        || blueCardsInput[1].rank == Rank.None) {
        setRedWinPercentage(50);
        setBlueWinPercentage(50);
        return;
      }

      const redCard1 = `${getRankValue(redCardsInput[0].rank)}${getSuitShortForm(redCardsInput[0].suit)}`;
      const redCard2 = `${getRankValue(redCardsInput[1].rank)}${getSuitShortForm(redCardsInput[1].suit)}`;

      const blueCard1 = `${getRankValue(blueCardsInput[0].rank)}${getSuitShortForm(blueCardsInput[0].suit)}`;
      const blueCard2 = `${getRankValue(blueCardsInput[1].rank)}${getSuitShortForm(blueCardsInput[1].suit)}`;

      table.addPlayer([redCard1, redCard2]).addPlayer([blueCard1, blueCard2]);
      const result = table.calculate();
      const playerResults = result.getPlayers();
      setRedWinPercentage(playerResults[0].getWinsPercentage());
      setBlueWinPercentage(playerResults[1].getWinsPercentage());
    }
  }, [JSON.stringify(redCardsInput), JSON.stringify(blueCardsInput)]);

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
            Apes Winning: {redWinPercentage}%
          </Flex>
          {/* Card Container */}
          <Flex
            className={`${styles.GameCardsContainer} ${styles.WinPercentageStripRed
              } ${selectedCard === "red" ? styles.GameCardsContainerSelectedRed : ""
              }`}
            onClick={() => setSelectedCard("red")}
          >
            <Row gutter={14} style={{ width: "100%", margin: 0 }}>
              <Col span={24}>
                <CardSet
                  numberOfCards={2}
                  cards={redCardsInput}
                  initFaceDown={faceDown}
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
              <Flex className={styles.GameCardsPoolAmount}>
                {redCardsTotalAmount} ETH
              </Flex>
              <Flex className={styles.GameCardsAmountTitle}>Amount Pool</Flex>
            </Flex>
            <Flex style={{ border: "0.5px solid #fff", height: 40 }}> </Flex>
            <Flex vertical>
              <Flex className={styles.GameCardsPoolAmount}>
                {redCardsNumberOfBets}
              </Flex>
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
            Punks Winning: {blueWinPercentage}%
          </Flex>
          {/* Card Container */}
          <Flex
            className={`${styles.GameCardsContainer} ${styles.WinPercentageStripBlue
              } ${selectedCard === "blue"
                ? styles.GameCardsContainerSelectedBlue
                : ""
              }`}
            onClick={() => setSelectedCard("blue")}
          >
            <Row gutter={14} style={{ width: "100%", margin: 0 }}>
              <Col span={24}>
                <CardSet
                  numberOfCards={2}
                  cards={blueCardsInput}
                  initFaceDown={faceDown}
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
              <Flex className={styles.GameCardsPoolAmount}>
                {blueCardsTotalAmout} ETH
              </Flex>
              <Flex className={styles.GameCardsAmountTitle}>Amount Pool</Flex>
            </Flex>
            <Flex style={{ border: "0.5px solid #fff", height: 40 }}> </Flex>
            <Flex vertical>
              <Flex className={styles.GameCardsPoolAmount}>
                {blueCardsNumberOfBets}
              </Flex>
              <Flex className={styles.GameCardsAmountTitle}>Bets Placed</Flex>
            </Flex>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};

export default GameCards;
