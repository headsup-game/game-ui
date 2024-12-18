import { Card, Color, Suit, Rank } from 'interfaces/card';

// Return empty cards array for draw situations
function getDrawCards(): Card[] {
  return [
    {
      rank: Rank.None,
      suit: Suit.None,
      color: Color.VIOLET,
    },
    {
      rank: Rank.None,
      suit: Suit.None,
      color: Color.VIOLET,
    }
  ]
}

// Remove __typename from GraphQL response
export function removeTypename(obj: any) {
  const { __typename, ...rest } = obj;
  return rest;
}

// Transform card data from API format to app format
export function transformCards(cards: any, color: Color): Card[] {
  return Object.values(removeTypename(cards))
    .map((card: { rank: string; suit: string }) => ({
      rank: card.rank as Rank,
      suit: card.suit as Suit,
      color,
    }));
}

// Transform round data from API to table format
export function transformRoundData(data: any) {
  const participations = data?.users?.items[0]?.participantions?.items || [];
  
  return participations.map(participation => {
    const { round } = participation;
    
    const communityCards = transformCards(round.communityCards, Color.VIOLET);
    const apesCards = transformCards(round.apesCards, Color.RED);
    const punksCards = transformCards(round.punksCards, Color.RED);

    return {
      winner: round.winner,
      roundNumber: round.epoch,
      key: round.epoch,
      communityCards,
      hasClaimed: participation.hasClaimed,
      wonCards: {
        cards: round.winner === "APES" ? apesCards : 
               round.winner === "PUNKS" ? punksCards : 
               getDrawCards(),
      },
      ownWonAmount: participation.winningAmount,
      bet: {
        points: participation.isWinner ? 
          participation.amount : 
          -participation.amount,
        multiplier: participation.bettingMultiplier,
      },
      isWinner: participation.isWinner,
    };
  });
}