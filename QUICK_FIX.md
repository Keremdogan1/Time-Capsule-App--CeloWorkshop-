# Quick Fix for Connection Timeout Error

## Problem
You're getting `Connect Timeout Error` when trying to deploy or test RPC connection.

## Solution

### Step 1: Update your .env file

Open `packages/hardhat/.env` and add or update this line:

```env
CELO_RPC_URL=https://rpc.ankr.com/celo_alfajores
```

Your complete `.env` file should look like:
```env
PRIVATE_KEY=your_private_key_here
CELO_RPC_URL=https://rpc.ankr.com/celo_alfajores
```

### Step 2: Test the connection

```bash
cd packages/hardhat
npm run test-rpc
```

### Step 3: If Ankr doesn't work, try these alternatives

**Option A: Thirdweb**
```env
CELO_RPC_URL=https://alfajores.rpc.thirdweb.com
```

**Option B: Use the updated default (already configured)**
The hardhat config now defaults to Ankr if CELO_RPC_URL is not set, but it's better to set it explicitly.

### Step 4: Deploy

Once the RPC test succeeds:
```bash
npm run deploy
```

## Why this happens

The default Celo Forno RPC endpoint (`https://alfajores-forno.celo-testnet.org`) can sometimes be unreachable due to:
- Network connectivity issues
- Firewall blocking the connection
- The endpoint being temporarily down
- Geographic restrictions

Using alternative endpoints like Ankr or Thirdweb often resolves these issues.

## Still having problems?

1. **Check your internet connection** - Make sure you can access other websites
2. **Check firewall/VPN** - Try disabling VPN or firewall temporarily
3. **Try a different network** - Use mobile hotspot or different WiFi
4. **Check if ports are blocked** - Ensure port 443 (HTTPS) is open

## Alternative: Deploy locally first

For testing without deploying to Alfajores:

```bash
# Start local Hardhat node
npx hardhat node

# In another terminal, deploy to localhost
npx hardhat run scripts/deploy.ts --network localhost
```

This will give you a contract address you can use for frontend development.

