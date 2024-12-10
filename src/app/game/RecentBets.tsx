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
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Apollo query to fetch round data
    const  {refetch} = useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
      variables: { limit: itemsPerPage, participant: address, where: whereQuery },
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

    function handlePageChange(page: number, pageSize: number) {
      console.log('page', page, 'pageSize', pageSize);
      const startEpoch = totalItems - (page - 1) * itemsPerPage;
      const endEpoch = Math.max(startEpoch - itemsPerPage, 1);

      setWhereQuery({
        epoch_lte: String(startEpoch + 1),
        epoch_gte: String(endEpoch),
      });

      setCurrentPage(page);
      setItemsPerPage(pageSize);
      refetch();
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
          <Button
            type="primary"
            size="small"
            onClick={() => setShowUserBetModal(true)}
            style={{
              background: 'linear-gradient(90deg, #8B5CF6 0%, #6366F1 100%)',
              border: 'none',
              boxShadow: '0 4px 6px rgba(139, 92, 246, 0.25)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white"/>
              <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="white" strokeWidth="2"/>
            </svg>}
          >
            View My Bets
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
            pageSize={itemsPerPage}
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
