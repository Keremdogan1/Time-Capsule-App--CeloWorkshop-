import { ethers } from "hardhat";

async function main() {
  console.log("Deploying TimeCapsule contract...");

  try {
    // Test connection first
    console.log("Testing RPC connection...");
    const network = await ethers.provider.getNetwork();
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(`✓ Connected to network: ${network.name} (chainId: ${network.chainId})`);
    console.log(`✓ Current block number: ${blockNumber}`);

    // Check if account has balance
    const signer = await ethers.provider.getSigner();
    const address = await signer.getAddress();
    const balance = await ethers.provider.getBalance(address);
    console.log(`✓ Deployer address: ${address}`);
    console.log(`✓ Balance: ${ethers.formatEther(balance)} CELO`);
    
    if (balance === 0n) {
      console.warn("⚠️  WARNING: Account has zero balance. You need testnet CELO to deploy.");
      console.warn("   Get testnet funds from: https://faucet.celo.org/alfajores");
    }

    console.log("\nDeploying contract...");
    const TimeCapsule = await ethers.getContractFactory("TimeCapsule");
    const timeCapsule = await TimeCapsule.deploy();

    console.log("Waiting for deployment transaction...");
    await timeCapsule.waitForDeployment();

    const contractAddress = await timeCapsule.getAddress();
    console.log("\n✅ TimeCapsule deployed successfully!");
    console.log("Contract address:", contractAddress);
    console.log("Network:", network.name);
    console.log("\nNext steps:");
    console.log(`1. Update packages/frontend/src/config/contracts.ts with address: ${contractAddress}`);
    console.log("2. Copy the ABI from artifacts/contracts/TimeCapsule.sol/TimeCapsule.json");
  } catch (error: any) {
    console.error("\n❌ Deployment failed!");
    if (error.code === 'UND_ERR_CONNECT_TIMEOUT' || error.message?.includes('timeout')) {
      console.error("Connection timeout error. Possible causes:");
      console.error("1. RPC endpoint is down or unreachable");
      console.error("2. Network connectivity issues");
      console.error("3. Firewall blocking the connection");
      console.error("\nTry these solutions:");
      console.error("- Check your internet connection");
      console.error("- Try using an alternative RPC endpoint");
      console.error("- Set CELO_RPC_URL in .env to use a different endpoint:");
      console.error("  Example: CELO_RPC_URL=https://rpc.ankr.com/celo_alfajores");
    } else {
      console.error("Error details:", error.message);
    }
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

