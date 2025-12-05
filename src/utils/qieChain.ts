import { defineChain } from 'viem';

export const qieTestnet = defineChain({
  id: 1983,
  name: 'QIE testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'QIE',
    symbol: 'QIE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc1testnet.qie.digital'],
    },
    public: {
      http: ['https://rpc1testnet.qie.digital', 'https://rpc2testnet.qie.digital'],
    },
  },
  blockExplorers: {
    default: {
      name: 'QIE Testnet Explorer',
      url: 'https://testnet.qie.digital',
    },
  },
  testnet: true,
});

