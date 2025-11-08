import { useReadContract } from 'wagmi';
import { erc20Abi } from '../utils/erc20Abi';
import { DARK_TOKEN_ADDRESS } from '../utils/constants';

export function useTokenDecimals() {
  const { data: decimals, isLoading } = useReadContract({
    address: DARK_TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: 'decimals',
  });

  return {
    decimals: decimals as number | undefined,
    isLoading,
  };
}
