import type { Metadata } from "next";
import { Providers } from "./providers";
import Container from "app/components/Container/Container";
import styles from "./home-page/Homepage.module.scss";
import Navigation from "app/home-page/Navigation/Navigation";
import { Layout } from "antd";
import "antd/dist/reset.css";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";
import { PokerConfettiProvider } from "@components/PokerCardsConfetti";

export const metadata: Metadata = {
  title: "Play Poker with $DARK on PulseChain!",
  description: "Play Poker with $DARK tokens and win big on PulseChain!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PokerConfettiProvider>
            <Layout className={styles.Home}>
              <Navigation />
              <Container type="fluid">{children}</Container>
            </Layout>
          </PokerConfettiProvider>
        </Providers>
      </body>
    </html>
  );
}
