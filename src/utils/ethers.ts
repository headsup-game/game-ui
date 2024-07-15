import { createPublicClient, createWalletClient, http } from 'viem';
import { mainnet } from 'wagmi/chains';

const provider = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export default provider;
