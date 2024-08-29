"use client";

import React, { useState } from "react";
import { ConfigProvider, Table, Typography } from "antd";
import Container from "app/components/Container/Container";
import styles from "./Game.module.css";
import { useQuery } from "@apollo/client";
import { RoundPage } from "gql/graphql";
import { GET_CURRENT_ROUND_QUERY } from "graphQueries/getCurrentRound";
import { GameState, getGameStateFromRound } from "interfaces/gameState";
import CardSet from "@components/CardSet";
import { Card } from "interfaces/card";
import { Pagination } from "antd";
import { useAccount } from "wagmi";
import { ethers } from 'ethers'

const { Title } = Typography;

const RecentBets = () => {
  // State for table columns and data source
  const [columns, setColumns] = useState([
    {
      title: "Community Cards",
      dataIndex: "communityCards",
      key: "communityCards",
      render: (cards: Card[]) =>
        Array.isArray(cards) ? (
          <CardSet numberOfCards={cards.length} cards={cards} />
        ) : (
          <span>No Cards</span>
        ),
    },
    {
      title: "Ape Cards",
      dataIndex: "apeCards",
      key: "apeCards",
      render: (cards: Card[]) =>
        Array.isArray(cards) ? (
          <CardSet numberOfCards={cards.length} cards={cards} />
        ) : (
          <span>No Cards</span>
        ),
    },
    {
      title: "Punks Cards",
      dataIndex: "punkCards",
      key: "punkCards",
      render: (cards: Card[]) =>
        Array.isArray(cards) ? (
          <CardSet numberOfCards={cards.length} cards={cards} />
        ) : (
          <span>No Cards</span>
        ),
    },
    {
      title: "Amounts",
      dataIndex: "amounts",
      key: "amounts",
      render: (amounts: { totalPunksBets: string; totalApesBets: string }) => (
        <div>
          <div>Total Punks Bets: {amounts.totalPunksBets}</div>
          <div>Total Apes Bets: {amounts.totalApesBets}</div>
        </div>
      ),
    },
    {
      title: "Own Bets",
      dataIndex: "ownBets",
      key: "ownBets",
      render: (bet: { amount: string; position: string; isWinner: boolean }) =>
        bet ? (
          <span>
            {bet.amount} ({bet.position}){" "}
            {bet.isWinner ? <strong>Won</strong> : <strong>Lost</strong>}
          </span>
        ) : (
          <span>No Bets</span>
        ),
    },
  ]);

  const { isConnected, address } = useAccount();

  const [dataSource, setDataSource] = useState<
    {
      key: string;
      communityCards: Card[];
      punkCards: Card[];
      apeCards: Card[];
      amounts: { totalPunksBets: string; totalApesBets: string };
      ownBets: { amount: string; position: string; isWinner: boolean } | null;
    }[]
  >([]);

  // Function to handle data from the query
  const handleRoundData = (data: { rounds: RoundPage }) => {
    const dataSource: {
      key: string;
      communityCards: Card[];
      punkCards: Card[];
      apeCards: Card[];
      amounts: { totalPunksBets: string; totalApesBets: string };
      ownBets: { amount: string; position: string; isWinner: boolean } | null;
    }[] = [];

    for (const round of data.rounds.items.slice(1)) {
      try {
        const gameState: GameState = getGameStateFromRound(round);

        if (!gameState) {
          console.error("Failed to parse game state");
          return;
        }

        const communityCards = gameState.communityCards || [];
        const apeCards = gameState.participantA.cards || [];
        const punkCards = gameState.participantB.cards || [];

        // Define the total bet amounts for both participants
        const totalPunksBets = gameState.participantB.totalBetAmounts || "0.0";
        const totalApesBets = gameState.participantA.totalBetAmounts || "0.0";

        // Extract user's own bet information
        const ownBet =
          round.participants?.items.find(
            (bet) => bet.position === "PUNKS" || bet.position === "APES"
          ) || null;

        dataSource.push({
          key: round.id,
          communityCards: communityCards,
          punkCards: punkCards,
          apeCards: apeCards,
          amounts: { totalPunksBets, totalApesBets },
          ownBets: ownBet
            ? {
              amount: ethers.formatEther(ownBet.amount),
              position: ownBet.position,
              isWinner: ownBet.isWinner,
            }
            : null,
        });
      } catch (error) {
        console.error("Error handling round data:", error);
      }
    }

    // Ensure data matches expected structure
    setDataSource(dataSource);
  };

  // Apollo query to fetch round data
  useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
    variables: { limit: 10, participant: address },
    pollInterval: 12000, // Refetch data every 12000 milliseconds (12 seconds)
    onCompleted: handleRoundData,
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Container>
      <Title level={2} className={styles.RecentBetsTitle}>
        Recent Bets
      </Title>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: "#a8a7af33",
              headerBg: "#141127",
              headerColor: "#6C6C89",
              borderRadius: 8,
              bodySortBg: "#141127",
              colorBgContainer: "#141127",
              colorText: "#F9FAFB",
            },
          },
        }}
      >
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Pagination align="center" defaultCurrent={1} total={50} />
      </ConfigProvider>
    </Container>
  );
};

export default RecentBets;
