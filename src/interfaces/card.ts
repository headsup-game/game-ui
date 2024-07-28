import { getEnumName } from "utils/enumHelper";
import { CardDto } from "./cardDto";

export enum Color {
  RED,
  BLUE,
  VIOLET,
}

export enum Suit {
  Hearts,
  Diamonds,
  Clubs,
  Spades,
}

export enum Rank {
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace,
}

export const getRankValue = (rank: Rank) => {
  switch (rank) {
    case Rank.Two:
      return 2;
    case Rank.Three:
      return 3;
    case Rank.Four:
      return 4;
    case Rank.Five:
      return 5;
    case Rank.Six:
      return 6;
    case Rank.Seven:
      return 7;
    case Rank.Eight:
      return 8;
    case Rank.Nine:
      return 9;
    case Rank.Ten:
      return 10;
    case Rank.Jack:
      return "J";
    case Rank.Queen:
      return "Q";
    case Rank.King:
      return "K";
    case Rank.Ace:
      return "A";
    default:
      return 2;
  }
};

export type Card = {
  suit: Suit;
  rank: Rank;
  image: string;
};

export type NewCard = {
  suit: Suit;
  rank: Rank;
  color: Color;
  faceDown?: boolean;
};

export function getCardFromCardDto(cardDto: CardDto): Card {
  return {
    suit: cardDto.suit,
    rank: cardDto.rank,
    image: `/images/${getEnumName(
      Rank,
      cardDto.rank
    )?.toLowerCase()}_of_${getEnumName(Suit, cardDto.suit)?.toLowerCase()}.png`,
  };
}
