"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Button, Col, Flex, Row } from "antd";
import Image from "next/image";
import BetForm from "app/game/BetForm";
import RecentBets from "app/game/RecentBets";
import dynamic from "next/dynamic";
import FlopCards from "app/game/FlopCards";
import GameCards from "app/game/GameCards";
import { useState } from "react";
import BetwinModal from "app/components/BetwinModal/BetwinModal";

const GameTimer = dynamic(() => import("app/game/GameTimer"), { ssr: false });

const Game = () => {
  const [showModal, setShowModal] = useState(false);
  const Timer = new Date();
  Timer.setSeconds(Timer.getSeconds() + 30); // 30 secs timer

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

          {/* Temp button */}
          {/* TODO: Remove this once modal is implemented */}
          <Button onClick={() => setShowModal(true)}>Show Success Modal</Button>
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
