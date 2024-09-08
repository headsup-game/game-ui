"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Button, Col, Divider, Table, Flex, Row } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GET_POINTS_QUERY } from "graphQueries/getPoints";
import { useQuery } from "@apollo/client";
import { User } from "gql/graphql";

interface GetPointsQueryResult {
    users: {
        items: User[];
    };
}

const Leaderboard = () => {
    const [columns, setColumns] = useState([
        {
            title: "Account ID",
            dataIndex: "accountId",
            key: "accountId",
        },
        {
            title: "Total Points",
            dataIndex: "totalPoints",
            key: "totalPoints",
        }
    ]);

    const [dataSource, setDataSource] = useState<Array<{ key: string; accountId: string; totalPoints: number }>>([]);

    const { loading, error, data } = useQuery<GetPointsQueryResult>(GET_POINTS_QUERY, {
        variables: { limit: 10, participant: "" },
        notifyOnNetworkStatusChange: true,
    });


    useEffect(() => {
        if (data && data.users.items) {
            const tableData = data.users.items.map(user => ({
                key: user.id,
                accountId: user.account,
                totalPoints: user.totalPoints
            }));
            setDataSource(tableData);
        }
    }, [data]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Container>
    );
};

export default Leaderboard;
