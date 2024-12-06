"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Button, Col, Divider, Flex, Row, Typography } from "antd";
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
import { useAccount } from "wagmi";
import UserBetModal from "app/components/UserWinModal/UserBetModal";

const { Title, Text } = Typography;

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(
    getGameStateFromRound(null, null, undefined)
  );
  const [showModal, setShowModal] = useState(false);
  const [showUserBetModal, setShowUserBetModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Players>(Players.None);
  const { isConnected, address } = useAccount();

  const handleRoundData = (data: { rounds: RoundPage }) => {
    if (data?.rounds?.items != null && data?.rounds.items.length == 2) {
      const currentRound = data.rounds.items[0];
      const previousRound = data.rounds.items[1];
      const currentRoundState: GameState = getGameStateFromRound(previousRound, currentRound, address);

      setGameState(currentRoundState);

      setShowModal(currentRoundState.state == RoundState.ResultsDeclaredAndEnded);
      setSelectedPlayer(currentRoundState.state == RoundState.ResultsDeclaredAndEnded ? Players.None : selectedPlayer)

    }
  };

  const handlePlayerSelection = useCallback((player: Players) => {
    setSelectedPlayer(player);
  }, []);

  const { } = useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
    variables: { limit: 2, participant: address != undefined ? { userId: address } : undefined },
    pollInterval: 500, // Refetch data every 5000 milliseconds (5 seconds)
    onCompleted: handleRoundData,
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Container>
      <Flex style={{ margin: '16px 0' }} justify="center" align="center" className={styles.GameHeader}>
        {/* <span className={styles.GameName}> */}
        {/*   Prize Pool: {gameState.totalAmountPool}ETH */}
        {/* </span> */}
        <GameTimer
          timerMessage={gameState.currentMessage}
          timer={gameState.currentTimerEndDateTime}
        />
        {/* <span className={styles.GameName}> */}
        {/*   Round No.: {Number(gameState.roundNumber)} */}
        {/* </span> */}
      </Flex>
      <div className="grid lg:grid-flow-col place-items-center" >
        <div className="flex flex-col gap-8">
          <CommunityCards cards={gameState.communityCards} />
          {/* <GameTimer */}
          {/*   timerMessage={gameState.currentMessage} */}
          {/*   timer={gameState.currentTimerEndDateTime} */}
          {/* /> */}
          <GameCards
            redCardsInput={gameState.apesData.cards}
            blueCardsInput={gameState.punksData.cards}
            redCardsTotalAmount={gameState.apesData.totalBetAmounts}
            redCardsNumberOfBets={Number(gameState.apesData.totalNumberOfBets)}
            blueCardsNumberOfBets={Number(gameState.punksData.totalNumberOfBets)}
            blueCardsTotalAmout={gameState.punksData.totalBetAmounts}
            selectedPlayer={selectedPlayer}
            handlePlayerSelection={handlePlayerSelection}
            apesPayout={gameState.apesData.payoutMultiplier}
            punksPayout={gameState.punksData.payoutMultiplier}
            apesSelfBet={gameState.apesData.totalSelfBetAmount}
            punksSelfBet={gameState.punksData.totalSelfBetAmount}
          />
          {/* <Divider /> */}
        </div>
        <Col span={6} className={styles.GameUserBetContainer}>
          <Flex className={styles.GameActionsContainer} vertical>
            <div style={{ position: "relative" }}>
              <Image
                src="/images/assets/realm-of-aces-card.png"
                alt="Realm of Aces"
                width={200}
                height={170}
                className={styles.GameCard}
              />
            </div>
            <BetForm
              roundId={Number(gameState?.roundNumber ?? 0)}
              minimumAllowedBetAmount={gameState?.minimumAllowedBetAmount}
              blindBetCloseTimestamp={gameState?.blindBetingCloseTimestamp ?? 0}
              bettingEndTimestamp={gameState?.bettingEndTimestamp ?? 0}
              selectedPlayer={selectedPlayer}
              handlePlayerSelection={handlePlayerSelection}
            />
          </Flex>
        </Col>
      </div>
      <RecentBets setShowUserBetModal={setShowUserBetModal} />
      <Divider />
      {showModal && !showUserBetModal && (
        <BetwinModal
          gameState={gameState}
          open={showModal}
          setOpen={setShowModal}
        />
      )}
      {showUserBetModal && (
        <UserBetModal open={showUserBetModal} setOpen={setShowUserBetModal} />
      )}
    </Container>
  );
};

export default Game;
