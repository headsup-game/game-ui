"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Button, Col, Divider, Flex, Row, Typography } from "antd";
import Image from "next/image";
import BetForm from "app/game/BetForm";
import RecentBets from "app/game/RecentBets";
import CommunityCards from "app/game/CommunityCards";
import GameCards from "app/game/GameCards";
import { useCallback, useEffect, useState } from "react";
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
import { useTimer } from "react-timer-hook";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(
    getGameStateFromRound(null, null, undefined)
  );
  const [showModal, setShowModal] = useState(false);
  const [forcedCloseBetwinModal, setForcedCloseBetwinModal] = useState(true);
  const [showUserBetModal, setShowUserBetModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Players>(Players.None);
  const { isConnected, address } = useAccount();

  const handleRoundData = (data: { rounds: RoundPage }) => {
    if (data?.rounds?.items != null && data?.rounds.items.length == 2) {
      const currentRound = data.rounds.items[0];
      const previousRound = data.rounds.items[1];
      const currentRoundState: GameState = getGameStateFromRound(
        previousRound,
        currentRound,
        address
      );

      setGameState(currentRoundState);

      setShowModal(
        currentRoundState.state == RoundState.ResultsDeclaredAndEnded
      );
      setSelectedPlayer(
        currentRoundState.state == RoundState.ResultsDeclaredAndEnded
          ? Players.None
          : selectedPlayer
      );
    }
  };

  const handlePlayerSelection = useCallback((player: Players) => {
    setSelectedPlayer(player);
  }, []);

  const {} = useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
    variables: {
      limit: 2,
      participant: address != undefined ? { userId: address } : undefined,
    },
    pollInterval: 500, // Refetch data every 500 milliseconds (0.5 seconds)
    onCompleted: handleRoundData,
    notifyOnNetworkStatusChange: true,
  });

  const { totalSeconds: remainingSeconds, restart } = useTimer({
    expiryTimestamp: gameState.currentTimerEndDateTime,
    autoStart: true,
  });

  const [initialSeconds, setInitialSeconds] = useState(0);

  useEffect(() => {
    restart(gameState.currentTimerEndDateTime, true);
    if (remainingSeconds === 0) {
      setInitialSeconds(0);
      setForcedCloseBetwinModal(true);
    } else if (remainingSeconds > initialSeconds) {
      setInitialSeconds(remainingSeconds);
    }
  }, [remainingSeconds, gameState.currentTimerEndDateTime]);

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${
            initialSeconds
              ? ((initialSeconds - remainingSeconds) / initialSeconds) * 100
              : 0
          }%`,
        }}
        transition={{ duration: 1, ease: "linear" }}
        className="sticky top-0 h-[5px] z-10 shadow-[0_0_10px_#7047EB_,_0_0_20px_#fff] rounded-full"
        style={{
          background: "linear-gradient(90deg, #8B5CF6 0%, #6366F1 100%)",
        }}
      />

      <div className="flex flex-col justify-center items-center gap-[16px] px-4 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Flex justify="center" align="center" className={styles.GameHeader}>
            <GameTimer
              timerMessage={gameState.currentMessage}
              timer={remainingSeconds}
            />
          </Flex>
        </motion.div>

        <div className="grid lg:grid-flow-col place-items-center gap-4 lg:gap-0 w-full">
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CommunityCards cards={gameState.communityCards} />
            <GameCards
              redCardsInput={gameState.apesData.cards}
              blueCardsInput={gameState.punksData.cards}
              redCardsTotalAmount={gameState.apesData.totalBetAmounts}
              redCardsNumberOfBets={Number(
                gameState.apesData.totalNumberOfBets
              )}
              blueCardsNumberOfBets={Number(
                gameState.punksData.totalNumberOfBets
              )}
              blueCardsTotalAmout={gameState.punksData.totalBetAmounts}
              selectedPlayer={selectedPlayer}
              handlePlayerSelection={handlePlayerSelection}
              apesPayout={gameState.apesData.payoutMultiplier}
              punksPayout={gameState.punksData.payoutMultiplier}
              apesSelfBet={gameState.apesData.totalSelfBetAmount}
              punksSelfBet={gameState.punksData.totalSelfBetAmount}
            />
          </motion.div>

          <motion.div
            className="bg-[#141127] p-4 lg:max-w-[300px] rounded-[24px] flex justify-center items-center flex-wrap lg:flex-wrap sm:flex-nowrap gap-4 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src="/images/assets/realm-of-aces-card.png"
              alt="Realm of Aces"
              width={200}
              height={170}
              className="h-full w-full rounded-[24px]"
            />
            <BetForm
              roundId={Number(gameState?.roundNumber ?? 0)}
              minimumAllowedBetAmount={gameState?.minimumAllowedBetAmount}
              blindBetCloseTimestamp={gameState?.blindBetingCloseTimestamp ?? 0}
              bettingEndTimestamp={gameState?.bettingEndTimestamp ?? 0}
              selectedPlayer={selectedPlayer}
              handlePlayerSelection={handlePlayerSelection}
              gameState={gameState}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-full"
        >
          <RecentBets setShowUserBetModal={setShowUserBetModal} />
        </motion.div>

        <Divider />

        <BetwinModal
          gameState={gameState}
          open={
            showModal ? forcedCloseBetwinModal && initialSeconds > 0 : showModal
          }
          setOpen={setForcedCloseBetwinModal}
          timer={remainingSeconds}
        />

        <UserBetModal open={showUserBetModal} setOpen={setShowUserBetModal} />
      </div>
    </>
  );
};

export default Game;
