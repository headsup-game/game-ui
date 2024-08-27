import { Col, Row } from "antd";
import styles from "./Game.module.css";
import { Color, Card, Rank, Suit } from "interfaces/card";
import CardSet from "@components/CardSet";
import { useEffect, useState } from "react";

const CommunityCards = ({cards}: {cards: Card[]}) => {
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
        <CardSet numberOfCards={5} cards={cards} initFaceDown={faceDown} />
      </Col>
    </Row>
  );
};

export default CommunityCards;
