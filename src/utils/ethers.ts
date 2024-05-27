import { BrowserProvider, JsonRpcProvider } from 'ethers';
import { ethers } from 'ethers';

let provider: BrowserProvider | JsonRpcProvider;
let signer: ethers.Signer | undefined;

if (typeof window !== 'undefined' && (window as any).ethereum !== 'undefined') {
    provider = new BrowserProvider((window as any).ethereum);
    signer = await (async () => {
        return await provider.getSigner();
    })();
} else {
    provider = new JsonRpcProvider(process.env.INFURA_URL || 'https://sepolia.blast.io'); // Provide a default value for INFURA_URL
}

export const removeDisconnection = () => {
    if (window.localStorage) {
        window.localStorage.removeItem("ext_disconnect");
    }
};

export const connectMetaMask = async () => {
    if (!(window as any).ethereum) throw new Error("No crypto wallet found");
    try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const network = await provider.getNetwork();
        const chainId = process.env.CHAIN_ID; // Add this line to define the chainId variable
        if (chainId && network.chainId !== BigInt(chainId)) { // Use the chainId variable in the comparison
            alert('Please connect to the correct network');
            return false;
        }
        signer = await (async () => {
            return await provider.getSigner();
        })();
        return true;
    } catch (error) {
        console.error('MetaMask connection error:', error);
        return false;
    }
};

export default provider;
