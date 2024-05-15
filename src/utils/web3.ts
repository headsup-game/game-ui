import Web3 from 'web3';

let web3: Web3 | undefined;

if (typeof window !== 'undefined' && (window as any).ethereum !== 'undefined') {
    web3 = new Web3((window as any).ethereum);
} else {
  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
  web3 = new Web3(provider);
}

export const connectMetaMask = async () => {
if (web3 && (window as any).ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const networkId = Number(await web3.eth.net.getId()); // Convert networkId to number
            if (networkId !== 81457) { // Replace YOUR_NETWORK_ID with the correct network ID
                alert('Please connect to the correct network');
                return false;
            }
            return true;
        } catch (error) {
            console.error('MetaMask connection error:', error);
            return false;
        }
    } else {
    alert('Please install MetaMask');
    return false;
  }
};

export default web3;
