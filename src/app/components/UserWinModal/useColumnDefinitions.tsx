"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { Button, Flex, Typography } from "antd";
import { AlignType } from "rc-table/lib/interface";
import { Card } from "interfaces/card";
import CardSet from "@components/CardSet";
import { ClaimWinnings } from "@components/claimWinnings";
import { DataType } from "./dataType";

const { Text } = Typography;

export default function useColumnDefinitions() {
  const [desktopColumns, setDesktopColumns] = useState([
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
      title: "Winner Cards",
      align: "center" as AlignType,
      dataIndex: "wonCards",
      key: "wonCards",
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
      title: "Winner",
      align: "center" as AlignType,
      dataIndex: "winner",
      key: "winner",
      filters: [
        { text: "APES", value: "APES" },
        { text: "PUNKS", value: "PUNKS" },
        { text: "DRAW", value: "DRAW" },
      ],
      onFilter: (value: string, record: DataType) => record.winner === value,
      render: (winner: string) => <span>{winner}</span>,
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
      title: "Bet in ETH (Multiplier)",
      dataIndex: "bet",
      align: "center" as AlignType,
      key: "bet",
      sorter: (a: DataType, b: DataType) => {
        return (
          parseFloat(a.bet.points) - parseFloat(b.bet.points) ||
          parseFloat(a.bet.multiplier) - parseFloat(b.bet.multiplier)
        );
      },
      onFilter: (value: string, record: DataType) =>
        parseFloat(record.bet.points) < parseFloat(value),
      render: (bet: DataType["bet"]) =>
        bet?.points ? (
          <span>
            {ethers.formatEther(bet.points)} (x{bet.multiplier})
          </span>
        ) : (
          <span>No Bets</span>
        ),
    },
    {
      title: "Won in ETH",
      dataIndex: "ownWonAmount",
      align: "center" as AlignType,
      width: "10%",
      key: "ownWonAmount",
      filters: [
        { text: "Won", value: true },
        { text: "Lost", value: false },
      ],
      onFilter: (value: boolean, record: DataType) => record.isWinner === value,
      render: (ownWonAmount: string, record: DataType) =>
        record.isWinner ? (
          <span style={{ color: "green" }}>
            Won: {ethers.formatEther(ownWonAmount)}
          </span>
        ) : (
          <span style={{ color: "red" }}>Lost</span>
        ),
    },
    {
      title: "Claim",
      dataIndex: "roundNumber",
      align: "center" as AlignType,
      key: "claim",
      width: "10%",
      filters: [
        { text: "Claimed", value: "claimed" },
        { text: "Claim", value: "claim" },
        { text: "Unclaimable", value: "unclaimable" },
      ],
      onFilter: (value: string, record: DataType) =>
        value === "claimed"
          ? record.hasClaimed
          : value === "claim"
          ? record.isWinner
          : !record.isWinner,
      render: (roundNumber: string, round: DataType) => (
        <Button
          type="primary"
          onClick={() => {
            if (!round.isWinner && round.hasClaimed) return;
            ClaimWinnings({
              roundNumber: parseInt(roundNumber),
              onClaimWinningsStateChange: (state) => console.log(state),
            });
          }}
          disabled={round.hasClaimed || !round.isWinner}
        >
          {round.hasClaimed
            ? "Claimed"
            : round.isWinner
            ? "Claim"
            : "Unclaimable"}
        </Button>
      ),
    },
  ]);

  const [tabletColumns, setTabletColumns] = useState([
    {
      title: "Round#",
      width: "20%",
      align: "center" as AlignType,
      dataIndex: "roundNumber",
      key: "roundNumber",
      render: (roundNumber?: string) =>
        roundNumber ? <span>{roundNumber}</span> : <span>0</span>,
    },
    {
      title: "Game Info",
      align: "center" as AlignType,
      width: "50%",
      key: "gameInfo",
      onFilter: (value: string, record: DataType) => record.winner === value,
      render: (_: any, record: DataType) => (
        <Flex key={record.winner} vertical align="center" gap={8}>
          <Text style={{ color: "white" }}>Winner: {record.winner}</Text>
          <CardSet
            isSmall={true}
            numberOfCards={record.communityCards.length}
            cards={record.communityCards}
            cardWidth={40}
          />
          <Text style={{ color: "white" }}>
            Bet: {ethers.formatEther(record.bet.points)} (x
            {record.bet.multiplier})
          </Text>
        </Flex>
      ),
    },
    {
      title: "Actions",
      align: "center" as AlignType,
      width: "30%",
      key: "actions",
      filters: [
        { text: "Claimed", value: "claimed" },
        { text: "Claim", value: "claim" },
        { text: "Unclaimable", value: "unclaimable" },
      ],
      onFilter: (value: string, record: DataType) =>
        value === "claimed"
          ? record.hasClaimed
          : value === "claim"
          ? record.isWinner
          : !record.isWinner,
      render: (record: DataType) => (
        <Flex vertical align="center" gap={8}>
          <Text style={{ color: "white" }}>
            {record.isWinner ? (
              <span style={{ color: "green" }}>
                Won: {ethers.formatEther(record.ownWonAmount)}
              </span>
            ) : (
              <span style={{ color: "red" }}>Lost</span>
            )}
          </Text>
          <Button
            type="primary"
            onClick={() => {
              if (!record.isWinner && record.hasClaimed) return;
              ClaimWinnings({
                roundNumber: parseInt(record.roundNumber),
                onClaimWinningsStateChange: (state) => console.log(state),
              });
            }}
            disabled={record.hasClaimed || !record.isWinner}
          >
            {record.hasClaimed
              ? "Claimed"
              : record.isWinner
              ? "Claim"
              : "Unclaimable"}
          </Button>
        </Flex>
      ),
    },
  ]);
  const [mobileMediumColumns, setMobileMediumColumns] = useState([
    {
      title: "Game Info",
      align: "center" as AlignType,
      width: "50%",
      key: "gameInfo",
      onFilter: (value: string, record: DataType) => record.winner === value,
      render: (_: any, record: DataType) => (
        <Flex key={record.winner} vertical align="center" gap={8}>
          <Flex key={record.winner} align="center" gap={8}>
            <Text style={{ color: "#6C6C89" }}>#{record.roundNumber}</Text>
            <Text style={{ color: "white" }}>Winner: {record.winner}</Text>
          </Flex>
          <CardSet
            isSmall={true}
            numberOfCards={record.communityCards.length}
            cards={record.communityCards}
            cardWidth={40}
          />
          <Text style={{ color: "white" }}>
            Bet: {ethers.formatEther(record.bet.points)} (x
            {record.bet.multiplier})
          </Text>
        </Flex>
      ),
    },
    {
      title: "Actions",
      align: "center" as AlignType,
      width: "30%",
      key: "actions",
      filters: [
        { text: "Claimed", value: "claimed" },
        { text: "Claim", value: "claim" },
        { text: "Unclaimable", value: "unclaimable" },
      ],
      onFilter: (value: string, record: DataType) =>
        value === "claimed"
          ? record.hasClaimed
          : value === "claim"
          ? record.isWinner
          : !record.isWinner,
      render: (record: DataType) => (
        <Flex vertical align="center" gap={8}>
          <Text style={{ color: "white" }}>
            {record.isWinner ? (
              <span style={{ color: "green" }}>
                Won: {ethers.formatEther(record.ownWonAmount)}
              </span>
            ) : (
              <span style={{ color: "red" }}>Lost</span>
            )}
          </Text>
          <Button
            type="primary"
            onClick={() => {
              if (!record.isWinner && record.hasClaimed) return;
              ClaimWinnings({
                roundNumber: parseInt(record.roundNumber),
                onClaimWinningsStateChange: (state) => console.log(state),
              });
            }}
            disabled={record.hasClaimed || !record.isWinner}
          >
            {record.hasClaimed
              ? "Claimed"
              : record.isWinner
              ? "Claim"
              : "Unclaimable"}
          </Button>
        </Flex>
      ),
    },
  ]);
  const [mobileSmallColumns, setMobileSmallColumns] = useState([
    {
      title: "Game Info",
      align: "center" as AlignType,
      width: "50%",
      key: "gameInfo",
      filters: [
        { text: "Claimed", value: "claimed" },
        { text: "Claim", value: "claim" },
        { text: "Unclaimable", value: "unclaimable" },
      ],
      onFilter: (value: string, record: DataType) =>
        value === "claimed"
          ? record.hasClaimed
          : value === "claim"
          ? record.isWinner
          : !record.isWinner,
      render: (_: any, record: DataType) => (
        <Flex key={record.winner} vertical align="center" gap={8}>
          <Flex key={record.winner} align="center" gap={8}>
            <Text style={{ color: "#6C6C89" }}>#{record.roundNumber}</Text>
            <Text style={{ color: "white" }}>Winner: {record.winner}</Text>
          </Flex>
          <CardSet
            isSmall={true}
            numberOfCards={record.communityCards.length}
            cards={record.communityCards}
            cardWidth={40}
          />
          <Text style={{ color: "white" }}>
            Bet: {ethers.formatEther(record.bet.points)} (x
            {record.bet.multiplier})
          </Text>
          <Flex vertical align="center" gap={8}>
            <Text style={{ color: "white" }}>
              {record.isWinner ? (
                <span style={{ color: "green" }}>
                  Won: {ethers.formatEther(record.ownWonAmount)}
                </span>
              ) : (
                <span style={{ color: "red" }}>Lost</span>
              )}
            </Text>
            <Button
              type="primary"
              onClick={() => {
                if (!record.isWinner && record.hasClaimed) return;
                ClaimWinnings({
                  roundNumber: parseInt(record.roundNumber),
                  onClaimWinningsStateChange: (state) => console.log(state),
                });
              }}
              disabled={record.hasClaimed || !record.isWinner}
            >
              {record.hasClaimed
                ? "Claimed"
                : record.isWinner
                ? "Claim"
                : "Unclaimable"}
            </Button>
          </Flex>
        </Flex>
      ),
    },
  ]);

  return { desktopColumns, tabletColumns, mobileMediumColumns, mobileSmallColumns };
}
