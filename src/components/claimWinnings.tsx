import React, { useEffect, useState } from 'react';
import { useAccount, useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import * as constants from 'utils/constants';
import { contractABI } from 'utils/abi';

type ClaimWinningProps = {
  roundNumber: number;
  onClaimWinningsStateChange: (state: string) => void;
}

export const ClaimWinnings: React.FC<ClaimWinningProps> = ({ roundNumber, onClaimWinningsStateChange}) => {
  const { isConnected, address } = useAccount()
  const [hash, setHash] = useState<string | null>(null)

  // Call simulation hook with disabled state 
  const { refetch: simulateContract } = useSimulateContract({
    address: constants.CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: constants.CONTRACT_METHOD_CLAIM_WINNINGS, 
    args: [[roundNumber ?? 0]],
    account: address,
    query: { enabled: false }
  })

  // call write contract hook to get writeContractAsync action to be called after simulation
  const { writeContractAsync, error: writeError} = useWriteContract()
  const { status: transactionStatus, error: transactionError, data: transactionData} = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`
  })

  // wait for transaction status changes
  useEffect(() => {
    if(transactionStatus === 'success')
    {
      onClaimWinningsStateChange(`Winning claim for round:${roundNumber} successful with gas:${transactionData?.gasUsed}`);

    } else if(transactionStatus === 'error')
    {
      onClaimWinningsStateChange(`Winning claim for round:${roundNumber} failed with error:${transactionError?.message}`);
    }
  },[onClaimWinningsStateChange, transactionStatus, roundNumber, transactionData, transactionError])

  // handler called when bet button is clicked
  const handleClaimWinnings = async () => {
    try {
      onClaimWinningsStateChange(`Claim winnings for round:${roundNumber} called`)

      // Simulate contract
      const { data: localSimulateData, error: simulateError } = await simulateContract()
      if (simulateError || !localSimulateData?.request) {
        onClaimWinningsStateChange(`Claim winnings for round:${roundNumber} failed with error:${simulateError?.message}`)
        return;
      }
      else {
        onClaimWinningsStateChange(`Claim winnings for round:${roundNumber} started`)
      }

      // Write contract
      const writeResult = await writeContractAsync(localSimulateData.request);
      if (!writeResult) {
        onClaimWinningsStateChange(`Claim winnigs for round:${roundNumber} failed with error:${writeError}`);
      }
      else {
        setHash(writeResult)
        onClaimWinningsStateChange(`Claim winnigs for round:${roundNumber} success with hash:${writeResult}`)
      }
    } catch (error) {
      onClaimWinningsStateChange(`Claim winnings for round:${roundNumber} failed with error:${error}`)
    }
  }

  if (!isConnected) {
    return null;
  } else {
    return (
      <div>
        <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded' onClick={handleClaimWinnings}>Claim Winnigs</button>
      </div>
    )
  }
}

