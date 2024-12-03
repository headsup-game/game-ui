"use client";

import Container from "app/components/Container/Container";
import { ConfigProvider, Pagination, Table, Typography } from "antd";
import styles from "./Leaderboard.module.scss";
import React, { useEffect, useState } from "react";
import { AlignType } from "rc-table/lib/interface";
import { useAccount, useEnsName } from "wagmi";
import { gql, useQuery } from "@apollo/client";
import { ethers } from "ethers";
import { client } from "apolloClient";

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
		const [mobileColumns] = useState([
			{
				title: "Rank",
				align: "center" as AlignType,
				dataIndex: "rank",
				key: "rank",
				render: (rank?: number) => <span>{rank}</span>,
			},
			{
				title: "Address",
				align: "center" as AlignType,
				dataIndex: "address",
				key: "address",
				render: (address?: string) => (
					<div>
						{address ? (
							<>
								<ENSName address={address as `0x${string}`} />
								<div
									style={{
										fontSize: "12px",
										color: "#6C6C89",
									}}
								>
									Points:{" "}
									{dataSource.find(
										(item) => item.address === address
									)?.points || "0"}
								</div>
							</>
						) : (
							<span>0x000...0000</span>
						)}
					</div>
				),
			},
			{
				title: "Total Bets",
				align: "center" as AlignType,
				dataIndex: "totalBets",
				key: "totalBets",
				render: (totalBets?: string) => (
					<span style={{ textAlign: "right" }}>
						{totalBets || "0.0"}
					</span>
				),
			},
		]);

		const { isConnected, address } = useAccount();

		const [dataSource, setDataSource] = useState<LeaderboardProps[]>([]);
		const [currentPage, setCurrentPage] = useState(1);
		const [pageSize, setPageSize] = useState(10);
		const [totalItems, setTotalItems] = useState(2);

		const handleLeaderboardData = (data: {
			users: {
				items: {
					totalPoints: LeaderboardProps["points"];
					account: LeaderboardProps["address"];
					totalBetAmount: LeaderboardProps["totalBets"];
				}[];
			};
		}) => {
			const sortedData = data.users.items
				.map((item, index) => ({
					...item,
					rank: (currentPage - 1) * pageSize + index + 1,
				}))
				.map((item) => ({
					...item,
					address: item.account,
				}))
				.map((item) => ({
					...item,
					totalBets: item.totalBetAmount,
				}))
				.map((item) => ({
					...item,
					points: item.totalPoints,
				}));

			setDataSource(
				sortedData.map((item) => ({
					...item,
					key: item.rank.toString(),
				}))
			);
		};

		const GET_LEADERBOARD_QUERY = gql`
			query MyQuery($limit: Int!, $where: UserFilter) {
				users(
					orderBy: "totalPoints"
					orderDirection: "desc"
					limit: $limit
					where: $where
				) {
					items {
						totalPoints
						account
						totalBetAmount
					}
				}
			}
		`;

		const fetchData = async (query = {}) => {
			const { data } = await client.query({
				query: GET_LEADERBOARD_QUERY,
				variables: {
					limit: pageSize,
					where: query,
				},
			});
			handleLeaderboardData(data);
		};

		useEffect(() => {
			fetchData();
		}, []);

		const handlePageChange = (page: number, pageSize?: number) => {
			setCurrentPage(page);
			if (pageSize) {
				setPageSize(pageSize);
				if (currentPage > page) {
					fetchData({
						totalPoints_gt: dataSource[0].points,
					});
				} else {
					fetchData({
						totalPoints_lt:
							dataSource[dataSource.length - 1].points,
					});
				}
			}
		};

		return (
			<Container className="min-h-screen">
				<Title
					level={5}
					className="text-[white_!important] text-center my-4"
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
							Pagination: {
								itemBg: "#141127",
								colorIcon: "#F9FAFB",
								colorText: "#F9FAFB",
							},
						},
					}}
				>
					<div className="hidden md:block">
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={false}
						/>
					</div>
					<div className="block md:hidden">
						<Table
							dataSource={dataSource}
							columns={mobileColumns}
							pagination={false}
						/>
					</div>
					<Pagination
						align="center"
						current={currentPage}
						pageSize={pageSize}
						total={totalItems}
						onChange={handlePageChange}
						style={{ margin: "16px" }}
					/>
				</ConfigProvider>
			</Container>
		);
	})
);

Leaderboard.displayName = "Leaderboard";
export default Leaderboard;
