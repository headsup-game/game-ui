import type { Metadata } from "next";
import { Providers } from "./providers";
import Container from "app/components/Container/Container";
import styles from "./home-page/Homepage.module.scss";
import Navigation from "app/home-page/Navigation/Navigation";
import { Layout } from "antd";
import "antd/dist/reset.css";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Play Poker with your friends and win big!",
  description: "Play Poker with your friends and win big!",
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
          <Layout className={styles.Home}>
            <Navigation />
            <Container type="fluid">{children}</Container>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
