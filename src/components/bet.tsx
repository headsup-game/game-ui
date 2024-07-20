import React, { useEffect, useState } from 'react';
import { useAccount, useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import * as constants from 'utils/constants';
import { contractABI } from 'utils/abi';
import { parseEther } from 'viem';

type BetProps = {
  playerId: number;
  betAmount: number;
  roundNumber: number;
  playerName: string;
  onBettingStateChange: (state: string) => void;
}

export const Bet: React.FC<BetProps> = ({ playerId, betAmount, roundNumber, playerName, onBettingStateChange }) => {
  const { isConnected, address } = useAccount()
  const [hash, setHash] = useState<string | null>(null)

  // Call simulation hook with disabled state 
  const { refetch: simulateContract } = useSimulateContract({
    address: constants.CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: playerId === 0 ? constants.CONTRACT_METHOD_PLAYER_A_BET : constants.CONTRACT_METHOD_PLAYER_B_BET,
    args: [roundNumber ?? 0],
    value: parseEther(betAmount.toString()),
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
      onBettingStateChange(`Player Bet on ${playerName} successful with gas:${transactionData?.gasUsed}`);

    } else if(transactionStatus === 'error')
    {
      onBettingStateChange(`Player Bet on ${playerName} failed with error:${transactionError?.message}`);
    }
  },[onBettingStateChange, transactionStatus, playerName, transactionData, transactionError])

  // handler called when bet button is clicked
  const handleBetOnPlayer = async () => {
    try {
      onBettingStateChange(`Placed Bet on ${playerName} called`)

      // Simulate contract
      const { data: localSimulateData, error: simulateError } = await simulateContract()
      if (simulateError || !localSimulateData?.request) {
        onBettingStateChange(`Player Bet on ${playerName} failed with error:${simulateError?.message}`)
        return;
      }
      else {
        onBettingStateChange(`Placed Bet on ${playerName} started`)
      }

      // Write contract
      const writeResult = await writeContractAsync(localSimulateData.request);
      if (!writeResult) {
        onBettingStateChange(`Player Bet on ${playerName} failed with error:${writeError}`);
      }
      else {
        setHash(writeResult)
        onBettingStateChange(`Player Bet on ${playerName} success with hash:${writeResult}`)
      }
    } catch (error) {
      onBettingStateChange(`Placed Bet on ${playerName} failed with error:${error}`)
    }
  }

  if (!isConnected) {
    return null;
  } else {
    return (
      <div>
        <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded' onClick={handleBetOnPlayer}>Bet on {playerName}</button>
      </div>
    )
  }
}

