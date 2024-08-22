import { Col, Row } from "antd";
import styles from "./Game.module.css";
import { Color, NewCard, Rank, Suit } from "interfaces/card";
import CardSet from "@components/CardSet";
import { useEffect, useState } from "react";

const CommunityCards = () => {
  const [showCards, setShowCards] = useState<NewCard[]>([]);
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

  const addCard = (card: NewCard) => {
    setShowCards([...showCards, card]);
  };

  useEffect(() => {
    // use fetch here to get the community cards
    const cards = [
      {
        suit: Suit.Hearts,
        rank: Rank.Ace,
        color: Color.RED,
        faceDown: true,
      },
      {
        suit: Suit.Diamonds,
        rank: Rank.Jack,
        color: Color.BLUE,
        faceDown: true,
      },
      {
        suit: Suit.Spades,
        rank: Rank.Ten,
        color: Color.RED,
        faceDown: true,
      },
      {
        suit: Suit.Hearts,
        rank: Rank.King,
        color: Color.RED,
        faceDown: true,
      },
      {
        suit: Suit.Clubs,
        rank: Rank.Queen,
        color: Color.BLUE,
        faceDown: true,
      },
    ];
    setShowCards(cards);
    setTimeout(() => {
      setFaceDown(true);
    }, 1500);
  }, []);

  return (
    <Row className={styles.FlopCardsContainer} align={"middle"}>
      <Col span={24}>
        <CardSet numberOfCards={5} cards={showCards} initFaceDown={faceDown} />
      </Col>
    </Row>
  );
};

export default CommunityCards;
