# Solution for Connection Timeout Errors

## Problem
You're experiencing connection timeout errors when trying to deploy to Celo Alfajores.

## Root Cause
The default Celo Forno RPC endpoint may be unreachable from your network due to:
- Network firewall/proxy settings
- Geographic restrictions
- Temporary endpoint downtime
- ISP blocking

## Solutions (Try in Order)

### Solution 1: Use a Public RPC Provider (Recommended)

Get a free API key from one of these providers and use their endpoint:

#### Option A: Infura (Free tier available)
1. Sign up at https://infura.io
2. Create a new project and get your API key
3. Add to `packages/hardhat/.env`:
```env
CELO_RPC_URL=https://celo-alfajores.infura.io/v3/YOUR_INFURA_API_KEY
```

#### Option B: QuickNode (Free tier available)
1. Sign up at https://quicknode.com
2. Create a Celo Alfajores endpoint
3. Add to `packages/hardhat/.env`:
```env
CELO_RPC_URL=https://your-endpoint.quiknode.pro/YOUR_KEY
```

#### Option C: Alchemy (Free tier available)
1. Sign up at https://alchemy.com
2. Create a Celo Alfajores app
3. Add to `packages/hardhat/.env`:
```env
CELO_RPC_URL=https://celo-alfajores.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
```

### Solution 2: Deploy to Localhost (For Testing)

For development and testing, you can run a local Hardhat node:

```bash
# Terminal 1: Start local node
cd packages/hardhat
npx hardhat node

# Terminal 2: Deploy to localhost
npm run deploy -- --network localhost
```

This will give you a contract address you can use for frontend development without needing to connect to Alfajores.

### Solution 3: Check Network Settings

1. **Disable VPN** if you're using one
2. **Check firewall** - ensure it's not blocking Node.js
3. **Try different network** - use mobile hotspot or different WiFi
4. **Check corporate proxy** - if behind corporate network, configure proxy

### Solution 4: Manual Endpoint Test

Test if endpoints are reachable:

```bash
# Test Forno endpoint
curl https://alfajores-forno.celo-testnet.org -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

# If successful, you should get a JSON response with block number
```

## Recommended Approach

For development:
1. **Use localhost** - Deploy to local Hardhat node for testing
2. **Use Infura/Alchemy** - For actual testnet deployment

For production:
1. **Use your own node** - Run your own Celo node
2. **Use paid RPC service** - For reliable, high-performance endpoints

## Current Configuration

Your `hardhat.config.ts` is configured to:
- Use `CELO_RPC_URL` from `.env` if set
- Fallback to Forno endpoint if not set
- Timeout set to 180 seconds
- Automatic gas estimation

## Next Steps

1. **Try localhost deployment first** (Solution 2) to verify everything works
2. **Sign up for Infura** (Solution 1A) for reliable testnet access
3. **Update `.env`** with the new RPC URL
4. **Test connection**: `npm run test-rpc`
5. **Deploy**: `npm run deploy`

