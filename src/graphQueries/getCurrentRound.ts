import { gql } from '@apollo/client';

export type ParticipantFilter = {
  userId: string
}

export const GET_CURRENT_ROUND_QUERY =
  gql`query GetCurrentRound($limit: Int!, $participantFilter: ParticipantFilter, $where: RoundFilter) {
      rounds(orderBy: "epoch", orderDirection: "desc", limit: $limit, where: $where) {
        items {
          epoch
          roundExpiredAfterTimestamp
          apesCardsId
          punksCardsId
          apesPot
          punksPot
          totalApesBets
          totalPunksBets
          totalAmount
          holeCardsRevealed
          communityCardsRevealed
          communityCards {
            card1{rank suit}
            card2{rank suit}
            card3{rank suit}
            card4{rank suit}
            card5{rank suit}
          }
          winner
          winningHands {
            bestCard1 {
              rank
              suit
            }
            bestCard2 {
              rank
              suit
            }
            bestCard3 {
              rank
              suit
            }
            bestCard4 {
              rank
              suit
            }
            bestCard5 {
              rank
              suit
            }
          }
          startTimestamp
          closeTimestamp
          blindCloseTimestamp
          betCloseTimestamp
          resultTrxTimestamp
          participants(where: $participantFilter) {
            items {
              amount
              position
              isWinner
              userId
              winningAmount
              rakeGiven
              operatorFeeGiven
            }
          }
          apesCards {
            card1 {
              id
              rank
              suit
            }
            card2 {
              id
              rank
              suit
            }
          }
          punksCards {
            card1 {
              id
              rank
              suit
            }
            card2 {
              id
              rank
              suit
            }
          }
        }
      }
    }`;

