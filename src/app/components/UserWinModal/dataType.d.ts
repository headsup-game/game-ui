export interface DataType {
  roundNumber: string;
  key: string;
  communityCards: Card[];
  wonCards: { cards: Card[] };
  winner: string;
  ownWonAmount: string;
  hasClaimed: boolean;
  bet: {
    points: string;
    multiplier: string;
  };
  isWinner: boolean;
}
