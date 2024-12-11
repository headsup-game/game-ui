"use client";

import {
  Button,
  Flex,
  Steps,
  Typography,
  Tour,
  message,
  InputNumber,
  ConfigProvider,
} from "antd";
import Container from "app/components/Container/Container";
import CardSet from "@components/CardSet";
import { Card, Color, Rank, Suit } from "interfaces/card";
import { useState, useRef } from "react";
import GameCards from "app/game/GameCards";
import { Players } from "interfaces/players";
import { FaEthereum } from "react-icons/fa";
import UserBetModal from "app/components/UserWinModal/UserBetModal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient } from "wagmi";

const { Title, Text } = Typography;

export default function Quests() {
  const [currentStep, setCurrentStep] = useState(0);
  const [openTour, setOpenTour] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Players>(2);

  // References for tour targets
  const connectRef = useRef(null);
  const betRef = useRef(null);
  const claimRef = useRef(null);

  const [showUserBetModal, setShowUserBetModal] = useState(false);

  // Check if wallet is connected
  const { isConnected } = useAccount();

  const tourSteps = [
    {
      title: "Connect Your Wallet",
      description:
        "First, connect your wallet using the button in the top right corner",
      target: () => connectRef.current,
    },
    {
      title: "Place Your Bet",
      description:
        "Choose your team and enter your bet amount. Higher bets mean bigger potential winnings!",
      target: () => betRef.current,
    },
    {
      title: "Claim Winnings",
      description:
        "If your team wins, click the claim button to receive your winnings directly to your wallet",
      target: () => claimRef.current,
    },
  ];

  const exampleHands = {
    royalFlush: [
      { rank: Rank.Ten, suit: Suit.Hearts, color: Color.RED },
      { rank: Rank.Jack, suit: Suit.Hearts, color: Color.RED },
      { rank: Rank.Queen, suit: Suit.Hearts, color: Color.RED },
      { rank: Rank.King, suit: Suit.Hearts, color: Color.RED },
      { rank: Rank.Ace, suit: Suit.Hearts, color: Color.RED },
    ] as Card[],

    straightFlush: [
      { rank: Rank.Five, suit: Suit.Spades, color: Color.RED },
      { rank: Rank.Six, suit: Suit.Spades, color: Color.RED },
      { rank: Rank.Seven, suit: Suit.Spades, color: Color.RED },
      { rank: Rank.Eight, suit: Suit.Spades, color: Color.RED },
      { rank: Rank.Nine, suit: Suit.Spades, color: Color.RED },
    ] as Card[],
    fourOfAKind: [
      { rank: Rank.Ace, suit: Suit.Hearts, color: Color.RED },
      { rank: Rank.Ace, suit: Suit.Diamonds, color: Color.RED },
      { rank: Rank.Ace, suit: Suit.Clubs, color: Color.RED },
      { rank: Rank.Ace, suit: Suit.Spades, color: Color.RED },
      { rank: Rank.King, suit: Suit.Hearts, color: Color.RED },
    ] as Card[],
  };

  const startInteractiveTutorial = () => {
    setOpenTour(true);
  };

  return (
    <Container className="min-h-screen">
      <Title level={5} className="text-[white_!important] text-center my-4">
        Quests
      </Title>

      {/* Interactive Tutorial Button */}
      <div className="text-center mb-8">
        <Button
          type="primary"
          onClick={startInteractiveTutorial}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Start Interactive Tutorial
        </Button>
      </div>

      {/* How to Place a Bet Section */}
      <section className="bg-[#1F1C37] rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          How to Place a Bet
        </h2>
        <Steps
          current={currentStep}
          onChange={setCurrentStep}
          items={[
            {
              title: "Select Team",
              description: "Choose Apes or Punks",
            },
            {
              title: "Enter Amount",
              description: "Specify your bet amount",
            },
            {
              title: "Confirm",
              description: "Approve transaction",
            },
          ]}
        />
        <div className="mt-4 space-y-6">
          {currentStep === 0 && (
            <GameCards
              redCardsInput={[
                { rank: Rank.Ace, suit: Suit.Spades, color: Color.BLACK },
                { rank: Rank.Ace, suit: Suit.Hearts, color: Color.RED },
              ]}
              blueCardsInput={[
                { rank: Rank.King, suit: Suit.Diamonds, color: Color.RED },
                { rank: Rank.King, suit: Suit.Clubs, color: Color.BLACK },
              ]}
              redCardsTotalAmount="5.5"
              blueCardsTotalAmout="4.8"
              redCardsNumberOfBets={10}
              blueCardsNumberOfBets={8}
              selectedPlayer={selectedPlayer}
              handlePlayerSelection={(player) => setSelectedPlayer(player)}
              apesPayout={2.5}
              punksPayout={2.5}
              apesSelfBet="0"
              punksSelfBet="0"
            />
          )}
          {currentStep === 1 && (
            <div className="bg-purple-900/30 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-3">
                Place Your Bet
              </h3>
              <Flex vertical gap={8}>
                {/* Amount Input */}
                  <InputNumber
                    min={0.001}
                    step={0.001}
                    precision={3}
                    defaultValue={0.001}
                    prefix={<FaEthereum />}
                    onChange={(value) => {
                      if (value) {
                        message.success(`Bet amount set to ${value} ETH`);
                      }
                    }}
                    className="[&_input]:text-[white_!important]"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      borderColor: "#8B5CF6",
                      color: "white",
                    }}
                  />

                {/* Quick Amount Buttons */}
                <Flex align="center" gap={6}>
                  {[0.01, 0.05, 0.1].map((amount) => (
                    <Button
                      size="small"
                      key={amount}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => {
                        message.info(`Selected amount: ${amount} ETH`);
                      }}
                    >
                      {amount} ETH
                    </Button>
                  ))}
                </Flex>

                <div className="border-t border-purple-500/30 pt-4">
                  <p className="text-white">Minimum bet: 0.001 ETH</p>
                  <div style={{ marginTop: 8 }}>
                    <p className="text-white">
                      Potential win:{" "}
                      <span
                        style={{
                          color: "#00E000",
                          fontWeight: "bold",
                          textShadow: "0 0 5px currentColor",
                        }}
                      >
                        0.002 ETH
                      </span>
                    </p>
                  </div>
                </div>
              </Flex>
            </div>
          )}
          {currentStep === 2 && (
            <div className="bg-purple-900/30 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-3">
                Confirm Transaction
              </h3>
              <Flex vertical gap={8}>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-white">
                    Team: {selectedPlayer === Players.Apes ? "Apes" : "Punks"}
                  </p>
                  <p className="text-white">Bet Amount: 0.5 ETH</p>
                  <p className="text-white">
                    Potential Win:{" "}
                    <span style={{ color: "#00E000", fontWeight: "bold" }}>
                      {(0.5 * 2.5).toFixed(2)} ETH
                    </span>
                  </p>
                </div>
                <Button
                  type="primary"
                  className="bg-purple-600 hover:bg-purple-700"
                  ref={claimRef}
                  onClick={() => {
                    message
                      .loading("Confirming transaction...", 2)
                      .then(() => message.success("Transaction confirmed!", 2))
                      .then(() => {
                        setCurrentStep(0); // Reset to first step
                        setSelectedPlayer(Players.None); // Reset selected player
                      });
                  }}
                >
                  Confirm Bet
                </Button>
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-transparent border-purple-600 text-purple-600 hover:bg-purple-600/10"
                >
                  Go Back
                </Button>
              </Flex>
            </div>
          )}
        </div>
      </section>

      {/* How to Claim Winnings Section */}
      <section className="bg-[#1F1C37] rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          How to Claim Winnings
        </h2>
        <div className="space-y-4">
          <div className="bg-purple-900/30 p-4 rounded">
            <h3 className="text-white font-semibold">1. View Your Bets</h3>
            <p className="mb-2">
              Check your active and past bets to see your winnings
            </p>
            {!isConnected ? (
              <Flex vertical align="center" gap={16} className="py-8">
                <Text
                  style={{
                    fontSize: "24px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Connect your wallet to view your bets
                </Text>
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <Button
                      type="primary"
                      size="large"
                      onClick={openConnectModal}
                      style={{
                        background:
                          "linear-gradient(90deg, #8E48FF 0%, #6F04FF 100%)",
                        border: "none",
                        borderRadius: "12px",
                        height: "48px",
                        fontSize: "18px",
                      }}
                    >
                      Connect Wallet
                    </Button>
                  )}
                </ConnectButton.Custom>
              </Flex>
            ) : (
              <Button
                type="primary"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowUserBetModal(true)}
              >
                Open My Bets
              </Button>
            )}
          </div>
          <div className="bg-purple-900/30 p-4 rounded">
            <h3 className="text-white font-semibold">2. Claiming Process</h3>
            <p className="mb-2">
              For winning bets, you&apos;ll see a &quot;Claim&quot; button that
              allows you to collect your winnings
            </p>
            <div className="flex gap-2 mt-2">
              <Button disabled className="opacity-50">
                Claimed
              </Button>
              <Button type="primary" className="bg-green-600">
                Claim
              </Button>
              <Button disabled className="opacity-50">
                Unclaimable
              </Button>
            </div>
          </div>
          <div className="bg-purple-900/30 p-4 rounded">
            <h3 className="text-white font-semibold">3. Track Your History</h3>
            <p className="mb-2">
              Keep track of your betting history and claimed winnings
            </p>
            <div className="bg-purple-800/30 p-3 rounded">
              <p className="text-green-400 block">Won bets appear in green</p>
              <p className="text-red-400 block">Lost bets appear in red</p>
              <p className="text-gray-400 block">
                Claimed winnings are marked as &quot;Claimed&quot;
              </p>
            </div>
          </div>
        </div>

        {/* UserBetModal component for real claiming functionality */}
        <UserBetModal open={showUserBetModal} setOpen={setShowUserBetModal} />
      </section>

      {/* Original Poker Hand Rankings Section */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Let&apos;s Learn Poker Together! 🎮
        </h1>

        <div className="space-y-8">
          {/* Royal Flush */}
          <div className="bg-[#1F1C37]/80 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              1. Royal Flush - The Super Special Hand! 👑
            </h2>
            <Flex vertical gap={4}>
              <CardSet
                isSmall={true}
                numberOfCards={5}
                cards={exampleHands.royalFlush}
                cardWidth={60}
                initFaceDown={false}
              />
              <p className="text-gray-300 mt-2">
                Imagine collecting the most special cards - all from the same
                family (suit)! You need: 10, Jack, Queen, King, and Ace.
                It&apos;s like having all the royal family together! This is the
                rarest and best hand in poker.
              </p>
            </Flex>
          </div>

          {/* Straight Flush */}
          <div className="bg-[#1F1C37]/80 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              2. Straight Flush - The Rainbow Line! 🌈
            </h2>
            <Flex vertical gap={4}>
              <CardSet
                isSmall={true}
                numberOfCards={5}
                cards={exampleHands.straightFlush}
                cardWidth={60}
                initFaceDown={false}
              />
              <p className="text-gray-300 mt-2">
                This is like arranging numbers in order (like 5,6,7,8,9) and all
                cards wearing the same costume (suit)! It&apos;s super special,
                but not as rare as the Royal Flush.
              </p>
            </Flex>
          </div>

          {/* Four of a Kind */}
          <div className="bg-[#1F1C37]/80 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              3. Four of a Kind - The Quadruplets! 👯‍♂️👯‍♀️
            </h2>
            <Flex vertical gap={4}>
              <CardSet
                isSmall={true}
                numberOfCards={5}
                cards={exampleHands.fourOfAKind}
                cardWidth={60}
                initFaceDown={false}
              />
              <p className="text-gray-300 mt-2">
                Imagine having four cards of the same number (like four Aces)!
                It&apos;s like finding quadruplet brothers or sisters. The fifth
                card can be any other card - it&apos;s just there to keep them
                company!
              </p>
            </Flex>
          </div>

          {/* Fun Tips Box */}
          <div className="bg-purple-800/50 p-4 rounded-lg border-2 border-purple-500">
            <h3 className="text-xl font-bold text-white mb-2">
              Fun Tips for New Players! 🌟
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Always look at your cards carefully</li>
              <li>Try to remember which cards are better than others</li>
              <li>Practice makes perfect - don&apos;t give up!</li>
              <li>Start with small bets while learning</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Tour Component */}
      <Tour
        open={openTour}
        onClose={() => setOpenTour(false)}
        steps={tourSteps}
      />
    </Container>
  );
}
