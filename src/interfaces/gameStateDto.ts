import {Card} from "interfaces/card"

export type GameStateDto = {
  gameState: number;
  currentRoundNumber: number;
  totalNumberOfBetsOnPlayerA: number;
  totalBetAmountOnPlayerA: number;
  totalNumberOfBetsOnPlayerB: number;
  totalBetAmountOnPlayerB: number;
  communityCards: Card[];
  currentRoundBetEndTimestamp: bigint;
  nextGameStartTimestamp?: bigint;
  playerACards: Card[];
  playerBCards: Card[];
  minimumAllowedBetAmount: number
}
