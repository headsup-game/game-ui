"use client";
// TODO: Use the appropriate network based on the environment
// TODO: Change the Meta description of the page to "Play Poker with your friends and win big!"
// TODO: Wait for the transaction to be mined and if the trasnaction is successful, show a bet placed message in the UI
// TODO: When the transaction is signed, show a message in the UI that the bet is being placed

import React, { useState, useEffect, useRef } from 'react';
import { connectMetaMask, removeDisconnection } from '../../utils/ethers';
import { getPlayerCardsFromContract, getCommunityCardsFromContract, getWinnerFromContract, cardDTO, betOnPlayerAInContract, betOnPlayerBInContract, claimWinningsFromContract, getCurrentEpochFromContract, getMinEntryFromContract, getGameInfoFromContract } from '../../utils/contract';
import { Card, rankMap, suitMap } from './Card';

const mapCards = (card: cardDTO): Card => ({
  rank: rankMap[card.rank],
  suit: suitMap[card.suit],
  image: `/images/${rankMap[card[0].toString()]}_of_${suitMap[card[1].toString()]}.png`
});

interface Participant {
  cards: Card[];
}

const PokerTable: React.FC = () => {
  const [gameState, setGameState] = useState<number>(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [winningParticipant, setWinningParticipant] = useState<number | null>(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState<boolean>(false);
  const communityCardsRef = useRef(0);
  const [betAmount, setBetAmount] = useState<string>('0.001');
  const [currentEpoch, setCurrentEpoch] = useState<number>(1);
  const [minEntry, setMinEntry] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(30);
  const [totalBetsA, setTotalBetsA] = useState<number>(0);
  const [totalBetsB, setTotalBetsB] = useState<number>(0);

  const handleMetaMaskConnect = async () => {
    const isConnected = await connectMetaMask();
    setIsMetaMaskConnected(isConnected);
    if (isConnected) {
      await fetchParticipantCards();
      setCurrentEpoch(await getCurrentEpochFromContract());
      setMinEntry(await getMinEntryFromContract());
    }
  };

  const handleMetaMaskDisconnect = async () => {
    setIsMetaMaskConnected(false);
    removeDisconnection();
  }

  const fetchParticipantCards = async () => {
    try {
      const playerCardsResponseFromContract = await getPlayerCardsFromContract(currentEpoch);
      const participantACards = playerCardsResponseFromContract[0].map(mapCards);
      const participantBCards = playerCardsResponseFromContract[1].map(mapCards);

      setParticipants([
        { cards: participantACards },
        { cards: participantBCards },
      ]);

      setGameState(1); // Assume 1 represents 'deal' state
      setLogMessages(prev => [...prev, 'Participants cards dealt']);
    } catch (error) {
      console.error(error);
    }
  };
  // TODO: If community cards for a round are not available, fetch them from the contract
  // TODO: If the community cards for a round are already fetched, show them
  // TODO: If the community cards for a round are already fetched, use them from memory and don't fetch them
  // TODO: If the community cards are not dealt (identified by return value empty) show in the UI that the cards are not yet dealt

  const fetchCommunityCards = async () => {
    try {
      const communityCardsFromContract = await getCommunityCardsFromContract(currentEpoch);
      setCommunityCards(communityCardsFromContract.map(mapCards));
      setLogMessages(prev => [...prev, 'Fetching community cards...']);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWinner = async () => {
    try {
      const winner = await getWinnerFromContract(currentEpoch);
      setWinningParticipant(Number(winner));
      setLogMessages(prev => [...prev, 'Winner determined']);
    } catch (error) {
      console.error(error);
    }
  };

  const showCommunityCards = () => {
    const showNextCard = () => {
      if (communityCardsRef.current < communityCards.length) {
        setCommunityCards(prev => [
          ...prev,
          communityCards[communityCardsRef.current - 1]
        ]);
        communityCardsRef.current += 1;
        setTimeout(showNextCard, 200);
      } else {
        setGameState(3); // Assume 3 represents 'determineWinner' state
      }
    };

    showNextCard();
  };
  // TODO: Right now the community cards are being called for after a timeout. However, in production, the community cards will be called based on state change of the game.

  useEffect(() => {
    setTimeout(() => {
      fetchCommunityCards();
    }, 300);
    // if (gameState === 'deal') {
    //   setTimeout(() => {
    //     fetchCommunityCards();
    //   }, 300);
    //   // TODO: Show a countdown to the community cards in the UI.
    // }
  }, [gameState]);

  const handleBetOnPlayerA = async () => {
    try {
      const tx = await betOnPlayerAInContract(betAmount, currentEpoch);
      setLogMessages(prev => [...prev, 'Bet on Player A placed, waiting for confirmation...']);
      await tx.wait();
      setLogMessages(prev => [...prev, 'Bet on Player A successfully placed']);
    } catch (error) {
      console.error('Error betting on Player A:', error);
      setLogMessages(prev => [...prev, 'Error betting on Player A']);
    }
  };

  const handleBetOnPlayerB = async () => {
    try {
      const tx = await betOnPlayerBInContract(betAmount, currentEpoch);
      setLogMessages(prev => [...prev, 'Bet on Player B placed, waiting for confirmation...']);
      await tx.wait();
      setLogMessages(prev => [...prev, 'Bet on Player B successfully placed']);
    } catch (error) {
      console.error('Error betting on Player B:', error);
      setLogMessages(prev => [...prev, 'Error betting on Player B']);
    }
  };

  const claimWinnings = async () => {
    try {
      const tx = await claimWinningsFromContract(currentEpoch);
      setLogMessages(prev => [...prev, 'Claiming winnings, waiting for confirmation...']);
      await tx.wait();
      setLogMessages(prev => [...prev, 'Winnings successfully claimed']);
    } catch (error) {
      console.error('Error claiming winnings:', error);
      setLogMessages(prev => [...prev, 'Error claiming winnings']);
    }
  };

  useEffect(() => {
    // Function to fetch game state from the contract
    const fetchGameState = async () => {

      try {
        const gameInfoData = await getGameInfoFromContract();
        setGameState(gameInfoData[0] || 0);
        setCurrentEpoch(gameInfoData[1] || 0);
        setTotalBetsA(gameInfoData[2] || 0);
        setTotalBetsB(gameInfoData[3] || 0);
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    // Set up the interval to fetch game state every 500ms
    const interval = setInterval(fetchGameState, 500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   let countdownInterval: NodeJS.Timeout;
  //   if (gameState === 'deal') {
  //     setCountdown(30);
  //     countdownInterval = setInterval(() => {
  //       setCountdown(prev => {
  //         if (prev === 1) {
  //           clearInterval(countdownInterval);
  //           fetchCommunityCards();
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   }
  //   return () => clearInterval(countdownInterval);
  // }, [gameState]);

  // DONE: Alongside some options like 0.001, 0.01, 0.1, 1, add a custom input field to allow the user to enter a custom amount
  // TODO: Interpret game state based on the following logic: if getPlayerCards response is [[],[]], the player cards are not dealt yet. If getCommunityCards response is [], the community cards are not dealt yet. If winner response is -1, the winner is not determined yet.
  // TODO: Based on the game state available in the UI, show the betting button active/inactive.
  // TODO: The user should be able to claim the winnings using a button in the UI. It will call the method claim in the contract.

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
              <select value={betAmount} onChange={(e) => setBetAmount(e.target.value)}>
                <option value="0.001">0.001 ETH</option>
                <option value="0.01">0.01 ETH</option>
                <option value="0.1">0.1 ETH</option>
                <option value="1">1 ETH</option>
              </select>
              <input
                type="text"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="Enter custom amount"
              />
              <button onClick={handleBetOnPlayerA}>Bet on Player A</button>
            </div>
          )}
          <div className="community-cards">
            <h2>Community Cards</h2>
            <div className="cards">
              {communityCards.map((card, index) => (
                card && <img key={index} src={card.image} alt={`${card.rank} of ${card.suit}`} />
              ))}
            </div>
          </div>
          {countdown > 0 && (
            <div className="countdown">
              Community cards will be revealed in: {countdown} seconds
            </div>
          )}
          {participants.length >= 2 && (
            <div className={`participant participant-right ${winningParticipant === 1 ? 'winner' : ''}`}>
              <h2>Participant B</h2>
              <div className="cards">
                {participants[1].cards.map((card, i) => (
                  card && <img key={i} src={card.image} alt={`${card.rank} of ${card.suit}`} />
                ))}
              </div>
              <select value={betAmount} onChange={(e) => setBetAmount(e.target.value)}>
                <option value="0.001">0.001 ETH</option>
                <option value="0.01">0.01 ETH</option>
                <option value="0.1">0.1 ETH</option>
                <option value="1">1 ETH</option>
              </select>
              <input
                type="text"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="Enter custom amount"
              />
              <button onClick={handleBetOnPlayerB} disabled={gameState !== 0}>Bet on Player B</button>
            </div>
          )}
        </div>
      )}
      <div className="betting-controls">
        <h2>Place Your Bet</h2>
      </div>
      <div className="log-messages">
        {logMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <button onClick={claimWinnings}>Claim Winnings</button>
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
        .betting-controls {
          margin-top: 20px;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default PokerTable;
