# Deploy to Localhost - Working Solution

## Why Localhost?

Since the external RPC endpoints are having connectivity issues, deploying to a local Hardhat node is the best solution for development and testing. It's fast, reliable, and doesn't require any network access.

## Step-by-Step Guide

### Step 1: Start Local Hardhat Node

Open a **new terminal** and run:

```bash
cd packages/hardhat
npx hardhat node
```

You should see output like:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
...
```

**Keep this terminal open** - the node needs to keep running.

### Step 2: Deploy Contract to Localhost

Open a **second terminal** (keep the first one running) and run:

```bash
cd packages/hardhat
npx hardhat run scripts/deploy.ts --network localhost
```

You should see:
```
Deploying TimeCapsule contract...
Testing RPC connection...
✓ Connected to network: localhost (chainId: 31337)
✓ Current block number: 0
...
✅ TimeCapsule deployed successfully!
Contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### Step 3: Update Frontend with Contract Address

Copy the deployed contract address and update `packages/frontend/src/config/contracts.ts`:

```typescript
export const TIMECAPSULE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as const;
```

(Replace with your actual deployed address)

### Step 4: Configure Frontend for Localhost

Update `packages/frontend/src/config/chains.ts` or your Wagmi config to include localhost:

```typescript
import { hardhat } from 'viem/chains';

export const SUPPORTED_CHAINS = [hardhat]; // For local testing
```

Or update `packages/frontend/src/App.tsx` to add localhost transport:

```typescript
transports: {
  [hardhat.id]: http('http://127.0.0.1:8545'),
  [celoAlfajores.id]: http('https://alfajores-forno.celo-testnet.org'),
  [celo.id]: http('https://forno.celo.org'),
},
```

### Step 5: Connect MetaMask to Localhost

1. Open MetaMask
2. Go to Settings > Networks > Add Network
3. Add:
   - Network Name: Localhost 8545
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

4. Import one of the test accounts:
   - Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80` (Account #0)
   - Or use any of the accounts shown when you started `npx hardhat node`

### Step 6: Test the Frontend

1. Make sure Hardhat node is still running (Terminal 1)
2. Start frontend: `npm run dev` (from root)
3. Open http://localhost:3000
4. Connect MetaMask (make sure it's connected to Localhost 8545 network)
5. Try storing a message!

## Benefits of Localhost Deployment

✅ No internet required  
✅ Instant transactions  
✅ Free (no gas fees)  
✅ Reliable  
✅ Perfect for development and testing  
✅ You can reset the chain anytime  

## Tips

- **Reset the chain**: Stop `npx hardhat node` and start it again to reset
- **New accounts**: Each time you start the node, you get fresh accounts with 10,000 ETH
- **Testing**: Great for testing your frontend before deploying to testnet
- **Debugging**: Easier to debug on localhost

## When You're Ready for Testnet

Once your localhost setup is working:
1. Get a working RPC endpoint (Infura, Alchemy, or QuickNode)
2. Update `CELO_RPC_URL` in `.env`
3. Deploy to Alfajores: `npm run deploy`
4. Update frontend contract address

## Troubleshooting

**"Connection refused" error:**
- Make sure `npx hardhat node` is running in another terminal
- Check it's running on port 8545

**"Nonce too low" error:**
- Restart the Hardhat node to reset
- Or wait a few seconds and try again

**Frontend can't connect:**
- Make sure Hardhat node is running
- Check MetaMask is connected to Localhost 8545
- Verify contract address is correct in `contracts.ts`

