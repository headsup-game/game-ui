import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [
        jsonRpcProvider({
            rpc: (chain) => {
                if (chain.id === mainnet.id) return { http: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID' };
                if (chain.id === polygon.id) return { http: 'https://polygon-rpc.com/' };
                return { http: 'https://rpc.ankr.com/eth' }; // Fallback RPC
            },
        }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'Your App Name',
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
});

export const RainbowKitSetup: React.FC = ({ children }) => (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
            {children}
        </RainbowKitProvider>
    </WagmiConfig>
);
