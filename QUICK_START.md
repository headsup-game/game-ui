# 🚀 Quick Start Guide - PulseChain Migration

## For the Impatient Developer 😄

### What Changed?
We migrated from **Monad Testnet + ETH** → **PulseChain + $DARK token**

### What You Need To Do RIGHT NOW

#### 1. Update These 4 Critical Files:

**File 1**: `src/utils/tokenConstants.ts`
```typescript
export const DARK_TOKEN_ADDRESS = '0x...'; // ← GET FROM BACKEND
```

**File 2**: `src/utils/constants.ts`
```typescript
export const CONTRACT_ADDRESS = '0x...'; // ← GET FROM BACKEND
```

**File 3**: `src/apolloClient.ts`
```typescript
uri: 'https://...', // ← GET FROM BACKEND
```

**File 4**: `src/utils/abi.json` or `src/utils/abi.ts`
```
← REPLACE ENTIRE FILE WITH NEW ABI FROM BACKEND
```

#### 2. Get WalletConnect ID (5 minutes):
1. Go to https://cloud.walletconnect.com/
2. Create project
3. Copy Project ID
4. Update `src/wagmiConfig.ts`:
```typescript
projectId: 'YOUR_PROJECT_ID', // ← PASTE HERE
```

#### 3. Test Locally:
```bash
npm run dev
# or
yarn dev
```

#### 4. Test on PulseChain Testnet:
- Change `chains: [pulsechain]` to `chains: [pulsechainTestnet]` in wagmiConfig.ts
- Get test tokens from backend team
- Test the flow:
  1. Connect wallet
  2. Approve $DARK
  3. Place bet
  4. Check balance updates

#### 5. Deploy:
```bash
npm run build
npm start
```

---

## What Was Implemented

### ✅ Done:
- Network config (PulseChain)
- Token hooks (balance & allowance)
- Approval flow
- All UI updates
- Documentation

### ⚠️ Needs Backend:
- Contract address
- Token address
- Contract ABI
- Indexer URL

---

## File Structure

```
src/
├── hooks/              [NEW]
│   ├── useDarkBalance.ts
│   └── useDarkAllowance.ts
├── utils/
│   ├── tokenConstants.ts  [NEW]
│   ├── constants.ts      [MODIFIED]
│   └── abi.ts/json       [NEEDS UPDATE]
├── components/
│   └── bet.tsx          [MODIFIED - approval flow]
├── app/
│   ├── game/
│   │   ├── BetForm.tsx  [MODIFIED - balance display]
│   │   └── GameCards.tsx [MODIFIED - labels]
│   └── layout.tsx       [MODIFIED - metadata]
├── wagmiConfig.ts       [MODIFIED - PulseChain]
└── apolloClient.ts      [MODIFIED - endpoint]
```

---

## Testing Checklist

Minimum tests before going live:

- [ ] Wallet connects to PulseChain
- [ ] $DARK balance shows correctly
- [ ] Approve button appears
- [ ] Approval transaction works
- [ ] Button changes after approval
- [ ] Bet transaction works
- [ ] Pool amounts show DARK not ETH
- [ ] Auto-play doesn't break

---

## Common Issues

**"Cannot find module 'hooks/useDarkBalance'"**
→ Check tsconfig.json has `"baseUrl": "./src"`

**"Token balance not showing"**
→ Check DARK_TOKEN_ADDRESS is correct

**"Approval fails"**
→ Check user has PLS for gas

**"Transaction fails"**
→ Check contract ABI matches deployed contract

---

## Need Help?

1. Check `MIGRATION_GUIDE.md` for detailed explanations
2. Check `TODO.md` for action items
3. Check `BACKEND_REQUIREMENTS.md` for what backend needs to provide
4. Check `IMPLEMENTATION_SUMMARY.md` for technical details

---

## TL;DR

1. Get 4 things from backend (addresses, ABI, URL)
2. Update 4 files
3. Get WalletConnect ID
4. Test locally
5. Test on testnet
6. Deploy to production
7. 🎉

**Time needed**: 2-3 hours (after backend provides info)

---

**Current Status**: Code ready, waiting for backend values

**Next Action**: Send `BACKEND_REQUIREMENTS.md` to backend team
