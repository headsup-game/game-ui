import { useReadContract, useAccount } from 'wagmi';
import { erc20Abi, DARK_TOKEN_ADDRESS, DARK_TOKEN_DECIMALS } from 'utils/tokenConstants';
import { formatUnits } from 'viem';

export function useDarkBalance() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading, refetch } = useReadContract({
    address: DARK_TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  const formattedBalance = balance 
    ? formatUnits(balance as bigint, DARK_TOKEN_DECIMALS)
    : '0.0';

  return {
    balance: balance as bigint | undefined,
    formattedBalance,
    isLoading,
    refetch,
  };
}
