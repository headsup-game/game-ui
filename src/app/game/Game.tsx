"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.css";
import { Button, Col, Divider, Flex, Row } from "antd";
import Image from "next/image";
import BetForm from "app/game/BetForm";
import RecentBets from "app/game/RecentBets";
// import dynamic from "next/dynamic";
import CommunityCards from "app/game/CommunityCards";
import GameCards from "app/game/GameCards";
import { useEffect, useState } from "react";
import BetwinModal from "app/components/BetwinModal/BetwinModal";
import { GameState, RoundState, getGameStateFromRound } from "interfaces/gameState";
// const GameTimer = dynamic(() => import("app/game/GameTimer"), { ssr: false });
import { GET_CURRENT_ROUND_QUERY } from "graphQueries/getCurrentRound";
import { useQuery } from "@apollo/client";
import { Round, RoundPage } from "gql/graphql";
import { getEnumName } from "utils/enumHelper";
import GameTimer from "app/game/GameTimer";

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(getGameStateFromRound(null));
  const [showModal, setShowModal] = useState(false);

  const handleRoundData = (data: { rounds: RoundPage }) => {
    if (data?.rounds?.items != null && data?.rounds.items.length == 2) {
      const currentRound = data.rounds.items[0];
      const previousRound = data.rounds.items[1];

      const currentRoundState: GameState = getGameStateFromRound(currentRound);
      const previousRoundState: GameState = getGameStateFromRound(previousRound);

      const activeRound: Round = currentRoundState.state == RoundState.Initialized ? previousRound : currentRound;

      try {
        const gameState: GameState = getGameStateFromRound(activeRound);

        if (currentRoundState.state == RoundState.Initialized) {
          const currentTimeStamp = Math.floor(Date.now() / 1000);
          const timerEndTimeStamp = currentRound.startTimestamp;
          let timerEndDate = new Date();
          timerEndDate.setSeconds(timerEndDate.getSeconds() + (timerEndTimeStamp - currentTimeStamp));
          gameState.currentTimerEndDateTime = timerEndDate;
        }

        if (gameState.state == RoundState.BlindBettingStarted
          || gameState.state == RoundState.BlindBettingClosedAndHoleCardsRevealed
          || gameState.state == RoundState.BlindBettingClosedAndHoleCardsNotRevealed
          || gameState.state == RoundState.BettingStoppedCommunityCardsNotRevealed) {
          setShowModal(false);
        }

        setGameState(gameState);
        const currentTimeStamp = Math.floor(Date.now() / 1000);
        if (currentTimeStamp > gameState.resultShowTimeStamp && (gameState.state == RoundState.BettingStoppedCommunityCardsRevealedAndCalculatingResults
          || gameState.state == RoundState.ResultsDeclaredAndEnded
          || gameState.state == RoundState.Cancelled)) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      } catch (error) {
      }
    }
  };

  const { } = useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
    pollInterval: 500, // Refetch data every 5000 milliseconds (5 seconds)
    onCompleted: handleRoundData,
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Container>
      <Row className={styles.GameContainer} gutter={20}>
        <Col span={18}>
          <CommunityCards cards={gameState.communityCards} />
          <GameTimer timerMessage={gameState.currentMessage} timer={gameState.currentTimerEndDateTime} />
          <GameCards redCardsInput={gameState.participantA.cards}
            blueCardsInput={gameState.participantB.cards}
            redCardsTotalAmount={gameState.participantA.totalBetAmounts}
            redCardsNumberOfBets={gameState.participantA.totalNumberOfBets}
            blueCardsNumberOfBets={gameState.participantB.totalNumberOfBets}
            blueCardsTotalAmout={gameState.participantB.totalBetAmounts} />
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
              roundId={gameState?.roundNumber ?? 0}
              minimumAllowedBetAmount={gameState?.minimumAllowedBetAmount}
            />
          </Flex>
        </Col>
      </Row>

      <RecentBets />

      <Divider />
      <Button onClick={() => setShowModal(true)}>Open Success Modal</Button>

      {showModal && <BetwinModal gameState={gameState} open={showModal} setOpen={setShowModal} />}
    </Container>
  );
};

export default Game;
