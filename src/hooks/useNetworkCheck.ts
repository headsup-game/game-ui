import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { qieTestnet } from '../utils/qieChain';
import { useEffect } from 'react';

export function useNetworkCheck() {
  const chainId = useChainId();
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const isCorrectNetwork = chainId === qieTestnet.id;

  useEffect(() => {
    if (isConnected && !isCorrectNetwork && switchChain) {
      // Automatically attempt to switch to QIE Testnet
      switchChain({ chainId: qieTestnet.id });
    }
  }, [isConnected, isCorrectNetwork, switchChain]);

  return {
    isCorrectNetwork,
    currentChainId: chainId,
    expectedChainId: qieTestnet.id,
    switchToCorrectNetwork: () => switchChain?.({ chainId: qieTestnet.id }),
  };
}
