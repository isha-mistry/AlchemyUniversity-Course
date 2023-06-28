// add the game address here and update the contract name if necessary
const gameAddr ="0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";
const contractName = "Game5";

async function main() {
    // attach to the game
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // do whatever you need to do to win the game here:

    //Game1
    /* const tx = await game.win();
    const receipt = await tx.wait(); */

    
    //Game2
    /* const tx1 = await game.setX(20);
    tx1.wait();
    const tx2= await game.setY(30);
    tx2.wait();
    const tx3 = await game.win();

    // did you win? Check the transaction receipt!
    // if you did, it will be in both the logs and events array
    const receipt = await tx3.wait(); */

    //Game3-4
    
    /* const tx1 = await game.win(-200);
    const receipt = await tx1.wait(); */

    // Game 5
    const tx1 = await game.giveMeAllowance(20000);
    tx1.wait();
    const tx2 = await game.mint(11000);
    tx2.wait();
    const tx3 = await game.win();

    const receipt = await tx3.wait();


    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
