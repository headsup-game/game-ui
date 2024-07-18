import { CardDto } from "./cardDto";

export type GameStateDto = {
  gameState: number;
  currentRoundNumber: number;
  totalNumberOfBetsOnPlayerA: number;
  totalBetAmountOnPlayerA: number;
  totalNumberOfBetsOnPlayerB: number;
  totalBetAmountOnPlayerB: number;
  communityCards: readonly CardDto[];
  currentRoundBetEndTimestamp: bigint;
  nextGameStartTimestamp?: bigint;
  playerACards: readonly CardDto[];
  playerBCards: readonly CardDto[];
  minimumAllowedBetAmount: number
}
