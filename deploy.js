const ethers = require("ethers");
const fs = require("fs-extra");
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "30cffc37a9bafec2b2d285eb75c6dd8468b2f93ba8012c914e3b2b86e49a02c3",
    provider
  );

  const abi = await fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.abi",
    "utf-8"
  );
  const binary = await fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log("Here is the deployment transaction: ");
  console.log(contract.deployTransaction);
  console.log("Here is the tranaction receipt: ");
  console.log(transactionReceipt);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(currentFavoriteNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
