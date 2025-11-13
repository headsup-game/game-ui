import React from "react";
import { Tooltip, Flex } from "antd";
import { AlignType } from "rc-table/lib/interface";
import CardSet from "@components/CardSet";
import { Card } from "interfaces/card";
import { TOKEN_DECIMALS } from "utils/constants";
import { formatAmount } from "utils/formatter-ui";
import { PLBreakdownTooltip } from "./PLBreakdownTooltip";
import { isResolvedWinner } from "./recentBetsHelpers";

// Desktop columns
export const getDesktopColumns = () => [
  {
    title: "Round#",
    width: "5",
    align: "center" as AlignType,
    dataIndex: "roundNumber",
    key: "roundNumber",
    render: (roundNumber?: string) => <span>{roundNumber || "0"}</span>,
  },
  {
    title: "Apes",
    align: "center" as AlignType,
    dataIndex: "apeCards",
    key: "apeCards",
    render: (data: { cards: Card[] }) =>
      Array.isArray(data.cards) && data.cards.length > 0 ? (
        <CardSet
          isSmall={true}
          numberOfCards={data.cards.length}
          cards={data.cards}
          cardWidth={50}
        />
      ) : (
        <span>No Cards</span>
      ),
  },
  {
    title: "Apes Pool",
    align: "center" as AlignType,
    dataIndex: "totalApesBets",
    key: "totalApesBets",
    render: (totalBets?: string) => <span>{totalBets || "0.0"}</span>,
  },
  {
    title: "Punks",
    dataIndex: "punkCards",
    align: "center" as AlignType,
    key: "punkCards",
    render: (data: { cards: Card[] }) =>
      Array.isArray(data.cards) && data.cards.length > 0 ? (
        <CardSet
          isSmall={true}
          numberOfCards={data.cards.length}
          cards={data.cards}
          cardWidth={50}
        />
      ) : (
        <span>No Cards</span>
      ),
  },
  {
    title: "Punk Pool",
    align: "center" as AlignType,
    dataIndex: "totalPunkBets",
    key: "totalPunkBets",
    render: (totalBets?: string) => <span>{totalBets || "0.0"}</span>,
  },
  {
    title: "Community Cards",
    align: "center" as AlignType,
    dataIndex: "communityCards",
    key: "communityCards",
    render: (cards: Card[]) =>
      Array.isArray(cards) && cards.length > 0 ? (
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
    render: (bet: { amount: string; position: string; isWinner: boolean }, record: any) =>
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
    render: (_: string, record: any) => {
      const hasBreakdown = record.breakdown && record.breakdown.netWinningAmount != null;
      
      const plContent = (
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
      );

      if (hasBreakdown) {
        return (
          <Tooltip
            title={<PLBreakdownTooltip breakdown={record.breakdown} />}
            placement="left"
            overlayInnerStyle={{ padding: 0 }}
          >
            {plContent}
          </Tooltip>
        );
      }

      return plContent;
    },
  },
];

// Tablet columns
export const getTabletColumns = () => [
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
            <small
              style={{
                color:
                  record.ownWonAmountValue > 0
                    ? "#22c55e"
                    : record.ownWonAmountValue < 0
                    ? "#ef4444"
                    : "#6C6C89",
                fontWeight: record.ownWonAmountValue !== 0 ? 600 : 400,
              }}
            >
              {record.ownWonAmount}
            </small>
          </>
        ) : (
          <small>No Bet</small>
        )}
      </Flex>
    ),
  },
];

// Mobile columns
export const getMobileColumns = () => [
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
            <small
              style={{
                color:
                  record.ownWonAmountValue > 0
                    ? "#22c55e"
                    : record.ownWonAmountValue < 0
                    ? "#ef4444"
                    : "#6C6C89",
                fontWeight: record.ownWonAmountValue !== 0 ? 600 : 400,
              }}
            >
              {record.ownWonAmount}
            </small>
          </>
        ) : (
          <small>No Bet</small>
        )}
      </Flex>
    ),
  },
];

