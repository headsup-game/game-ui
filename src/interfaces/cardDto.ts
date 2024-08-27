import { Suit, Rank, Color } from './card';

export type CardDto = {
  suit: Suit,
  rank: Rank,
  color: Color,
  faceDown?: boolean,
  animationDelay?: number,
}
