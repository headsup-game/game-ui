import { createPublicClient, createWalletClient, http, parseAbiItem, parseEther } from 'viem';
import { mainnet } from 'wagmi/chains';
import { getWalletClient } from '@wagmi/core';
import { config } from 'app/components/RainbowKit';
import { useWalletClient } from 'wagmi';
import { getAccount, publicClient, walletClient } from './client';
import { contractABI } from './abi';

const contractAddress = '0x38bDa9F9bEF0C468f2E00E2B7892157fB6A249d5';

export interface cardDTO {
  suit: number;
  rank: number;
}

export const getPlayerCardsFromContract = async (round) => {
  try {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getPlayerCards',
      args: [round],
    });
    return data as readonly [readonly cardDTO[], readonly cardDTO[]];
  } catch (error) {
    console.error('Error getting player cards from contract:', error);
    throw error;
  }
};

export const getCommunityCardsFromContract = async (round: bigint) => {
  try {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getCommunityCards',
      args: [round],
    });
    return data as readonly cardDTO[];
  } catch (error) {
    console.error('Error getting community cards from contract:', error);
    throw error;
  }
};

export const getWinnerFromContract = async (round) => {
  try {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'winner',
      args: [round],
    });
    return data as number;
  } catch (error) {
    console.error('Error getting winner from contract:', error);
    throw error;
  }
};

export const betOnPlayerAInContract = async (amount: string, round: bigint) => {
    try {
      const account = await getAccount();
      if (!walletClient) {
        throw new Error('Wallet client not initialized');
      }
      const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'betOnPlayerA',
        args: [round],
        value: parseEther(amount),
        account,
      });
      const hash = await walletClient.writeContract(request);
      return hash;
    } catch (error) {
      console.error('Error betting on Player A:', error);
      throw error;
    }
  };

export const betOnPlayerBInContract = async (amount: string, round: bigint) => {
  try {
    const address = await getAccount();
    if (!address) {
        throw new Error('Account is undefined');
      }
    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'betOnPlayerB',
      args: [round],
      value: parseEther(amount),
      account: address,
    });
    const hash = await walletClient.writeContract(request)
    return hash;
  } catch (error) {
    console.error('Error betting on Player B:', error);
    throw error;
  }
};

export const claimWinningsFromContract = async (round: bigint) => {
  try {
    const account = await getAccount();
    const tx = await walletClient.writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'claim',
      args: [[round]],
      account,
    });
    return tx;
  } catch (error) {
    console.error('Error claiming winnings:', error);
    throw error;
  }
};

export const getCurrentEpochFromContract = async () => {
  try {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'currentEpoch',
    });
    return data as bigint;
  } catch (error) {
    console.error('Error getting current epoch from contract:', error);
    throw error;
  }
};

export const getMinEntryFromContract = async () => {
  try {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'minEntry',
    });
    return data as bigint;
  } catch (error) {
    console.error('Error getting minimum entry from contract:', error);
    throw error;
  }
};

export const getGameInfoFromContract = async () => {
    return [0, 1, 1, 1];
//   try {
//     const data = await publicClient.readContract({
//       address: contractAddress,
//       abi: contractABI,
//       functionName: 'getGameInfo'
//     });
//     return data as [bigint, bigint, bigint, bigint]; // gameState, currentRoundNumber, totalBetsOnPlayerA, totalBetsOnPlayerB
//   } catch (error) {
//     console.error('Error getting game info from contract:', error);
//     throw error;
//   }
};
