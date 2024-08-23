"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.css";
import { Button, Col, Divider, Flex, Row } from "antd";
import Image from "next/image";
import BetForm from "app/game/BetForm";
import RecentBets from "app/game/RecentBets";
import dynamic from "next/dynamic";
import CommunityCards from "app/game/CommunityCards";
import GameCards from "app/game/GameCards";
import { useEffect, useState } from "react";
import BetwinModal from "app/components/BetwinModal/BetwinModal";
import { GameState, getGameStateFromGameStateDto } from "interfaces/gameState";
import { GameStateDto } from "interfaces/gameStateDto";
import { getGameInfoFromContract } from "utils/contract";
import {Color, Card, Rank, Suit} from "interfaces/card";

const GameTimer = dynamic(() => import("app/game/GameTimer"), { ssr: false });

const Game = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [redCards, setRedCards] = useState<Card[]>([]);
  const [blueCards, setBlueCards] = useState<Card[]>([]);
  const Timer = new Date();
  Timer.setSeconds(Timer.getSeconds() + 20); // 30 secs timer
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const gameInfoData: GameStateDto = await getGameInfoFromContract();
        setGameState(getGameStateFromGameStateDto(gameInfoData));
        setRedCards(gameInfoData.playerACards);
        setBlueCards(gameInfoData.playerBCards)
      } catch (error) {
        console.error("Error fetching game state:", error);
      }
    };
    fetchGameState();
  }, []);

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
          <CommunityCards cards={communityCards}/>

          {/* Game Cards */}
          <GameCards redCardsInput={redCards} blueCardsInput={blueCards}/>

          <Divider />
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
            <BetForm
              roundId={gameState?.roundNumber ?? 0}
              minimumAllowedBetAmount={gameState?.minimumAllowedBetAmount}
            />
          </Flex>
        </Col>
      </Row>

      {/* Recent Bets */}
      <RecentBets />

      {/* Open Modal */}
      <Divider />
      <Button onClick={() => setShowModal(true)}>Open Success Modal</Button>

      {/* Modal */}
      {showModal && <BetwinModal open={showModal} setOpen={setShowModal} />}
    </Container>
  );
};

export default Game;
