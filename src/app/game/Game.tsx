import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Button, Col, Flex, Form, Row } from "antd";
import Image from "next/image";
import BetForm from "app/game/BetForm";
import RecentBets from "app/game/RecentBets";

const Game = () => {
  return (
    <Container>
      <Row className={styles.GameContainer}>
        {/* Game Timer */}
        <Col span={3}></Col>

        {/* Game Cards */}
        <Col span={15}></Col>

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
