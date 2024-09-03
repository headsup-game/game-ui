import { getEnumName } from "utils/enumHelper";
import { CardDto } from "./cardDto";
import { deflate } from "zlib";

export enum Color {
  RED,
  BLUE,
  VIOLET,
}

export enum Suit {
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Hearts = 'Hearts',
  Spades = 'Spades',
  None = 'None'
}

export enum Rank {
  Ace = 'Ace',
  Eight = 'Eight',
  Five = 'Five',
  Four = 'Four',
  Jack = 'Jack',
  King = 'King',
  Nine = 'Nine',
  Queen = 'Queen',
  Seven = 'Seven',
  Six = 'Six',
  Ten = 'Ten',
  Three = 'Three',
  Two = 'Two',
  None = 'None'
}

export const getSuitUnicodeSymbol = (suit: Suit) => {
  switch (suit) {
    case Suit.Clubs:
      return '♣';
    case Suit.Diamonds:
      return '♦';
    case Suit.Hearts:
      return '♥';
    case Suit.Spades:
      return '♠';
    default:
      return '';
  }
}

export const getSuitShortForm = (suit: Suit) => {
  switch (suit) {
    case Suit.Clubs:
      return 'c';
    case Suit.Diamonds:
      return 'd';
    case Suit.Hearts:
      return 'h';
    case Suit.Spades:
      return 's';
    default:
      return '';
  }
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
      return "T";
    case Rank.Jack:
      return "J";
    case Rank.Queen:
      return "Q";
    case Rank.King:
      return "K";
    case Rank.Ace:
      return "A";
    default:
      return "";
  }
};

export type Card = {
  suit: Suit;
  rank: Rank;
  color: Color;
  faceDown?: boolean;
  animationDelay?: number;
};

export function getCardFromCardDto(cardDto: CardDto): Card {
  return {
    suit: cardDto.suit,
    rank: cardDto.rank,
    color: cardDto.color,
    faceDown: cardDto.faceDown,
    animationDelay: cardDto.animationDelay,
  };
}

