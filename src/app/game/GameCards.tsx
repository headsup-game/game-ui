import { Col, Flex, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Game.module.scss";
import FlipCard from "@components/FlipCard";
import Image from "next/image";
import { Color, Card, Rank, Suit, getRankValue, getSuitShortForm } from "interfaces/card";
import CardSet from "@components/CardSet";
import { red } from "colorette";
import { TexasHoldem } from "poker-odds-calc";
import { Players } from "interfaces/players";
import { isEqual } from "lodash";
const { Text } = Typography;

interface GameCardsProps {
  redCardsInput: Card[];
  blueCardsInput: Card[];
  redCardsNumberOfBets: number;
  redCardsTotalAmount: string;
  blueCardsNumberOfBets: number;
  blueCardsTotalAmout: string;
  selectedPlayer: Players;
  handlePlayerSelection: (player: Players) => void;
  apesPayout: number;
  punksPayout: number;
  apesSelfBet: string;
  punksSelfBet: string;
}

const isGameCardsEqual = (prevProps: GameCardsProps, nextProps: GameCardsProps): boolean => {
  return prevProps.selectedPlayer == nextProps.selectedPlayer
    && isEqual(prevProps.redCardsInput, nextProps.redCardsInput)
    && isEqual(prevProps.blueCardsInput, nextProps.blueCardsInput)
    && prevProps.redCardsNumberOfBets == nextProps.redCardsNumberOfBets
    && prevProps.redCardsTotalAmount == nextProps.redCardsTotalAmount
    && prevProps.blueCardsNumberOfBets == nextProps.blueCardsNumberOfBets
    && prevProps.blueCardsTotalAmout == nextProps.blueCardsTotalAmout;
}

const GameCards: React.FC<GameCardsProps> = React.memo(({
  redCardsInput,
  blueCardsInput,
  redCardsTotalAmount,
  blueCardsTotalAmout,
  selectedPlayer,
  handlePlayerSelection,
  apesPayout,
  punksPayout,
  apesSelfBet,
  punksSelfBet
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
      <Col span={12}>
        <Flex vertical align="center" gap={10}>
          <Flex>
            <Text style={{ fontSize: '20px', fontWeight: '700', marginBottom: '0px', color: '#FEBEBE' }}>APES</Text>
          </Flex>
          <Flex
            className={`${styles.WinPercentageStrip} ${styles.WinPercentageStripRed}`}
          >
            Bets - {redCardsTotalAmount}ETH | Payout - {apesPayout == Infinity ? '∞' : apesPayout.toFixed(2)}x
          </Flex>
          {/* Card Container */}
          <Flex
            className={`${styles.GameCardsContainer} ${styles.WinPercentageStripRed
              } ${selectedPlayer === Players.Apes ? styles.GameCardsContainerSelectedRed : ""
              }`}
            onClick={() => handlePlayerSelection(Players.Apes)}
          >
            <Row gutter={14} style={{ width: "100%", margin: 0 }}>
              <Col span={24}>
                <CardSet
                  isSmall={false}
                  numberOfCards={2}
                  cards={redCardsInput}
                  initFaceDown={faceDown}
                />
              </Col>
            </Row>
          </Flex>
          <Flex
            className={`${styles.WinPercentageStrip} ${styles.WinPercentageStripRed}`}
          >
            Win% - {redWinPercentage.toFixed(2)}
          </Flex>
        </Flex>
      </Col>
      <Col span={12}>
        <Flex vertical align="center" gap={10}>
          <Flex>
            <Text style={{ fontSize: '20px', fontWeight: '700', marginBottom: '0px', color: '#C7BEFE' }}>PUNKS</Text>
          </Flex>
          <Flex
            align="center"
            vertical
            className={`${styles.WinPercentageStrip} ${styles.WinPercentageStripBlue}`}
          >
            Bets - {blueCardsTotalAmout}ETH | Payout - {punksPayout == Infinity ? '∞' : punksPayout.toFixed(2)}x
          </Flex>
          <Flex
            className={`${styles.GameCardsContainer} ${styles.WinPercentageStripBlue
              } ${selectedPlayer === Players.Punks
                ? styles.GameCardsContainerSelectedBlue
                : ""
              }`}
            onClick={() => handlePlayerSelection(Players.Punks)}
          >
            <Row gutter={14} style={{ width: "100%", margin: 0 }}>
              <Col span={24}>
                <CardSet
                  isSmall={false}
                  numberOfCards={2}
                  cards={blueCardsInput}
                  initFaceDown={faceDown}
                />
              </Col>
            </Row>
          </Flex>
          <Flex
            className={`${styles.WinPercentageStrip} ${styles.WinPercentageStripBlue}`}
          >
            Win% - {blueWinPercentage.toFixed(2)}
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
}, (prevProps, nextProps) => isGameCardsEqual(prevProps, nextProps));

GameCards.displayName = "GameCards";

export default GameCards;
