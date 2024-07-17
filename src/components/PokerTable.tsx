"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { getPlayerCardsFromContract, getCommunityCardsFromContract, getWinnerFromContract, betOnPlayerAInContract, betOnPlayerBInContract, claimWinningsFromContract, getCurrentEpochFromContract, getMinEntryFromContract, getGameInfoFromContract } from '../utils/contract';
import { Card, Rank, Suit } from '../interfaces/card';
import { CardDto } from '../interfaces/cardDto';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { publicClient } from 'utils/client';
import dynamic from 'next/dynamic';
import { getEnumName } from 'utils/enumHelper';

const mapCards = (card: CardDto): Card => ({
  rank: card.rank,
  suit: card.suit,
  image: `/images/${getEnumName(Rank, card.rank)?.toLowerCase()}_of_${getEnumName(Suit, card.suit)?.toLowerCase()}.png`
});

interface Participant {
  cards: Card[];
}

const PokerTable: React.FC = () => {
  // TODO: Initial pot amount that should also come from the contract
  const [gameState, setGameState] = useState<number>(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [winningParticipant, setWinningParticipant] = useState<number | null>(null);
  const communityCardsRef = useRef(0);
  const [betAmount, setBetAmount] = useState<string>('0.001');
  const [currentEpoch, setCurrentEpoch] = useState<number>(1);
  const [minEntry, setMinEntry] = useState<number>(0);
  const [totalBetsA, setTotalBetsA] = useState<number>(0);
  const [totalBetsB, setTotalBetsB] = useState<number>(0);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [currentRoundBetEndTimestamp, setCurrentRoundBetEndTimestamp] = useState<bigint | null>(null); // This comes fron the contract, and is used to display a countdown timer to the user when the betting for this round ends
  const [betEndCountdown, setBetEndCountdown] = useState<string>(''); // This is the formatted countdown string that is displayed to the user

  const startGame = async () => {
    if (openConnectModal && !isConnected) {
      openConnectModal();
      setGameStarted(true);
    } else if (isConnected) {
      await fetchParticipantCards();
      setCurrentEpoch(Number(await getCurrentEpochFromContract()));
      setMinEntry(Number(await getMinEntryFromContract()));
      fetchCommunityCards();  // Fetch community cards only after the game has started
    }
  };

  useEffect(() => {
    if (isConnected) {
      startGame();
    }
  }, [isConnected]);

  const handleDisconnect = () => {
    disconnect();
  };

  const fetchParticipantCards = async () => {
    try {
      const playerCardsResponseFromContract = await getPlayerCardsFromContract(currentEpoch);
      const participantACards = playerCardsResponseFromContract[0].map(mapCards);
      const participantBCards = playerCardsResponseFromContract[1].map(mapCards);

      setParticipants([
        { cards: participantACards },
        { cards: participantBCards },
      ]);

      setLogMessages(prev => [...prev, 'Participants cards dealt']);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCommunityCards = async () => {
    try {
      const communityCardsFromContract = await getCommunityCardsFromContract(BigInt(currentEpoch));
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

  const handleBetOnPlayerA = async () => {
    try {
      const hash = await betOnPlayerAInContract(betAmount, BigInt(currentEpoch));
      setLogMessages(prev => [...prev, 'Bet on Player A placed, waiting for confirmation...']);
      const transaction = await publicClient.waitForTransactionReceipt(
        { hash }
      )
      setLogMessages(prev => [...prev, 'Bet on Player A successfully placed']);
    } catch (error) {
      console.error('Error betting on Player A:', error);
      setLogMessages(prev => [...prev, 'Error betting on Player A']);
    }
  };

  const handleBetOnPlayerB = async () => {
    try {
      const hash = await betOnPlayerBInContract(betAmount, BigInt(currentEpoch));
      setLogMessages(prev => [...prev, 'Bet on Player B placed, waiting for confirmation...']);
      const transaction = await publicClient.waitForTransactionReceipt(
        { hash }
      )
      setLogMessages(prev => [...prev, 'Bet on Player B successfully placed']);
    } catch (error) {
      console.error('Error betting on Player B:', error);
      setLogMessages(prev => [...prev, 'Error betting on Player B']);
    }
  };

  const claimWinnings = async () => {
    try {
      const hash = await claimWinningsFromContract(BigInt(currentEpoch));
      setLogMessages(prev => [...prev, 'Claiming winnings, waiting for confirmation...']);
      const transaction = await publicClient.waitForTransactionReceipt(
        { hash }
      )
      setLogMessages(prev => [...prev, 'Winnings successfully claimed']);
    } catch (error) {
      console.error('Error claiming winnings:', error);
      setLogMessages(prev => [...prev, 'Error claiming winnings']);
    }
  };

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const gameInfoData = await getGameInfoFromContract();
        setGameState(gameInfoData['gameState'] || 0);
        setCurrentEpoch(gameInfoData['currentRoundNumber'] || 0);
        setTotalBetsA(gameInfoData['totalBetsOnPlayerA'] || 0);
        setTotalBetsB(gameInfoData['totalBetsOnPlayerB'] || 0);
        setCurrentRoundBetEndTimestamp(gameInfoData['currentRoundBetEndTimestamp'] || BigInt(0));
        // TODO: Use these timestamps to show a countdown timer for betting start/end
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    const interval = setInterval(fetchGameState, 500);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeRemaining = (timestamp: bigint): string => {
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = Number(timestamp) - currentTime;
    const formattedTime = new Date(remainingTime * 1000).toISOString().substr(14, 5);
    return `${formattedTime}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      // Assuming calculateTimeRemaining returns a string like "05:00" for 5 minutes
      if (currentRoundBetEndTimestamp) {
        const endCountdown = calculateTimeRemaining(currentRoundBetEndTimestamp);
        setBetEndCountdown(endCountdown);
      }
    };

    // Update countdowns every second
    const countdownInterval = setInterval(updateCountdowns, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [currentRoundBetEndTimestamp]);

  return (
    <div className="flex flex-col items-center mt-12">
      <h1>Poker Table</h1>
      <ConnectButton chainStatus="name" showBalance={false} />
      <button onClick={startGame} title="Start Game" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Start Game</button>
      {isConnected && <button onClick={handleDisconnect} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Disconnect Wallet</button>}
      {isConnected && (
        <div className="flex justify-between items-center w-4/5 bg-green-500 p-6 rounded-lg relative mt-6">
          {participants.length >= 1 && (
            <div className={`flex flex-col items-center ${winningParticipant === 0 ? 'border-4 border-yellow-500' : ''}`}>
              <h2>Participant A</h2>
              <div className="flex justify-center mt-2">
                {participants[0].cards.map((card, i) => (
                  card && <img key={i} src={card.image} alt={`${card.rank} of ${card.suit}`} className="m-2 w-24 transition-transform transform hover:scale-110" />
                ))}
              </div>
              <h3>Total Bets: {totalBetsA}</h3>
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
                className="mt-2 px-2 py-1 rounded border"
              />
              <button onClick={handleBetOnPlayerA} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" disabled={gameState !== 0 || Number(betEndCountdown) <= 0}>Bet on Player A</button>
            </div>
          )}
          {communityCards.length > 0 && (
            <div className="text-center">
              <h2>Community Cards</h2>
              <div className="flex justify-center mt-2">
                {communityCards.map((card, index) => (
                  card && <img key={index} src={card.image} alt={`${card.rank} of ${card.suit}`} className="m-2 w-24 transition-transform transform hover:scale-110" />
                ))}
              </div>
              {currentRoundBetEndTimestamp && (
                <div className="betting-controls">
                  {currentRoundBetEndTimestamp > BigInt(0) && (
                    <div>
                      Current round Betting ends in: {betEndCountdown}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
          {participants.length >= 2 && (
            <div className={`flex flex-col items-center ${winningParticipant === 1 ? 'border-4 border-yellow-500' : ''}`}>
              <h2>Participant B</h2>
              <div className="flex justify-center mt-2">
                {participants[1].cards.map((card, i) => (
                  card && <img key={i} src={card.image} alt={`${card.rank} of ${card.suit}`} className="m-2 w-24 transition-transform transform hover:scale-110" />
                ))}
              </div>
              <h3>Total Bets: {totalBetsB}</h3>
              <select value={betAmount} onChange={(e) => setBetAmount(e.target.value)} className="mt-2 px-2 py-1 rounded border">
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
                className="mt-2 px-2 py-1 rounded border"
              />
              <button onClick={handleBetOnPlayerB} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" disabled={gameState !== 0 || Number(betEndCountdown) <= 0}>Bet on Player B</button>
            </div>
          )}
        </div>
      )}
      <div className="mt-4">
        <h2>Place Your Bet</h2>
      </div>
      <div className="mt-4 bg-gray-300 p-4 rounded w-4/5">
        {logMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <button onClick={claimWinnings} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Claim Winnings</button>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PokerTable), { ssr: false });
