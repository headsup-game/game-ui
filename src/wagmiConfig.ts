import { getDefaultConfig, Chain} from '@rainbow-me/rainbowkit';

// PulseChain Mainnet Configuration
const pulsechain = {
  id: 369,
  name: 'PulseChain',
  iconUrl: 'https://pulsechain.com/images/pulse-icon.png', // TODO: Update with actual icon URL
  iconBackground: '#000',
  nativeCurrency: { 
    name: 'Pulse', 
    symbol: 'PLS', 
    decimals: 18 
  },
  rpcUrls: {
    default: { 
      http: ['https://rpc.pulsechain.com'] 
    },
    public: { 
      http: ['https://rpc.pulsechain.com'] 
    },
  },
  blockExplorers: {
    default: { 
      name: 'PulseScan', 
      url: 'https://scan.pulsechain.com' 
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
} as const satisfies Chain;

// PulseChain Testnet v4 Configuration
const pulsechainTestnet = {
  id: 943,
  name: 'PulseChain Testnet',
  iconUrl: 'https://pulsechain.com/images/pulse-icon.png', // TODO: Update with actual icon URL
  iconBackground: '#000',
  nativeCurrency: { 
    name: 'Test Pulse', 
    symbol: 'tPLS', 
    decimals: 18 
  },
  rpcUrls: {
    default: { 
      http: ['https://rpc.v4.testnet.pulsechain.com'] 
    },
    public: { 
      http: ['https://rpc.v4.testnet.pulsechain.com'] 
    },
  },
  blockExplorers: {
    default: { 
      name: 'PulseScan Testnet', 
      url: 'https://scan.v4.testnet.pulsechain.com' 
    },
  },
} as const satisfies Chain;

export const config = getDefaultConfig({
  appName: 'Headsup',
  projectId: 'YOUR_PROJECT_ID',
  chains: [pulsechain], // Change to [pulsechainTestnet] for testing
  ssr: true,
});


