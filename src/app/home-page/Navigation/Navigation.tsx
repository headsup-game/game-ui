import { Layout, Menu, MenuProps, Image } from "antd";
import React from "react";
import styles from "./Navigation.module.scss";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "antd/es/layout/layout";

const Navigation = () => {
  const NavItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href="/home-page">Home</Link>,
      className: styles.NavItem,
    },
    {
      key: "2",
      label: <Link href="/game">Games</Link>,
      className: styles.NavItem,
    },
    {
      key: "3",
      label: <Link href="/leaderboard">Leaderboard</Link>,
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
        height={66}
        preview={false}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={NavItems}
        style={{ flex: 1, minWidth: 0 }}
        className={styles.Menu}
      />
      <ConnectButton chainStatus="full" showBalance={true} accountStatus="avatar" />
    </Header>
  );
};

export default Navigation;
