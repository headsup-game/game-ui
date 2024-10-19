"use client";

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
      label: <Link href="/">Home</Link>,
      className: styles.NavItem,
    },
    {
      key: "2",
      label: <Link href="/game">Games</Link>,
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

  function getSelectedNavigationLink() {
    if(!location) return ["1"];
    const path = location.pathname;
    if (path === "/") return ["1"];
    if (path === "/game") return ["2"];
    if (path === "/leaderboard") return ["3"];
    if (path === "/quests") return ["4"];
    return ["1"];
  }

  return (
    <Header
      style={{ display: "flex", alignItems: "center", gap: 40 }}
      className={styles.Navigation}
    >
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/images/assets/logo.svg"
          alt="Poker Web3 Game"
          height={66}
          preview={false}
        />
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={getSelectedNavigationLink()}
        items={NavItems}
        style={{ flex: 1, minWidth: 0 }}
        className={styles.Menu}
      />
      <ConnectButton chainStatus="full" showBalance={true} accountStatus="avatar" />
    </Header>
  );
};

export default Navigation;
