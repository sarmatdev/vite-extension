export default {
  networks: [
    {
      id: 1,
      name: 'Mainnet',
      httpUrl: 'https://node-tokyo.vite.net/http',
      wsUrl: 'wss://node-tokyo.vite.net/ws'
    },
    {
      id: 2,
      name: 'Testnet',
      httpUrl: 'https://buidl.vite.net/gvite/http',
      wsUrl: 'wss://buidl.vite.net/gvite/ws'
    },
    {
      id: 3,
      name: 'Local',
      httpUrl: 'http://127.0.0.1:9500',
      wsUrl: ''
    }
  ],
  nativeAsset: {
    tokenSymbol: 'VITE',
    tokenName: 'Vite Token',
    tokenId: 'tti_5649544520544f4b454e6e40',
    decimals: 18
  }
}
