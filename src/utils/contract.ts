import { GameStateDto } from 'interfaces/gameStateDto';
import { Rank, Suit, Card, Color } from 'interfaces/card';

import { gql, request } from 'graphql-request';
// Mappings to convert string values from the API to the Suit and Rank enums
const suitMapping: { [key: string]: Suit } = {
  "Hearts": Suit.Hearts,
  "Diamonds": Suit.Diamonds,
  "Clubs": Suit.Clubs,
  "Spades": Suit.Spades,
};

const rankMapping: { [key: string]: Rank } = {
  "Two": Rank.Two,
  "Three": Rank.Three,
  "Four": Rank.Four,
  "Five": Rank.Five,
  "Six": Rank.Six,
  "Seven": Rank.Seven,
  "Eight": Rank.Eight,
  "Nine": Rank.Nine,
  "Ten": Rank.Ten,
  "Jack": Rank.Jack,
  "Queen": Rank.Queen,
  "King": Rank.King,
  "Ace": Rank.Ace,
};

// Function to convert the string response into Suit and Rank enums
function mapCard(suit: string, rank: string) {
  return {
    suit: suitMapping[suit],
    rank: rankMapping[rank],
    color: Color.RED,
    faceDown: true,
    animationDelay: 1,
  };
}
export const getGameInfoFromContract = async (): Promise<GameStateDto> => {
  const endpoint = "https://headsup-indexer.up.railway.app/"; // Replace with your actual subgraph endpoint

  const query = gql`
    query QueryRounds {
      rounds(orderBy: "epoch", orderDirection: "desc", limit: 1) {
        items {
          epoch
          apesPot
          punksPot
          totalAmount
          holeCardsRevealed
          communityCardsRevealed
          winner
          startTimestamp
          blindCloseTimestamp
          betCloseTimestamp
          participants {
            items {
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
    }
  `;

  const response = await request(endpoint, query);

  const latestRound = response.rounds.items[0]; // Assuming we are only interested in the most recent round

  return {
    gameState: latestRound.holeCardsRevealed ? 2 : 1, // Example state logic
    currentRoundNumber: parseInt(latestRound.epoch, 10),
    totalNumberOfBetsOnPlayerA: parseInt(latestRound.apesPot, 10),
    totalBetAmountOnPlayerA: parseFloat(latestRound.apesPot),
    totalNumberOfBetsOnPlayerB: parseInt(latestRound.punksPot, 10),
    totalBetAmountOnPlayerB: parseFloat(latestRound.punksPot),
    minimumAllowedBetAmount: 0.001, // You might need to fetch or set this value dynamically
    playerACards: [
      mapCard(latestRound.apesCards.card1.suit, latestRound.apesCards.card1.rank),
      mapCard(latestRound.apesCards.card2.suit, latestRound.apesCards.card2.rank),
    ],
    playerBCards: [
      mapCard(latestRound.punksCards.card1.suit, latestRound.punksCards.card1.rank),
      mapCard(latestRound.punksCards.card2.suit, latestRound.punksCards.card2.rank),
    ],
    communityCards: [], // TODO: If the response has community cards, pass them
    currentRoundBetEndTimestamp: BigInt(latestRound.betCloseTimestamp),
    nextGameStartTimestamp: BigInt(latestRound.startTimestamp)
  };
};
