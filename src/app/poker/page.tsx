// poker.tsx
"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const PokerTable = dynamic(() => import('../../components/PokerTable'), { ssr: false });
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "../../components/RainbowKit";
import dynamic from "next/dynamic";

const queryClient = new QueryClient();

export default function PokerPage() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <PokerTable />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
