# 🔴 BACKEND TEAM - REQUIRED INFORMATION

## Critical Information Needed Before Deployment

This document lists exactly what the frontend team needs from the backend team to complete the PulseChain migration.

---

## 1️⃣ PulseChain Smart Contract Address

**What**: Deployed HeadsUp contract address on PulseChain
**Format**: `0x...` (42 characters)
**Example**: `0x1234567890123456789012345678901234567890`

**Where to Update**: `src/utils/constants.ts`
```typescript
export const CONTRACT_ADDRESS = 'PASTE_ADDRESS_HERE';
```

**Verification**:
- Contract should be verified on PulseScan
- Should have the new ERC20 token betting functions
- Should NOT be payable (no ETH accepted)

---

## 2️⃣ $DARK Token Contract Address

**What**: Official $DARK token address on PulseChain
**Format**: `0x...` (42 characters)
**Example**: `0xABCDEF1234567890ABCDEF1234567890ABCDEF12`

**Where to Update**: 
1. `src/utils/tokenConstants.ts`
```typescript
export const DARK_TOKEN_ADDRESS = 'PASTE_TOKEN_ADDRESS_HERE';
```

2. `src/utils/constants.ts`
```typescript
export const DARK_TOKEN_ADDRESS = 'PASTE_TOKEN_ADDRESS_HERE';
```

**Verification**:
- Token should be verified on PulseScan
- Should have standard ERC20 functions
- Confirm token decimals (default assumption: 18)

---

## 3️⃣ Contract ABI (Application Binary Interface)

**What**: Complete ABI of the new HeadsUp contract
**Format**: JSON array
**File**: `src/utils/abi.json` or `src/utils/abi.ts`

### Required Changes in ABI:

#### enterApes Function (MUST CHANGE):
```json
{
  "name": "enterApes",
  "type": "function",
  "stateMutability": "nonpayable",
  "inputs": [
    {
      "name": "roundNumber",
      "type": "uint256"
    },
    {
      "name": "amount",
      "type": "uint256"
    }
  ],
  "outputs": []
}
```

#### enterPunks Function (MUST CHANGE):
```json
{
  "name": "enterPunks",
  "type": "function",
  "stateMutability": "nonpayable",
  "inputs": [
    {
      "name": "roundNumber",
      "type": "uint256"
    },
    {
      "name": "amount",
      "type": "uint256"
    }
  ],
  "outputs": []
}
```

#### enterBatch Function (MUST CHANGE):
```json
{
  "name": "enterBatch",
  "type": "function",
  "stateMutability": "nonpayable",
  "inputs": [
    {
      "name": "roundNumber",
      "type": "uint256"
    },
    {
      "name": "amount",
      "type": "uint256"
    }
  ],
  "outputs": []
}
```

#### claim Function (Verify):
```json
{
  "name": "claim",
  "type": "function",
  "stateMutability": "nonpayable",
  "inputs": [
    {
      "name": "roundNumbers",
      "type": "uint256[]"
    }
  ],
  "outputs": []
}
```

**Key Points**:
- ❌ Remove `"stateMutability": "payable"`
- ✅ Change to `"stateMutability": "nonpayable"`
- ✅ Add `amount` parameter as second input
- ✅ Amount should be `uint256` type

---

## 4️⃣ GraphQL Indexer Endpoint

**What**: URL for the PulseChain indexer
**Format**: `https://...`
**Example**: `https://headsup-pulsechain-indexer.up.railway.app/`

**Where to Update**: `src/apolloClient.ts`
```typescript
export const client = new ApolloClient({
  uri: 'PASTE_INDEXER_URL_HERE',
  cache: new InMemoryCache(),
});
```

**Requirements**:
- Must be accessible via HTTPS
- Must support GraphQL queries
- Must track ERC20 transfer events for $DARK
- Must track contract events (bets, wins, claims)
- Must update in near real-time

**Test Query** (to verify indexer works):
```graphql
query GetCurrentRound {
  rounds(orderBy: "epoch", orderDirection: "desc", limit: 1) {
    items {
      epoch
      apesPot
      punksPot
      totalAmount
    }
  }
}
```

---

## 5️⃣ Token Configuration Verification

**What**: Confirm these $DARK token properties

| Property | Expected | Verify |
|----------|----------|--------|
| Decimals | 18 | ☐ Confirmed |
| Symbol | DARK | ☐ Confirmed |
| Name | Dark Token | ☐ Confirmed |
| Transferable | Yes | ☐ Confirmed |

**If decimals are NOT 18**, update:
`src/utils/tokenConstants.ts`
```typescript
export const DARK_TOKEN_DECIMALS = 18; // Change if different
```

---

## 6️⃣ Smart Contract Requirements

The deployed contract MUST have these features:

### Token Handling:
- [ ] Accepts $DARK token address in constructor OR hardcoded
- [ ] Uses `transferFrom` to pull tokens from users
- [ ] Handles token decimals correctly
- [ ] Stores $DARK tokens for pool
- [ ] Distributes $DARK tokens to winners

### Function Signatures:
- [ ] `enterApes(uint256 roundNumber, uint256 amount)`
- [ ] `enterPunks(uint256 roundNumber, uint256 amount)`
- [ ] `enterBatch(uint256 roundNumber, uint256 amount)`
- [ ] `claim(uint256[] roundNumbers)`

### Events:
- [ ] Emits events with token amounts (not ETH values)
- [ ] Events include roundNumber, player, amount, team

### Permissions:
- [ ] Contract has NO `receive()` or `fallback()` for ETH
- [ ] Contract does NOT accept ETH in betting functions

---

## 7️⃣ Indexer Requirements

The indexer MUST track:

### ERC20 Events:
- [ ] `Transfer` events from $DARK token contract
- [ ] Filter for transfers TO the HeadsUp contract
- [ ] Filter for transfers FROM the HeadsUp contract

### Contract Events:
- [ ] Bet placed events (with token amounts)
- [ ] Round started events
- [ ] Round ended events
- [ ] Winner declared events
- [ ] Claim events

### Data Structure:
Pool amounts should be in **token wei** (not ETH wei):
```typescript
{
  apesPot: "1000000000000000000", // 1 DARK in wei
  punksPot: "2000000000000000000", // 2 DARK in wei
  totalAmount: "3000000000000000000" // 3 DARK in wei
}
```

---

## 8️⃣ Testing Tokens

**For PulseChain Testnet Testing**:

Please provide:
- [ ] Test $DARK tokens (faucet or airdrop)
- [ ] Test PLS for gas fees
- [ ] Testnet contract address
- [ ] Testnet indexer endpoint

**Amounts Needed**:
- ~100 test $DARK per tester
- ~10 test PLS per tester

---

## 9️⃣ Network Information

Confirm PulseChain details:

| Item | Expected | Verify |
|------|----------|--------|
| Mainnet Chain ID | 369 | ☐ Confirmed |
| Testnet Chain ID | 943 | ☐ Confirmed |
| Mainnet RPC | https://rpc.pulsechain.com | ☐ Confirmed |
| Testnet RPC | https://rpc.v4.testnet.pulsechain.com | ☐ Confirmed |
| Block Explorer | https://scan.pulsechain.com | ☐ Confirmed |

---

## 🔟 Documentation to Provide

Please share:

1. **Contract Documentation**:
   - Function descriptions
   - Parameter explanations
   - Event descriptions
   - Security considerations

2. **Indexer Documentation**:
   - Available queries
   - Schema definitions
   - Rate limits (if any)
   - WebSocket support (if any)

3. **Token Documentation**:
   - Token contract link
   - Tokenomics (if relevant)
   - Where to acquire $DARK
   - Token security audit (if available)

---

## 📋 Delivery Checklist

When providing information, please include:

### Smart Contract Package:
```
- contract_address.txt (PulseChain address)
- contract_abi.json (Full ABI)
- contract_verification_link.txt (PulseScan link)
- deployment_tx.txt (Deployment transaction hash)
```

### Token Package:
```
- dark_token_address.txt
- dark_token_decimals.txt
- dark_token_contract_link.txt
- how_to_get_dark.txt
```

### Indexer Package:
```
- indexer_url.txt
- indexer_schema.graphql
- example_queries.graphql
- indexer_status_endpoint.txt (health check)
```

### Testing Package:
```
- testnet_contract_address.txt
- testnet_indexer_url.txt
- testnet_faucet_links.txt
- test_dark_token_address.txt
```

---

## 🚨 Critical Path Items

These are blocking deployment:

| Priority | Item | Status |
|----------|------|--------|
| 🔴 P0 | Contract Address | ⚠️ Needed |
| 🔴 P0 | Contract ABI | ⚠️ Needed |
| 🔴 P0 | $DARK Token Address | ⚠️ Needed |
| 🔴 P0 | Indexer URL | ⚠️ Needed |
| 🟡 P1 | Testnet Contract | ⚠️ Needed |
| 🟡 P1 | Test Tokens | ⚠️ Needed |
| 🟢 P2 | Documentation | ⚠️ Nice to have |

**P0 items must be provided before ANY testing can begin!**

---

## 📞 Contact & Communication

### Questions to Clarify:

1. **Token Approval**: Does contract expect infinite approval or exact amounts?
2. **Gas Sponsorship**: Any plans for gasless transactions?
3. **Multi-Round Bets**: Does `enterBatch` work with token amounts?
4. **Claiming**: Does claim function handle $DARK correctly?
5. **Events**: Are all events emitting token amounts?

### Response Format:

Please respond with:
```
Contract Address: 0x...
Token Address: 0x...
Indexer URL: https://...
ABI: [attached as file]
Additional Notes: ...
```

---

## ✅ Verification Steps

Once you provide the information:

1. Frontend team will update all values
2. Run TypeScript compilation
3. Test on PulseChain testnet
4. Verify token approval works
5. Verify betting works
6. Verify claiming works
7. Check all displays correct
8. Run full integration test
9. Deploy to production

**Estimated turnaround**: 2-4 hours after receiving all info

---

## 🎯 Success Criteria

Deployment is ready when:

- ✅ All P0 items provided
- ✅ Contract verified on PulseScan
- ✅ Token transfer works
- ✅ Indexer responding to queries
- ✅ Test bet completes successfully
- ✅ Balances update correctly
- ✅ UI displays token amounts properly

---

## 📅 Timeline Expectations

| Phase | Duration | Prerequisites |
|-------|----------|---------------|
| Backend provides info | N/A | This document |
| Frontend updates code | 1 hour | All P0 items |
| Testnet testing | 2-4 hours | Test tokens |
| Bug fixes | 2-4 hours | Issue reports |
| Production deploy | 1 hour | Testnet pass |
| Monitoring | Ongoing | Deployment |

**Total**: ~1-2 days from info received to production

---

**Please provide the information ASAP so we can proceed with testing and deployment!**

**Contact**: Reply with all items in one message for fastest turnaround.

---

**Last Updated**: November 3, 2025
**Status**: ⏳ Awaiting Backend Response
