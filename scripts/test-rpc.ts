import { ethers } from "hardhat";

async function main() {
  console.log("Testing RPC connection...\n");

  try {
    const provider = ethers.provider;
    
    // Test 1: Get network info
    console.log("1. Getting network information...");
    const network = await provider.getNetwork();
    console.log(`   ✓ Network: ${network.name}`);
    console.log(`   ✓ Chain ID: ${network.chainId}`);
    
    // Test 2: Get latest block
    console.log("\n2. Fetching latest block...");
    const blockNumber = await provider.getBlockNumber();
    console.log(`   ✓ Current block number: ${blockNumber}`);
    
    // Test 3: Get block details
    const block = await provider.getBlock(blockNumber);
    console.log(`   ✓ Block timestamp: ${new Date(Number(block?.timestamp) * 1000).toISOString()}`);
    
    // Test 4: Check account
    console.log("\n3. Checking deployer account...");
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    console.log(`   ✓ Deployer address: ${address}`);
    
    // Test 5: Check balance
    const balance = await provider.getBalance(address);
    const balanceInCELO = ethers.formatEther(balance);
    console.log(`   ✓ Balance: ${balanceInCELO} CELO`);
    
    if (balance === 0n) {
      console.log("\n⚠️  WARNING: Account has zero balance!");
      console.log("   Get testnet funds from: https://faucet.celo.org/alfajores");
    } else {
      console.log("\n✅ Account has sufficient balance for deployment");
    }
    
    console.log("\n✅ RPC connection test successful!");
    console.log("\nYou can now deploy with: npm run deploy");
    
  } catch (error: any) {
    console.error("\n❌ RPC connection test failed!");
    console.error("Error:", error.message);
    
    if (error.code === 'UND_ERR_CONNECT_TIMEOUT' || error.message?.includes('timeout')) {
      console.error("\nThis appears to be a connection timeout.");
      console.error("Try using an alternative RPC endpoint in your .env file:");
      console.error("CELO_RPC_URL=https://rpc.ankr.com/celo_alfajores");
    }
    
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

