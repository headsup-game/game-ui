import React from "react";
import { formatAmount } from "utils/formatter-ui";

interface PLBreakdownProps {
  breakdown: {
    grossWinningAmount: bigint;
    rakeGiven: bigint;
    operatorFeeGiven: bigint;
    netWinningAmount: bigint;
    betAmount: bigint;
  };
}


// Tooltip component for P/L breakdown
// const PLBreakdownTooltip = ({ breakdown }: { 
//   breakdown: {
//     grossWinningAmount: bigint;
//     rakeGiven: bigint;
//     operatorFeeGiven: bigint;
//     netWinningAmount: bigint;
//     betAmount: bigint;
//   };
// }) => {

//   const grossAmount = formatAmount(breakdown.grossWinningAmount);
//   const rakeAmount = formatAmount(breakdown.rakeGiven);
//   const operatorFeeAmount = formatAmount(breakdown.operatorFeeGiven);
//   const totalDeduction = breakdown.rakeGiven + breakdown.operatorFeeGiven;
//   const totalDeductionAmount = formatAmount(totalDeduction);
//   const netAmount = formatAmount(breakdown.netWinningAmount);
  
//   // Calculate P/L: net winning amount - bet amount
//   const plWei = breakdown.netWinningAmount - breakdown.betAmount;
//   const plAmount = formatAmount(plWei <= BigInt(0) ? -plWei : plWei);
//   const plSign = plWei >= BigInt(0) ? '+' : plWei <= BigInt(0) ? '-' : '';

//   const hasFees = breakdown.rakeGiven > BigInt(0) || breakdown.operatorFeeGiven > BigInt(0);

//   return (
//     <div style={{
//       padding: '12px 16px',
//       backgroundColor: '#ffffff',
//       borderRadius: '8px',
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//       minWidth: '200px',
//     }}>
//       {/* Gross Winning Amount */}
//       <div style={{
//         display: 'flex',
//         gap: '8px',
//         justifyContent: 'space-between',
//         padding: '8px 0',
//         borderBottom: hasFees ? '1px solid #f0f0f0' : 'none',
//       }}>
//         <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89', textTransform: 'uppercase' }}>
//           GROSS WINNING AMOUNT
//         </span>
//         <span style={{ fontSize: '12px', fontWeight: 500, color: '#000' }}>
//           {grossAmount}
//         </span>
//       </div>

//       {/* Fees Section */}
//       {hasFees && (
//         <>
//           {/* Fees Header */}
//           <div style={{
//             padding: '8px 0 4px 0',
//             borderBottom: '1px solid #f0f0f0',
//           }}>
//             <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89', textTransform: 'uppercase' }}>
//               FEES
//             </span>
//           </div>

//           {/* Rake */}
//           {breakdown.rakeGiven >= BigInt(0) && (
//             <div style={{
//               display: 'flex',
//               gap: '8px',
//               justifyContent: 'space-between',
//               padding: '4px 0',
//               paddingLeft: '12px',
//             }}>
//               <span style={{ fontSize: '12px', fontWeight: 500, color: '#6C6C89' }}>
//                 Rake
//               </span>
//               <span style={{ fontSize: '12px', fontWeight: 500, color: '#ef4444' }}>
//                 -{rakeAmount}
//               </span>
//             </div>
//           )}

//           {/* Operator Fee */}
//           {breakdown.operatorFeeGiven >= BigInt(0) && (
//             <div style={{
//               display: 'flex',
//               gap: '8px',
//               justifyContent: 'space-between',
//               padding: '4px 0',
//               paddingLeft: '12px',
//             }}>
//               <span style={{ fontSize: '12px', fontWeight: 500, color: '#6C6C89' }}>
//                 Operator Fee
//               </span>
//               <span style={{ fontSize: '12px', fontWeight: 500, color: '#ef4444' }}>
//                 -{operatorFeeAmount}
//               </span>
//             </div>
//           )}

//           {/* Total Deduction */}
//           {totalDeduction > BigInt(0) && (
//             <div style={{
//               display: 'flex',
//               gap: '8px',
//               justifyContent: 'space-between',
//               padding: '4px 0 8px 0',
//               paddingLeft: '12px',
//               borderBottom: '1px solid #f0f0f0',
//             }}>
//               <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89' }}>
//                 Total Deduction
//               </span>
//               <span style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444' }}>
//                 -{totalDeductionAmount}
//               </span>
//             </div>
//           )}
//         </>
//       )}

//       {/* Net Winning Amount */}
//       <div style={{
//         display: 'flex',
//         gap: '8px',
//         justifyContent: 'space-between',
//         padding: '8px 0',
//       }}>
//         <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89', textTransform: 'uppercase' }}>
//           NET WINNING AMOUNT
//         </span>
//         <span style={{ fontSize: '12px', fontWeight: 700, color: '#000' }}>
//           {netAmount}
//         </span>
//       </div>

//       {/* P/L */}
//       <div style={{
//           display: 'flex',
//           gap: '8px',
//           justifyContent: 'space-between',
//           padding: '8px 0',
//           backgroundColor: '#f3e8ff',
//           margin: '8px -16px -12px -16px',
//           paddingLeft: '16px',
//           paddingRight: '16px',
//           borderRadius: '0 0 8px 8px',
//         }}>
//           <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89', textTransform: 'uppercase' }}>
//             P/L
//           </span>
//           <span style={{ 
//             fontSize: '12px', 
//             fontWeight: 700, 
//             color: plWei >= BigInt(0) ? '#22c55e' : plWei <= BigInt(0) ? '#ef4444' : '#000' 
//           }}>
//             {plSign}{plAmount}
//           </span>
//         </div>
//     </div>
//   );
// };


export const PLBreakdownTooltip: React.FC<PLBreakdownProps> = ({ breakdown }) => {
  const grossAmount = formatAmount(breakdown.grossWinningAmount);
  const rakeAmount = formatAmount(breakdown.rakeGiven);
  const operatorFeeAmount = formatAmount(breakdown.operatorFeeGiven);
  const totalDeduction = breakdown.rakeGiven + breakdown.operatorFeeGiven;
  const totalDeductionAmount = formatAmount(totalDeduction);
  const netAmount = formatAmount(breakdown.netWinningAmount);
  
  const plWei = breakdown.netWinningAmount - breakdown.betAmount;
  const plAmount = formatAmount(plWei < BigInt(0) ? -plWei : plWei);
  const plSign = plWei > BigInt(0) ? '+' : plWei < BigInt(0) ? '-' : '';
  const hasFees = breakdown.rakeGiven > BigInt(0) || breakdown.operatorFeeGiven > BigInt(0);

  return (
    <div style={{
      padding: '12px 16px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      minWidth: '200px',
    }}>
      {/* Gross Winning Amount */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: hasFees ? '1px solid #f0f0f0' : 'none',
      }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89', textTransform: 'uppercase' }}>
          GROSS WINNING AMOUNT
        </span>
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#000' }}>
          {grossAmount}
        </span>
      </div>

      {/* Fees Section */}
      {hasFees && (
        <>
          {/* Fees Header */}
          <div style={{
            padding: '8px 0 4px 0',
            borderBottom: '1px solid #f0f0f0',
          }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89', textTransform: 'uppercase' }}>
              FEES
            </span>
          </div>

          {/* Rake */}
          {breakdown.rakeGiven >= BigInt(0) && (
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'space-between',
              padding: '4px 0',
              paddingLeft: '12px',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#6C6C89' }}>
                Rake
              </span>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#ef4444' }}>
                -{rakeAmount}
              </span>
            </div>
          )}

          {/* Operator Fee */}
          {breakdown.operatorFeeGiven >= BigInt(0) && (
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'space-between',
              padding: '4px 0',
              paddingLeft: '12px',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#6C6C89' }}>
                Operator Fee
              </span>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#ef4444' }}>
                -{operatorFeeAmount}
              </span>
            </div>
          )}

          {/* Total Deduction */}
          {totalDeduction > BigInt(0) && (
            <div style={{
              display: 'flex',
              gap: '8px',
              justifyContent: 'space-between',
              padding: '4px 0 8px 0',
              paddingLeft: '12px',
              borderBottom: '1px solid #f0f0f0',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89' }}>
                Total Deduction
              </span>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#ef4444' }}>
                -{totalDeductionAmount}
              </span>
            </div>
          )}
        </>
      )}

      {/* Net Winning Amount */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        padding: '8px 0',
      }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89', textTransform: 'uppercase' }}>
          NET WINNING AMOUNT
        </span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#000' }}>
          {netAmount}
        </span>
      </div>

      {/* P/L */}
      <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'space-between',
          padding: '8px 0',
          backgroundColor: '#f3e8ff',
          margin: '8px -16px -12px -16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          borderRadius: '0 0 8px 8px',
        }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#6C6C89', textTransform: 'uppercase' }}>
            P/L
          </span>
          <span style={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            color: plWei > BigInt(0) ? '#22c55e' : plWei < BigInt(0) ? '#ef4444' : '#000' 
          }}>
            {plSign}{plAmount}
          </span>
        </div>
    </div>
  );
};

