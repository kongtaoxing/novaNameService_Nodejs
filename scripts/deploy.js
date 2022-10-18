const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("nova");
  await domainContract.deployed();
  //console.log("Domain contract deployed by", accounts[0]);
  console.log("Domain Contract deployed to", domainContract.address);

  let txn = await domainContract.register("satoshi", {value: hre.ethers.utils.parseEther('0.00001')});
  await txn.wait();
  console.log("Some one has just registered the name \'satoshi\'");

  txn = await domainContract.setRecord("satoshi", "Who is the real Satoshi Nakamoto?");
  await txn.wait();
  console.log("Recorded for satoshi.\n");

  const address = await domainContract.getAddress("satoshi");
  console.log("Owner of domain satoshi:", address);

  const _record = await domainContract.getRecord("satoshi");
  console.log("Domain record for satoshi:", _record);

  const _value = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("The balance of the contract is", hre.ethers.utils.formatEther(_value));
};

const runMain = async () => {
  try{
    await main();
    process.exit(0);
  }
  catch(error) {
    console.log(error);
    process.exit(0);
  }
};

runMain();