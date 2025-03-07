import { Col, Row } from "antd";
import styles from "./Game.module.scss";
import { Card } from "interfaces/card";
import CardSet from "@components/CardSet";
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";


interface CommunityCardsProps {
  cards: Card[];
}

const isCommunityCardsEqual = (prevProps: CommunityCardsProps, nextProps: CommunityCardsProps): boolean => {
  return isEqual(prevProps.cards, nextProps.cards);
}

const CommunityCards: React.FC<CommunityCardsProps> = React.memo(({ cards }) => {
  const [showCards, setShowCards] = useState<Card[]>(cards);
  const [faceDown, setFaceDown] = useState<boolean>(true);

  const flipCards = (index?: number) => {
    if (!index) {
      setShowCards(showCards.map((card) => ({ ...card, faceDown: false })));
    } else if (index >= 0 && index < showCards.length) {
      setShowCards(
        showCards.map((card, i) =>
          i === index ? { ...card, faceDown: false } : card
        )
      );
    }
  };

  const addCard = (card: Card) => {
    setShowCards([...showCards, card]);
  };

  useEffect(() => {
    setTimeout(() => {
      setFaceDown(true);
    }, 1500);
  }, []);

  return (
    <Row className={styles.FlopCardsContainer} align={"middle"}>
      <Col span={20} offset={2}>
        <CardSet isSmall={false} numberOfCards={5} cards={cards} initFaceDown={faceDown} />
      </Col>
    </Row>
  );
}, (prevProps, nextProps) => isCommunityCardsEqual(prevProps, nextProps));

CommunityCards.displayName = "CommunityCards";

export default CommunityCards;
