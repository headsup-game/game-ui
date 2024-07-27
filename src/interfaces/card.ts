import { getEnumName } from "utils/enumHelper"
import { CardDto } from "./cardDto"

export type Card = {
  suit: Suit,
  rank: Rank
  image: string
}

export enum Suit {
  Hearts,
  Diamonds,
  Clubs,
  Spades
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
  Ace
}

export function getCardFromCardDto(cardDto: CardDto): Card {
  return {
    suit: cardDto.suit,
    rank: cardDto.rank,
    image: `/images/${getEnumName(Rank, cardDto.rank)?.toLowerCase()}_of_${getEnumName(Suit, cardDto.suit)?.toLowerCase()}.png`
  }
}
