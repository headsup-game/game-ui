"use client";
import { createContext, useCallback, ReactNode } from "react";
import confetti from "canvas-confetti";

interface PokerConfettiContextType {
  triggerPokerConfetti: (particleCount?: number) => void;
}

export const PokerConfettiContext = createContext<
  PokerConfettiContextType | undefined
>(undefined);

interface PokerConfettiProviderProps {
  children: ReactNode;
}

export const PokerConfettiProvider = ({
  children,
}: PokerConfettiProviderProps) => {
  const triggerPokerConfetti = useCallback(async (particleCount = 50) => {
    confetti({
      particleCount,
      spread: 150,
      origin: { y: 0.6 },
      shapes: ["square"],
    });
  }, []);

  return (
    <PokerConfettiContext.Provider value={{ triggerPokerConfetti }}>
      {children}
    </PokerConfettiContext.Provider>
  );
};
