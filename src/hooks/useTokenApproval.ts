import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { erc20Abi } from '../utils/erc20Abi';
import { QIE_TOKEN_ADDRESS, CONTRACT_ADDRESS, MAX_UINT256 } from '../utils/constants';
import { useState, useEffect } from 'react';

export function useTokenApproval() {
  const { address } = useAccount();
  const [approvalHash, setApprovalHash] = useState<`0x${string}` | null>(null);
  const [isApproving, setIsApproving] = useState(false);

  // Check current allowance
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: QIE_TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESS as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Write contract for approval
  const { writeContractAsync } = useWriteContract();

  // Monitor approval transaction
  const {
    status: approvalStatus,
    isSuccess: isApprovalSuccess,
    isError: isApprovalError,
  } = useWaitForTransactionReceipt({
    hash: approvalHash as `0x${string}` | undefined,
  });

  // Reset approval state when transaction completes
  useEffect(() => {
    if (isApprovalSuccess) {
      setIsApproving(false);
      setApprovalHash(null);
      refetchAllowance();
    }
    if (isApprovalError) {
      setIsApproving(false);
      setApprovalHash(null);
    }
  }, [isApprovalSuccess, isApprovalError, refetchAllowance]);

  // Check if approval is sufficient for a given amount
  const isApproved = (requiredAmount?: bigint) => {
    if (!allowance) return false;
    if (!requiredAmount) return (allowance as bigint) > BigInt(0);
    return (allowance as bigint) >= requiredAmount;
  };

  // Request unlimited approval
  const approve = async () => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    try {
      setIsApproving(true);
      const hash = await writeContractAsync({
        address: QIE_TOKEN_ADDRESS as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [CONTRACT_ADDRESS as `0x${string}`, BigInt(MAX_UINT256)],
      });
      setApprovalHash(hash);
      return hash;
    } catch (error) {
      setIsApproving(false);
      throw error;
    }
  };

  return {
    allowance: allowance as bigint | undefined,
    isApproved,
    approve,
    isApproving,
    approvalStatus,
    refetchAllowance,
  };
}
