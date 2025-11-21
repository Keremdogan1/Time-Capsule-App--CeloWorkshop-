# Deployment Troubleshooting Guide

## Connection Timeout Error

If you're experiencing `ConnectTimeoutError` when deploying, try these solutions:

### 1. Check Your Internet Connection
Make sure you have a stable internet connection.

### 2. Try Alternative RPC Endpoints

Edit `packages/hardhat/.env` and add:
```env
CELO_RPC_URL=https://rpc.ankr.com/celo_alfajores
```

Other alternative endpoints you can try:
- `https://alfajores-forno.celo-testnet.org` (Primary - default)
- `https://rpc.ankr.com/celo_alfajores` (Ankr)
- `https://celo-alfajores.infura.io/v3/YOUR_INFURA_KEY` (Infura - requires API key)
- `https://alfajores.rpc.thirdweb.com` (Thirdweb)
- `wss://alfajores-forno.celo-testnet.org/ws` (WebSocket - if supported)

### 3. Check Firewall/Proxy Settings
- Ensure your firewall isn't blocking HTTPS connections
- If behind a proxy, configure Node.js proxy settings
- Try disabling VPN if you're using one

### 4. Verify Environment Variables
Make sure your `.env` file in `packages/hardhat/` contains:
```env
PRIVATE_KEY=your_private_key_here
# Optional: CELO_RPC_URL=https://alternative-endpoint.com
```

### 5. Check Account Balance
You need testnet CELO to deploy. Get it from:
- https://faucet.celo.org/alfajores
- https://celo.org/developers/faucet

### 6. Test RPC Connection Manually
You can test if the RPC endpoint is reachable:
```bash
curl https://alfajores-forno.celo-testnet.org -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

### 7. Increase Timeout (Already Configured)
The timeout is already set to 120 seconds in `hardhat.config.ts`. If you need more:
```typescript
timeout: 180000, // 180 seconds
```

### 8. Use a Different Network Temporarily
For testing, you can deploy to a local Hardhat network first:
```bash
npx hardhat run scripts/deploy.ts --network localhost
```

Then test your frontend with the local contract.

## Common Error Messages

### "Connect Timeout Error"
- See solutions 1-3 above

### "insufficient funds"
- Get testnet CELO from faucet (solution 5)

### "nonce too low"
- Wait a few minutes and try again
- Or use a different account

### "invalid account"
- Check that PRIVATE_KEY in .env is correct
- Make sure it starts with `0x`

## Getting Help

If none of these solutions work:
1. Check the Celo Discord: https://discord.gg/celo
2. Check Celo Forum: https://forum.celo.org
3. Check network status: https://status.celo.org

