"use client";

import React, { useState } from "react";
import { Button, ConfigProvider, Flex, Table, Typography } from "antd";
import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { gql, useQuery } from "@apollo/client";
import { RoundPage } from "gql/graphql";
import { GET_CURRENT_ROUND_QUERY } from "graphQueries/getCurrentRound";
import { GameState, getGameStateFromRound } from "interfaces/gameState";
import CardSet from "@components/CardSet";
import { Card } from "interfaces/card";
import { Pagination } from "antd";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { AlignType } from "rc-table/lib/interface";

const { Title } = Typography;

const RecentBets = React.memo(
  ({
    setShowUserBetModal,
  }: {
    setShowUserBetModal: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    // State for table columns and data source
    const [columns, setColumns] = useState([
      {
        title: "Round#",
        width: "5",
        align: "center" as AlignType,
        dataIndex: "roundNumber",
        key: "roundNumber",
        render: (roundNumber?: string) =>
          roundNumber ? <span>{roundNumber}</span> : <span>0</span>,
      },
      {
        title: "Apes",
        align: "center" as AlignType,
        dataIndex: "apeCards",
        key: "apeCards",
        render: (data: { cards: Card[]; bets: string }) =>
          Array.isArray(data.cards) ? (
            <>
              <CardSet
                isSmall={true}
                numberOfCards={data.cards.length}
                cards={data.cards}
                cardWidth={50}
              />
            </>
          ) : (
            <span>No Cards</span>
          ),
      },
      {
        title: "Apes Pool",
        align: "center" as AlignType,
        dataIndex: "totalApesBets",
        key: "totalApesBets",
        render: (totalBets?: string) =>
          totalBets ? (
            <span style={{ textAlign: "right" }}>{totalBets}</span>
          ) : (
            <span style={{ textAlign: "right" }}>0.0</span>
          ),
      },
      {
        title: "Punks",
        dataIndex: "punkCards",
        align: "center" as AlignType,
        key: "punkCards",
        render: (data: { cards: Card[]; bets: string }) =>
          Array.isArray(data.cards) ? (
            <>
              <CardSet
                isSmall={true}
                numberOfCards={data.cards.length}
                cards={data.cards}
                cardWidth={50}
              />
            </>
          ) : (
            <span>No Cards</span>
          ),
      },
      {
        title: "Punk Pool",
        align: "center" as AlignType,
        dataIndex: "totalPunkBets",
        key: "totalPunkBets",
        render: (totalBets?: string) =>
          totalBets ? <span>{totalBets}</span> : <span>0.0</span>,
      },
      {
        title: "Community Cards",
        align: "center" as AlignType,
        dataIndex: "communityCards",
        key: "communityCards",
        render: (cards: Card[]) =>
          Array.isArray(cards) ? (
            <CardSet
              isSmall={true}
              numberOfCards={cards.length}
              cards={cards}
              cardWidth={50}
            />
          ) : (
            <span>No Cards</span>
          ),
      },
      {
        title: "Winner",
        align: "center" as AlignType,
        dataIndex: "winner",
        key: "winner",
        render: (winner: string) => <span>{winner}</span>,
      },
      {
        title: "Own Bet",
        dataIndex: "ownBets",
        align: "center" as AlignType,
        key: "ownBets",
        render: (bet: {
          amount: string;
          position: string;
          isWinner: boolean;
        }) =>
          bet ? (
            <span>
              {bet.amount} on {bet.position}
            </span>
          ) : (
            <span>No Bets</span>
          ),
      },
      {
        title: "Own P/L",
        dataIndex: "ownWonAmount",
        align: "center" as AlignType,
        width: "10%",
        key: "ownWonAmount",
        render: (ownWonAmount: string) => <span>{ownWonAmount}</span>,
      },
    ]);

    const [mobileMediumColumns] = useState([
      {
        title: "#",
        width: "15%",
        align: "center" as AlignType,
        dataIndex: "roundNumber",
        key: "roundNumber",
        render: (roundNumber?: string) => roundNumber || "0",
      },
      {
        title: "Game",
        align: "center" as AlignType,
        width: "55%",
        key: "gameInfo",
        render: (_: any, record: any) => (
          <Flex vertical gap={16}>
            <Flex justify="space-between">
              <small>Apes: {record.totalApesBets}</small>
              <small>Punks: {record.totalPunkBets}</small>
            </Flex>
            <CardSet
              isSmall={true}
              numberOfCards={record.communityCards.length}
              cards={record.communityCards}
              cardWidth={30}
            />
            <small>Winner: {record.winner}</small>
          </Flex>
        ),
      },
      {
        title: "Your Bet",
        align: "center" as AlignType,
        width: "30%",
        key: "betInfo",
        render: (_: any, record: any) => (
          <Flex vertical>
            {record.ownBets ? (
              <>
                <small>{record.ownBets.amount}</small>
                <small>on {record.ownBets.position}</small>
                <small>{record.ownWonAmount}</small>
              </>
            ) : (
              <small>No Bet</small>
            )}
          </Flex>
        ),
      },
    ]);

    const [mobileSmallColumns] = useState([
      {
        title: "Game",
        align: "center" as AlignType,
        width: "55%",
        key: "gameInfo",
        render: (_: any, record: any) => (
          <Flex vertical gap={16}>
            <b style={{ color: "#6C6C89" }}>#{record.roundNumber}</b>
            <Flex justify="space-between">
              <small>Apes: {record.totalApesBets}</small>
              <small>Punks: {record.totalPunkBets}</small>
            </Flex>
            <CardSet
              isSmall={true}
              numberOfCards={record.communityCards.length}
              cards={record.communityCards}
              cardWidth={30}
            />
            <small>Winner: {record.winner}</small>
          </Flex>
        ),
      },
      {
        title: "Your Bet",
        align: "center" as AlignType,
        width: "30%",
        key: "betInfo",
        render: (_: any, record: any) => (
          <Flex vertical>
            {record.ownBets ? (
              <>
                <small>{record.ownBets.amount}</small>
                <small>on {record.ownBets.position}</small>
                <small>{record.ownWonAmount}</small>
              </>
            ) : (
              <small>No Bet</small>
            )}
          </Flex>
        ),
      },
    ]);

    const { isConnected, address } = useAccount();

    const [dataSource, setDataSource] = useState<
      {
        roundNumber: string;
        key: string;
        communityCards: Card[];
        punkCards: { cards: Card[]; bets: string };
        apeCards: { cards: Card[]; bets: string };
        // amounts: { totalPunksBets: string; totalApesBets: string };
        ownBets: {
          amount: string;
          position: string;
          isWinner: boolean;
        } | null;
        totalPunkBets: string;
        totalApesBets: string;
        winner: string;
        ownWonAmount: string;
      }[]
    >([]);
    const [mobileDataSource, setMobileDataSource] = useState<
      {
        roundNumber: string;
        key: string;
        communityCards: Card[];
        totalApesBets: string;
        totalPunkBets: string;
        winner: string;
        ownBets: { amount: string; position: string } | null;
        ownWonAmount: string;
      }[]
    >([]);

    // Function to handle data from the query
    const handleRoundData = (data: { rounds: RoundPage }) => {
      const dataSource: {
        roundNumber: string;
        key: string;
        communityCards: Card[];
        punkCards: { cards: Card[]; bets: string };
        apeCards: { cards: Card[]; bets: string };
        ownBets: {
          amount: string;
          position: string;
          isWinner: boolean;
        } | null;
        totalPunkBets: string;
        totalApesBets: string;
        winner: string;
        ownWonAmount: string;
      }[] = [];

      for (const round of data.rounds.items) {
        try {
          const gameState: GameState = getGameStateFromRound(
            null,
            round,
            address
          );

          if (!gameState) {
            return;
          }

          // Define the total bet amounts for both participants
          const totalPunksBets = gameState.punksData.totalBetAmounts || "0.0";
          const totalApesBets = gameState.apesData.totalBetAmounts || "0.0";

          const communityCards = gameState.communityCards || [];
          const apeCards = {
            cards: gameState.apesData.cards || [],
            bets: totalApesBets || "0.0.",
          };
          const punkCards = {
            cards: gameState.punksData.cards || [],
            bets: totalPunksBets || "0.0.",
          };

          // Extract user's own bet information
          const ownBet =
            round.participants?.items.find((bet) => bet.userId == address) ||
            null;

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
            ownWonAmount: "0.0",
          });
        } catch (error) {
          console.error("Error handling round data:", error);
        }
      }
      // Ensure data matches expected structure
      setDataSource(dataSource);

      const mobileDataSource: {
        roundNumber: string;
        key: string;
        communityCards: Card[];
        totalApesBets: string;
        totalPunkBets: string;
        winner: string;
        ownBets: { amount: string; position: string } | null;
        ownWonAmount: string;
      }[] = [];

      for (const round of data.rounds.items) {
        try {
          const gameState: GameState = getGameStateFromRound(
            null,
            round,
            address
          );
          if (!gameState) continue;

          // Get user's bet information
          const ownBet =
            round.participants?.items.find((bet) => bet.userId == address) ||
            null;

          // Add mobile data
          mobileDataSource.push({
            roundNumber: round.epoch,
            key: round.epoch,
            communityCards: gameState.communityCards || [],
            totalApesBets: gameState.apesData.totalBetAmounts || "0.0",
            totalPunkBets: gameState.punksData.totalBetAmounts || "0.0",
            winner: gameState.roundWinnerMessageShort,
            ownBets: ownBet
              ? {
                  amount: ethers.formatEther(ownBet.amount),
                  position: ownBet.position,
                }
              : null,
            ownWonAmount: "0.0",
          });
        } catch (error) {
          console.error("Error handling round data:", error);
        }
      }

      setMobileDataSource(mobileDataSource);
    };

    const [whereQuery, setWhereQuery] = useState<{ [key: string]: string }>({});

    // Apollo query to fetch round data
    useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
      variables: { limit: 10, participant: address, where: whereQuery },
      pollInterval: 12000, // Refetch data every 12000 milliseconds (12 seconds)
      onCompleted: handleRoundData,
      notifyOnNetworkStatusChange: true,
    });

    const totalItems =
      useQuery<{ rounds: RoundPage }>(
        gql`
          query GetTotalRounds {
            rounds(orderBy: "epoch", orderDirection: "desc", limit: 1) {
              items {
                epoch
              }
            }
          }
        `,
        { pollInterval: 12000 }
      ).data?.rounds.items[0].epoch || 0;
    const [currentPage, setCurrentPage] = useState(1);

    function handlePageChange(page: number) {
      const itemsPerPage = 10;
      const startEpoch = totalItems - (page - 1) * itemsPerPage;
      const endEpoch = Math.max(startEpoch - itemsPerPage, 1);

      setWhereQuery({
        epoch_lte: String(startEpoch + 1),
        epoch_gte: String(endEpoch),
      });

      setCurrentPage(page);
    }

    return (
      <div className="w-full">
        <Flex
          justify="space-between"
          align="flex-start"
        >
          <Title level={5} className={styles.RecentBetsTitle}>
            Recent Rounds
          </Title>
          <Flex gap={8}>
            <></>
            <Button
              type={"primary"}
              size="small"
              onClick={() => setShowUserBetModal(true)}
            >
              My Bets
            </Button>
          </Flex>
        </Flex>

        <ConfigProvider>
          <div className="hidden lg:block">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>
          <div className="hidden md:block lg:hidden">
            <Table
              dataSource={mobileDataSource}
              columns={mobileMediumColumns}
              pagination={false}
            />
          </div>
          <div className="block md:hidden">
            <Table
              dataSource={mobileDataSource}
              columns={mobileSmallColumns}
              pagination={false}
            />
          </div>
          <Pagination
            align="center"
            defaultCurrent={1}
            current={currentPage}
            total={totalItems}
            onChange={handlePageChange}
            style={{ margin: "16px 0" }}
          />
        </ConfigProvider>
      </div>
    );
  }
);

RecentBets.displayName = "RecentBets";

export default RecentBets;
