"use client";

import { Layout, Menu, MenuProps, Image, Button } from "antd";
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
			label: <Link href="/leaderboard">Leaderboard</Link>,
			className: styles.NavItem,
		},
		{
			key: "4",
			label: <Link href="/how-to-play">How to Play</Link>,
			className: styles.NavItem,
		},
	];

	function getSelectedNavigationLink() {
		if (!location) return ["1"];
		const path = location.pathname;
		if (path === "/") return ["1"];
		if (path === "/game") return ["2"];
		if (path === "/leaderboard") return ["3"];
		if (path === "/how-to-play") return ["4"];
		return ["1"];
	}

	return (
		<header className="flex justify-center items-center bg-[#141127]">
			<div className="flex justify-between items-center gap-[16px] px-4 py-2 max-w-[1400px] w-full bg-[#141127]">
				<Link href="/" className="flex justify-center items-center">
					<img
						src="/images/assets/logo.svg"
						alt="Poker Web3 Game"
						height={66}
						className="h-[66px] w-auto"
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
				{/* <ConnectButton
					chainStatus="full"
					showBalance={true}
					accountStatus="avatar"
				/> */}
				<ConnectButton.Custom>
					{({ account, chain, openConnectModal, openAccountModal }) => {
						if (!account) {
							return (
								<Button
									type="primary"
									size="large"
									onClick={openConnectModal}
									style={{
										background: "linear-gradient(90deg, #8E48FF 0%, #6F04FF 100%)",
										border: "none",
										borderRadius: "12px",
										height: "48px",
										fontSize: "18px"
									}}
								>
									Login
								</Button>
							);
						}

						return (
							<Button
								type="primary"
								size="large"
								onClick={openAccountModal}
								style={{
									background: "linear-gradient(90deg, #8E48FF 0%, #6F04FF 100%)",
									border: "none",
									borderRadius: "12px",
									height: "48px",
									fontSize: "16px",
									display: "flex",
									alignItems: "center",
									gap: "8px"
								}}
							>
								{chain?.iconUrl && <img src={chain.iconUrl} alt={chain?.name} width={20} height={20} />}
								{account.address.slice(0, 6)}...{account.address.slice(-4)}
							</Button>
						);
					}}
				</ConnectButton.Custom>
			</div>
		</header>
	);
};

export default Navigation;
