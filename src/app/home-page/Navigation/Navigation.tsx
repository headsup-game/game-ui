"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "Home" },
		{ href: "/game", label: "Game" },
		{ href: "/leaderboard", label: "Leaderboard" },
		{ href: "/how-to-play", label: "How to Play" },
	];

	const activeLinkClasses = `relative text-white font-bold text-purple-400 transition-colors
		after:content-[''] after:absolute md:after:bottom-[-4px] after:bottom-[-2px] after:left-0 
		after:w-full after:h-[2px] after:bg-gradient-to-r 
		after:from-[#8E48FF] after:to-[#6F04FF]`;

	const inactiveLinkClasses = `text-white hover:text-purple-400 transition-colors
		relative after:content-[''] after:absolute md:after:bottom-[-4px] after:bottom-[-2px]
		after:left-0 after:w-0 after:h-[2px] after:transition-all 
		after:duration-300 hover:after:w-full after:bg-gradient-to-r 
		after:from-[#8E48FF] after:to-[#6F04FF]`;

	return (
		<header className="bg-[#141127] w-full">
			<div className="max-w-[1400px] mx-auto px-4 py-2">
				<div className="flex items-center justify-between">
					<Link href="/">
						<Image
							src="/images/assets/logo.svg"
							alt="Poker Web3 Game"
							height={66}
							width={200}
							className="h-[66px] w-auto"
						/>
					</Link>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden text-white p-2"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{isMenuOpen ? (
								<path d="M6 18L18 6M6 6l12 12" />
							) : (
								<path d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`text-white hover:text-purple-400 transition-colors ${
									pathname === item.href ? activeLinkClasses : inactiveLinkClasses
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Connect Button */}
					<div className="hidden md:block">
						<ConnectButton.Custom>
							{({ account, chain, openConnectModal, openAccountModal }) => {
								if (!account) {
									return (
										<button
											onClick={openConnectModal}
											className="bg-gradient-to-r from-[#8E48FF] to-[#6F04FF] text-white px-6 py-2 rounded-xl text-lg"
										>
											Login
										</button>
									);
								}

								return (
									<button
										onClick={openAccountModal}
										className="bg-gradient-to-r from-[#8E48FF] to-[#6F04FF] text-white px-4 py-2 rounded-xl text-base flex items-center gap-2"
									>
										{chain?.iconUrl && (
											<Image
												src={chain.iconUrl}
												alt={chain?.name || ""}
												width={20}
												height={20}
											/>
										)}
										{account.address.slice(0, 6)}...{account.address.slice(-4)}
									</button>
								);
							}}
						</ConnectButton.Custom>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="md:hidden pt-4 pb-2">
						<div className="flex flex-col gap-4">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className={`text-white hover:text-purple-400 transition-colors ${
										pathname === item.href ? activeLinkClasses : inactiveLinkClasses
									}`}
									onClick={() => setIsMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
							<div className="pt-4">
								<ConnectButton.Custom>
									{({ account, chain, openConnectModal, openAccountModal }) => {
										if (!account) {
											return (
												<button
													onClick={openConnectModal}
													className="w-full bg-gradient-to-r from-[#8E48FF] to-[#6F04FF] text-white px-6 py-2 rounded-xl text-lg"
												>
													Login
												</button>
											);
										}

										return (
											<button
												onClick={openAccountModal}
												className="w-full bg-gradient-to-r from-[#8E48FF] to-[#6F04FF] text-white px-4 py-2 rounded-xl text-base flex items-center gap-2 justify-center"
											>
												{chain?.iconUrl && (
													<Image
														src={chain.iconUrl}
														alt={chain?.name || ""}
														width={20}
														height={20}
													/>
												)}
												{account.address.slice(0, 6)}...{account.address.slice(-4)}
											</button>
										);
									}}
								</ConnectButton.Custom>
							</div>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Navigation;
