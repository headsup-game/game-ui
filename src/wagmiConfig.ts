import { getDefaultConfig, Chain} from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'viem/chains';

export const config = getDefaultConfig({
  appName: 'Headsup',
  projectId: 'YOUR_PROJECT_ID',
  chains: [baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


