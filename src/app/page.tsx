"use client";

import PokerTable from "./components/PokerTable";
import LandingPageComponent from "./components/LandingPage";
import { useRouter } from "next/router";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  RainbowKitProvider,
  ConnectButton,
  Chain,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { ANT_CUSTOM_THEME } from "utils/AntThemeConfig";

const blast_sepolia = {
  id: 43_114,
  name: "Blast Sepolia",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://sepolia.blast.io"] },
  },
  blockExplorers: {
    default: { name: "BlastScan", url: "https://sepolia.blastscan.io/" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
    headsup: {
      address: "0x38bDa9F9bEF0C468f2E00E2B7892157fB6A249d5",
      blockCreated: 5_815_300,
    },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, blast_sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={ANT_CUSTOM_THEME}>
          <RainbowKitProvider>
            <LandingPageComponent />
            <ConnectButton />
          </RainbowKitProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
