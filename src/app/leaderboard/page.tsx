"use client";

import Container from "app/components/Container/Container";
import { ConfigProvider, Pagination, Table, Typography } from "antd";
import styles from "./Leaderboard.module.scss";
import React, { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import { useAccount, useEnsName } from "wagmi";
import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";

const { Title, Text } = Typography;

function addressShortening(address: string) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function ENSName({ address }: { address: `0x${string}` }) {
	const { data: name } = useEnsName({ address });
	return <span>{addressShortening(name ?? address)}</span>;
}

type LeaderboardProps = {
	key: string;
	address: string;
	points: string;
	totalBets: string;
};

const Leaderboard = React.memo(
	React.forwardRef((props, ref) => {
		const [columns, setColumns] = useState([
			{
				title: "Rank",
				align: "center" as AlignType,
				dataIndex: "rank",
				key: "rank",
				render: (rank?: number) => <span>{rank}</span>,
			},
			{
				title: "Address",
				width: "5",
				align: "center" as AlignType,
				dataIndex: "address",
				key: "address",
				render: (address?: string) =>
					address ? (
						<ENSName address={address as `0x${string}`} />
					) : (
						<span>0x000...0000</span>
					),
			},
			{
				title: "Points",
				align: "center" as AlignType,
				dataIndex: "points",
				key: "points",
				render: (points?: string) =>
					points ? <span>{points}</span> : <span>0</span>,
			},
			{
				title: "Total Bets",
				align: "center" as AlignType,
				dataIndex: "totalBets",
				key: "totalBets",
				render: (totalBets?: string) =>
					totalBets ? (
						<span style={{ textAlign: "right" }}>{totalBets}</span>
					) : (
						<span style={{ textAlign: "right" }}>0.0</span>
					),
			},
		]);

		const { isConnected, address } = useAccount();

		const [dataSource, setDataSource] = useState<LeaderboardProps[]>([]);

		const handleLeaderboardData = (data: {
			leaderboard: LeaderboardProps[];
		}) => {
			const dummyData = Array.from({ length: 10 }, (_, i) => ({
				key: `${i}`,
				address: ethers.Wallet.createRandom().address,
				points: `${i * 100}`,
				totalBets: `${i * 1000}`,
			}));

			const sortedData = (
				data.leaderboard.length ? data.leaderboard : dummyData
			)
				.sort((a, b) => parseInt(b.points) - parseInt(a.points))
				.map((item, index) => ({ ...item, rank: index + 1 }));

			setDataSource(sortedData);
		};

		useEffect(() => {
			handleLeaderboardData({ leaderboard: [] });
		}, []);

		const GET_LEADERBOARD_QUERY = gql`
			query GetLeaderboard($limit: Int) {
				leaderboard(limit: $limit) {
					address
					points
					totalBets
				}
			}
		`;

		useQuery<{ leaderboard: LeaderboardProps[] }>(GET_LEADERBOARD_QUERY, {
			variables: { limit: 10 },
			pollInterval: 500, // Refetch data every 500 milliseconds (0.5 seconds)
			onCompleted: handleLeaderboardData,
			notifyOnNetworkStatusChange: true,
		});

		return (
			<Container className="min-h-screen">
				<Title
					level={5}
					className="text-[white_!important] text-center"
				>
					Leaderboard
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
					<Table
						dataSource={dataSource}
						columns={columns}
						pagination={false}
					/>
					<Pagination align="center" defaultCurrent={1} total={50} />
				</ConfigProvider>
			</Container>
		);
	})
);

Leaderboard.displayName = "Leaderboard";
export default Leaderboard;
