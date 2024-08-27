import {Card} from './card'

export type Participant = {
  id: number
  cards: Card[]
  totalNumberOfBets: number
  totalBetAmounts: string
}
