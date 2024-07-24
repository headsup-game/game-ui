import type { Metadata } from "next";
import { Inter, Gabarito, Kode_Mono } from "next/font/google";
import { Providers } from "./providers";
import Container from "app/components/Container/Container";
import styles from "./home-page/Homepage.module.scss";
import Navigation from "app/home-page/Navigation/Navigation";
import { Layout } from "antd";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

const gabarito = Gabarito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gabarito",
});

// const KodeMono = Kode_Mono({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-kode-mono",
// });

// const inter = Inter({ subsets: ["latin"] });

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={gabarito.variable}>
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
