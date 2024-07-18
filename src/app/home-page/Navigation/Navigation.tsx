"use client";

import { Flex, Layout, Menu, MenuProps, Image } from "antd";
import React from "react";
import styles from "./Navigation.module.scss";
import Container from "app/components/Container/Container";

const { Header, Footer, Sider, Content } = Layout;

const Navigation = () => {
  const items1: MenuProps["items"] = [
    {
      key: "1",
      label: "Home",
      className: styles.NavItem,
    },
    {
      key: "2",
      label: "Games",
      className: styles.NavItem,
    },
    {
      key: "3",
      label: "Leaderboard",
      className: styles.NavItem,
    },
    {
      key: "4",
      label: "Quests",
      className: styles.NavItem,
    },
  ];

  return (
    <Header
      style={{ display: "flex", alignItems: "center", gap: 40 }}
      className={styles.Navigation}
    >
      <Image
        src="/images/assets/logo.svg"
        alt="Poker Web3 Game"
        width={55}
        height={43}
        preview={false}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
        className={styles.Menu}
      />
    </Header>
  );
};

export default Navigation;
