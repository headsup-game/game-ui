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
  const [cardStates, setCardStates] = useState<boolean[]>(
    new Array(numberOfCards).fill(initFaceDown)
  );

  useEffect(() => {
    console.log("Udpated cards: ", cards);
    setCurrentCards(cards);
  }, [cards]);

  return (
    <Flex align="center" className="card-set" gap={14}>
      {currentCards.slice(0, numberOfCards).map((card, index) => (
        <>
          {/* {JSON.stringify(card?.faceDown)} */}
          <FlipCard
            key={index}
            style={{
              width: `calc(100% / ${numberOfCards})`,
            }}
            initFaceDown={card?.faceDown || false}
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
        </>
      ))}
    </Flex>
  );
};

export default CardSet;
