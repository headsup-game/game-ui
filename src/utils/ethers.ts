import { createPublicClient, http } from 'viem';
import { qieTestnet } from './qieChain';

const provider = createPublicClient({
  chain: qieTestnet,
  transport: http('https://rpc1testnet.qie.digital'),
});

export default provider;
