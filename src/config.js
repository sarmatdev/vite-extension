export default {
  networks: [
    {
      id: 1,
      chainId: 1,
      name: 'Mainnet',
      apiUrl: 'https://api.s0.t.hmny.io'
    },
    {
      id: 2,
      chainId: 2,
      name: 'Testnet',
      apiUrl: 'https://api.s0.b.hmny.io'
    },
    {
      id: 3,
      chainId: 3,
      name: 'Localnet',
      apiUrl: 'http://127.0.0.1:9500'
    }
  ]
}
