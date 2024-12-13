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
import { useMotionValue, motion } from "framer-motion";
import { ColumnsType } from "antd/es/table";

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
    const { isConnected, address } = useAccount();

    const [dataSource, setDataSource] = useState<LeaderboardProps[]>([]);

    const [scope] = useState(useMotionValue(1));
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
      if (dataSource.length > 0) {
        setReveal(true);
      }
    }, [dataSource]);

    const staggerChildren = {
      animate: {
        transition: {
          delayChildren: 0.4,
          staggerChildren: 0.1,
        },
      },
    };

    const animation = {
      initial: {
        y: 20,
        opacity: 0,
      },
      animate: {
        y: 0,
        opacity: 1,
      },
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = useQuery(
      gql`
        query MyQuery {
          headsUps(limit: 1) {
            items {
              totalUsers
            }
          }
        }
      `,
      {
        fetchPolicy: "cache-and-network",
      }
    ).data?.headsUps.items[0].totalUsers;

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

    const [sortConfig, setSortConfig] = useState<{
      orderBy: "totalPoints" | "totalBetAmount";
      orderDirection: "asc" | "desc";
    }>({
      orderBy: "totalPoints",
      orderDirection: "desc",
    });

    const GET_LEADERBOARD_QUERY = gql`
      query MyQuery(
        $limit: Int!
        $where: UserFilter
        $orderBy: String!
        $orderDirection: String!
      ) {
        users(
          orderBy: $orderBy
          orderDirection: $orderDirection
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
          orderBy: sortConfig.orderBy,
          orderDirection: sortConfig.orderDirection,
          limit: pageSize,
          where: query,
        },
      });
      handleLeaderboardData(data);
    };

    const handleSortConfig = (orderBy: typeof sortConfig.orderBy) => {
      setSortConfig((prevSortConfig) => ({
        orderBy,
        orderDirection:
          prevSortConfig.orderBy === orderBy && prevSortConfig.orderDirection === "desc"
            ? "asc"
            : "desc",
      }));
    };

    const [columns, setColumns] = useState<ColumnsType>([
      {
        title: "Rank",
        align: "center" as AlignType,
        dataIndex: "rank",
        key: "rank",
        render: (rank?: number) => (
          <motion.span {...animation}>{rank}</motion.span>
        ),
      },
      {
        title: "Address",
        width: "5",
        align: "center" as AlignType,
        dataIndex: "address",
        key: "address",
        render: (address?: string) =>
          address ? (
            <motion.div {...animation}>
              <ENSName address={ethers.formatEther(address) as `0x${string}`} />
            </motion.div>
          ) : (
            <motion.span {...animation}>0x000...0000</motion.span>
          ),
      },
      {
        title: "Total Points",
        align: "center" as AlignType,
        dataIndex: "points",
        key: "points",
        sorter: true,
        sortOrder:
          sortConfig.orderBy === "totalPoints"
            ? sortConfig.orderDirection === "desc"
              ? "descend"
              : "ascend"
            : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            handleSortConfig("totalPoints");
          },
        }),
        render: (points?: string) =>
          points ? (
            <motion.span {...animation}>
              {ethers.formatEther(points)}
            </motion.span>
          ) : (
            <motion.span {...animation}>0</motion.span>
          ),
      },
      {
        title: "Total Bets",
        align: "center" as AlignType,
        dataIndex: "totalBets",
        key: "totalBets",
        sorter: true,
        sortOrder:
          sortConfig.orderBy === "totalBetAmount"
            ? sortConfig.orderDirection === "desc"
              ? "descend"
              : "ascend"
            : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            handleSortConfig("totalBetAmount");
          },
        }),
        render: (totalBets?: string) =>
          totalBets ? (
            <motion.span {...animation} style={{ textAlign: "right" }}>
              {ethers.formatEther(totalBets)} ETH
            </motion.span>
          ) : (
            <motion.span {...animation} style={{ textAlign: "right" }}>
              0.0 ETH
            </motion.span>
          ),
      },
    ]);
    const [mobileColumns, setMobileColumns] = useState<ColumnsType>([
      {
        title: "Rank",
        align: "center" as AlignType,
        dataIndex: "rank",
        key: "rank",
        render: (rank?: number) => (
          <motion.span {...animation}>{rank}</motion.span>
        ),
      },
      {
        title: "Address",
        align: "center" as AlignType,
        dataIndex: "points",
        key: "points",
        sorter: true,
        sortOrder:
          sortConfig.orderBy === "totalPoints"
            ? sortConfig.orderDirection === "desc"
              ? "descend"
              : "ascend"
            : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            handleSortConfig("totalPoints");
          },
        }),
        render: (_?: string, data?: any) => (
          <motion.div {...animation}>
            {data.address ? (
              <>
                <ENSName
                  address={ethers.formatEther(data.address) as `0x${string}`}
                />
                <div
                  style={{
                    fontSize: "12px",
                    color: data.address !== address ? "#6C6C89" : "#F9FAFB",
                  }}
                >
                  Points: {ethers.formatEther(data?.points) || "0"}
                </div>
              </>
            ) : (
              <span>0x000...0000</span>
            )}
          </motion.div>
        ),
      },
      {
        title: "Total Bets",
        align: "center" as AlignType,
        dataIndex: "totalBets",
        key: "totalBets",
        sorter: true,
        sortOrder:
          sortConfig.orderBy === "totalBetAmount"
            ? sortConfig.orderDirection === "desc"
              ? "descend"
              : "ascend"
            : undefined,
        onHeaderCell: () => ({
          onClick: () => {
            handleSortConfig("totalBetAmount");
          },
        }),
        render: (totalBets?: string) => (
          <motion.span {...animation} style={{ textAlign: "right" }}>
            {ethers.formatEther(totalBets || "0.0")} ETH
          </motion.span>
        ),
      },
    ]);

    useEffect(() => {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.key === "points" || column.key === "totalBets") {
            return {
              ...column,
              sortOrder:
                sortConfig.orderBy === (column.key === "points" ? "totalPoints" : "totalBetAmount")
                  ? sortConfig.orderDirection === "desc"
                    ? "descend"
                    : "ascend"
                  : undefined,
            };
          }
          return column;
        })
      );

      setMobileColumns((prevColumns) =>
        prevColumns.map((column) => {
          if (column.key === "points" || column.key === "totalBets") {
            return {
              ...column,
              sortOrder:
                sortConfig.orderBy === (column.key === "points" ? "totalPoints" : "totalBetAmount")
                  ? sortConfig.orderDirection === "desc"
                    ? "descend"
                    : "ascend"
                  : undefined,
            };
          }
          return column;
        })
      );

      fetchData();
    }, [sortConfig]);

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
            totalPoints_lt: dataSource[dataSource.length - 1].points,
          });
        }
      }
    };

    return (
      <Container className="min-h-screen">
        <Title level={5} className="text-[white_!important] text-center my-4">
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
              rowClassName={(record) =>
                record.address?.toLowerCase() === address?.toLowerCase()
                  ? styles.highlightedRow
                  : ""
              }
            />
          </div>
          <div className="block md:hidden">
            <Table
              dataSource={dataSource}
              columns={mobileColumns}
              pagination={false}
              rowClassName={(record) =>
                record.address?.toLowerCase() === address?.toLowerCase()
                  ? styles.highlightedRow
                  : ""
              }
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
