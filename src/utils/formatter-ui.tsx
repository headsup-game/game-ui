import { formatUnits } from "viem";

/**
 * Enhanced formatAmount function that handles all possible input types and edge cases
 * Formats token amounts (from wei/bigint) to human-readable format with smart zero abbreviation
 *
 * @param {bigint | number | string | null | undefined} amount - The amount to format. Can be:
 *   - bigint: Amount in wei/smallest unit (will be converted using decimals)
 *   - number: Already in token units
 *   - string: String representation of number or bigint
 *   - null/undefined: Returns "0"
 * @param {number} [decimals=6] - Number of decimals for token (defaults to 6 for DARK token)
 * @param {boolean} [returnString=false] - If true, returns string instead of JSX for zero abbreviation
 * @returns {React.ReactNode | string} - Formatted amount, can be JSX (for zero abbreviation) or string
 */
export const formatAmount = (
  amount: bigint | number | string | null | undefined,
  decimals: number = 6,
  returnString: boolean = false
): React.ReactNode | string => {
  // Handle null/undefined
  if (amount === null || amount === undefined) {
    return returnString ? "0" : <>0</>;
  }

  // Convert to bigint if needed, then to token amount
  let tokenAmount: number;

  try {
    if (typeof amount === "bigint") {
      // Convert from wei to token units
      tokenAmount = Number(formatUnits(amount, decimals));
    } else if (typeof amount === "string") {
      // Try to parse as bigint first (if it looks like a bigint string)
      if (amount.match(/^\d+$/)) {
        try {
          const bigintValue = BigInt(amount);
          tokenAmount = Number(formatUnits(bigintValue, decimals));
        } catch {
          // If bigint conversion fails, parse as regular number
          tokenAmount = parseFloat(amount);
        }
      } else {
        // Parse as regular number
        tokenAmount = parseFloat(amount);
      }
    } else if (typeof amount === "number") {
      tokenAmount = amount;
    } else {
      // Fallback for any other type
      tokenAmount = 0;
    }

    // Handle NaN
    if (isNaN(tokenAmount) || !isFinite(tokenAmount)) {
      return returnString ? "0" : <>0</>;
    }

    // Handle zero
    if (tokenAmount === 0) {
      return returnString ? "0" : <>0</>;
    }

    // Convert to string for processing
    let str = tokenAmount.toString();

    // Handle scientific notation (very small or very large numbers)
    if (str.includes("e") || str.includes("E")) {
      // For scientific notation, use toFixed with enough precision
      const precision = Math.max(decimals, 10);
      str = tokenAmount.toFixed(precision);
      // Remove trailing zeros
      str = str.replace(/\.?0+$/, "");
      return returnString ? str : <>{str}</>;
    }

    // Split into integer and decimal parts
    let [intPart, decPart = ""] = str.split(".");

    // Handle negative numbers
    const isNegative = intPart.startsWith("-");
    if (isNegative) {
      intPart = intPart.substring(1);
    }

    // If no decimal part, return integer
    if (!decPart) {
      const result = isNegative ? `-${intPart}` : intPart;
      return returnString ? result : <>{result}</>;
    }

    // Remove trailing zeros from decimal part
    decPart = decPart.replace(/0+$/, "");

    // If all decimals were zeros, return integer
    if (!decPart) {
      const result = isNegative ? `-${intPart}` : intPart;
      return returnString ? result : <>{result}</>;
    }

    // Find pattern for zero abbreviation: first 2 decimals, then 3+ zeros, then non-zero digits
    // E.g. 12.34000000005 -> 12.34 + 0<sub>8</sub>5
    const pattern = /^(..)(0{3,})(\d.*)$/;
    const match = decPart.match(pattern);

    if (match && !returnString) {
      // Format with zero abbreviation using JSX
      const prefix = isNegative ? "-" : "";
      return (
        <>
          {prefix}
          {intPart}.{match[1]}0<sub>{match[2].length}</sub>
          {match[3]}
        </>
      );
    } else {
      // No zero abbreviation needed or returnString is true, return full decimal
      const prefix = isNegative ? "-" : "";
      const result = `${prefix}${intPart}.${decPart}`;
      return returnString ? result : <>{result}</>;
    }
  } catch (error) {
    // Handle any errors gracefully
    console.error("Error formatting amount:", error);
    return returnString ? "0" : <>0</>;
  }
};
