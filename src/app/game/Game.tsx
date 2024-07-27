import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Col, Divider, Flex, Row } from "antd";
import Image from "next/image";
import BetForm from "app/game/BetForm";
import RecentBets from "app/game/RecentBets";
import dynamic from "next/dynamic";
import FlipCard from "@components/FlipCard";
import FlopCards from "app/game/FlopCards";
import { useState } from "react";
import GameCards from "app/game/GameCards";

const GameTimer = dynamic(() => import("app/game/GameTimer"), { ssr: false });

const Game = () => {
  const Timer = new Date();
  Timer.setSeconds(Timer.getSeconds() + 30); // 30 secs timer

  return (
    <Container>
      <Row className={styles.GameContainer} gutter={20}>
        {/* Game Timer */}
        <Col span={3}>
          <Flex vertical gap={14} align="center">
            <GameTimer Timer={Timer} />
            <Flex>Flop Timer:</Flex>
          </Flex>
        </Col>

        {/* Game Cards */}
        <Col span={15}>
          {/* Flop Cards */}
          <FlopCards />

          {/* Game Cards */}
          <GameCards />
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
    </Container>
  );
};

export default Game;
