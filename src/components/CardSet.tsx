import React, { useEffect, useState } from "react";
import FlipCard from "./FlipCard";
import { NewCard } from "interfaces/card";
import PlayingCard from "app/components/PlayingCard/PlayingCard";
import { Flex } from "antd";

interface CardSetProps {
  numberOfCards: number;
  cards: NewCard[];
  initFaceDown?: boolean;
}

const CardSet: React.FC<CardSetProps> = ({
  numberOfCards,
  initFaceDown,
  cards,
}) => {
  const [currentCards, setCurrentCards] = useState(cards);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFaceDownVar = (card) => {
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
    console.log("Udpated cards: ", cards);
    const updatedCards = cards.map((card, index) => ({
      ...card,
      faceDown: getFaceDownVar(card),
      animationDelay: isLoaded ? undefined : index * 0.1, // Apply animation delay
    }));
    setCurrentCards(updatedCards);
    setIsLoaded(true); // Set isLoaded to true after initial load
  }, [cards, initFaceDown]);

  return (
    <Flex align="center" className="card-set" gap={14}>
      {currentCards.slice(0, numberOfCards).map((card, index) => (
        <FlipCard
          key={index}
          style={{
            width: `calc(100% / ${numberOfCards})`,
          }}
          initFaceDown={card?.faceDown || false}
          animationDelay={card?.animationDelay} // Pass animation delay to FlipCard component
          frontContent={
            <PlayingCard
              color={card?.color}
              value={card?.rank}
              suit={card?.suit}
              styles={{
                width: "100%",
              }}
            />
          }
        />
      ))}
    </Flex>
  );
};

export default CardSet;
