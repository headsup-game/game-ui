import {Card} from './card'

export type Participant = {
  id: number
  cards: Card[]
  totalNumberOfBets: BigInt
  totalBetAmounts: string
}
