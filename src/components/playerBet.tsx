import { useCallback, useState } from "react";
import { Bet } from "./bet";
import { Card } from "interfaces/card";
import CardSet from "@components/CardSet";

type PlayerBetProps = {
  roundNumber: number;
  playerId: number;
  playerName: string;
  cards: Card[];
  totalBetAmounts: string;
  onBetStateChange: (state: string) => void;
};

export const PlayerBet: React.FC<PlayerBetProps> = ({
  roundNumber,
  playerId,
  playerName,
  cards,
  totalBetAmounts,
  onBetStateChange,
}) => {
  const [betAmount, setBetAmount] = useState<number>(0.01);

  const handleBetState = useCallback(
    (state: string) => {
      onBetStateChange(state);
    },
    [onBetStateChange]
  );

  return (
    <div className={`flex flex-col items-center`}>
      <h2>{playerName}</h2>
      <div className="flex justify-center mt-2">
        {/* TODO: Set the no of cards either dynamically or 
            change it as per requirements if static */}
        <CardSet numberOfCards={5} cards={cards} initFaceDown />
        {/* {cards.map((card, i) => (
          card && <img key={i} src={card.image} alt={`${card.rank} of ${card.suit}`} className="m-2 w-24 transition-transform transform hover:scale-110" />
        ))} */}
      </div>
      <h3>Total Bets: {totalBetAmounts}</h3>
      <div className="flex flex-col items-center">
        <select
          value={betAmount}
          onChange={(e) =>
            setBetAmount(
              isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
            )
          }
        >
          <option value="0.001">0.001 ETH</option>
          <option value="0.01">0.01 ETH</option>
          <option value="0.1">0.1 ETH</option>
          <option value="1">1 ETH</option>
        </select>
        <input
          type="number"
          step="0.001"
          value={betAmount}
          onChange={(e) =>
            setBetAmount(
              isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
            )
          }
          placeholder="Enter custom amount"
          className="mt-2 px-2 py-1 rounded border"
        />
        <Bet
          playerId={playerId}
          betAmount={betAmount}
          roundNumber={roundNumber}
          playerName={playerName}
          onBettingStateChange={handleBetState}
          minimumAllowedBetAmount={0.001}
        />
      </div>
    </div>
  );
};
