import { Participant } from "./participant";
import { Card, Color, Rank, Suit, getCardNamesForPokerHandRank } from "./card";
import { Position, Round } from "gql/graphql";
import { ethers } from "ethers";
import { Address } from "viem";
import Ranker from 'handranker';

export enum RoundState {
  Initialized,
  BlindBettingStarted,
  BlindBettingClosedAndHoleCardsNotRevealed,
  BlindBettingClosedAndHoleCardsRevealed,
  BettingStoppedCommunityCardsNotRevealed,
  BettingStoppedCommunityCardsRevealedAndCalculatingResults,
  ResultsDeclaredAndEnded,
  Cancelled,
}

export enum RoundWinner {
  NotDecidedYet,
  Apes,
  Punks,
  Draw,
  Cancelled,
}

export type GameState = {
  state: RoundState;
  roundNumber: BigInt;
  apesData: Participant;
  punksData: Participant;
  communityCards: Card[];
  winningCards: Card[];
  winningHandRank: string;
  roundWinner: RoundWinner;
  roundWinnerMessage: string;
  roundWinnerMessageShort: string;
  minimumAllowedBetAmount: number;
  currentTimerEndDateTime: Date;
  currentMessage: string;
  blindBetingCloseTimestamp: number;
  bettingEndTimestamp: number;
  selfRoundWinningAmount: string;
  totalAmountPool: string;
};

export function getGameStateFromRound(previousRound: Round | null, currentRound: Round | null, address: Address | undefined): GameState {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // If current round is null, then return a default game state
  // If current round start time is in the future, then previous round is still active
  let round: Round | null;
  let nextRound: Round | null = null;
  if (currentRound == null) {
    round = null;
  } else {
    if (previousRound == null) {
      round = currentRound;
    } else {
      round = currentTimestamp < BigInt(currentRound.startTimestamp) ? previousRound : currentRound;
      nextRound = currentTimestamp < BigInt(currentRound.startTimestamp) ? currentRound : null;
    }
  }

  if (round == null) {
    return {
      state: RoundState.ResultsDeclaredAndEnded,
      roundNumber: BigInt(0),
      apesData: {
        id: 0,
        cards: [
          { suit: Suit.None, rank: Rank.None, color: Color.RED },
          { suit: Suit.None, rank: Rank.None, color: Color.RED },
        ],
        totalBetAmounts: "0.0",
        totalSelfBetAmount: "0.0",
        totalNumberOfBets: BigInt(0),
        payoutMultiplier: 0
      },
      punksData: {
        id: 1,
        cards: [
          { suit: Suit.None, rank: Rank.None, color: Color.BLUE },
          { suit: Suit.None, rank: Rank.None, color: Color.BLUE },
        ],
        totalBetAmounts: "0.0",
        totalSelfBetAmount: "0.0",
        totalNumberOfBets: BigInt(0),
        payoutMultiplier: 0
      },
      communityCards: [
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
      ],
      winningCards: [
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
        { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
      ],
      winningHandRank: '',
      selfRoundWinningAmount: '0.0',
      roundWinner: RoundWinner.NotDecidedYet,
      roundWinnerMessage: getRoundWinnerMessage(RoundWinner.NotDecidedYet, false),
      roundWinnerMessageShort: getRoundWinnerMessage(RoundWinner.NotDecidedYet, true),
      minimumAllowedBetAmount: 0.0,
      currentTimerEndDateTime: new Date(),
      currentMessage: "Fetching round data ...",
      blindBetingCloseTimestamp: 0,
      bettingEndTimestamp: 0,
      totalAmountPool: '0.0'
    };
  }
  const defaultPlayerACards: Card[] = [
    { suit: Suit.None, rank: Rank.None, color: Color.RED },
    { suit: Suit.None, rank: Rank.None, color: Color.RED },
  ];
  const defaultPlayerBCards: Card[] = [
    { suit: Suit.None, rank: Rank.None, color: Color.BLUE },
    { suit: Suit.None, rank: Rank.None, color: Color.BLUE },
  ];
  const defaultCommunityCards: Card[] = [
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
    { suit: Suit.None, rank: Rank.None, color: Color.VIOLET },
  ];

  const totalSelfApesAmount = round.participants?.items.find((bet) => bet.position === Position.Apes && bet.userId === address)?.amount
  const totalSelfPunksAmount = round.participants?.items.find((bet) => bet.position === Position.Punks && bet.userId === address)?.amount

  const winningCards = round.winningHands == null
    ? defaultCommunityCards
    : [
      {
        suit: round.winningHands.bestCard1?.suit as Suit,
        rank: round.winningHands.bestCard1?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
        animationDelay: 1000
      },
      {
        suit: round.winningHands.bestCard2?.suit as Suit,
        rank: round.winningHands.bestCard2?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
        animationDelay: 1000
      },
      {
        suit: round.winningHands.bestCard3?.suit as Suit,
        rank: round.winningHands.bestCard3?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
        animationDelay: 1000
      },
      {
        suit: round.winningHands.bestCard4?.suit as Suit,
        rank: round.winningHands.bestCard4?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
        animationDelay: 1000
      },
      {
        suit: round.winningHands.bestCard5?.suit as Suit,
        rank: round.winningHands.bestCard5?.rank as Rank,
        color: Color.VIOLET,
        faceDown: !round.communityCardsRevealed,
        animationDelay: 1000
      },
    ];

  const winningHandRank = round.winningHands == null ? '' : Ranker.getHand(getCardNamesForPokerHandRank(winningCards)).ranking;
  const state = getGameStatusFromRound(round);
  const roundWinner =
    state == RoundState.Cancelled
      ? RoundWinner.Cancelled
      : getRoundWinner(round);
  return {
    state: state,
    roundNumber: BigInt(round.epoch),
    apesData: {
      id: 0,
      cards:
        round.apesCards != null
          ? [
            {
              suit: round.apesCards.card1.suit as Suit,
              rank: round.apesCards.card1.rank as Rank,
              color: Color.RED,
              faceDown: false,
              animationDelay: 1000
            },
            {
              suit: round.apesCards.card2.suit as Suit,
              rank: round.apesCards.card2.rank as Rank,
              color: Color.RED,
              faceDown: false,
              animationDelay: 1000
            },
          ]
          : defaultPlayerACards,
      totalBetAmounts: ethers.formatEther(round.apesPot),
      totalNumberOfBets: BigInt(round.totalApesBets),
      payoutMultiplier: Number(round.totalAmount) == (0 | NaN) ? 0 : Number(round.totalAmount) / Number(round.apesPot),
      totalSelfBetAmount: totalSelfApesAmount ? ethers.formatEther(totalSelfApesAmount) : "0.0",
    },
    punksData: {
      id: 1,
      cards:
        round.punksCards != null
          ? [
            {
              suit: round.punksCards.card1.suit as Suit,
              rank: round.punksCards.card1.rank as Rank,
              color: Color.BLUE,
              faceDown: false,
              animationDelay: 1000
            },
            {
              suit: round.punksCards.card2.suit as Suit,
              rank: round.punksCards.card2.rank as Rank,
              color: Color.BLUE,
              faceDown: false,
              animationDelay: 1000
            },
          ]
          : defaultPlayerBCards,
      totalBetAmounts: ethers.formatEther(round.punksPot),
      totalNumberOfBets: BigInt(round.totalPunksBets),
      payoutMultiplier: Number(round.totalAmount) == (0 | NaN) ? 0 : Number(round.totalAmount) / Number(round.punksPot),
      totalSelfBetAmount: totalSelfPunksAmount ? ethers.formatEther(totalSelfPunksAmount) : "0.0",
    },
    communityCards:
      round.communityCards == null
        ? defaultCommunityCards
        : [
          {
            suit: round.communityCards.card1?.suit as Suit,
            rank: round.communityCards.card1?.rank as Rank,
            color: Color.VIOLET,
            faceDown: !round.communityCardsRevealed,
            animationDelay: 1000
          },
          {
            suit: round.communityCards.card2?.suit as Suit,
            rank: round.communityCards.card2?.rank as Rank,
            color: Color.VIOLET,
            faceDown: !round.communityCardsRevealed,
            animationDelay: 1000
          },
          {
            suit: round.communityCards.card3?.suit as Suit,
            rank: round.communityCards.card3?.rank as Rank,
            color: Color.VIOLET,
            faceDown: !round.communityCardsRevealed,
            animationDelay: 1000
          },
          {
            suit: round.communityCards.card4?.suit as Suit,
            rank: round.communityCards.card4?.rank as Rank,
            color: Color.VIOLET,
            faceDown: !round.communityCardsRevealed,
            animationDelay: 1000
          },
          {
            suit: round.communityCards.card5?.suit as Suit,
            rank: round.communityCards.card5?.rank as Rank,
            color: Color.VIOLET,
            faceDown: !round.communityCardsRevealed,
            animationDelay: 1000
          },
        ],
    winningCards: winningCards,
    winningHandRank: winningHandRank,
    selfRoundWinningAmount: '0.0',
    roundWinner: roundWinner,
    roundWinnerMessage: getRoundWinnerMessage(roundWinner, false, winningHandRank),
    roundWinnerMessageShort: getRoundWinnerMessage(roundWinner, true, winningHandRank),
    minimumAllowedBetAmount: 0.0,
    currentTimerEndDateTime: getCurrentTimeEndDateTime(state, round),
    currentMessage: getCurrentMessage(state),
    blindBetingCloseTimestamp: Number(round.blindCloseTimestamp),
    bettingEndTimestamp: Number(round.closeTimestamp),
    totalAmountPool: ethers.formatEther(round.totalAmount)
  };
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

function getRoundWinnerMessage(roundWinner: RoundWinner, short: boolean, winningRank?: string) {
  switch (roundWinner) {
    case RoundWinner.Apes:
      return short ? "Apes" : `Apes won with ${winningRank}`;
    case RoundWinner.Punks:
      return short ? "Punks" : `Punks won with ${winningRank}`;
    case RoundWinner.Draw:
      return short ? "Draw" : "Its a Draw!!";
    case RoundWinner.Cancelled:
      return "Cancelled";
    default:
      return short ? "Undecided" : "Not decided yet";
  }
}

function getGameStatusFromRound(round: Round): RoundState {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (currentTimestamp >= BigInt(round.roundExpiredAfterTimestamp)) {
    if (!round.communityCardsRevealed || round.winningHands == null) {
      return RoundState.Cancelled;
    }
  }

  if (currentTimestamp >= BigInt(round.closeTimestamp)) {
    if (BigInt(round.resultTrxTimestamp) == BigInt(0)) {
      return RoundState.BettingStoppedCommunityCardsNotRevealed;
    } else {
      if (currentTimestamp >= (BigInt(round.resultTrxTimestamp) + BigInt(10))) {
        return RoundState.ResultsDeclaredAndEnded;
      }

      return RoundState.BettingStoppedCommunityCardsRevealedAndCalculatingResults;
    }
  }

  if (currentTimestamp >= BigInt(round.blindCloseTimestamp)) {
    return round.holeCardsRevealed
      ? RoundState.BlindBettingClosedAndHoleCardsRevealed
      : RoundState.BlindBettingClosedAndHoleCardsNotRevealed;
  }

  if (currentTimestamp >= BigInt(round.startTimestamp)) {
    return RoundState.BlindBettingStarted;
  }

  return RoundState.Initialized;
}

function getCurrentTimeEndDateTime(state: RoundState, round: Round) {
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  let nextStateTimeStamp = currentTimeStamp;
  switch (state) {
    case RoundState.Initialized:
      nextStateTimeStamp = Number(round.startTimestamp);
      break;
    case RoundState.BlindBettingStarted:
      nextStateTimeStamp = Number(round.blindCloseTimestamp);
      break;
    case RoundState.BlindBettingClosedAndHoleCardsRevealed:
      nextStateTimeStamp = Number(round.closeTimestamp);
      break;
    case RoundState.BettingStoppedCommunityCardsRevealedAndCalculatingResults:
      nextStateTimeStamp = Number(BigInt(round.resultTrxTimestamp) + BigInt(10));
      break;
    case RoundState.ResultsDeclaredAndEnded:
      nextStateTimeStamp = Number(BigInt(round.resultTrxTimestamp) + BigInt(15));
      break;
    default:
      break;
  }
  return new Date(nextStateTimeStamp * 1000);
}

function getCurrentMessage(state: RoundState) {
  switch (state) {
    case RoundState.Initialized:
      return "Next round starts in ";
    case RoundState.BlindBettingStarted:
      return "Blind betting ends in ";
    case RoundState.BlindBettingClosedAndHoleCardsNotRevealed:
      return "Generating player cards, betting on";
    case RoundState.BlindBettingClosedAndHoleCardsRevealed:
      return "Betting ends in ";
    case RoundState.BettingStoppedCommunityCardsNotRevealed:
      return "Betting ended, generating community cards";
    case RoundState.BettingStoppedCommunityCardsRevealedAndCalculatingResults:
      return "Calculating results in ";
    default:
      return "Next round starting soon...";
  }
}
