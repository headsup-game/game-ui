"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { ConfigProvider } from "antd";
import { ANT_CUSTOM_THEME } from "utils/AntThemeConfig";

import { config } from "../wagmiConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider theme={ANT_CUSTOM_THEME}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
