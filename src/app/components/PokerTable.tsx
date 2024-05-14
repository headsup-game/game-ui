"use client";

import React, { useState, useEffect, useRef } from 'react';

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
  const communityCardsRef = useRef(-1);

  useEffect(() => {
    if (gameState === 'start') {
      fetchParticipants();
    } else if (gameState === 'showCommunity') {
      communityCardsRef.current = 0;
      showCommunityCards();
    } else if (gameState === 'determineWinner') {
      setTimeout(fetchWinner, 1000);
    }
  }, [gameState]);

  const fetchParticipants = () => {
    fetch('/api/participants')
      .then(res => res.json())
      .then(data => {
        setParticipants(data);
        setGameState('deal');
        setLogMessages(prev => [...prev, 'Participants cards dealt']);
      })
      .catch(err => console.error(err));
  };

  const fetchCommunityCards = () => {
    fetch('/api/community-cards')
      .then(res => res.json())
      .then(data => {
        setCommunityCards(data);
        setGameState('showCommunity');
        setLogMessages(prev => [...prev, 'Fetching community cards...']);
      })
      .catch(err => console.error(err));
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
      `}</style>
    </div>
  );
};

export default PokerTable;
