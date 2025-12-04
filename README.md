# Time-Capsule-App

Time-Capsule-App is a decentralized application (DApp) built with React and Hardhat, using Celo (Alfajores testnet) — allowing users to create, store, and unlock time-locked “capsules” on the blockchain.

## 🚀 Project Overview

This app enables users to package messages/files into “time capsules,” deploying a smart contract that locks them until a specified time. Once the unlock time arrives — or under specific conditions set in the contract — the content becomes retrievable.

Key ideas:

* Full-stack DApp: front-end (React + TypeScript) + smart contract (Solidity + Hardhat).
* Time-locked storage: the smart contract ensures capsules remain inaccessible until a predetermined timestamp.
* Testnet friendly: designed to work on Celo’s Alfajores testnet for development and testing.

## 📁 Repository Structure

```
/contracts             # Solidity smart contracts  
/packages/hardhat      # Hardhat setup & deployment scripts  
/scripts               # Utility & deployment scripts  
/typechain-types       # Auto-generated TypeScript bindings  
/artifacts             # Compiled contract outputs  
```

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Keremdogan1/Time-Capsule-App--CeloWorkshop-.git
   cd Time-Capsule-App--CeloWorkshop-
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file inside `packages/hardhat`:

   ```
   PRIVATE_KEY=your_private_key
   CELO_RPC_URL=https://alfajores-forno.celo-testnet.org
   ```

## ▶️ Usage

### Deploy Smart Contract

```bash
npm run deploy
```

### Run the Frontend

```bash
npm run dev
```

Once running, connect your wallet (CeloExtensionWallet, MetaMask with Celo RPC, etc.) and create/view time capsules.

## 📄 License

This project is open-source. Add a LICENSE file if you want to specify terms (MIT recommended).
