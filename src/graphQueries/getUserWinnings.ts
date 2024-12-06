import { gql } from "@apollo/client";

export type ParticipantFilter = {
  userId: string;
};

export const GET_USER_WINNINGS_QUERY = gql`
  query GetUserWinings($address: String!, $condition: ParticipantFilter) {
    users(where: { account: $address }, limit: 1) {
      items {
        account
        participantions(where: $condition, orderDirection: "desc", orderBy: "timestamp") {
          items {
            isWinner
            hasClaimed
            position
            amount
            winningAmount
            bettingPoints
            bettingMultiplier
            round {
              epoch
              communityCards {
                card1 {
                  rank
                  suit
                }
                card2 {
                  rank
                  suit
                }
                card3 {
                  rank
                  suit
                }
                card4 {
                  rank
                  suit
                }
                card5 {
                  rank
                  suit
                }
              }
              winner
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
        }
      }
    }
  }
`;
