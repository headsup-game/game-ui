"use client";

import React, { useState, useEffect } from "react";
import { ConfigProvider, Flex, Table, Typography, Switch, Pagination } from "antd";
import styles from "./Game.module.scss";
import { gql, useQuery } from "@apollo/client";
import { RoundPage } from "gql/graphql";
import { GET_CURRENT_ROUND_QUERY } from "graphQueries/getCurrentRound";
import { GameState, getGameStateFromRound } from "interfaces/gameState";
import { Card } from "interfaces/card";
import { useAccount } from "wagmi";
import { TOKEN_DECIMALS } from "utils/constants";
import { formatAmount } from "utils/formatter-ui";
import {
  normalize,
  isResolvedWinner,
  toBigInt,
  formatPL,
  getPLColor,
  calculatePLBreakdown,
  PLBreakdown,
} from "./recentBetsHelpers";
import { getDesktopColumns, getTabletColumns, getMobileColumns } from "./recentBetsColumns";

const { Title } = Typography;

const GET_USER_DATA = gql`
  query GetUserData($address: String!) {
    users(where: { account: $address }, limit: 1) {
      items {
        account
        totalPoints
        participantions {
          items {
            amount
            winningAmount
          }
        }
      }
    }
  }
`;

const GET_USER_PARTICIPANT_ROUNDS = gql`
  query GetUserParticipantRounds($userId: String!, $limit: Int!) {
    participants(
      where: { userId: $userId }
      orderBy: "timestamp"
      orderDirection: "desc"
      limit: $limit
    ) {
      items {
        roundId
        round {
          epoch
        }
      }
    }
  }
`;

const GET_TOTAL_ROUNDS_QUERY = gql`
  query GetTotalRounds($where: RoundFilter) {
    rounds(orderBy: "epoch", orderDirection: "desc", limit: 1, where: $where) {
      items {
        epoch
      }
    }
  }
`;

interface RoundDataRow {
  roundNumber: string;
  key: string;
  communityCards: Card[];
  punkCards: { cards: Card[] };
  apeCards: { cards: Card[] };
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
  breakdown?: PLBreakdown;
}

const RecentBets = React.memo(() => {
  const { isConnected, address } = useAccount();
  
  const [dataSource, setDataSource] = useState<RoundDataRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showOnlyMyBets, setShowOnlyMyBets] = useState(false);
  const [whereQuery, setWhereQuery] = useState<{ [key: string]: string }>({});

  // Fetch user data for total P/L
  const { data: userTotalsData } = useQuery(GET_USER_DATA, {
    variables: { address: address ?? "" },
    skip: !address,
    fetchPolicy: "cache-and-network",
    pollInterval: 12000,
  });

  const userTotals = userTotalsData?.users?.items?.[0];

  // Calculate total P/L from all participations
  const totalPLWei = userTotals?.participantions?.items
    ? userTotals.participantions.items.reduce((acc: bigint, participation: any) => {
        const winningAmount = participation.winningAmount != null
          ? toBigInt(participation.winningAmount)
          : BigInt(0);
        const betAmount = toBigInt(participation.amount);
        return acc + (winningAmount - betAmount);
      }, BigInt(0))
    : BigInt(0);
  
  const totalPLText = formatPL(totalPLWei);
  const totalPLSign = totalPLWei > BigInt(0) ? "+" : totalPLWei < BigInt(0) ? "-" : "";

  // Query to get user's participant round IDs when filtering
  const { data: participantRoundsData } = useQuery(GET_USER_PARTICIPANT_ROUNDS, {
    variables: { 
      userId: address ?? "", 
      limit: 1000
    },
    skip: !showOnlyMyBets || !address,
    fetchPolicy: "cache-and-network",
    pollInterval: 12000,
  });

  // Extract round IDs and epochs from participants, sorted by epoch descending
  const userRounds = participantRoundsData?.participants?.items
    ?.map((p: any) => ({
      roundId: p.roundId,
      epoch: p.round?.epoch ? BigInt(p.round.epoch) : BigInt(0),
    }))
    .sort((a: any, b: any) => {
      if (a.epoch > b.epoch) return -1;
      if (a.epoch < b.epoch) return 1;
      return 0;
    }) || [];

  const userRoundIds = userRounds.map((r: any) => r.roundId);

  // Build where query with round ID filter when showing only user bets
  const finalWhereQuery = showOnlyMyBets && userRoundIds.length > 0
    ? { ...whereQuery, id_in: userRoundIds }
    : whereQuery;

  // Transform round data into table rows
  const transformRoundData = (data: { rounds: RoundPage }): RoundDataRow[] => {
    const rows: RoundDataRow[] = [];
    
    for (const round of data.rounds.items) {
      try {
        const gameState: GameState = getGameStateFromRound(null, round, address);
        if (!gameState) continue;

        const ownBet = round.participants?.items.find((bet) => bet.userId == address) || null;
        
        // Calculate P/L
        let ownPLWei = BigInt(0);
        let ownPLText = "-";
        let breakdown: PLBreakdown | undefined;

        const winningAmount = ownBet && (ownBet as any)?.winningAmount != null 
          ? toBigInt((ownBet as any).winningAmount) 
          : null;

        if (winningAmount != null) {
          const betAmount = toBigInt(ownBet?.amount);
          ownPLWei = winningAmount - betAmount;
          const plFormatted = formatPL(ownPLWei);
          const plSign = ownPLWei > BigInt(0) ? "+" : ownPLWei < BigInt(0) ? "-" : "";
          ownPLText = plSign + plFormatted;
          breakdown = calculatePLBreakdown(ownBet);
        } else if (!ownBet) {
          ownPLText = "-";
        } else {
          ownPLText = "-";
          ownPLWei = BigInt(0);
        }

        rows.push({
          winner: gameState.roundWinnerMessageShort,
          roundNumber: round.epoch,
          key: round.epoch,
          communityCards: gameState.communityCards || [],
          punkCards: { cards: gameState.punksData.cards || [] },
          apeCards: { cards: gameState.apesData.cards || [] },
          totalApesBets: gameState.apesData.totalBetAmounts || "0.0",
          totalPunkBets: gameState.punksData.totalBetAmounts || "0.0",
          ownBets: ownBet
            ? {
                amount: formatAmount(ownBet.amount, TOKEN_DECIMALS, true) as string,
                position: ownBet.position,
                isWinner:
                  isResolvedWinner(round.winner) &&
                  normalize(ownBet.position) == normalize(round.winner),
              }
            : null,
          ownWonAmount: ownPLText,
          ownWonAmountValue:
            Number(formatAmount(ownPLWei < BigInt(0) ? -ownPLWei : ownPLWei, TOKEN_DECIMALS, true) as string) *
            (ownPLWei < BigInt(0) ? -1 : 1),
          breakdown,
        });
      } catch (error) {
        console.error("Error transforming round data:", error);
      }
    }
    
    return rows;
  };

  // Apollo query to fetch round data
  const { refetch } = useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
    variables: { 
      limit: itemsPerPage, 
      participant: address, 
      where: finalWhereQuery 
    },
    pollInterval: 12000,
    onCompleted: (data) => {
      const rows = transformRoundData(data);
      setDataSource(rows);
    },
    notifyOnNetworkStatusChange: true,
    skip: showOnlyMyBets && userRoundIds.length === 0 && !!address,
  });

  // Query to get total rounds count
  const { data: totalRoundsData } = useQuery<{ rounds: RoundPage }>(
    GET_TOTAL_ROUNDS_QUERY,
    {
      variables: {
        where: showOnlyMyBets && userRoundIds.length > 0
          ? { id_in: userRoundIds }
          : undefined,
      },
      pollInterval: 12000,
      skip: showOnlyMyBets && userRoundIds.length === 0,
    }
  );

  // Calculate total items based on filter state
  const totalItems = showOnlyMyBets
    ? userRoundIds.length
    : totalRoundsData?.rounds.items[0]?.epoch || 0;

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
    if (!showOnlyMyBets) {
      setWhereQuery({});
    } else if (showOnlyMyBets && userRoundIds.length > 0) {
      const pageRoundIds = userRoundIds.slice(0, itemsPerPage);
      setWhereQuery({ id_in: pageRoundIds });
    }
  }, [showOnlyMyBets, userRoundIds.length, itemsPerPage]);

  // Refetch when filter state or round IDs change
  useEffect(() => {
    if (!showOnlyMyBets || (showOnlyMyBets && userRoundIds.length > 0)) {
      refetch();
    }
  }, [showOnlyMyBets, userRoundIds.length, refetch, whereQuery]);

  // Handle page change
  const handlePageChange = (page: number, pageSize: number) => {
    if (showOnlyMyBets && userRoundIds.length > 0) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageRoundIds = userRoundIds.slice(startIndex, endIndex);
      setWhereQuery({ id_in: pageRoundIds });
    } else {
      const startEpoch = totalItems - (page - 1) * pageSize;
      const endEpoch = Math.max(startEpoch - pageSize, 1);
      setWhereQuery({
        epoch_lte: String(startEpoch + 1),
        epoch_gte: String(endEpoch),
      });
    }

    setCurrentPage(page);
    setItemsPerPage(pageSize);
    refetch();
  };

  return (
    <div>
      <Flex justify="space-between" align="center" wrap="wrap" gap={16} style={{ margin: "16px 0" }}>
        <Title level={5} className={styles.RecentBetsTitle} style={{ margin: 0 }}>
          Recent Rounds
        </Title>
        <Flex gap={24} align="center" wrap="wrap">
          <Flex 
            align="center" 
            gap={10}
            style={{
              padding: "8px 12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              border: "1px solid #e8e8e8",
            }}
          >
            <span style={{ fontSize: 13, color: "#6C6C89", fontWeight: 500 }}>
              Show only my bets
            </span>
            <Switch
              checked={showOnlyMyBets}
              onChange={setShowOnlyMyBets}
              size="default"
            />
          </Flex>
          <div
            style={{
              padding: "8px 16px",
              backgroundColor: totalPLWei > BigInt(0) 
                ? "#f0fdf4" 
                : totalPLWei < BigInt(0) 
                ? "#fef2f2" 
                : "#f5f5f5",
              borderRadius: "8px",
              border: `1px solid ${
                totalPLWei > BigInt(0)
                  ? "#dcfce7"
                  : totalPLWei < BigInt(0)
                  ? "#fee2e2"
                  : "#e8e8e8"
              }`,
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: getPLColor(totalPLWei),
                fontWeight: 600,
              }}
            >
              Total P/L: {totalPLSign}{totalPLText}
            </span>
          </div>
        </Flex>
      </Flex>

      <ConfigProvider>
        <div className="hidden lg:block">
          <Table
            dataSource={dataSource}
            columns={getDesktopColumns()}
            pagination={false}
            rowClassName={(record: any) =>
              record?.ownBets ? styles.OwnBetRow : ""
            }
          />
        </div>
        <div className="hidden md:block lg:hidden">
          <Table
            dataSource={dataSource}
            columns={getTabletColumns()}
            pagination={false}
            rowClassName={(record: any) =>
              record?.ownBets ? styles.OwnBetRow : ""
            }
          />
        </div>
        <div className="block md:hidden">
          <Table
            dataSource={dataSource}
            columns={getMobileColumns()}
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
