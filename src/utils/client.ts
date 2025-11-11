import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { monadTestnet } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});

let walletClient;
if (typeof window !== 'undefined' && window.ethereum) {
  walletClient = createWalletClient({
    chain: monadTestnet,
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
