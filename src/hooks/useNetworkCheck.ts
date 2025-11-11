import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { baseSepolia } from 'viem/chains';
import { useEffect } from 'react';

export function useNetworkCheck() {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const isCorrectNetwork = chainId === baseSepolia.id;

  useEffect(() => {
    if (isConnected && !isCorrectNetwork && switchChain) {
      // Automatically attempt to switch to Base Sepolia
      switchChain({ chainId: baseSepolia.id });
    }
  }, [isConnected, isCorrectNetwork, switchChain]);

  return {
    isCorrectNetwork,
    currentChainId: chainId,
    expectedChainId: baseSepolia.id,
    switchToCorrectNetwork: () => switchChain?.({ chainId: baseSepolia.id }),
  };
}
