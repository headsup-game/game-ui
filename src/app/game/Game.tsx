"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Button, Col, Divider, Flex, Row } from "antd";
import Image from "next/image";
import BetForm from "app/game/BetForm";
import RecentBets from "app/game/RecentBets";
import CommunityCards from "app/game/CommunityCards";
import GameCards from "app/game/GameCards";
import { useCallback, useState } from "react";
import BetwinModal from "app/components/BetwinModal/BetwinModal";
import {
  GameState,
  RoundState,
  getGameStateFromRound,
} from "interfaces/gameState";
import { GET_CURRENT_ROUND_QUERY } from "graphQueries/getCurrentRound";
import { useQuery } from "@apollo/client";
import { RoundPage } from "gql/graphql";
import GameTimer from "app/game/GameTimer";
import { Players } from "interfaces/players";

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(
    getGameStateFromRound(null, null)
  );
  const [showModal, setShowModal] = useState(false);
  const [renderRecentBets, setRenderRecentBets] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Players>(Players.None);

  const handleRoundData = (data: { rounds: RoundPage }) => {
    if (data?.rounds?.items != null && data?.rounds.items.length == 2) {
      const currentRound = data.rounds.items[0];
      const previousRound = data.rounds.items[1];
      const currentRoundState: GameState = getGameStateFromRound(previousRound, currentRound);

      setGameState(currentRoundState);

      setShowModal(currentRoundState.state == RoundState.ResultsDeclaredAndEnded);
      setSelectedPlayer(currentRoundState.state == RoundState.ResultsDeclaredAndEnded ? Players.None : selectedPlayer)

      setRenderRecentBets(true);
    }
  };

  const handlePlayerSelection = useCallback((player: Players) => {
    setSelectedPlayer(player);
  }, []);

  const { } = useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
    variables: { limit: 2, participant: "" },
    pollInterval: 500, // Refetch data every 5000 milliseconds (5 seconds)
    onCompleted: handleRoundData,
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Container>
      <Row className={styles.GameContainer} gutter={20}>
        <Col span={18}>
          <CommunityCards cards={gameState.communityCards} />
          <GameTimer
            timerMessage={gameState.currentMessage}
            timer={gameState.currentTimerEndDateTime}
          />
          <GameCards
            redCardsInput={gameState.participantA.cards}
            blueCardsInput={gameState.participantB.cards}
            redCardsTotalAmount={gameState.participantA.totalBetAmounts}
            redCardsNumberOfBets={Number(gameState.participantA.totalNumberOfBets)}
            blueCardsNumberOfBets={Number(gameState.participantB.totalNumberOfBets)}
            blueCardsTotalAmout={gameState.participantB.totalBetAmounts}
            selectedPlayer={selectedPlayer}
            handlePlayerSelection={handlePlayerSelection}
          />
          <Divider />
        </Col>
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
            <BetForm
              roundId={Number(gameState?.roundNumber ?? 0)}
              minimumAllowedBetAmount={gameState?.minimumAllowedBetAmount}
              selectedPlayer={selectedPlayer}
              handlePlayerSelection={handlePlayerSelection}
            />
          </Flex>
        </Col>
      </Row>

      <RecentBets />

      <Divider />
      <Button onClick={() => setShowModal(true)}>Open Success Modal</Button>

      {showModal && (
        <BetwinModal
          gameState={gameState}
          open={showModal}
          setOpen={setShowModal}
        />
      )}
    </Container>
  );
};

export default Game;
