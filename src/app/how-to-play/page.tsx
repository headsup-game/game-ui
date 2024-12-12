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
import { useState, useRef, ReactNode, FC } from "react";
import GameCards from "app/game/GameCards";
import { Players } from "interfaces/players";
import { FaArrowRight, FaEthereum, FaHandHoldingUsd, FaHandSparkles } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";
import UserBetModal from "app/components/UserWinModal/UserBetModal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export const GradientText: FC<GradientTextProps> = ({
  children,
  className,
}) => {
  return (
    <span
      className={
        "bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text " +
        className
      }
    >
      {children}
    </span>
  );
};

const { Title, Text } = Typography;

export default function HowToPlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [openTour, setOpenTour] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Players>(2);
  const [step2InputValue, setStep2InputValue] = useState(0.001);

  // References for tour targets
  const connectRef = useRef(null);
  const betRef = useRef(null);
  const claimRef = useRef(null);

  const [showUserBetModal, setShowUserBetModal] = useState(false);

  // Check if wallet is connected
  const { isConnected } = useAccount();

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

  return (

    <Container className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full text-center my-8"
      >
        <GradientText className="text-5xl font-bold text-center mt-12 mb-8">
          How to Play
        </GradientText>
      </motion.div>

      {/* How to Place a Bet Section */}
      <motion.section
        className="bg-[#141127] rounded-lg p-6 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 flex justify-center items-center">
          <FaHandSparkles className="mr-2 text-yellow-400" />
          How to Place a Bet
        </h2>
        <div className="space-y-8 max-w-[800px] mx-auto">
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
            <div className="flex flex-col gap-4">
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
              <Button
                type="primary"
                className="bg-[#6F04FF] hover:bg-[#5A03CC] max-w-[500px] w-full mx-auto"
                onClick={() => setCurrentStep(currentStep + 1)}
                ref={connectRef}
                disabled={selectedPlayer === 2}
              >
                {selectedPlayer === 2 ? (
                  "Select a Team"
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    Next <FaArrowRight />
                  </div>
                )}
              </Button>
            </div>
          )}
          {currentStep === 1 && (
            <div className="bg-[#3A375A] rounded-lg p-4 max-w-[400px] mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">
                Place Your Bet
              </h3>
              <Flex vertical gap={8}>
                {/* Amount Input */}
                <InputNumber
                  min={0.001}
                  step={0.001}
                  precision={3}
                  value={step2InputValue}
                  defaultValue={0.001}
                  prefix={<FaEthereum />}
                  onChange={(value) => {
                    setStep2InputValue(value as number);
                  }}
                  className="[&_input]:text-[white_!important]"
                  style={{
                    width: "100%",
                    backgroundColor: "#141127",
                    borderColor: "#6F04FF",
                    color: "white",
                  }}
                />

                {/* Quick Amount Buttons */}
                <Flex align="center" gap={6} className="w-fit">
                  {[0.01, 0.05, 0.1].map((amount) => (
                    <Button
                      size="small"
                      key={amount}
                      className="bg-[#6F04FF] hover:bg-[#5A03CC] [&_span]:text-white"
                      style={{
                        background: "transparent",
                        border: "1px solid #cecece",
                        borderRadius: "6px",
                        color: "white",
                      }}
                      onClick={() => {
                        setStep2InputValue(amount as number);
                      }}
                    >
                      {amount} ETH
                    </Button>
                  ))}
                </Flex>

                <div className="border-t border-[#6F04FF] pt-4">
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
                        {
                          (step2InputValue * 2.5).toFixed(3) // Potential win calculation
                        }
                        ETH
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="bg-transparent border-[#6F04FF] text-[#6F04FF] hover:bg-[#6F04FF]/10"
                  >
                    Go Back
                  </Button>
                  <Button
                    type="primary"
                    className="bg-[#6F04FF] hover:bg-[#5A03CC]"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    ref={betRef}
                  >
                    Next <FaArrowRight />
                  </Button>
                </div>
              </Flex>
            </div>
          )}
          {currentStep === 2 && (
            <div className="bg-[#3A375A] max-w-[400px] mx-auto rounded-lg p-4">
              <h3 className="text-xl font-bold text-white mb-3">
                Confirm Transaction
              </h3>
              <Flex vertical gap={8}>
                <div className="border-l-4 border-[#6F04FF] pl-4 text-[14px]">
                  <p className="text-white">
                    Team: {selectedPlayer === Players.Apes ? "Apes" : "Punks"}
                  </p>
                  <p className="text-white">
                    Bet Amount: {step2InputValue} ETH
                  </p>
                  <p className="text-white">
                    Potential Win:{" "}
                    <span
                      style={{
                        color: "#00E000",
                        fontWeight: "bold",
                        textShadow: "0 0 5px currentColor",
                      }}
                    >
                      {(step2InputValue * 2.5).toFixed(3)} ETH
                    </span>
                  </p>
                </div>
                <Button
                  type="primary"
                  className="bg-[#6F04FF] hover:bg-[#5A03CC]"
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
                  className="bg-transparent border-[#6F04FF] text-[#6F04FF] hover:bg-[#6F04FF]/10"
                >
                  Go Back
                </Button>
              </Flex>
            </div>
          )}
        </div>
        </div>
      </motion.section>

      {/* How to Claim Winnings Section */}
      <motion.section
        className="bg-[#141127] rounded-lg p-6 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 flex justify-center items-center">
          <FaHandHoldingUsd className="mr-2 text-green-400" />
          How to Claim Winnings
        </h2>
        <div className="space-y-4 max-w-[800px] mx-auto">
          <div className="bg-[#3A375A] p-4 rounded">
            <h3 className="text-white font-bold text-[18px]">1. View Your Bets</h3>
            <p className="mb-2 text-small text-[#cecece]">
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
                className="bg-[#6F04FF] hover:bg-[#5A03CC]"
                onClick={() => setShowUserBetModal(true)}
              >
                View My Bets
              </Button>
            )}
          </div>
          <div className="bg-[#3A375A] p-4 rounded">
            <h3 className="text-white font-bold text-[18px] ">2. Claiming Process</h3>
            <p className="mb-2 text-[#cecece]">
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
          <div className="bg-[#3A375A] p-4 rounded">
            <h3 className="text-white font-bold text-[18px]">3. Track Your History</h3>
            <p className="mb-2 text-[#cecece]">
              Keep track of your betting history and claimed winnings
            </p>
            <div className="bg-[#2C2A4A] p-3 rounded">
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
      </motion.section>

      {/* Poker Hand Rankings Section */}
      <motion.section
        className="bg-[#141127] rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-8 flex justify-center items-center">
          <TbCardsFilled className="mr-2 text-purple-400" />
            Let&apos;s Learn Poker Together!
        </h2>

        <div className="space-y-8 max-w-[800px] mx-auto">
          {/* Royal Flush */}
          <motion.div
            className="bg-[#2C2A4A]/80 rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
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
          </motion.div>

          {/* Straight Flush */}
          <motion.div
            className="bg-[#2C2A4A]/80 rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
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
          </motion.div>

          {/* Four of a Kind */}
          <motion.div
            className="bg-[#2C2A4A]/80 rounded-xl p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
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
          </motion.div>

          {/* Fun Tips Box */}
          <motion.div
            className="bg-[#3A375A]/50 p-4 rounded-lg border-2 border-[#6F04FF]"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(111, 4, 255, 0.5)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Fun Tips for New Players! 🌟
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Always look at your cards carefully</li>
              <li>Try to remember which cards are better than others</li>
              <li>Practice makes perfect - don&apos;t give up!</li>
              <li>Start with small bets while learning</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>
    </Container>
  );
}
