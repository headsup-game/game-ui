import React, { useEffect, useState } from 'react';
import { useAccount, useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import * as constants from 'utils/constants';
import { contractABI } from 'utils/abi';
import { parseEther } from 'viem';
import {Button} from "antd";
import styles from "../app/game/Game.module.scss";

type BetProps = {
  playerId: number|null;
  betAmount: number;
  roundNumber: number;
  playerName: string;
  onBettingStateChange: (state: string) => void;
}

export const Bet: React.FC<BetProps> = ({ playerId, betAmount, roundNumber, playerName, onBettingStateChange }) => {
  const { isConnected, address } = useAccount()
  const [hash, setHash] = useState<string | null>(null)
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [disabled, setDisabled] = useState(true);

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

  useEffect(() => {
    if (playerId === null || betAmount === 0) {
    } else {
      setDisabled(false);
    }
  }, [playerId, betAmount]);

  // wait for transaction status changes
  useEffect(() => {
    if(transactionStatus === 'success')
    {
      onBettingStateChange(`Player Bet on ${playerName} successful with gas:${transactionData?.gasUsed}`);

    } else if(transactionStatus === 'error')
    {
      onBettingStateChange(`Player Bet on ${playerName} failed with error:${transactionError?.message}`);
    }
  },[onBettingStateChange, transactionStatus, transactionData, playerName, transactionError])

  // handler called when bet button is clicked
  const handleBetOnPlayer = async () => {
    setRequestInProgress(true);
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
    } finally {
      setRequestInProgress(false);
    }
  }

  if (!isConnected) {
    return null;
  } else {
    return (
        <Button
            type="primary"
            htmlType="submit"
            block
            className={styles.BetFormCTA}
            loading={requestInProgress}
            disabled={disabled}
            onClick={handleBetOnPlayer}
        >
          Bet on {playerName}
        </Button>
    )
  }
}

