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
import { formatUnits, parseUnits } from "viem";
import { AlignType } from "rc-table/lib/interface";
import { TOKEN_DECIMALS } from "utils/constants";

const { Title } = Typography;

const GET_USER_DATA = gql`
  query GetUserData($address: String!) {
    users(where: { account: $address }, limit: 1) {
      items {
        account
        totalPoints
        totalWonAmount
        totalBetAmount
      }
    }
  }
`;

const RecentBets = React.memo(() => {
  const normalize = (v?: string) => (v || "").toUpperCase();
  const isResolvedWinner = (w?: string) => {
    const W = normalize(w);
    return W === "APES" || W === "PUNKS";
  };
  const toWei = (amount?: string) => {
    try {
      return parseUnits((amount || "0").toString(), TOKEN_DECIMALS);
    } catch {
      return BigInt(0);
    }
  };
  const toBigInt = (val: unknown) => {
    try {
      if (typeof val === "bigint") return val;
      if (typeof val === "string") return BigInt(val);
      if (typeof val === "number") return BigInt(val);
      return BigInt(val as any);
    } catch {
      return BigInt(0);
    }
  };
  const formatPL = (wei: bigint) => {
    const sign = wei > BigInt(0) ? "+" : wei < BigInt(0) ? "-" : "";
    const abs = wei < BigInt(0) ? -wei : wei;
    const tokenAmount = Number(formatUnits(abs, TOKEN_DECIMALS));
    return `${sign}${tokenAmount.toFixed(4)}`;
  };

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
      render: (
        bet: {
          amount: string;
          position: string;
          isWinner: boolean;
        },
        record: any
      ) =>
        bet ? (
          <span
            style={{
              color: isResolvedWinner(record.winner)
                ? bet.isWinner
                  ? "#22c55e"
                  : "#ef4444"
                : undefined,
              fontWeight: isResolvedWinner(record.winner) ? 600 : 400,
            }}
          >
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
      render: (_: string, record: any) => (
        <span
          style={{
            color:
              record.ownWonAmountValue > 0
                ? "#22c55e"
                : record.ownWonAmountValue < 0
                ? "#ef4444"
                : "#6C6C89",
            fontWeight: record.ownWonAmountValue !== 0 ? 700 : 400,
          }}
        >
          {record.ownWonAmount}
        </span>
      ),
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
      ownBets: {
        amount: string;
        position: string;
        isWinner: boolean;
      } | null;
      totalPunkBets: string;
      totalApesBets: string;
      winner: string;
      ownWonAmount: string;
      // new: numeric value for coloring/sorting
      ownWonAmountValue?: number;
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
      ownWonAmountValue?: number;
    }[]
  >([]);

  const { data: userTotalsData } = useQuery(GET_USER_DATA, {
    variables: { address: address ?? "" },
    skip: !address,
    fetchPolicy: "cache-and-network",
    pollInterval: 12000,
  });

  const userTotals = userTotalsData?.users?.items?.[0];
  const totalPLWei = userTotals
    ? toBigInt(userTotals.totalWonAmount) - toBigInt(userTotals.totalBetAmount)
    : BigInt(0);
  const totalPLText = formatPL(totalPLWei);

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
      ownWonAmountValue?: number;
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

        // compute P/L
        let ownPLWei = BigInt(0);
        let ownPLText = "0.0000";

        // Use per-participation winningAmount from subgraph only
        const ownBetWinningAmount =
          ownBet && (ownBet as any)?.winningAmount != null
            ? toBigInt((ownBet as any).winningAmount)
            : null;

        if (ownBetWinningAmount != null) {
          // Net P/L = winningAmount - amount
          const userAmountWei = toBigInt(ownBet?.amount);
          ownPLWei = ownBetWinningAmount - userAmountWei;
          ownPLText = formatPL(ownPLWei);
        }
        // COMMENTED OUT: Client-side fallback calculation (use subgraph winningAmount only)
        // else if (
        //   ownBet &&
        //   isResolvedWinner(gameState.roundWinnerMessageShort)
        // ) {
        //   const userAmountWei = toBigInt(ownBet.amount); // wei
        //   const winner = normalize(round.winner);
        //   const betOnApes = normalize(ownBet.position) === "APES";

        //   const apesPoolWei = toWei(totalApesBets);
        //   const punksPoolWei = toWei(totalPunksBets);

        //   const userWon = normalize(ownBet.position) === winner;

        //   if (userWon) {
        //     const winnerPoolWei = betOnApes ? apesPoolWei : punksPoolWei;
        //     const loserPoolWei = betOnApes ? punksPoolWei : apesPoolWei;

        //     // If rewardAmount is provided by the API, use it; otherwise distribute loser pool to winners (no-rake fallback).
        //     const rewardAmountWei = round.rewardAmount
        //       ? toBigInt(round.rewardAmount)
        //       : winnerPoolWei + loserPoolWei;

        //     // user reward share
        //     const userRewardWei =
        //       (rewardAmountWei * userAmountWei) /
        //       (winnerPoolWei === BigInt(0) ? BigInt(1) : winnerPoolWei);

        //     ownPLWei = userRewardWei - userAmountWei; // profit over stake
        //   } else {
        //     ownPLWei = -userAmountWei; // lost stake
        //   }

        //   ownPLText = formatPL(ownPLWei);
        // }
        else if (!ownBet) {
          ownPLText = "-";
        } else {
          // winningAmount not available yet (round not settled or indexer not updated)
          ownPLText = "-";
          ownPLWei = BigInt(0);
        }

        dataSource.push({
          winner: gameState.roundWinnerMessageShort,
          roundNumber: round.epoch,
          key: round.epoch,
          communityCards: communityCards,
          punkCards: punkCards,
          apeCards: apeCards,
          totalApesBets: totalApesBets,
          totalPunkBets: totalPunksBets,
          ownBets: ownBet
            ? {
                amount: formatUnits(ownBet.amount, TOKEN_DECIMALS),
                position: ownBet.position,
                isWinner:
                  isResolvedWinner(round.winner) &&
                  normalize(ownBet.position) == normalize(round.winner),
              }
            : null,
          ownWonAmount: ownPLText,
          ownWonAmountValue:
            Number(
              formatUnits(ownPLWei < BigInt(0) ? -ownPLWei : ownPLWei, TOKEN_DECIMALS)
            ) * (ownPLWei < BigInt(0) ? -1 : 1),
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
      ownWonAmountValue?: number;
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

        // compute P/L - use winningAmount from subgraph only
        let ownPLWei = BigInt(0);
        let ownPLText = "0.0000";

        const ownBetWinningAmount =
          ownBet && (ownBet as any)?.winningAmount != null
            ? toBigInt((ownBet as any).winningAmount)
            : null;

        if (ownBetWinningAmount != null) {
          const userAmountWei = toBigInt(ownBet?.amount);
          ownPLWei = ownBetWinningAmount - userAmountWei;
          ownPLText = formatPL(ownPLWei);
        }
        // COMMENTED OUT: Client-side fallback calculation (use subgraph winningAmount only)
        // else if (
        //   ownBet &&
        //   isResolvedWinner(gameState.roundWinnerMessageShort)
        // ) {
        //   const userAmountWei = toBigInt(ownBet.amount);
        //   const totalApesBets = gameState.apesData.totalBetAmounts || "0.0";
        //   const totalPunkBets = gameState.punksData.totalBetAmounts || "0.0";
        //   const apesPoolWei = toWei(totalApesBets);
        //   const punksPoolWei = toWei(totalPunkBets);

        //   const winner = normalize(round.winner);
        //   const betOnApes = normalize(ownBet.position) === "APES";
        //   const userWon = normalize(ownBet.position) === winner;

        //   if (userWon) {
        //     const winnerPoolWei = betOnApes ? apesPoolWei : punksPoolWei;
        //     const loserPoolWei = betOnApes ? punksPoolWei : apesPoolWei;

        //     const rewardAmountWei = round.rewardAmount
        //       ? toBigInt(round.rewardAmount)
        //       : winnerPoolWei + loserPoolWei;

        //     const userRewardWei =
        //       (rewardAmountWei * userAmountWei) /
        //       (winnerPoolWei === BigInt(0) ? BigInt(1) : winnerPoolWei);

        //     ownPLWei = userRewardWei - userAmountWei;
        //   } else {
        //     ownPLWei = -userAmountWei;
        //   }
        //   ownPLText = formatPL(ownPLWei);
        // }
        else if (!ownBet) {
          ownPLText = "-";
        } else {
          // winningAmount not available yet (round not settled or indexer not updated)
          ownPLText = "-";
          ownPLWei = BigInt(0);
        }

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
                amount: formatUnits(ownBet.amount, TOKEN_DECIMALS),
                position: ownBet.position,
              }
            : null,
          ownWonAmount: ownPLText,
          ownWonAmountValue:
            Number(
              formatUnits(ownPLWei < BigInt(0) ? -ownPLWei : ownPLWei, TOKEN_DECIMALS)
            ) * (ownPLWei < BigInt(0) ? -1 : 1),
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
  const { refetch } = useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
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
    const startEpoch = totalItems - (page - 1) * pageSize;
    const endEpoch = Math.max(startEpoch - pageSize, 1);

    setWhereQuery({
      epoch_lte: String(startEpoch + 1),
      epoch_gte: String(endEpoch),
    });

    setCurrentPage(page);
    setItemsPerPage(pageSize);
    refetch();
  }

  return (
    <div>
      <Flex justify="space-between" align="flex-start">
        <Title level={5} className={styles.RecentBetsTitle}>
          Recent Rounds
        </Title>
        <div style={{ fontSize: 12 }}>
          <span
            style={{
              color:
                totalPLWei > BigInt(0)
                  ? "#22c55e"
                  : totalPLWei < BigInt(0)
                  ? "#ef4444"
                  : "#6C6C89",
              fontWeight: 600,
            }}
          >
            Total P/L: {totalPLText}
          </span>
        </div>
      </Flex>

      <ConfigProvider>
        <div className="hidden lg:block">
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            rowClassName={(record: any) =>
              record?.ownBets ? styles.OwnBetRow : ""
            }
          />
        </div>
        <div className="hidden md:block lg:hidden">
          <Table
            dataSource={mobileDataSource}
            columns={mobileMediumColumns}
            pagination={false}
            rowClassName={(record: any) =>
              record?.ownBets ? styles.OwnBetRow : ""
            }
          />
        </div>
        <div className="block md:hidden">
          <Table
            dataSource={mobileDataSource}
            columns={mobileSmallColumns}
            pagination={false}
            rowClassName={(record: any) =>
              record?.ownBets ? styles.OwnBetRow : ""
            }
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
});

RecentBets.displayName = "RecentBets";

export default RecentBets;
