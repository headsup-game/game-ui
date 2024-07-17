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
