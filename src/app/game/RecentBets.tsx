"use client";

import React, { useState } from "react";
import { ConfigProvider, Table, Typography } from "antd";
import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { useQuery } from "@apollo/client";
import { Position, RoundPage } from "gql/graphql";
import { GET_CURRENT_ROUND_QUERY } from "graphQueries/getCurrentRound";
import { GameState, RoundWinner, getGameStateFromRound } from "interfaces/gameState";
import CardSet from "@components/CardSet";
import { Card } from "interfaces/card";
import { Pagination } from "antd";
import { useAccount } from "wagmi";
import { ethers } from 'ethers'
import { AlignType } from "rc-table/lib/interface";

const { Title, Text } = Typography;

const RecentBets = React.memo(React.forwardRef((props, ref) => {
  // State for table columns and data source
  const [columns, setColumns] = useState([
    {
      title: "Round No.",
      width: "10%",
      align: 'center' as AlignType,
      dataIndex: "roundNumber",
      key: "roundNumber",
      render: (roundNumber?: string) =>
        roundNumber ? (
          <span>{roundNumber}</span>
        ) : (
          <span>0</span>
        ),
    }, {
      title: "Apes",
      align: 'center' as AlignType,
      width: "5%",
      dataIndex: "apeCards",
      key: "apeCards",
      render: (data: { cards: Card[], bets: string }) =>
        Array.isArray(data.cards) ? (
          <><CardSet isSmall={true} numberOfCards={data.cards.length} cards={data.cards} /></>
        ) : (
          <span>No Cards</span>
        ),
    },
    {
      title: "Apes Pool",
      align: 'center' as AlignType,
      width: "10%",
      dataIndex: "totalApesBets",
      key: "totalApesBets",
      render: (totalBets?: string) =>
        totalBets ? (
          <span style={{ textAlign: 'right' }}>{totalBets}</span>
        ) : (
          <span style={{ textAlign: 'right' }}>0.0</span>
        ),
    }, {
      title: "Punks",
      dataIndex: "punkCards",
      align: 'center' as AlignType,
      width: "5%",
      key: "punkCards",
      render: (data: { cards: Card[], bets: string }) =>
        Array.isArray(data.cards) ? (
          <><CardSet isSmall={true} numberOfCards={data.cards.length} cards={data.cards} /></>
        ) : (
          <span>No Cards</span>
        ),
    },
    {
      title: "Punk Pool",
      align: 'center' as AlignType,
      width: "10%",
      dataIndex: "totalPunkBets",
      key: "totalPunkBets",
      render: (totalBets?: string) =>
        totalBets ? (
          <span>{totalBets}</span>
        ) : (
          <span>0.0</span>
        ),
    },
    {
      title: "Community Cards",
      width: "12.5%",
      align: 'center' as AlignType,
      dataIndex: "communityCards",
      key: "communityCards",
      render: (cards: Card[]) =>
        Array.isArray(cards) ? (
          <CardSet isSmall={true} numberOfCards={cards.length} cards={cards} />
        ) : (
          <span>No Cards</span>
        ),
    },
    {
      title: "Winner",
      width: "10%",
      align: 'center' as AlignType,
      dataIndex: "winner",
      key: "winner",
      render: (winner: string) => (<span>{winner}</span>)
    }, {
      title: "Own Bet",
      dataIndex: "ownBets",
      align: 'center' as AlignType,
      width: "15%",
      key: "ownBets",
      render: (bet: { amount: string; position: string; isWinner: boolean }) =>
        bet ? (
          <span>
            {bet.amount} on {bet.position}
            {/* {bet.isWinner ? <strong>Won</strong> : <strong>Lost</strong>} */}
          </span>
        ) : (
          <span>No Bets</span>
        ),
    }, {
      title: "Own P/L",
      dataIndex: "ownWonAmount",
      align: 'center' as AlignType,
      width: "10%",
      key: "ownWonAmount",
      render: (ownWonAmount: string) =>
      (
        <span>{ownWonAmount}</span>
      )
    },
  ]);

  const { isConnected, address } = useAccount();

  const [dataSource, setDataSource] = useState<
    {
      roundNumber: string;
      key: string;
      communityCards: Card[];
      punkCards: { cards: Card[], bets: string };
      apeCards: { cards: Card[], bets: string };
      // amounts: { totalPunksBets: string; totalApesBets: string };
      ownBets: { amount: string; position: string; isWinner: boolean } | null;
      totalPunkBets: string;
      totalApesBets: string;
      winner: string;
      ownWonAmount: string;
    }[]
  >([]);

  // Function to handle data from the query
  const handleRoundData = (data: { rounds: RoundPage }) => {
    const dataSource: {
      roundNumber: string;
      key: string;
      communityCards: Card[];
      punkCards: { cards: Card[], bets: string };
      apeCards: { cards: Card[], bets: string };
      ownBets: { amount: string; position: string; isWinner: boolean } | null;
      totalPunkBets: string,
      totalApesBets: string
      winner: string;
      ownWonAmount: string;
    }[] = [];

    for (const round of data.rounds.items.slice(1)) {
      try {
        const gameState: GameState = getGameStateFromRound(null, round, address);

        if (!gameState) {
          return;
        }

        // Define the total bet amounts for both participants
        const totalPunksBets = gameState.punksData.totalBetAmounts || "0.0";
        const totalApesBets = gameState.apesData.totalBetAmounts || "0.0";

        const communityCards = gameState.communityCards || [];
        const apeCards = { cards: gameState.apesData.cards || [], bets: totalApesBets || "0.0." };
        const punkCards = { cards: gameState.punksData.cards || [], bets: totalPunksBets || "0.0." };


        // Extract user's own bet information
        const ownBet = round.participants?.items.find((bet) => bet.userId == address) || null;

        dataSource.push({
          winner: gameState.roundWinnerMessageShort,
          roundNumber: round.epoch,
          key: round.epoch,
          communityCards: communityCards,
          punkCards: punkCards,
          apeCards: apeCards,
          totalApesBets: totalApesBets,
          totalPunkBets: totalPunksBets,
          // amounts: { totalPunksBets, totalApesBets },
          ownBets: ownBet
            ? {
              amount: ethers.formatEther(ownBet.amount),
              position: ownBet.position,
              isWinner: ownBet.position == round.winner,
            }
            : null,
          ownWonAmount: "0.0"
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
      <Title level={5} className={styles.RecentBetsTitle}>
        Recent Rounds
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
}));

RecentBets.displayName = 'RecentBets';

export default RecentBets;
