import { useReadContract, useAccount } from 'wagmi';
import { erc20Abi, DARK_TOKEN_ADDRESS } from 'utils/tokenConstants';
import { CONTRACT_ADDRESS } from 'utils/constants';

export function useDarkAllowance() {
  const { address, isConnected } = useAccount();

  const { data: allowance, isLoading, refetch } = useReadContract({
    address: DARK_TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESS as `0x${string}`] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  return {
    allowance: allowance as bigint | undefined,
    isLoading,
    refetch,
  };
}
