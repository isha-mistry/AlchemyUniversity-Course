const hre = require("hardhat");

CONTRACT_ADDR = "0x973c6609F3123793Bd58d48Da82DFa3021A56d37"

async function main() {

  const contract = await hre.ethers.getContractAt("Contract", CONTRACT_ADDR);

  console.log(await contract.x());

 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});