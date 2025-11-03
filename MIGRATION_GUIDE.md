# PulseChain & $DARK Token Migration Guide

## Overview
This document outlines the migration from **Monad Testnet with native ETH payments** to **PulseChain with $DARK ERC20 token payments**.

## 🎯 Key Changes Implemented

### 1. Network Configuration
- **File**: `src/wagmiConfig.ts`
- **Changes**: 
  - Added PulseChain mainnet configuration (Chain ID: 369)
  - Added PulseChain testnet v4 configuration (Chain ID: 943)
  - Removed Monad Testnet
  - Configured PulseChain RPC endpoints and block explorers

### 2. Token Configuration
- **New File**: `src/utils/tokenConstants.ts`
- **Purpose**: Central configuration for $DARK token
- **Contains**:
  - Token address (needs to be updated)
  - Token decimals (default: 18)
  - Token symbol ('DARK')
  - Standard ERC20 ABI

### 3. Custom Hooks for Token Operations
- **New Files**:
  - `src/hooks/useDarkBalance.ts` - Fetch user's $DARK balance
  - `src/hooks/useDarkAllowance.ts` - Check token allowance for contract

### 4. Betting Component Updates
- **File**: `src/components/bet.tsx`
- **Major Changes**:
  - Added token approval flow
  - Changed from `parseEther` to `parseUnits` for token amounts
  - Removed `value` parameter from contract calls
  - Added `amount` parameter to contract calls
  - Implemented two-step process: Approve → Bet
  - Updated button text to show "Approve $DARK" when needed
  - Auto-play now accounts for approval state

### 5. UI Updates
- **Files Updated**:
  - `src/app/game/BetForm.tsx` - Shows $DARK balance, updated labels
  - `src/app/game/GameCards.tsx` - Changed ETH to DARK in pool displays
  - `src/app/layout.tsx` - Updated page metadata

### 6. Constants Updates
- **File**: `src/utils/constants.ts`
- **Added**:
  - `DARK_TOKEN_ADDRESS` constant
  - `MAX_UINT256` for token approvals
  - TODO comments for contract address update

### 7. GraphQL Endpoint
- **File**: `src/apolloClient.ts`
- **Change**: Added TODO comment for new PulseChain indexer URL

---

## 🚨 REQUIRED UPDATES FROM BACKEND TEAM

Before deployment, you **MUST** update these values:

### 1. Token Address
**File**: `src/utils/tokenConstants.ts`
```typescript
export const DARK_TOKEN_ADDRESS = '0x...'; // ⚠️ REPLACE WITH ACTUAL $DARK TOKEN ADDRESS
```

### 2. Contract Address
**File**: `src/utils/constants.ts`
```typescript
export const CONTRACT_ADDRESS = '0x...'; // ⚠️ REPLACE WITH NEW PULSECHAIN CONTRACT ADDRESS
```

### 3. Contract ABI
**File**: `src/utils/abi.json` or `src/utils/abi.ts`
- ⚠️ Update with new PulseChain contract ABI
- Functions should accept `amount` parameter instead of using `msg.value`
- Example change:
  ```typescript
  // OLD (ETH)
  {
    name: "enterApes",
    stateMutability: "payable",
    inputs: [{ name: "roundNumber", type: "uint256" }]
  }
  
  // NEW ($DARK)
  {
    name: "enterApes",
    stateMutability: "nonpayable",
    inputs: [
      { name: "roundNumber", type: "uint256" },
      { name: "amount", type: "uint256" }
    ]
  }
  ```

### 4. GraphQL Indexer URL
**File**: `src/apolloClient.ts`
```typescript
uri: 'https://headsup-pulsechain-indexer.up.railway.app/', // ⚠️ REPLACE WITH ACTUAL URL
```

### 5. Token Decimals (if different)
**File**: `src/utils/tokenConstants.ts`
```typescript
export const DARK_TOKEN_DECIMALS = 18; // ⚠️ CONFIRM WITH $DARK TOKEN SPECS
```

### 6. RainbowKit Project ID
**File**: `src/wagmiConfig.ts`
```typescript
projectId: 'YOUR_PROJECT_ID', // ⚠️ REPLACE WITH YOUR WALLETCONNECT PROJECT ID
```

### 7. PulseChain Icon URL
**File**: `src/wagmiConfig.ts`
```typescript
iconUrl: 'https://pulsechain.com/images/pulse-icon.png', // ⚠️ UPDATE WITH ACTUAL ICON URL
```

---

## 🔄 Migration Flow

### How Betting Works Now (2-Step Process)

#### **Before (ETH)**:
1. User clicks "Bet on Apes/Punks"
2. Transaction sent with ETH value
3. Done ✅

#### **After ($DARK)**:
1. User clicks "Approve $DARK"
2. Approval transaction sent (one-time for max amount)
3. After confirmation, button changes to "Bet on Apes/Punks"
4. User clicks to place bet
5. Betting transaction sent (no approval needed again)
6. Done ✅

### Token Approval Strategy
We use **infinite approval** (`MAX_UINT256`) for better UX:
- ✅ User approves once
- ✅ No need to approve for each bet
- ✅ Saves gas on subsequent bets

If you prefer **exact amount approval**:
- Change `MAX_UINT256` to `betAmountInTokenUnits` in `bet.tsx`
- User will need to approve before each bet

---

## 🧪 Testing Checklist

### Before Production:

- [ ] Update all TODO values listed above
- [ ] Test on PulseChain testnet first
- [ ] Verify $DARK token address is correct
- [ ] Verify contract address is correct
- [ ] Test token approval flow
- [ ] Test betting after approval
- [ ] Test balance display
- [ ] Test pool amounts display correctly
- [ ] Test auto-play with token approvals
- [ ] Test claiming winnings (if affected)
- [ ] Verify GraphQL queries work with new indexer
- [ ] Test on multiple wallets (MetaMask, Rainbow, etc.)

---

## 📊 Key Technical Details

### ERC20 Token Flow
```
User → Approve $DARK → HeadsUp Contract
User → Bet ($DARK transferred) → HeadsUp Contract
Contract → Calculate Winner → Distribute $DARK
```

### Contract Calls Changed From:
```typescript
// OLD
writeContract({
  functionName: 'enterApes',
  args: [roundNumber],
  value: parseEther('0.1'), // 0.1 ETH
})
```

### To:
```typescript
// NEW
writeContract({
  functionName: 'enterApes',
  args: [roundNumber, parseUnits('0.1', 18)], // 0.1 DARK (18 decimals)
  // No value parameter!
})
```

---

## 🔐 Smart Contract Requirements

The new PulseChain contract MUST:

1. ✅ Have $DARK token address configured
2. ✅ Implement ERC20 `transferFrom` to pull tokens from users
3. ✅ Accept `amount` parameter in betting functions
4. ✅ NOT be `payable` (no ETH accepted)
5. ✅ Handle token decimal precision correctly
6. ✅ Distribute winnings in $DARK tokens
7. ✅ Emit events with token amounts

---

## 📝 Files Changed Summary

### New Files Created:
- `src/utils/tokenConstants.ts` - Token configuration
- `src/hooks/useDarkBalance.ts` - Balance hook
- `src/hooks/useDarkAllowance.ts` - Allowance hook
- `MIGRATION_GUIDE.md` - This file

### Files Modified:
- `src/wagmiConfig.ts` - Network configuration
- `src/components/bet.tsx` - Approval & betting logic
- `src/app/game/BetForm.tsx` - Balance display & labels
- `src/app/game/GameCards.tsx` - Pool display labels
- `src/utils/constants.ts` - Added token constants
- `src/apolloClient.ts` - GraphQL endpoint
- `src/app/layout.tsx` - Page metadata

### Files That Need Backend Updates:
- `src/utils/abi.json` or `src/utils/abi.ts` - Contract ABI

---

## 🚀 Deployment Steps

1. **Backend Team**:
   - Deploy contract on PulseChain
   - Deploy indexer pointing to PulseChain
   - Provide contract address, ABI, indexer URL

2. **Frontend Team**:
   - Update all TODO values in code
   - Test on PulseChain testnet
   - Fix any issues
   - Deploy to production

3. **Testing**:
   - Test all flows end-to-end
   - Verify balances update correctly
   - Check approval flow works
   - Ensure auto-play doesn't break

4. **Go Live**:
   - Monitor for errors
   - Have rollback plan ready
   - Communicate changes to users

---

## 💡 Important Notes

### Gas Considerations:
- Approval transaction costs gas (one-time)
- Betting transactions may cost less than ETH version (no value transfer overhead)
- Users need PLS for gas fees on PulseChain

### User Experience:
- First-time users will see "Approve $DARK" button
- After approval, button changes to "Bet on [Team]"
- Clear messaging about what's happening
- Balance shown in UI for transparency

### Security:
- Infinite approval is safe if contract is audited
- User can revoke approval anytime via block explorer
- Consider adding "Revoke Approval" feature in settings

---

## 🆘 Troubleshooting

### Common Issues:

**"Insufficient allowance" error**:
- User needs to approve $DARK first
- Check `useDarkAllowance` hook is working
- Verify contract address in constants

**Balance not showing**:
- Check `DARK_TOKEN_ADDRESS` is correct
- Verify RPC connection to PulseChain
- Check token has correct decimals

**Approval not working**:
- Verify user has $DARK tokens
- Check approval transaction succeeded
- Refresh allowance after approval

**Bet transaction failing**:
- User might not have enough $DARK
- Allowance might be insufficient
- Contract might not be deployed

---

## 📞 Support

For issues during migration:
1. Check all TODO items are completed
2. Verify contract ABI matches deployed contract
3. Test on testnet first
4. Check browser console for errors
5. Verify network connection to PulseChain

---

**Last Updated**: November 3, 2025
**Migration Status**: ⚠️ Pending Backend Updates
