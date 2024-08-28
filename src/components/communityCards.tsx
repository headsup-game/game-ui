import CardSet from "@components/CardSet";
import { Card } from "interfaces/card";

type CommunityCardsProps = {
  cards: Card[];
};

export const CommunityCards: React.FC<CommunityCardsProps> = ({ cards }) => {
  return (
    <>
      {cards && (
        <div className="text-center">
          <h2>Community Cards</h2>
          <div className="flex justify-center mt-2">
            {/* TODO: Set the no of cards either dynamically or 
            change it as per requirements if static */}
            <CardSet numberOfCards={5} cards={cards} initFaceDown />
            {/* {cards.map((card, index) => (
              card && <img key={index} src={card.image} alt={`${card.rank} of ${card.suit}`} className="m-2 w-24 transition-transform transform hover:scale-110" />
            ))} */}
          </div>
        </div>
      )}
    </>
  );
};
