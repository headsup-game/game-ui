import type { Metadata } from "next";
import { Inter, Gabarito, Kode_Mono } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "./providers";

const gabarito = Gabarito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gabarito",
});

const KodeMono = Kode_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kode-mono",
});

const inter = Inter({ subsets: ["latin"] });

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
      <body className={KodeMono.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
