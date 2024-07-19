import { createPublicClient, createWalletClient, http, parseAbiItem, parseEther } from 'viem';
import { mainnet } from 'wagmi/chains';
import { getWalletClient } from '@wagmi/core';
import { useWalletClient } from 'wagmi';
import { getAccount, publicClient, walletClient } from './client';
import { contractABI } from './abi';
import { CardDto } from '../interfaces/cardDto';
import { GameStateDto } from 'interfaces/gameStateDto';
import { Rank, Suit } from 'interfaces/card';
const contractAddress = '0x38bDa9F9bEF0C468f2E00E2B7892157fB6A249d5';

export const getPlayerCardsFromContract = async (round) => {
  try {
    const data = await publicClient.readContract({
      address: contractAddress,
      abi: contractABI,
      functionName: 'getPlayerCards',
      args: [round],
    });
    return data as readonly [readonly CardDto[], readonly CardDto[]];
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
    return data as readonly CardDto[];
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

export const getGameInfoFromContract = async (): Promise<GameStateDto> => {
  return {
    gameState: 1,
    currentRoundNumber: 1,
    totalNumberOfBetsOnPlayerA: 1,
    totalBetAmountOnPlayerA: 1,
    totalNumberOfBetsOnPlayerB: 1,
    totalBetAmountOnPlayerB: 1,
    minimumAllowedBetAmount: .001,
    playerACards: [
      {suit: Suit.Diamonds, rank: Rank.Ace},
      {suit: Suit.Clubs, rank: Rank.Three}
    ],
    playerBCards: [
      {suit: Suit.Hearts, rank: Rank.Two},
      {suit: Suit.Spades, rank: Rank.Five}
    ],
    communityCards: [
      { suit: Suit.Hearts, rank: Rank.Ace },
      { suit: Suit.Clubs, rank: Rank.Two }, 
      { suit: Suit.Diamonds, rank: Rank.Three }, 
      { suit: Suit.Spades, rank: Rank.Four }, 
      { suit: Suit.Hearts, rank: Rank.Five }
    ],
    currentRoundBetEndTimestamp: BigInt(1721049934),
    nextGameStartTimestamp: BigInt(1721049934),
  };
  //   try {
  //     const data = await publicClient.readContract({
  //       address: contractAddress,
  //       abi: contractABI,
  //       functionName: 'getGameInfo'
  //     });
  //     return data as gameStateDTO;
  //   } catch (error) {
  //     console.error('Error getting game info from contract:', error);
  //     throw error;
  //   }
};
