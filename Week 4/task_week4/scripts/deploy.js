// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("ethers");
const hre = require("hardhat");
require('dotenv').config();

async function main() {

  const url = process.env.ALCHEMY_TESTNET_RPC_URL;
  const privateKey = process.env.TESTNET_PRIVATE_KEY;
  
  const provider = new ethers.providers.JsonRpcProvider(url);
  let wallet = new hre.ethers.Wallet(privateKey, provider);
  let artifacts = await hre.artifacts.readArtifact("Main");
  console.log(artifacts);
  // console.log(wallet);

  let Main = new hre.ethers.ContractFactory(artifacts.abi,artifacts.bytecode,wallet);
  const main = await Main.deploy();
  const instanceMain = await main.deployed();

  console.log(
    `Contract deployed to ${instanceMain.address}`
  );

  await instanceMain.makeCallAttempt("0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502");
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
