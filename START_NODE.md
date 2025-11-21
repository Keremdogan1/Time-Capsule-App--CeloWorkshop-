# How to Start Hardhat Node and Deploy

## ⚠️ Important: You Need TWO Terminals

1. **Terminal 1**: Run the Hardhat node (keep it running)
2. **Terminal 2**: Deploy the contract

## Step-by-Step Instructions

### Terminal 1: Start Hardhat Node

```bash
cd packages\hardhat
npx hardhat node
```

**Important**: 
- Keep this terminal open!
- Don't close it while deploying
- You should see: "Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/"

### Terminal 2: Deploy Contract

**Open a NEW terminal window/tab**, then:

```bash
cd packages\hardhat
npx hardhat run scripts/deploy.ts --network localhost
```

## Troubleshooting

### Error: "ECONNREFUSED 127.0.0.1:8545"

This means the Hardhat node is not running. Solution:

1. Make sure you started `npx hardhat node` in Terminal 1
2. Check that Terminal 1 is still running (not closed)
3. Verify you see the message about the server starting on port 8545
4. Try starting the node again in a new terminal

### Error: "Address already in use"

Port 8545 is already in use. Solution:

1. Find what's using port 8545: `netstat -ano | findstr :8545`
2. Kill the process, or
3. Change the port in `hardhat.config.ts`:
   ```typescript
   localhost: {
     url: "http://127.0.0.1:8546", // Changed port
     ...
   }
   ```

### Node Keeps Stopping

If the Hardhat node keeps stopping, make sure:
- You have enough system resources
- No antivirus is blocking it
- Check for errors in the node terminal output

## Quick Checklist

Before deploying, make sure:
- ✅ Hardhat node is running in Terminal 1
- ✅ You see "Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/"
- ✅ Terminal 1 is still open and showing logs
- ✅ You're running deploy command in a DIFFERENT terminal (Terminal 2)

## Visual Guide

```
Terminal 1 (Node):              Terminal 2 (Deploy):
=================               ====================
> npx hardhat node              > cd packages\hardhat
                                > npx hardhat run scripts/deploy.ts --network localhost

Started HTTP and WebSocket...
Account #0: 0xf39Fd...          Deploying TimeCapsule...
(keep running)                  ✅ Deployed to: 0x...
```

