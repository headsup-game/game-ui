import { GameStateDto } from '../interfaces/gameStateDto';
import { Rank, Suit } from '../interfaces/card';

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
