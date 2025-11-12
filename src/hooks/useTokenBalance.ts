import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi } from '../utils/erc20Abi';
import { DARK_TOKEN_ADDRESS, TOKEN_DECIMALS } from '../utils/constants';
import { formatAmount } from 'utils/formatter-ui';

export function useTokenBalance() {
  const { address } = useAccount();

  const { data: balance, isLoading, refetch } = useReadContract({
    address: DARK_TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const formattedBalance = balance
    ? formatAmount(balance as bigint, TOKEN_DECIMALS, true) as string
    : '0';

  return {
    balance: balance as bigint | undefined,
    formattedBalance,
    isLoading,
    refetch,
  };
}
