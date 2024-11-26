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
import { Card, RoundPage } from "gql/graphql";
import { useAccount } from "wagmi";
import { GameState, getGameStateFromRound } from "interfaces/gameState";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_ROUND_QUERY } from "graphQueries/getCurrentRound";
import { ethers } from "ethers";
import { ClaimWinnings } from "@components/claimWinnings";
const { Text } = Typography;

export default function UserWinModal({
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
			title: "Winner",
			align: "center" as AlignType,
			dataIndex: "winner",
			key: "winner",
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
						{/* {bet.isWinner ? <strong>Won</strong> : <strong>Lost</strong>} */}
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
		{
			title: "Claim",
			dataIndex: "roundNumber",
			align: "center" as AlignType,
			key: "claim",
			width: "10%",
			render: (roundNumber: string) => (
				<Button
					type="primary"
					onClick={() => {
						// Claim the user's winnings
						ClaimWinnings({ roundNumber });
					}}
				>
					Claim
				</Button>
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

		for (const round of data.rounds.items.slice(1)) {
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
				const totalPunksBets =
					gameState.punksData.totalBetAmounts || "0.0";
				const totalApesBets =
					gameState.apesData.totalBetAmounts || "0.0";

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
					round.participants?.items.find(
						(bet) => bet.userId == address
					) || null;

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
	};

	// Apollo query to fetch round data
	useQuery<{ rounds: RoundPage }>(GET_CURRENT_ROUND_QUERY, {
		variables: { limit: 5, participant: address },
		pollInterval: 12000, // Refetch data every 12000 milliseconds (12 seconds)
		onCompleted: handleRoundData,
		notifyOnNetworkStatusChange: true,
	});

	return (
		<Modal
			open={open}
			centered
			title={null}
			footer={null}
			closable={true}
			closeIcon={<div className="text-white">x</div>}
			onCancel={() => setOpen(false)}
			className="w-[auto_!important]"
			styles={{
				content: {
					borderRadius: 24,
					border: "1px solid #312A5E",
					background: "#1F1C37",
					boxShadow: "0px 0px 97.6px 0px rgba(142, 72, 255, 0.30)",
					color: "#fff",
					padding: "40px 50px",
					width: "fit-content",
				},
				wrapper: {
					width: "auto",
				},
				body: {
					width: "auto",
				},
			}}
		>
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

				<Flex justify="center" className={styles.Title}>
					<Text
						style={{
							fontSize: "32px",
							fontWeight: "700",
							color: "white",
							textAlign: "center",
							paddingBottom: "32px",
						}}
					>
						User Winning
					</Text>
				</Flex>

				<Table
					className="w-fit"
					dataSource={dataSource}
					columns={columns}
					pagination={false}
				/>
				<Pagination
					align="center"
					defaultCurrent={1}
					total={50}
					style={{ paddingTop: "32px" }}
				/>
			</ConfigProvider>
		</Modal>
	);
}
