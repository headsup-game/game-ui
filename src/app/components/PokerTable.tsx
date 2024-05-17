"use client";

import React, { useState, useEffect, useRef } from 'react';
import web3, { connectMetaMask } from '../../utils/web3';
import { getPlayerCardsFromContract, getCommunityCardsFromContract } from '../../utils/contract';

interface Card {
  rank: string;
  suit: string;
  image: string;
}

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
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState<boolean>(true);
  const communityCardsRef = useRef(0);

const handleMetaMaskConnect = async () => {
    // const isConnected = await connectMetaMask();
    const isConnected = true;
    setIsMetaMaskConnected(isConnected);
    if (isConnected) {
        setGameState('start');
        fetchParticipants(); // Call the fetchParticipants function when MetaMask is connected
    }
};

  useEffect(() => {
      if (gameState === 'start') {
        fetchParticipants();
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
        if (process.env.NODE_ENV === 'production') {
            // Fetch cards from the smart contract
            participantACards = await getPlayerCardsFromContract(0);
            participantBCards = await getPlayerCardsFromContract(1);
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

  const fetchCommunityCards = async () => {
    let communityCards: Card[] = [];
    try {
        // Use the appropriate implementation based on the environment
        if (process.env.NODE_ENV === 'production') {            // Fetch cards from the smart contract
            communityCards = await getCommunityCardsFromContract();
        } else {
            communityCards = [
                { rank: '2', suit: 'clubs', image: '/images/2_of_clubs.png' },
                { rank: '3', suit: 'clubs', image: '/images/3_of_clubs.png' },
                { rank: '4', suit: 'clubs', image: '/images/4_of_clubs.png' },
                { rank: '5', suit: 'clubs', image: '/images/5_of_clubs.png' },
                { rank: '6', suit: 'clubs', image: '/images/6_of_clubs.png' }
            ]
        }
      setCommunityCards(communityCards);
      setGameState('showCommunity');
      setLogMessages(prev => [...prev, 'Fetching community cards...']);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWinner = () => {
    setWinningParticipant(Math.random() < 0.5 ? 0 : 1); // Mock winner logic
    setGameState('end');
    setLogMessages(prev => [...prev, 'Winner determined']);
  };

  const showCommunityCards = () => {
    const showNextCard = () => {
      if (communityCardsRef.current < communityCards.length) {
        setShownCommunityCards(prev => [
          ...prev,
          communityCards[communityCardsRef.current-1]
        ]);
        communityCardsRef.current += 1;
        setTimeout(showNextCard, 1000);
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
      }, 5000);
    }
  }, [gameState]);

  return (
    <div className="poker-table">
      <h1>Poker Table</h1>
      {!isMetaMaskConnected && (
        <button onClick={handleMetaMaskConnect}>Connect MetaMask</button>
      )}
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
