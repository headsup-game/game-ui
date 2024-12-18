import React, { useEffect, useState } from "react";
import FlipCard from "./FlipCard";
import { Card } from "interfaces/card";
import PlayingCard from "app/components/PlayingCard/PlayingCard";
import { Flex } from "antd";
import { isEqual } from "lodash";

interface CardSetProps {
  numberOfCards: number;
  cards: Card[];
  initFaceDown?: boolean;
  width?: number
  isSmall: boolean
  cardWidth?: number
}

const isCardSetEqual = (prevProps: CardSetProps, nextProps: CardSetProps): boolean => {
  return (
    prevProps.numberOfCards === nextProps.numberOfCards &&
    prevProps.initFaceDown === nextProps.initFaceDown &&
    isEqual(prevProps.cards, nextProps.cards)
  );
}

const CardSet: React.FC<CardSetProps> = React.memo(({
  numberOfCards,
  isSmall,
  initFaceDown,
  cards,
  cardWidth
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const getFaceDownVar = (card: Card) => {
    if (initFaceDown === true) {
      return true;
    } else if (initFaceDown === false) {
      return false;
    } else if (card?.faceDown === true) {
      return true;
    } else if (card?.faceDown === false) {
      return false;
    }

    return false;
  };

  useEffect(() => {
    const updatedCards = cards.map((card, index) => ({
      ...card,
      faceDown: getFaceDownVar(card),
      animationDelay: isLoaded ? undefined : index * 0.1, // Apply animation delay
    }));

    setIsLoaded(true); // Set isLoaded to true after initial load
  }, [JSON.stringify(cards), initFaceDown]);

  return (
    <div className="flex justify-center items-center gap-[1em]">
      {cards.slice(0, numberOfCards).map((card, index) => !isSmall ? (
        <FlipCard
          key={index}
          initFaceDown={card?.faceDown}
          animationDelay={card?.animationDelay} // Pass animation delay to FlipCard component
          frontContent={
            <PlayingCard
              isSmall={isSmall}
              color={card?.color}
              value={card?.rank}
              suit={card?.suit}
              cardWidth={cardWidth}
            />
          }
        />
      ) : (
        <PlayingCard
          key={index}
          isSmall={isSmall}
          color={card?.color}
          value={card?.rank}
          suit={card?.suit}
        />
      ))}
    </div>
  );
}, (prevProps, nextProps) => isCardSetEqual(prevProps, nextProps));

CardSet.displayName = "CardSet";

export default CardSet;
