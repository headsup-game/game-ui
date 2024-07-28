"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Button, Col, Divider, Flex, Row } from "antd";
import Image from "next/image";
import BetForm from "app/game/BetForm";
import RecentBets from "app/game/RecentBets";
import dynamic from "next/dynamic";
import FlopCards from "app/game/FlopCards";
import GameCards from "app/game/GameCards";
import { useEffect, useState } from "react";
import BetwinModal from "app/components/BetwinModal/BetwinModal";
import CardSet from "components/CardSet";
import { Rank, Suit, Color, NewCard } from "interfaces/card";

const GameTimer = dynamic(() => import("app/game/GameTimer"), { ssr: false });

const Game = () => {
  const Timer = new Date();
  Timer.setSeconds(Timer.getSeconds() + 20); // 30 secs timer
  const [showModal, setShowModal] = useState(false);
  const [showCards, setShowCards] = useState<NewCard[]>([
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
      color: Color.VIOLET,
      faceDown: true,
    },
  ]);

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

  return (
    <Container>
      <Row className={styles.GameContainer} gutter={20}>
        <Col span={3}>
          {/* Game Timer */}
          <GameTimer Timer={Timer} />
        </Col>

        {/* Game Cards */}
        <Col span={15}>
          {/* Flop Cards */}
          <FlopCards />

          {/* Game Cards */}
          <GameCards />

          <Divider />
          <Row>
            <Col span={24}>
              <CardSet
                numberOfCards={5}
                cards={showCards}
                initFaceDown={true}
              />
            </Col>
            <Col span={24}>
              <Flex gap={12}>
                {/* TODO: Remove this once modal is implemented */}
                <Button onClick={() => setShowModal(true)}>
                  Show Success Modal
                </Button>
                <Button onClick={() => flipCards()}>Flip Cards</Button>
                <Button onClick={() => flipCards(1)}>Flip Card 2</Button>
                <Button
                  onClick={() =>
                    addCard({
                      rank: Rank.Three,
                      suit: Suit.Hearts,
                      color: Color.RED,
                      faceDown: true,
                    })
                  }
                >
                  Add 1 more card
                </Button>
              </Flex>
            </Col>
          </Row>
        </Col>

        {/* Game Controls/Actions */}
        <Col span={6}>
          <Flex className={styles.GameActionsContainer} vertical>
            <div style={{ position: "relative" }}>
              <Image
                src="/images/assets/realm-of-aces-card.png"
                alt="Realm of Aces"
                width={200}
                height={170}
                className={styles.GameCard}
              />
              <Flex className={styles.GameCardHeading}>Realm of Aces</Flex>
            </div>

            {/* Bet Form */}
            <BetForm />
          </Flex>
        </Col>
      </Row>

      {/* Recent Bets */}
      <RecentBets />

      {/* Modal */}
      {showModal && <BetwinModal open={showModal} setOpen={setShowModal} />}
    </Container>
  );
};

export default Game;
