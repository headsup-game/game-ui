"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { betOnPlayerAInContract, betOnPlayerBInContract, claimWinningsFromContract, getGameInfoFromContract } from '../utils/contract';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { publicClient } from 'utils/client';
import dynamic from 'next/dynamic';
import { GameStateDto } from 'interfaces/gameStateDto';
import { GameState, RoundState, getGameStateFromGameStateDto } from 'interfaces/gameState';

const PokerTable: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [betAmount, setBetAmount] = useState<string>('0.001');
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [betEndCountdown, setBetEndCountdown] = useState<string>(''); // This is the formatted countdown string that is displayed to the user

  const handleDisconnect = () => {
    disconnect();
  };

  const handleBetOnPlayerA = async () => {
    try {
      const hash = await betOnPlayerAInContract(betAmount, BigInt(gameState?.roundNumber ?? 0));
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
      const hash = await betOnPlayerBInContract(betAmount, BigInt(gameState?.roundNumber ?? 0));
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
      const hash = await claimWinningsFromContract(BigInt(gameState?.roundNumber ?? 0));
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
        const gameInfoData: GameStateDto = await getGameInfoFromContract();
        setGameState(getGameStateFromGameStateDto(gameInfoData));

        // TODO: Use these timestamps to show a countdown timer for betting start/end
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    const interval = setInterval(fetchGameState, 500);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeRemaining = (timestamp: number): string => {
    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = Number(timestamp) - currentTime;
    const formattedTime = new Date(remainingTime * 1000).toISOString().substr(14, 5);
    return `${formattedTime}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      // Assuming calculateTimeRemaining returns a string like "05:00" for 5 minutes
      if (gameState?.currentRoundEndTimeStamp) {
        const endCountdown = calculateTimeRemaining(gameState.currentRoundEndTimeStamp);
        setBetEndCountdown(endCountdown);
      }
    };

    // Update countdowns every second
    const countdownInterval = setInterval(updateCountdowns, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [gameState?.currentRoundEndTimeStamp]);

  return (
    <div className="flex flex-col items-center mt-12">
      <h1>Poker Table</h1>
      <ConnectButton chainStatus="name" showBalance={false} />
      {isConnected && <button onClick={handleDisconnect} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Disconnect Wallet</button>}
      {isConnected && (
        <div className="flex justify-between items-center w-4/5 bg-green-500 p-6 rounded-lg relative mt-6">
          {gameState && gameState.participants?.length >= 1 && (
            <div className={`flex flex-col items-center ${gameState.winningParticipant?.id === gameState.participants[0].id ? 'border-4 border-yellow-500' : ''}`}>
              <h2>Participant A</h2>
              <div className="flex justify-center mt-2">
                {gameState.participants[0].cards.map((card, i) => (
                  card && <img key={i} src={card.image} alt={`${card.rank} of ${card.suit}`} className="m-2 w-24 transition-transform transform hover:scale-110" />
                ))}
              </div>
              <h3>Total Bets: {gameState.participants[0].totalBetAmounts}</h3>
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
              <button onClick={handleBetOnPlayerA} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" disabled={gameState.state != RoundState.BettingStarted || Number(betEndCountdown) <= 0}>
                Bet on Player A
              </button>
            </div>
          )}
          {gameState && gameState.communityCards?.length > 0 && (
            <div className="text-center">
              <h2>Community Cards</h2>
              <div className="flex justify-center mt-2">
                {gameState.communityCards.map((card, index) => (
                  card && <img key={index} src={card.image} alt={`${card.rank} of ${card.suit}`} className="m-2 w-24 transition-transform transform hover:scale-110" />
                ))}
              </div>
              {gameState.currentRoundEndTimeStamp && (
                <div className="mt-20">
                  {gameState.currentRoundEndTimeStamp > BigInt(0) && (
                    <div>
                      Current round Betting ends in: {betEndCountdown}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
          {gameState && gameState.participants?.length >= 2 && (
            <div className={`flex flex-col items-center ${gameState.winningParticipant?.id === gameState.participants[1].id ? 'border-4 border-yellow-500' : ''}`}>
              <h2>Participant B</h2>
              <div className="flex justify-center mt-2">
                {gameState.participants[1].cards.map((card, i) => (
                  card && <img key={i} src={card.image} alt={`${card.rank} of ${card.suit}`} className="m-2 w-24 transition-transform transform hover:scale-110" />
                ))}
              </div>
              <h3>Total Bets: {gameState.participants[1].totalBetAmounts}</h3>
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
              <button onClick={handleBetOnPlayerB} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" disabled={gameState.state != RoundState.BettingStarted || Number(betEndCountdown) <= 0}>
                Bet on Player B
              </button>
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
