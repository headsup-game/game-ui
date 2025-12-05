import { getDefaultConfig, Chain} from '@rainbow-me/rainbowkit';
import { qieTestnet } from './utils/qieChain';

export const config = getDefaultConfig({
  appName: 'Headsup',
  projectId: 'YOUR_PROJECT_ID',
  chains: [qieTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


