"use client";

import {
  Button,
  ConfigProvider,
  Flex,
  Modal,
  Pagination,
  Table,
  Typography,
} from "antd";
import styles from "./UserWinModal.module.scss";
import { useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import CardSet from "@components/CardSet";
import { RoundPage } from "gql/graphql";
import { Card, Color, Rank, Suit } from "interfaces/card";
import { useAccount } from "wagmi";
import { GameState, getGameStateFromRound } from "interfaces/gameState";
import { useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { ClaimWinnings } from "@components/claimWinnings";
import { GET_USER_WINNINGS_QUERY } from "graphQueries/getUserWinnings";
const { Text } = Typography;

type DataType = {
  roundNumber: string;
  key: string;
  communityCards: Card[];
  wonCards: { cards: Card[] };
  winner: string;
  ownWonAmount: string;
  hasClaimed: boolean;
  bet: {
    points: string;
    multiplier: string;
  };
  isWinner: boolean;
};

export default function UserBetModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
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
        { text: "Claimed", value: true },
        { text: "Not Claimed", value: false },
      ],
      onFilter: (value: boolean, record: DataType) =>
        record.hasClaimed === value,
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
              ClaimWinnings({
                roundNumber: parseInt(record.roundNumber),
                onClaimWinningsStateChange: (state) => console.log(state),
              });
            }}
          >
            Claim
          </Button>
        </Flex>
      ),
    },
  ]);
  const [mobileColumns, setMobileColumns] = useState([
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
        { text: "Claimed", value: true },
        { text: "Not Claimed", value: false },
      ],
      onFilter: (value: boolean, record: DataType) =>
        record.hasClaimed === value,
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
              ClaimWinnings({
                roundNumber: parseInt(record.roundNumber),
                onClaimWinningsStateChange: (state) => console.log(state),
              });
            }}
          >
            Claim
          </Button>
        </Flex>
      ),
    },
  ]);

  const { isConnected, address } = useAccount();

  const [dataSource, setDataSource] = useState<DataType[]>([]);

  function objectWithoutTypename(obj: any) {
    const { __typename, ...rest } = obj;
    return rest;
  }

  // Function to handle data from the query
  const handleRoundData = (data: any) => {
    const dataSource: DataType[] = [];

    const participations = data?.users?.items[0]?.participantions?.items || [];

    for (const participation of participations) {
      try {
        let round = participation.round;

        // Convert community cards to array format
        const communityCards = Object.values(
          objectWithoutTypename(round.communityCards)
        ).map((card: { rank: string; suit: string }) => ({
          rank: card.rank,
          suit: card.suit,
          color: Color.VIOLET,
        })) as Card[];

        // Convert apes cards to array format
        const apesCards = Object.values(
          objectWithoutTypename(round.apesCards)
        ).map((card: { rank: string; suit: string }) => ({
          rank: card.rank,
          suit: card.suit,
          color: Color.RED,
        })) as Card[];

        // Convert punks cards to array format
        const punksCards = Object.values(
          objectWithoutTypename(round.punksCards)
        ).map((card: { rank: string; suit: string }) => ({
          rank: card.rank,
          suit: card.suit,
          color: Color.RED,
        })) as Card[];

        const drawCards: Card[] = [
          {
            rank: Rank.None,
            suit: Suit.None,
            color: Color.VIOLET,
          },
          {
            rank: Rank.None,
            suit: Suit.None,
            color: Color.VIOLET,
          },
        ];

        dataSource.push({
          winner: round.winner,
          roundNumber: round.epoch,
          key: round.epoch,
          communityCards: communityCards,
          hasClaimed: participation.hasClaimed,
          wonCards: {
            cards:
              round.winner === "APES"
                ? apesCards
                : round.winner === "PUNKS"
                ? punksCards
                : drawCards,
          },
          ownWonAmount: participation.winningAmount,
          bet: {
            points: participation.isWinner
              ? participation.amount
              : -participation.amount,
            multiplier: participation.bettingMultiplier,
          },
          isWinner: participation.isWinner,
        });

        console.log("dataSource", dataSource);
      } catch (error) {
        console.error("Error handling round data:", error);
      }
    }

    setDataSource(dataSource);
  };

  // Apollo query to fetch round data
  useQuery<{ rounds: RoundPage }>(GET_USER_WINNINGS_QUERY, {
    variables: { address },
    onCompleted: handleRoundData,
    notifyOnNetworkStatusChange: true,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  // Calculate the current data to display based on pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const getCurrentPageData = dataSource.slice(startIndex, endIndex);

  return (
    <Modal
      open={open}
      centered
      title={null}
      footer={null}
      closable={true}
      closeIcon={<div className="text-white">x</div>}
      onCancel={() => setOpen(false)}
      className="w-[auto_!important] max-w-[100vw_!important] lg:p-[40px_50px_!important] p-[0_!important]"
      styles={{
        content: {
          borderRadius: 24,
          border: "1px solid #312A5E",
          background: "#1F1C37",
          boxShadow: "0px 0px 97.6px 0px rgba(142, 72, 255, 0.30)",
          color: "#fff",
        },
      }}
      wrapClassName="m-0"
      rootClassName="m-0"
    >
      <Flex justify="center" className={styles.Title}>
        <Text
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "white",
            textAlign: "center",
          }}
          className="pb-2 md:pb-4"
        >
          My Bets
        </Text>
      </Flex>

      <div className="hidden xl:block">
        <Table
          className="w-fit"
          dataSource={dataSource}
          columns={columns}
          pagination={
            {
              pageSize: pageSize,
              current: currentPage,
              total: dataSource.length,
              onChange: (page) => setCurrentPage(page),
            } as any
          }
        />
      </div>
      <div className="hidden md:block xl:hidden">
        <Table
          className="w-fit"
          dataSource={dataSource}
          columns={tabletColumns}
          pagination={
            {
              pageSize: pageSize,
              current: currentPage,
              total: dataSource.length,
              onChange: (page) => setCurrentPage(page),
            } as any
          }
        />
      </div>
      <div className="block md:hidden">
        <Table
          className="w-fit"
          dataSource={dataSource}
          columns={mobileColumns}
          pagination={
            {
              pageSize: pageSize,
              current: currentPage,
              total: dataSource.length,
              onChange: (page) => setCurrentPage(page),
            } as any
          }
        />
      </div>
    </Modal>
  );
}
