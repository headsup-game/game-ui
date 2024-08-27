"use client";

import * as React from "react";
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { ConfigProvider } from "antd";
import { ANT_CUSTOM_THEME } from "utils/AntThemeConfig";

import { config } from "../wagmiConfig";
import { client as apolloClient } from "../apolloClient";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider theme={ANT_CUSTOM_THEME}>
            <ApolloHooksProvider client={apolloClient}>
              <RainbowKitProvider>{children}</RainbowKitProvider>
            </ApolloHooksProvider>
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
