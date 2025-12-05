import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { qieTestnet } from './qieChain';

export const publicClient = createPublicClient({
  chain: qieTestnet,
  transport: http('https://rpc1testnet.qie.digital'),
});

let walletClient;
if (typeof window !== 'undefined' && window.ethereum) {
  walletClient = createWalletClient({
    chain: qieTestnet,
    transport: custom(window.ethereum),
  });
}

export { walletClient };

export async function getAccount() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Wallet not connected');
  }

  const [address] = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  return address;
}
