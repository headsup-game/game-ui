/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pnBeg0AfFLq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { useRouter } from 'next/router';

export default function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <PuzzleIcon className="h-6 w-6" />
          <span className="sr-only">Poker Web3 Game</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            How to Play
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Roadmap
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Poker Web3 Game</h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Experience the thrill of poker with the security and transparency of blockchain technology. Join our
                    decentralized poker game and earn crypto rewards.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="/poker"
                  >
                    Join the Game
                  </Link>
                </div>
              </div>
              <img
                alt="Poker Web3 Game"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src="/images/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Experience the Future of Poker</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our decentralized poker game offers provably fair outcomes, secure crypto payouts, and a transparent
                  gameplay experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Decentralized Gameplay</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Our poker game is built on blockchain technology, ensuring transparent and tamper-proof
                        gameplay.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Provably Fair Outcomes</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Our game uses cryptographic algorithms to guarantee fair and verifiable outcomes for every hand.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Crypto Payouts</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Win real cryptocurrency rewards by playing our poker game. Withdraw your earnings anytime.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                alt="Poker Web3 Game"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/images/placeholder.svg"
                width="550"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="how-to-play">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How to Play Poker Web3 Game</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Follow these simple steps to start playing our decentralized poker game and earn crypto rewards.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">1. Connect Your Wallet</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Connect your cryptocurrency wallet to our platform to get started.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">2. Buy-in with Crypto</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Purchase poker chips using your preferred cryptocurrency to join the game.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">3. Play and Earn</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Participate in our provably fair poker games and earn crypto rewards based on your performance.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">4. Withdraw Winnings</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Withdraw your earned cryptocurrency anytime to your connected wallet.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t" id="roadmap">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Poker Web3 Game Roadmap</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out our development roadmap to see whats in store for the future of our decentralized poker game.
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl space-y-6">
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">Q2 2023</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Launch the initial version of the Poker Web3 Game with basic features.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">Q3 2023</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Implement advanced gameplay modes, such as tournaments and sit-and-go events.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">Q4 2023</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Introduce a comprehensive loyalty program and NFT-based rewards system.
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xl font-bold">2024</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Expand the game to support cross-chain functionality and integrate with other Web3 platforms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Poker Web3 Game. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function PuzzleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  )
}