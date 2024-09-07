"use client";

import Container from "app/components/Container/Container";
import styles from "./Game.module.scss";
import { Button, Col, Divider, Table, Flex, Row } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GET_POINTS_QUERY } from "graphQueries/getPoints";
import { useQuery } from "@apollo/client";
import { User } from "gql/graphql";

const Leaderboard = () => {
    const [columns, setColumns] = useState([
        {
            title: "Community Cards",
            dataIndex: "communityCards",
            key: "communityCards",
            render: <span>No Cards</span>,
        }
    ]);
    const handleRoundData = (data: User) => {
        console.log(data);
    }
    const { } = useQuery<{ users: User }>(GET_POINTS_QUERY, {
        variables: { limit: 2, participant: "" },
        onCompleted: handleRoundData,
        notifyOnNetworkStatusChange: true,
    });


    const [dataSource, setDataSource] = useState<
        {
            key: string;
        }[]
    >([]);

    return (
        <Container>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Container>
    );
};

export default Leaderboard;
