import Web3 from 'web3';

let web3: Web3 | undefined;
let contract: any | undefined;

declare global {
    interface Window {
        ethereum: any;
    }
}

const contractAddress = '0x38bDa9F9bEF0C468f2E00E2B7892157fB6A249d5';

const contractABI = [{"inputs":[],"name":"MAX_TREASURY_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"betOnPlayerA","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"betOnPlayerB","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"bets","outputs":[{"internalType":"enum HeadsUp.Position","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bufferSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"cardsDealt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"epochs","type":"uint256[]"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"claimable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"communityCards","outputs":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"dealCommunityCards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"dealPlayerCards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"enum HeadsUp.Position","name":"position","type":"uint8"}],"name":"declareWinner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"genesisStartOnce","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"getCommunityCards","outputs":[{"components":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"internalType":"struct HeadsUp.Card[5]","name":"_communityCards","type":"tuple[5]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"}],"name":"getPlayerCards","outputs":[{"components":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"internalType":"struct HeadsUp.Card[2]","name":"_playerACards","type":"tuple[2]"},{"components":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"internalType":"struct HeadsUp.Card[2]","name":"_playerBCards","type":"tuple[2]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserRoundsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"intervalSeconds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minEntry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operatorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracleLatestRoundId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracleUpdateAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"playerACards","outputs":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"playerBCards","outputs":[{"internalType":"enum HeadsUp.Rank","name":"rank","type":"uint8"},{"internalType":"enum HeadsUp.Suit","name":"suit","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epoch","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"refundable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"userRounds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"winner","outputs":[{"internalType":"enum HeadsUp.Position","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}];

export interface cardDTO {
    0: number;
    1: number;
    suit: number;
    rank: number;
  }

if (typeof window !== 'undefined' && (window as any).ethereum !== 'undefined') {
    web3 = new Web3((window as any).ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(process.env.INFURIA_URL || 'https://sepolia.blast.io'); // Provide a default value for INFURIA_URL
    web3 = new Web3(provider);
}

// Function to initialize the contract
const initializeContract = async (web3: Web3) => {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    return contract;
};

export const getPlayerCardsFromContract = async (round: number) => {
    if (!contract) {
        throw new Error("Contract not initialized");
    }
    const cards = await contract.methods.getPlayerCards(round).call() as [cardDTO[], cardDTO[]];
    return cards;
};

export const getCommunityCardsFromContract = async (round: number) => {
    if (!contract) {
        throw new Error("Contract not initialized");
    }
    const cards = await contract.methods.getCommunityCards(round).call() as cardDTO[];
    return cards;
};

export const getWinnerFromContract = async (round: number) => {
    if (!contract) {
        throw new Error("Contract not initialized");
    }
    const winner = await contract.methods.winner(round).call() as number;
    return winner;
}
export const betOnPlayerAInContract = async (amount: string, round: number) => {
    if (!contract) {
        throw new Error("Contract not initialized");
    }
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.betOnPlayerA(round).send({
            from: accounts[0],
            value: web3.utils.toWei(amount, 'ether')
        });
    } catch (error) {
        console.error('Error betting on Player A:', error);
        throw error;
    }
};

export const betOnPlayerBInContract = async (amount: string, round: number) => {
    if (!contract) {
        throw new Error("Contract not initialized");
    }
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.betOnPlayerB(round).send({
            from: accounts[0],
            value: web3.utils.toWei(amount, 'ether')
        });
    } catch (error) {
        console.error('Error betting on Player B:', error);
        throw error;
    }
};


export const claimWinningsFromContract = async (round: number) => {
    if (!contract) {
        throw new Error("Contract not initialized");
    }
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.claim([round]).send({
            from: accounts[0]
        });
    } catch (error) {
        console.error('Error claiming winnings:', error);
        throw error;
    }
};

export const getCurrentEpochFromContract = async () => {
    if (!contract) {
        throw new Error("Contract not initialized");
    }
    const accounts = await web3.eth.getAccounts();
    try {
        const currentEpoch = await contract.methods.currentEpoch().call() as number;
        return currentEpoch;
    } catch (error) {
        console.error('Error getting current epoch:', error);
        throw error;
    }
};

export const getMinEntryFromContract = async () => {
    if (!contract) {
        throw new Error("Contract not initialized");
    }
    const accounts = await web3.eth.getAccounts();
    try {
        const minEntry = await contract.methods.minEntry().call() as number;
        return minEntry;
    } catch (error) {
        console.error('Error getting min entry:', error);
        throw error;
    }
};

// Call initializeContract to ensure contract is initialized
initializeContract(web3 as Web3);
