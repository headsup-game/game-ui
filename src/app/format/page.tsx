"use client";

import { formatAmount } from "utils/formatter-ui";
import { formatUnits } from "viem";


export default function FormatPage() {
  const amount = [
    "1.234567890123456789",
    "12222222222333333.000000000009",
    "12222222222333333",
    "1.233333333333333333000000",
    "1.2345555559",
    "0.00000320",
    "10000008",
    "-10000008",
    "-10000008.000000000009",
  ];

  return (
    <ol>
      {amount.map((a) => (
        <li key={a}>
          <b>{a}</b>:{formatAmount(a)}
        </li>
      ))}
    </ol>
  );
}
