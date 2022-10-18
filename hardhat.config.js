require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
      console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    opgoerli: {
      url: process.env.ALCHEMY_TEST_OP_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    opmainnet: {
      url: process.env.ALCHEMY_MAINNET_OP_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.ALCHEMY_POLYGON_MUMBAI,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};
