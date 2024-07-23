"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { getGameInfoFromContract } from '../utils/contract';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import dynamic from 'next/dynamic';
import { GameStateDto } from 'interfaces/gameStateDto';
import { GameState, getGameStateFromGameStateDto } from 'interfaces/gameState';
import { PlayerBet } from './playerBet';
import { CommunityCards } from './communityCards';
import { ClaimWinnings } from './claimWinnings';
import { Timer } from './timer';
import {
  useQuery,
} from '@tanstack/react-query'
import { graphql } from '../gql/src';
import { client } from '../graphql/client';

const PokerTable: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  const Subgraphs = graphql(`
    query GetOrders {
      states {
        protocolFeePercent
      }
      orders(first: 5) {
        id
        yieldEarned
        orderId
        creator {
          id
        }
        recipient
      }
    }
  `);



  const { data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async ()=>
      client.request(
          Subgraphs,
          {

          }
      )
  })

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const gameInfoData: GameStateDto = await getGameInfoFromContract();
        setGameState(getGameStateFromGameStateDto(gameInfoData));
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };

    const interval = setInterval(fetchGameState, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogs = useCallback((state: string) => {
    setLogMessages(prev => [...prev, state]);
  }, [setLogMessages]);

  return (
    <div className="flex flex-col items-center mt-12">
      <h1>Poker Table</h1>
      <ConnectButton chainStatus="name" showBalance={true} />
      {isConnected && <button onClick={handleDisconnect} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Disconnect Wallet</button>}
      {isConnected && gameState && gameState.participants?.length == 2 && gameState.communityCards?.length > 0 && (
        <div className="flex justify-between items-center w-4/5 bg-green-500 p-6 rounded-lg relative mt-6">
          <PlayerBet playerId={gameState.participants[0].id} roundNumber={gameState.roundNumber} onBetStateChange={handleLogs} playerName='PlayerA' totalBetAmounts={gameState.participants[0].totalBetAmounts} cards={gameState.participants[0].cards} />
          <div className='flex flex-col items-center'>
            <CommunityCards cards={gameState.communityCards} />
            <Timer endDateTimeStamp={gameState.currentRoundEndTimeStamp} />
          </div>
          <PlayerBet playerId={gameState.participants[1].id} roundNumber={gameState.roundNumber} onBetStateChange={handleLogs} playerName='PlayerB' totalBetAmounts={gameState.participants[1].totalBetAmounts} cards={gameState.participants[1].cards} />
        </div>
      )}
      <div className="mt-4 bg-gray-300 p-4 rounded w-4/5">
        {logMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      {gameState && <ClaimWinnings roundNumber={gameState.roundNumber} onClaimWinningsStateChange={handleLogs} />}
      <div>{isFetching ? 'Updating...' : ''}</div>
      {data && data.orders.map((order: any) => (
        <div key={order.id}>
          <h1>{order.id}</h1>
        </div>
      ))}
    </div>

  );
};

export default dynamic(() => Promise.resolve(PokerTable), { ssr: false });
