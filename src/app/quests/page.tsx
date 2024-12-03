"use client";

import { Typography } from "antd";
import Container from "app/components/Container/Container";

const { Title, Text } = Typography;
export default function Quests() {
	return (
		<Container className="min-h-screen">
			<Title
				level={5}
				className="text-[white_!important] text-center my-4"
			>
				Quests
			</Title>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
            <section className="bg-[#1F1C37] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">How to Play Poker Web3</h2>
                <div className="space-y-6">
                    <div className="grid gap-4">
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="text-xl text-white font-semibold">1. Connect Your Wallet</h3>
                            <p className="text-gray-400">Connect your cryptocurrency wallet to start playing. Make sure you have enough funds to place bets.</p>
                        </div>
    
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="text-xl text-white font-semibold">2. Choose Your Side</h3>
                            <p className="text-gray-400">Select either Apes or Punks team to place your bet. Each team receives two cards.</p>
                        </div>
    
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="text-xl text-white font-semibold">3. Place Your Bet</h3>
                            <p className="text-gray-400">Enter your bet amount (minimum bet applies). Wait for community cards to be revealed.</p>
                        </div>
    
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="text-xl text-white font-semibold">4. Watch the Game</h3>
                            <p className="text-gray-400">Five community cards will be revealed. The team with the best poker hand wins the round.</p>
                        </div>
    
                        <div className="border-l-4 border-purple-500 pl-4">
                            <h3 className="text-xl text-white font-semibold">5. Collect Winnings</h3>
                            <p className="text-gray-400">If your team wins, your payout will be automatically sent to your connected wallet.</p>
                        </div>
                    </div>
                </div>
            </section>
    
            <section className="bg-[#1F1C37] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Game Rules</h2>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>Standard Texas Hold&apos;em poker hand rankings apply</li>
                    <li>Each team (Apes and Punks) receives 2 cards</li>
                    <li>5 community cards are shared between teams</li>
                    <li>Best 5-card poker hand wins</li>
                    <li>Payouts are calculated based on total pool and betting odds</li>
                    <li>All transactions are recorded on the blockchain for transparency</li>
                </ul>
            </section>
        </div>
		</Container>
	);
}