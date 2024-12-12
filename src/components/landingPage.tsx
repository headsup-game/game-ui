"use client";

import Image from "next/image";

import Link from "next/link";
import { motion } from "framer-motion";
import { useContext } from "react";
import { PokerConfettiContext } from "./PokerCardsConfetti";

// Create a button component that will trigger the confetti
const ConfettiButton = () => {
  const confettiContext = useContext(PokerConfettiContext);

  if (!confettiContext) {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => confettiContext.triggerPokerConfetti(100)}
      className="inline-flex h-10 items-center justify-center bg-gradient-to-r from-[#FF4848] to-[#FF0404] text-white px-6 py-2 rounded-xl text-lg hover:text-white"
    >
      Celebrate! 🎉
    </motion.button>
  );
};

export default function AnimatedLandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] text-white">
      <main className="flex-1 max-w-[1400px] mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full py-12"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Poker Web3 Game
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Experience the thrill of poker with the security and
                    transparency of blockchain technology. Join our
                    decentralized poker game and earn crypto rewards.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      className="inline-flex h-10 items-center justify-center bg-gradient-to-r from-[#8E48FF] to-[#6F04FF] text-white px-6 py-2 rounded-xl text-lg hover:text-white"
                      href="/game"
                    >
                      Join The Game
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 min-[400px]:mt-0"
                  >
                    <Link
                      className="inline-flex h-10 items-center justify-center bg-gray-800 text-white px-6 py-2 rounded-xl text-lg hover:text-white"
                      href="/how-to-play"
                    >
                      Learn How To Play
                    </Link>
                  </motion.div>
                  <ConfettiButton />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Image
                  alt="Poker Web3 Game"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  height="950"
                  src="/images/assets/home-cards-showing.png"
                  width="950"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full py-12 md:py-24 lg:py-32 bg-[#141127]"
          id="features"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-800 px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Experience the Future of Poker
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl lg:text-base xl:text-xl">
                  Our decentralized poker game offers provably fair outcomes,
                  secure crypto payouts, and a transparent gameplay experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-col justify-center space-y-4"
              >
                <ul className="grid gap-6">
                  {[
                    "decentralisedGamePlay",
                    "fairOutcomes",
                    "cryptoPayout",
                  ].map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    >
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">
                          {feature === "decentralisedGamePlay"
                            ? "Decentralized Gameplay"
                            : feature === "fairOutcomes"
                            ? "Provably Fair Outcomes"
                            : "Crypto Payouts"}
                        </h3>
                        <p className="text-gray-300">
                          {feature === "decentralisedGamePlay"
                            ? "Our poker game is built on blockchain technology, ensuring transparent and tamper-proof gameplay."
                            : feature === "fairOutcomes"
                            ? "Our game uses cryptographic algorithms to guarantee fair and verifiable outcomes for every hand."
                            : "Win real cryptocurrency rewards by playing our poker game. Withdraw your earnings anytime."}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Image
                  alt="Poker Web3 Game"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="/images/assets/realm-of-aces-card.png"
                  width="550"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="w-full py-12 md:py-24 lg:py-32"
          id="how-to-play"
        >
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                How to Play Poker Web3 Game
              </h2>
              <p className="max-w-[600px] text-gray-300 md:text-xl lg:text-base xl:text-xl">
                Follow these simple steps to start playing our decentralized
                poker game and earn crypto rewards.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: "1. Connect Your Wallet",
                  description:
                    "Connect your cryptocurrency wallet to our platform to get started.",
                },
                {
                  title: "2. Buy-in with Crypto",
                  description:
                    "Purchase poker chips using your preferred cryptocurrency to join the game.",
                },
                {
                  title: "3. Play and Earn",
                  description:
                    "Participate in our provably fair poker games and earn crypto rewards based on your performance.",
                },
                {
                  title: "4. Withdraw Winnings",
                  description:
                    "Withdraw your earned cryptocurrency anytime to your connected wallet.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.2 }}
                  className="grid gap-2"
                >
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700 max-w-[1400px] mx-auto"
      >
        <p className="text-xs text-gray-400">
          © 2024 Poker Web3 Game. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </motion.footer>
    </div>
  );
}
