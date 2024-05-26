import Web3 from 'web3';

let web3: Web3 | undefined;

if (typeof window !== 'undefined' && (window as any).ethereum !== 'undefined') {
    web3 = new Web3((window as any).ethereum);
} else {
    const provider = new Web3.providers.HttpProvider(process.env.INFURIA_URL || 'https://sepolia.blast.io'); // Provide a default value for INFURIA_URL
    web3 = new Web3(provider);
}

export const removeDisconnection = () => {
    if (window.localStorage) {
      window.localStorage.removeItem("ext_disconnect");
    }
  };
  
// const connectMetamask = async () => {
//     try {
//       //no metamask detected
//       if (!(window as any).ethereum) throw new Error("No crypto wallet found");
//       removeDisconnection();
//       const ethProvider = getMetaMaskProvider();
//       const account = await ethProvider.send("eth_requestAccounts", []);
//       console.log("account in connectMetamask", account);
//       return account;
//     } catch (error: any) {
//       console.log("Metamask error", error);
//       throw error;
//     }
//   };

  const isMetamaskDisconnected = () => {
    if (!(window as any).localStorage) return true;
    const isDisconnected = window.localStorage.getItem("ext_disconnect");
    return isDisconnected === "1" ? true : false;
  };

export const connectMetaMask = async () => {
    if (!(window as any).ethereum) throw new Error("No crypto wallet found");
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const networkId = Number(await web3.eth.net.getId()); // Convert networkId to number
        if (networkId !== Number(168587773)) { // Convert process.env.CHAIN_ID to number
            alert('Please connect to the correct network');
            return false;
        }
        return true;
    } catch (error) {
        console.error('MetaMask connection error:', error);
        return false;
    }
};
// TODO: Integrate some generic wallet library.
// TODO: Test logout and login functionality using Metamask

export default web3;
