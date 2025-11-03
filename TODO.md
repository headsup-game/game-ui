# ⚠️ REQUIRED ACTIONS BEFORE DEPLOYMENT

## Critical Items (Must Update)

### 1. $DARK Token Address
**File**: `src/utils/tokenConstants.ts`
```typescript
export const DARK_TOKEN_ADDRESS = '0x...'; // ⚠️ UPDATE THIS
```
**Who**: Backend team must provide this
**Priority**: 🔴 CRITICAL

---

### 2. PulseChain Contract Address
**File**: `src/utils/constants.ts`
```typescript
export const CONTRACT_ADDRESS = '0x...'; // ⚠️ UPDATE THIS
```
**Who**: Backend team must provide this
**Priority**: 🔴 CRITICAL

---

### 3. Contract ABI Update
**File**: `src/utils/abi.json` or `src/utils/abi.ts`
**What**: Replace entire ABI with new PulseChain contract ABI
**Who**: Backend team must provide this
**Priority**: 🔴 CRITICAL

**Expected Changes in ABI**:
- `enterApes` and `enterPunks` functions should:
  - Change from `payable` to `nonpayable`
  - Add `amount` parameter (uint256)

---

### 4. GraphQL Indexer URL
**File**: `src/apolloClient.ts`
```typescript
uri: 'https://headsup-pulsechain-indexer.up.railway.app/', // ⚠️ UPDATE THIS
```
**Who**: Backend team must provide actual URL
**Priority**: 🔴 CRITICAL

---

### 5. WalletConnect Project ID
**File**: `src/wagmiConfig.ts`
```typescript
projectId: 'YOUR_PROJECT_ID', // ⚠️ UPDATE THIS
```
**Who**: Frontend team
**How**: Get from https://cloud.walletconnect.com/
**Priority**: 🟡 HIGH

---

## Optional Updates

### 6. Token Decimals Verification
**File**: `src/utils/tokenConstants.ts`
```typescript
export const DARK_TOKEN_DECIMALS = 18; // Confirm with $DARK specs
```
**Default**: 18 (standard for most tokens)
**Priority**: 🟢 LOW (only if $DARK uses different decimals)

---

### 7. PulseChain Icon URL
**File**: `src/wagmiConfig.ts`
```typescript
iconUrl: 'https://pulsechain.com/images/pulse-icon.png', // Better quality icon
```
**Priority**: 🟢 LOW (cosmetic)

---

### 8. Switch to Testnet for Testing
**File**: `src/wagmiConfig.ts`
```typescript
// Change this line for testing:
chains: [pulsechainTestnet], // Use testnet first!
```
**Priority**: 🟡 HIGH (for safe testing)

---

## Verification Checklist

Before deploying to production:

### Backend Prerequisites:
- [ ] PulseChain contract deployed and verified
- [ ] Contract address provided to frontend team
- [ ] Contract ABI exported and shared
- [ ] $DARK token address confirmed
- [ ] Indexer deployed and running on PulseChain
- [ ] Indexer GraphQL endpoint accessible
- [ ] Indexer tracking $DARK token events

### Frontend Updates:
- [ ] All 8 items above updated
- [ ] Code compiles without errors
- [ ] Tested on PulseChain testnet
- [ ] Token approval flow tested
- [ ] Betting flow tested
- [ ] Balance display works
- [ ] Pool amounts display correctly
- [ ] Auto-play tested with approvals

### Testing on Testnet:
- [ ] Connect wallet to PulseChain testnet
- [ ] Get test $DARK tokens
- [ ] Get test PLS for gas
- [ ] Approve $DARK token
- [ ] Place test bet
- [ ] Verify bet appears in game
- [ ] Test claiming winnings
- [ ] Test leaderboard display
- [ ] Test recent bets display

---

## Quick Start Commands

### Install Dependencies:
```bash
npm install
# or
yarn install
```

### Run Development Server:
```bash
npm run dev
# or
yarn dev
```

### Build for Production:
```bash
npm run build
# or
yarn build
```

### Generate GraphQL Types (after updating endpoint):
```bash
npm run codegen
# or
yarn codegen
```

---

## Current Implementation Status

✅ **Completed**:
- Network configuration (PulseChain)
- Token hooks (balance & allowance)
- Approval flow implementation
- UI updates (labels, displays)
- Betting logic updated
- Documentation created

⚠️ **Pending** (requires backend):
- Contract address
- Contract ABI
- Token address
- Indexer endpoint
- Final testing

---

## Contact Points

### Backend Team Needs To Provide:
1. New PulseChain contract address
2. Updated contract ABI (JSON format)
3. $DARK token contract address on PulseChain
4. GraphQL indexer endpoint URL
5. Confirmation that indexer tracks ERC20 events

### Frontend Team Needs To Do:
1. Update all placeholder addresses/URLs
2. Get WalletConnect project ID
3. Test on testnet thoroughly
4. Deploy to production
5. Monitor for issues

---

## Deployment Sequence

1. ✅ **Code Changes** - DONE
2. ⚠️ **Backend Deployment** - WAITING
3. 🔄 **Update Config Values** - NEXT
4. 🔄 **Test on Testnet** - NEXT
5. 🔄 **Production Deployment** - LAST

---

## Risk Assessment

### High Risk Items:
- ❌ Token address wrong → Users can't bet
- ❌ Contract address wrong → Transactions fail
- ❌ ABI mismatch → Contract calls fail
- ❌ Indexer URL wrong → No game data loads

### Medium Risk Items:
- ⚠️ Decimals wrong → Wrong amounts displayed
- ⚠️ Approval not working → Users can't bet
- ⚠️ RPC issues → Network connection problems

### Low Risk Items:
- ✅ Icon missing → Cosmetic only
- ✅ WalletConnect → Can connect without it

---

## Emergency Rollback Plan

If production deployment fails:

1. Revert to Monad Testnet configuration:
   ```typescript
   // In wagmiConfig.ts
   chains: [monadTestnet]
   ```

2. Revert apolloClient.ts to old indexer URL

3. Revert bet.tsx to remove approval logic (use git)

4. Redeploy immediately

---

**Next Action**: Wait for backend team to provide required values, then update all 🔴 CRITICAL items.
