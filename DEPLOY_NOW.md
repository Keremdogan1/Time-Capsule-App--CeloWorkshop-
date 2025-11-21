# 🚀 Deploy Now - Quick Guide

## Current Issue
The default RPC endpoint is timing out from your network.

## ✅ Best Solution: Use a Free RPC Provider

### Step 1: Get a Free Infura API Key (Recommended)

1. Go to https://infura.io and sign up (free)
2. Create a new project
3. Select "Celo Alfajores" as the network
4. Copy your API key

### Step 2: Update Your .env File

Open `packages/hardhat/.env` and add:

```env
PRIVATE_KEY=your_private_key_here
CELO_RPC_URL=https://celo-alfajores.infura.io/v3/YOUR_INFURA_API_KEY
```

Replace `YOUR_INFURA_API_KEY` with your actual Infura API key.

### Step 3: Test and Deploy

```bash
cd packages/hardhat
npm run test-rpc    # Test the connection
npm run deploy      # Deploy the contract
```

---

## 🏠 Alternative: Deploy to Localhost (For Testing)

If you just want to test without deploying to Alfajores:

### Terminal 1: Start Local Node
```bash
cd packages/hardhat
npx hardhat node
```

### Terminal 2: Deploy to Localhost
```bash
cd packages/hardhat
npx hardhat run scripts/deploy.ts --network localhost
```

This will give you a contract address you can use for frontend development!

---

## 🔍 Why This Happens

The default Forno RPC endpoint can be unreachable due to:
- Network firewall/proxy
- Geographic restrictions  
- Temporary downtime
- ISP blocking

Using a service like Infura or Alchemy solves this because they:
- Have better uptime
- Work from all locations
- Provide free tier for development
- Are specifically designed for this use case

---

## 📝 Quick Checklist

- [ ] Sign up for Infura (or Alchemy/QuickNode)
- [ ] Get your API key
- [ ] Add `CELO_RPC_URL` to `.env`
- [ ] Run `npm run test-rpc` to verify
- [ ] Run `npm run deploy` to deploy

---

## ❓ Need Help?

Check `SOLUTION.md` for detailed troubleshooting steps.

