"use client";

import { ConfigProvider, Table, Typography } from "antd";
import Container from "app/components/Container/Container";
import styles from "./Game.module.css";

const { Title } = Typography;

const RecentBets = () => {
  const columns = [
    {
      title: "Winner",
      dataIndex: "name",
      key: "winner",
    },
    {
      title: "Total bet on red",
      dataIndex: "red",
      key: "red",
    },
    {
      title: "Total bet on blue",
      dataIndex: "blue",
      key: "blue",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "randy",
      red: 45,
      blue: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "GT",
      red: 89,
      blue: 42,
      address: "10 Downing Street",
    },
    {
      key: "3",
      name: "Mak",
      red: 89,
      blue: 42,
      address: "10 Downing Street",
    },
  ];
  return (
    <Container>
      <Title level={2} className={styles.RecentBetsTitle}>
        Recent Bets
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
          bordered
          pagination={false}
          columns={columns}
          dataSource={dataSource}
        />
      </ConfigProvider>
    </Container>
  );
};

export default RecentBets;
