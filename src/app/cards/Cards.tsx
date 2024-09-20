import { Flex } from "antd";
import PlayingCard from "app/components/PlayingCard/PlayingCard";
import { Color, Rank, Suit } from "interfaces/card";

const CardCombinationsPage = () => {
  const suits: Suit[] = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
  const values: Rank[] = [
    Rank.Two,
    Rank.Three,
    Rank.Four,
    Rank.Five,
    Rank.Six,
    Rank.Seven,
    Rank.Eight,
    Rank.Nine,
    Rank.Ten,
    Rank.Jack,
    Rank.Queen,
    Rank.King,
    Rank.Ace,
  ];
  const colors: Color[] = [Color.RED, Color.BLUE, Color.VIOLET];

  return (
    <Flex align="center" justify="center" wrap gap={20}>
      {colors.map((color) => (
        <Flex align="center" justify="center" wrap gap={20} key={color}>
          {suits.map((suit) => (
            <div key={suit}>
              {values.map((value) => (
                <PlayingCard
                  isSmall={false}
                  key={`${value}-${suit}`}
                  value={value}
                  suit={suit}
                  color={color}
                />
              ))}
            </div>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default CardCombinationsPage;
