import { ethers } from 'ethers';
import provider from './ethers';

let contract: ethers.Contract | undefined;

const contractAddress = '0x38bDa9F9bEF0C468f2E00E2B7892157fB6A249d5';

const contractABI = [{"inputs":[],"name":"MAX_TREASURY_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"betOnPlayerA","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"betOnPlayerB","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"bets","outputs":[{"internalType":"enum HeadsUp.Position","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bufferSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cardsDealt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"epochs","type":"uint256[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"claimable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"communityCards","outputs":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"dealCommunityCards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"dealPlayerCards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"enum HeadsUp.Position","name":"position","type":"uint8"}],"name":"declareWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"genesisStartOnce","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"getCommunityCards","outputs":[{"components":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"internalType":"struct HeadsUp.Card[5]","name":"_communityCards","type":"tuple[5]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"getPlayerCards","outputs":[{"components":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"internalType":"struct HeadsUp.Card[2]","name":"_playerACards","type":"tuple[2]"},{"components":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"internalType":"struct HeadsUp.Card[2]","name":"_playerBCards","type":"tuple[2]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserRoundsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"intervalSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minEntry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operatorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracleLatestRoundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracleUpdateAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"playerACards","outputs":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"playerBCards","outputs":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"refundable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userRounds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winner","outputs":[{"internalType":"enum HeadsUp.Position","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];

export interface cardDTO {
    0: number;
    1: number;
    suit: number;
    rank: number;
}

const initializeContract = async () => {
    if (!provider) throw new Error("Provider is not initialized");
    contract = new ethers.Contract(contractAddress, contractABI, await provider.getSigner());
};

export const getPlayerCardsFromContract = async (round: number) => {
    try {
        if (!contract) await initializeContract();
        const cards = await contract?.getPlayerCards(round) as [cardDTO[], cardDTO[]];
        return cards;
    } catch (error) {
        console.error('Error getting player cards from contract:', error);
        throw error;
    }
};

export const getCommunityCardsFromContract = async (round: number) => {
    try {
        if (!contract) await initializeContract();
        const cards = await contract?.getCommunityCards(round) as cardDTO[];
        return cards;
    } catch (error) {
        console.error('Error getting community cards from contract:', error);
        throw error;
    }
};

export const getWinnerFromContract = async (round: number) => {
    try {
        if (!contract) await initializeContract();
        const winner = await contract?.winner(round) as number;
        return winner;
    } catch (error) {
        console.error('Error getting winner from contract:', error);
        throw error;
    }
};

export const betOnPlayerAInContract = async (amount: string, round: number) => {
    try {
        if (!contract) await initializeContract();
        const tx = await contract?.betOnPlayerA(round, { value: ethers.parseEther(amount) });
        await tx.wait(); // Wait for the transaction to be mined
        return tx;
    } catch (error) {
        console.error('Error betting on Player A:', error);
        throw error;
    }
};

export const betOnPlayerBInContract = async (amount: string, round: number) => {
    try {
        if (!contract) await initializeContract();
        const tx = await contract?.betOnPlayerB(round, { value: ethers.parseEther(amount) });
        await tx.wait(); // Wait for the transaction to be mined
        return tx;
    } catch (error) {
        console.error('Error betting on Player B:', error);
        throw error;
    }
};

export const claimWinningsFromContract = async (round: number) => {
    try {
        if (!contract) await initializeContract();
        const tx = await contract?.claim([round]);
        await tx.wait(); // Wait for the transaction to be mined
        return tx;
    } catch (error) {
        console.error('Error claiming winnings:', error);
        throw error;
    }
};

export const getCurrentEpochFromContract = async () => {
    try {
        if (!contract) await initializeContract();
        const currentEpoch = await contract?.currentEpoch() as number;
        return currentEpoch;
    } catch (error) {
        console.error('Error getting current epoch from contract:', error);
        throw error;
    }
};

export const getMinEntryFromContract = async () => {
    try {
        if (!contract) await initializeContract();
        const minEntry = await contract?.minEntry() as number;
        return minEntry;
    } catch (error) {
        console.error('Error getting minimum entry from contract:', error);
        throw error;
    }
};

export const getGameInfoFromContract = async () => {
    try {
        if (!contract) await initializeContract();
        // TODO: Implement the getGameInfo function in the contract
        // const gameInfo = await contract?.getGameInfo() as [number, number, number, number]; // gameState, currentRoundNumber, totalBetsOnPlayerA, totalBetsOnPlayerB.
        const gameInfo = [0, 1, 1, 1];
        return gameInfo;
    } catch (error) {
        console.error('Error getting game info from contract:', error);
        throw error;
    }
};

// Initialize the contract once during the module loading
initializeContract();
