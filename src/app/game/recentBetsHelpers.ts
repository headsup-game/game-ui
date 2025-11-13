import { parseUnits } from "viem";
import { TOKEN_DECIMALS } from "utils/constants";
import { formatAmount } from "utils/formatter-ui";

// Normalize strings to uppercase
export const normalize = (v?: string) => (v || "").toUpperCase();

// Check if winner is resolved
export const isResolvedWinner = (w?: string) => {
  const W = normalize(w);
  return W === "APES" || W === "PUNKS";
};

// Convert amount to wei
export const toWei = (amount?: string) => {
  try {
    return parseUnits((amount || "0").toString(), TOKEN_DECIMALS);
  } catch {
    return BigInt(0);
  }
};

// Convert value to BigInt safely
export const toBigInt = (val: unknown): bigint => {
  try {
    if (typeof val === "bigint") return val;
    if (typeof val === "string") return BigInt(val);
    if (typeof val === "number") return BigInt(val);
    return BigInt(val as any);
  } catch {
    return BigInt(0);
  }
};

// Format P/L with proper sign
export const formatPL = (wei: bigint): string => {
  const abs = wei < BigInt(0) ? -wei : wei;
  return formatAmount(abs, TOKEN_DECIMALS, true) as string;
};

// Get P/L sign
export const getPLSign = (wei: bigint): string => {
  if (wei > BigInt(0)) return "+";
  if (wei < BigInt(0)) return "-";
  return ""; // No sign for zero
};

// Get P/L color
export const getPLColor = (wei: bigint): string => {
  if (wei > BigInt(0)) return "#22c55e";
  if (wei < BigInt(0)) return "#ef4444";
  return "#6C6C89";
};

// Calculate P/L breakdown from participation data
export interface PLBreakdown {
  grossWinningAmount: bigint;
  rakeGiven: bigint;
  operatorFeeGiven: bigint;
  netWinningAmount: bigint;
  betAmount: bigint;
}

export const calculatePLBreakdown = (ownBet: any): PLBreakdown | undefined => {
  const winningAmount = ownBet?.winningAmount != null ? toBigInt(ownBet.winningAmount) : null;
  
  if (winningAmount == null) return undefined;

  const betAmount = toBigInt(ownBet?.amount);
  const rakeGiven = ownBet?.rakeGiven != null ? toBigInt(ownBet.rakeGiven) : BigInt(0);
  const operatorFeeGiven = ownBet?.operatorFeeGiven != null ? toBigInt(ownBet.operatorFeeGiven) : BigInt(0);
  const grossWinningAmount = winningAmount + rakeGiven + operatorFeeGiven;

  return {
    grossWinningAmount,
    rakeGiven,
    operatorFeeGiven,
    netWinningAmount: winningAmount,
    betAmount,
  };
};

