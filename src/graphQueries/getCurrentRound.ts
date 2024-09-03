import { gql } from '@apollo/client';

export const GET_CURRENT_ROUND_QUERY =
  gql`query GetCurrentRound($limit: Int!, $participant: String!) {
      rounds(orderBy: "epoch", orderDirection: "desc", limit: $limit) {
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
          participants(where: { userId: $participant }) {
            items {
              amount
              position
              isWinner
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

