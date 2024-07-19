import type { Metadata } from "next";
import { Inter, Gabarito, Kode_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import Container from "app/components/Container/Container";
import styles from "./home-page/Homepage.module.scss";
import Navigation from "app/home-page/Navigation/Navigation";
import { Layout } from "antd";

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
