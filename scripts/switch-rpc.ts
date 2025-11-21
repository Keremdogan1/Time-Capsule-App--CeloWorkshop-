import * as fs from 'fs';
import * as path from 'path';

/**
 * Helper script to update RPC endpoint in .env file
 * Usage: Update the endpoint below and run this script
 */

const ENDPOINTS = {
  ankr: 'https://rpc.ankr.com/celo_alfajores',
  thirdweb: 'https://alfajores.rpc.thirdweb.com',
  default: 'https://alfajores-forno.celo-testnet.org',
};

// Choose which endpoint to use
const selectedEndpoint = ENDPOINTS.ankr; // Change to 'thirdweb' or 'default' if needed

const envPath = path.join(__dirname, '..', '.env');

if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found!');
  console.error('Create a .env file in packages/hardhat/ with PRIVATE_KEY first.');
  process.exit(1);
}

let envContent = fs.readFileSync(envPath, 'utf-8');

// Remove existing CELO_RPC_URL if present
envContent = envContent.replace(/CELO_RPC_URL=.*\n?/g, '');

// Add new CELO_RPC_URL
envContent += `\n# RPC Endpoint (updated by switch-rpc script)\n`;
envContent += `CELO_RPC_URL=${selectedEndpoint}\n`;

fs.writeFileSync(envPath, envContent);

console.log('✅ Updated .env file with new RPC endpoint:');
console.log(`   ${selectedEndpoint}`);
console.log('\nNow test the connection with: npm run test-rpc');

