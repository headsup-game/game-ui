import { formatUnits } from "viem";

/**
 * Helper function to find and abbreviate repeated digit runs
 * @param {string} str - The string to search in
 * @param {number} minPrefixLen - Minimum characters to keep before abbreviation
 * @returns Object with abbreviation info or null
 */
const findRepetition = (str: string, minPrefixLen: number = 1) => {
  // Look for runs of 3+ repeated digits anywhere in the string
  const matches = Array.from(str.matchAll(/(\d)\1{2,}/g));
  const indexesArray = matches.map((match) => match.index);
  const countArray = matches.map((match) => match[0].length);

  return {
    indexes: indexesArray,
    counts: countArray,
  };
};
/**
 * Enhanced formatAmount function that handles all possible input types and edge cases
 * Formats token amounts (from wei/bigint) to human-readable format with smart repetition abbreviation
 *
 * Examples:
 * - 1.234567890123456789 → 1.234567890123456789 (no repetition)
 * - 1.000000000009 → 1.0<sub>10</sub>9 (10 zeros)
 * - 1.233333333333333333 → 1.23<sub>15</sub>3 (15 threes)
 * - 1.2345555559 → 1.2345<sub>5</sub>9 (5 fives)
 * - 1.000000000000000000 → 1 (all zeros removed)
 * - 10000008 → 10<sup>5</sup>8 (5 zeros in integer part)
 *
 * @param {bigint | number | string | null | undefined} amount - The amount to format
 * @param {number} [decimals=6] - Number of decimals for token (defaults to 6)
 * @param {boolean} [returnString=false] - If true, returns string instead of JSX
 * @returns {React.ReactNode | string} - Formatted amount
 */
const formatAmount = (
  amount: number | bigint | string | null | undefined,
  decimals: number = 6,
  returnString: boolean = false
): React.ReactNode | string => {
  // Handle null/undefined
  if (amount === null || amount === undefined) {
    return returnString ? "0" : <>0</>;
  }

  let tokenAmount: number;

  try {
    // Convert input to number
    if(typeof amount === "bigint") {
      tokenAmount = Number(formatUnits(amount, decimals));
    } else {
      tokenAmount = Number(amount);
    }

    // Convert to string with enough precision
    let str = tokenAmount.toString();

    // Split into integer and decimal parts
    let [intPart, decPart = ""] = str.split(".");
    let intPartIndex = 0;
    let decPartIndex = 0;
    const isNegative = intPart.startsWith("-");
    if (isNegative) {
      intPart = intPart.substring(1);
    }

    const prefix = isNegative ? "-" : "";

    decPart = decPart.replace(/0+$/, "");

    // If returnString is true, return plain string without JSX
    if (returnString) {
      const fullNumber = decPart.length > 0 ? `${intPart}.${decPart}` : intPart;
      return `${prefix}${fullNumber}`;
    }

    const intRep = findRepetition(intPart, 1);
    const decRep = findRepetition(decPart, 1);

    return (
      <>
        {prefix}
        {intPart.split("").map((digit) => {
          if (intRep.indexes.includes(intPartIndex)) {
            const index = intRep.indexes.indexOf(intPartIndex);
            const count = intRep.counts[index];
            intPartIndex += intRep.counts[index];
            return (
              <>
                {intPart[intPartIndex - 1]}
                <sub>{count - 1}</sub>
              </>
            );
          } else {
            intPartIndex++;
            return intPart[intPartIndex - 1];
          }
        })}
        {decPart.length > 0 && "."}
        {decPart.split("").map((digit) => {
          if (decRep.indexes.includes(decPartIndex)) {
            const index = decRep.indexes.indexOf(decPartIndex);
            const count = decRep.counts[index];
            decPartIndex += decRep.counts[index];
            return (
              <>
                {decPart[decPartIndex - 1]}
                <sub>{count - 1}</sub>
              </>
            );
          } else {
            decPartIndex++;
            return decPart[decPartIndex - 1];
          }
        })}
      </>
    );
  } catch (error) {
    console.error("Error formatting amount:", error);
    return returnString ? "0" : <>0</>;
  }
};

export { formatAmount };

/**
 * Examples of usage:
 * 1.234567890123456789 → 1.234567890123456789 (no repetition)
 * 1.000000000009 → 1.0<sub>10</sub>9 (10 zeros after first decimal)
 * 1.233333333333333333 → 1.23<sub>15</sub>3 (15 threes)
 * 1.2345555559 → 1.2345<sub>5</sub>9 (5 fives)
 * 1.000000000000000000 → 1 (all zeros removed)
 * 10000008 → 10<sup>5</sup>8 (5 zeros in integer)
 * 123456666666789 → 123456<sup>6</sup>789 (6 sixes in integer)
 * 0.0000000001 → 0.0<sub>9</sub>1 (9 zeros after first decimal)
 **/
