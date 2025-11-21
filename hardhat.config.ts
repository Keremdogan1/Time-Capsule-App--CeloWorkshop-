import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    alfajores: {
      // Primary endpoint - if this times out, set CELO_RPC_URL in .env
      url: process.env.CELO_RPC_URL || "https://alfajores-forno.celo-testnet.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 44787,
      timeout: 180000, // 180 seconds - increased timeout
      gas: "auto",
      gasPrice: "auto",
      httpHeaders: {
        "Content-Type": "application/json",
      },
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 42220,
      timeout: 120000,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      // Always use Account #0 from Hardhat node for localhost (has 10,000 ETH)
      // This ensures deployment works even if .env PRIVATE_KEY points to a different account
      accounts: [
        // Account #0 from Hardhat node
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;

