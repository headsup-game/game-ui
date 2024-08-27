import { Participant } from './participant'
import { Card, Color, Rank, Suit, getCardFromCardDto } from './card'
import { GameStateDto } from './gameStateDto'
import { Position, Round } from 'gql/graphql'
import { ethers } from 'ethers'

export enum RoundState {
  Initialized,
  BlindBettingStarted,
  BlindBettingClosedAndHoleCardsNotRevealed,
  BlindBettingClosedAndHoleCardsRevealed,
  BettingStoppedCommunityCardsNotRevealed,
  BettingStoppedCommunityCardsRevealedAndCalculatingResults,
  ResultsDeclaredAndEnded,
  Cancelled
}

export enum RoundWinner {
  NotDecidedYet,
  Apes,
  Punks,
  Draw,
  Cancelled
}

export type GameState = {
  state: RoundState
  roundNumber: number
  participantA: Participant
  participantB: Participant
  communityCards: Card[]
  roundWInner: RoundWinner
  roundWinnerMessage: string
  minimumAllowedBetAmount: number
  blindBettingStartTimestamp?: number
  blindBettingStopTimestamp?: number
  currentRoundEndTimeStamp: number
  resultShowTimeStamp: number
  nextRoundStartTimeStamp?: number
  currentTimerEndDateTime: Date
  currentMessage: string
}

export function getGameStateFromRound(round: Round | null): GameState {
  if (round == null) {
    return {
      state: RoundState.ResultsDeclaredAndEnded,
      roundNumber: 0,
      participantA: {
        id: 0,
        cards: [{ suit: Suit.None, rank: Rank.None, color: Color.RED }, { suit: Suit.None, rank: Rank.None, color: Color.RED }],
        totalBetAmounts: '0.0',
        totalNumberOfBets: 0,
      },
      participantB: {
        id: 1,
        cards: [{ suit: Suit.None, rank: Rank.None, color: Color.BLUE }, { suit: Suit.None, rank: Rank.None, color: Color.BLUE }],
        totalBetAmounts: '0.0',
        totalNumberOfBets: 0,
      },
      communityCards: [
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET }
      ],
      roundWInner: RoundWinner.NotDecidedYet,
      roundWinnerMessage: getRoundWinnerMessage(RoundWinner.NotDecidedYet),
      minimumAllowedBetAmount: 0.0,
      currentRoundEndTimeStamp: 0,
      nextRoundStartTimeStamp: 0,
      resultShowTimeStamp: 0,
      currentTimerEndDateTime: new Date(),
      currentMessage: 'Fetching round data ...'
    }
  }
  const defaultPlayerACards: Card[] = [{ suit: Suit.None, rank: Rank.None, color: Color.RED }, { suit: Suit.None, rank: Rank.None, color: Color.RED }];
  const defaultPlayerBCards: Card[] = [{ suit: Suit.None, rank: Rank.None, color: Color.BLUE }, { suit: Suit.None, rank: Rank.None, color: Color.BLUE }];
  const defaultCommunityCards: Card[] = [
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
  ]

  const state = getGameStatusFromRound(round)
  const roundWinner = state == RoundState.Cancelled ? RoundWinner.Cancelled : getRoundWinner(round);
  return {
    state: state,
    roundNumber: round.epoch,
    participantA: {
      id: 0,
      cards: round.apesCards != null ? [
        {
          suit: round.apesCards.card1.suit as Suit,
          rank: round.apesCards.card1.rank as Rank,
          color: Color.RED,
        },
        {
          suit: round.apesCards.card2.suit as Suit,
          rank: round.apesCards.card2.rank as Rank,
          color: Color.RED,
        }
      ] : defaultPlayerACards,
      totalBetAmounts: ethers.formatEther(round.apesPot),
      totalNumberOfBets: round.totalApesBets,
    },
    participantB: {
      id: 1,
      cards: round.punksCards != null ? [
        {
          suit: round.punksCards.card1.suit as Suit,
          rank: round.punksCards.card1.rank as Rank,
          color: Color.BLUE,
        },
        {
          suit: round.punksCards.card2.suit as Suit,
          rank: round.punksCards.card2.rank as Rank,
          color: Color.BLUE,
        }
      ] : defaultPlayerBCards,
      totalBetAmounts: ethers.formatEther(round.punksPot),
      totalNumberOfBets: round.totalPunksBets,
    },
    communityCards: round.communityCards == null ? defaultCommunityCards : [
      {
        suit: round.communityCards.card1?.suit as Suit,
        rank: round.communityCards.card1?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
      },
      {
        suit: round.communityCards.card2?.suit as Suit,
        rank: round.communityCards.card2?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
      },
      {
        suit: round.communityCards.card3?.suit as Suit,
        rank: round.communityCards.card3?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
      },
      {
        suit: round.communityCards.card4?.suit as Suit,
        rank: round.communityCards.card4?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
      },
      {
        suit: round.communityCards.card5?.suit as Suit,
        rank: round.communityCards.card5?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
      }
    ],
    roundWInner: roundWinner,
    roundWinnerMessage: getRoundWinnerMessage(roundWinner),
    minimumAllowedBetAmount: 0.0,
    blindBettingStartTimestamp: round.startTimestamp,
    blindBettingStopTimestamp: round.blindCloseTimestamp,
    currentRoundEndTimeStamp: round.closeTimestamp,
    nextRoundStartTimeStamp: round.closeTimestamp,
    resultShowTimeStamp: round.roundExpiredAfterTimestamp + 10,
    currentTimerEndDateTime: getCurrentTimeEndDateTime(state, round),
    currentMessage: getCurrentMessage(state)
  }
}

function getRoundWinner(round: Round): RoundWinner {
  switch (round.winner) {
    case Position.Apes:
      return RoundWinner.Apes;
    case Position.Punks:
      return RoundWinner.Punks;
    case Position.Draw:
      return RoundWinner.Draw;
    case Position.NoPosition:
      return RoundWinner.NotDecidedYet;
    default:
      return RoundWinner.NotDecidedYet;
  }
}

function getRoundWinnerMessage(roundWinner: RoundWinner) {
  switch (roundWinner) {
    case RoundWinner.Apes:
      return 'Apes won'
    case RoundWinner.Punks:
      return 'Punks won'
    case RoundWinner.Draw:
      return 'Its a Draw!!'
    case RoundWinner.Cancelled:
      return 'Cancelled'
    default:
      return 'Not decided yet'
  }
}

function getGameStatusFromRound(round: Round): RoundState {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (currentTimestamp > round.roundExpiredAfterTimestamp) {
    if (!round.communityCardsRevealed || round.winningHands == null) {
      return RoundState.Cancelled;
    }
  }
  if (currentTimestamp > round.closeTimestamp) {
    if (!round.communityCardsRevealed) {
      return RoundState.BettingStoppedCommunityCardsNotRevealed;
    }
    if (round.winningHands != null) {
      return RoundState.ResultsDeclaredAndEnded;
    }
    return RoundState.BettingStoppedCommunityCardsRevealedAndCalculatingResults;
  }
  if (currentTimestamp > round.blindCloseTimestamp) {
    return round.holeCardsRevealed ? RoundState.BlindBettingClosedAndHoleCardsRevealed : RoundState.BlindBettingClosedAndHoleCardsNotRevealed;
  }
  if (currentTimestamp > round.startTimestamp) {
    return RoundState.BlindBettingStarted;
  }
  return RoundState.Initialized;
}

function getCurrentTimeEndDateTime(state: RoundState, round: Round) {
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  let nextStateTimeStamp = currentTimeStamp;
  switch (state) {
    case RoundState.Initialized:
      nextStateTimeStamp = round.startTimestamp;
      break;
    case RoundState.BlindBettingStarted:
      nextStateTimeStamp = round.blindCloseTimestamp;
      break;
    case RoundState.BlindBettingClosedAndHoleCardsRevealed:
      nextStateTimeStamp = round.closeTimestamp;
      break;
    default:
      break;
  }
  return new Date(nextStateTimeStamp * 1000);
}

function getCurrentMessage(state: RoundState) {
  switch (state) {
    case RoundState.Initialized:
      return 'Next round starts in '
    case RoundState.BlindBettingStarted:
      return 'Blind betting ends in '
    case RoundState.BlindBettingClosedAndHoleCardsNotRevealed:
      return 'Generating player cards, betting on'
    case RoundState.BlindBettingClosedAndHoleCardsRevealed:
      return 'Betting ends in '
    case RoundState.BettingStoppedCommunityCardsNotRevealed:
      return 'Betting ended, generating community cards'
    case RoundState.BettingStoppedCommunityCardsRevealedAndCalculatingResults:
      return 'Calculating results...'
    default:
      return 'Next round starting in '
  }

}

export function getGameStateFromGameStateDto(gameStateDto: GameStateDto): GameState | null {
  if (gameStateDto == null) {
    return null;
  }

  let participantA: Participant = {
    id: 0,
    cards: gameStateDto.playerACards?.map(cardDto => getCardFromCardDto(cardDto)),
    totalNumberOfBets: gameStateDto.totalNumberOfBetsOnPlayerA,
    totalBetAmounts: gameStateDto.totalBetAmountOnPlayerB,
  }

  let participantB: Participant = {
    id: 1,
    cards: gameStateDto.playerBCards?.map(cardDto => getCardFromCardDto(cardDto)),
    totalNumberOfBets: gameStateDto.totalNumberOfBetsOnPlayerB,
    totalBetAmounts: gameStateDto.totalBetAmountOnPlayerB,
  }

  let state: RoundState = gameStateDto.gameState as RoundState
  let communityCards: Card[] = gameStateDto.communityCards?.map(cardDto => getCardFromCardDto(cardDto))

  return {
    state: state,
    roundNumber: gameStateDto.currentRoundNumber,
    participantA: participantA,
    participantB: participantB,
    communityCards: communityCards,
    minimumAllowedBetAmount: gameStateDto.minimumAllowedBetAmount,
    currentRoundEndTimeStamp: Number(gameStateDto.currentRoundBetEndTimestamp),
    nextRoundStartTimeStamp: gameStateDto?.nextGameStartTimestamp ? Number(gameStateDto.nextGameStartTimestamp) : undefined,
    roundWInner: RoundWinner.NotDecidedYet
  }
}
