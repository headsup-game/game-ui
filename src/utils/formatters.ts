/**
 * Formats a given number to a string with the specified number of decimal places.
 *
 * @param {number} number - The number to be formatted.
 * @param {boolean} [flexible=false] - If true, a "+" symbol is appended to the end of the string.
 * @returns {string|number} - The formatted number string.
 */
export const formatNumber = (number, flexible = false): number | string => {
  // Use the Number object to convert the number to a string with the specified number of decimal places.
  const formattedNumber = Number(
    parseFloat(number).toFixed(1)
  ).toLocaleString();

  // If flexible is true, append a "+" symbol to the end of the string.
  return flexible ? `${formattedNumber}+` : formattedNumber;
};

/**
 * Formats a given number to a currency string with the specified number of decimal places and currency symbol.
 *
 * @param {number} value - The number to be formatted.
 * @param {number} [decimals=0] - The number of decimal places to display. Defaults to 0.
 * @param {string} [currency="INR"] - The currency symbol to use. Defaults to "INR".
 * @returns {string} - The formatted currency string.
 */
export const CurrencyFormatter = (
  value: number,
  decimals = 0,
  currency = "INR"
): string => {
  // Create a number formatter with the specified options
  const format = new Intl.NumberFormat("en-IN", {
    style: "currency", // Format as currency
    currency: currency, // Use the specified currency symbol
    currencyDisplay: "symbol", // Display the currency symbol
    minimumFractionDigits: decimals, // Display the specified number of decimal places
  });

  // Format the number and return the result
  return format.format(value);
};
