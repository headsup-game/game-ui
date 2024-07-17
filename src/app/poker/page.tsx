// poker.tsx
"use client";

const PokerTable = dynamic(() => import('../../components/PokerTable'), { ssr: false });
import dynamic from "next/dynamic";

export default function PokerPage() {
  return (
    <PokerTable />
  )
}
