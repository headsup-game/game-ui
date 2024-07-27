import { Participant } from './participant'
import { Card, getCardFromCardDto } from './card'
import { GameStateDto } from './gameStateDto'

export enum RoundState {
  Initialized,
  BettingStarted,
  BettingStopped,
  ResultsCalulating,
  ResultsCalulated,
  Ended,
  Cancelled
}

export type GameState = {
  state: RoundState
  roundNumber: number
  participants: Participant[]
  communityCards: Card[]
  winningParticipant: Participant | null
  minimumAllowedBetAmount: number
  currentRoundEndTimeStamp: number
  nextRoundStartTimeStamp?: number
}

export function getGameStateFromGameStateDto(gameStateDto: GameStateDto): GameState | null {
  if (gameStateDto == null) {
    return null;
  }

  let participantA: Participant = {
    id: 0,
    cards: gameStateDto.playerACards?.map(cardDto => getCardFromCardDto(cardDto)),
    totalNumberOfBets: gameStateDto.totalNumberOfBetsOnPlayerA,
    totalBetAmounts: gameStateDto.totalNumberOfBetsOnPlayerA,
  }

  let participantB: Participant = {
    id: 1,
    cards: gameStateDto.playerBCards?.map(cardDto => getCardFromCardDto(cardDto)),
    totalNumberOfBets: gameStateDto.totalNumberOfBetsOnPlayerB,
    totalBetAmounts: gameStateDto.totalNumberOfBetsOnPlayerB,
  }

  let state: RoundState = gameStateDto.gameState as RoundState
  let communityCards: Card[] = gameStateDto.communityCards?.map(cardDto => getCardFromCardDto(cardDto))

  return {
    state: state,
    roundNumber: gameStateDto.currentRoundNumber,
    participants: [participantA, participantB],
    communityCards: communityCards,
    winningParticipant: null,
    minimumAllowedBetAmount: gameStateDto.minimumAllowedBetAmount,
    currentRoundEndTimeStamp: Number(gameStateDto.currentRoundBetEndTimestamp),
    nextRoundStartTimeStamp: gameStateDto?.nextGameStartTimestamp ? Number(gameStateDto.nextGameStartTimestamp) : undefined
  }
}
