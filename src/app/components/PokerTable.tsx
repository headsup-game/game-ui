"use client";

import React, { useState, useEffect, useRef } from 'react';
import web3, { connectMetaMask, removeDisconnection } from '../../utils/web3';
import { getPlayerCardsFromContract, getCommunityCardsFromContract, getWinnerFromContract, cardDTO } from '../../utils/contract';

interface Card {
  rank: string;
  suit: string;
  image: string;
}
const rankMap: Record<string, string> = {
  0: '2',
  1: '3',
  2: '4',
  3: '5',
  4: '6',
  5: '7',
  6: '8',
  7: '9',
  8: '10',
  9: 'jack',
  10: 'queen',
  11: 'king',
  12: 'ace'
}

const suitMap: Record<string, string> = {
  0: 'hearts',
  1: 'diamonds',
  2: 'clubs',
  3: 'spades'
}

const mapCards = (card: cardDTO): Card => ({
  rank: rankMap[card.rank],
  suit: suitMap[card.suit],
  image: `/images/${rankMap[card[0].toString()]}_of_${suitMap[card[1].toString()]}.png`
});

interface Participant {
  cards: Card[];
}

type GameState = 'start' | 'deal' | 'showCommunity' | 'determineWinner' | 'end';

const PokerTable: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [shownCommunityCards, setShownCommunityCards] = useState<Card[]>([]);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [winningParticipant, setWinningParticipant] = useState<number | null>(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState<boolean>(false);
  const communityCardsRef = useRef(0);
  const handleMetaMaskConnect = async () => {
    const isConnected = await connectMetaMask();
    // const isConnected = false;
    setIsMetaMaskConnected(isConnected);
    if (isConnected) {
      setGameState('start');
      await fetchParticipants(); // Call the fetchParticipants function when MetaMask is connected
    }
  };

  const handleMetaMaskDisconnect = async () => {
    setIsMetaMaskConnected(false);
    removeDisconnection();
  }

  useEffect(() => {
    if (gameState === 'start') {
      // fetchParticipants();
    } else if (gameState === 'showCommunity') {
      communityCardsRef.current = 0;
      showCommunityCards();
    } else if (gameState === 'determineWinner') {
      setTimeout(fetchWinner, 1000);
    }
  }, [gameState, isMetaMaskConnected]);

  const fetchParticipants = async () => {
    try {
      let participantACards: Card[];
      let participantBCards: Card[];

      // Use the appropriate implementation based on the environment
      if (true) {
        // Fetch cards from the smart contract
        const playerCardsResponseFromContract = await getPlayerCardsFromContract(1);
        participantACards = playerCardsResponseFromContract[0].map(mapCards);
        participantBCards = playerCardsResponseFromContract[1].map(mapCards);

        // participantACards = await getPlayerCardsFromContract(0);
        // participantBCards = await getPlayerCardsFromContract(1);
      } else {
        // Fetch cards from the local API
        participantACards = [
          { rank: 'Q', suit: 'hearts', image: '/images/queen_of_hearts.png' },
          { rank: 'J', suit: 'hearts', image: '/images/jack_of_hearts.png' }
        ]
        participantBCards = [
          { rank: 'A', suit: 'hearts', image: '/images/ace_of_hearts.png' },
          { rank: 'K', suit: 'hearts', image: '/images/king_of_hearts.png' }
        ];
      }

      setParticipants([
        { cards: participantACards },
        { cards: participantBCards },
      ]);

      setGameState('deal');
      setLogMessages(prev => [...prev, 'Participants cards dealt']);
    } catch (error) {
      console.error(error);
    }
  };

  const getPlayerCardsFromAPI = async (participantId: number): Promise<Card[]> => {
    return fetch('/api/participants')
      .then(res => res.json()[participantId])
  };

  // TODO: If community cards for a round are not available, fetch them from the contract
  // TODO: If the community cards for a round are already fetched, show them
  // TODO: If the community cards for a round are already fetched, use them from memory and don't fetch them
  // TODO: If the community cards are not dealt (identified by return value empty) show in the UI that the cards are not yet dealt
  const fetchCommunityCards = async () => {
    try {
      const communityCardsFromContract = await getCommunityCardsFromContract(1);
      setCommunityCards(communityCardsFromContract.map(mapCards));
      setGameState('showCommunity');
      setLogMessages(prev => [...prev, 'Fetching community cards...']);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWinner = async () => {
    const winner = await getWinnerFromContract(1);
    setWinningParticipant(Number(winner));
    setGameState('end');
    setLogMessages(prev => [...prev, 'Winner determined']);
  };

  const showCommunityCards = () => {
    const showNextCard = () => {
      if (communityCardsRef.current < communityCards.length) {
        setShownCommunityCards(prev => [
          ...prev,
          communityCards[communityCardsRef.current - 1]
        ]);
        communityCardsRef.current += 1;
        setTimeout(showNextCard, 200);
      } else {
        setGameState('determineWinner');
      }
    };

    showNextCard();
  };

  useEffect(() => {
    if (gameState === 'deal') {
      setTimeout(() => {
        fetchCommunityCards();
      }, 1000);
    }
  }, [gameState]);

  return (
    <div className="poker-table">
      <h1>Poker Table</h1>
      <button onClick={handleMetaMaskConnect}>Connect MetaMask</button>
      <button onClick={handleMetaMaskDisconnect}>Disconnect MetaMask</button>
      {isMetaMaskConnected && (
        <div className="table">
          {participants.length >= 1 && (
            <div className={`participant participant-left ${winningParticipant === 0 ? 'winner' : ''}`}>
              <h2>Participant A</h2>
              <div className="cards">
                {participants[0].cards.map((card, i) => (
                  card && <img key={i} src={card.image} alt={`${card.rank} of ${card.suit}`} />
                ))}
              </div>
            </div>
          )}
          <div className="community-cards">
            <h2>Community Cards</h2>
            <div className="cards">
              {shownCommunityCards.map((card, index) => (
                card && <img key={index} src={card.image} alt={`${card.rank} of ${card.suit}`} />
              ))}
            </div>
          </div>
          {participants.length >= 2 && (
            <div className={`participant participant-right ${winningParticipant === 1 ? 'winner' : ''}`}>
              <h2>Participant B</h2>
              <div className="cards">
                {participants[1].cards.map((card, i) => (
                  card && <img key={i} src={card.image} alt={`${card.rank} of ${card.suit}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="log-messages">
        {logMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <style jsx>{`
        .poker-table {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 50px;
        }
        .table {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 80%;
          background-color: green;
          padding: 20px;
          border-radius: 10px;
          position: relative;
        }
        .participant {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .participant-left {
          align-self: flex-start;
        }
        .participant-right {
          align-self: flex-end;
        }
        .cards {
          display: flex;
          justify-content: center;
        }
        .cards img {
          margin: 5px;
          width: 100px; /* Set desired width */
          height: auto; /* Maintain aspect ratio */
          transition: transform 0.5s;
        }
        .participant.winner .cards img {
          transform: scale(1.1);
          border: 2px solid gold;
        }
        .community-cards {
          text-align: center;
        }
        .log-messages {
          margin-top: 20px;
          background-color: lightgrey;
          padding: 10px;
          border-radius: 5px;
          width: 80%;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PokerTable;
