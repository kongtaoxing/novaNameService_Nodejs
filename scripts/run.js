const main = async () => {
    const [owner, superCoder] = await hre.ethers.getSigners();

    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("nova", {value: hre.ethers.utils.parseEther('1234')});
    await domainContract.deployed();
    //console.log("Domain contract deployed by", accounts[0]);
    console.log("Domain Contract deployed to", domainContract.address);
  
    // let txn = await domainContract.register("satoshi", {value: hre.ethers.utils.parseEther('0.00001')});
    // await txn.wait();
    // console.log("Some one has just registered the name \'satoshi\'");
  
    // txn = await domainContract.setRecord("satoshi", "Who is the real Satoshi Nakamoto?");
    // await txn.wait();
    // console.log("Recorded for satoshi.\n");
  
    // const address = await domainContract.getAddress("satoshi");
    // console.log("Owner of domain satoshi:", address);
  
    // const _record = await domainContract.getRecord("satoshi");
    // console.log("Domain record for satoshi:", _record);

    let txn = await domainContract.register("satoshisatishisatisho", {value: hre.ethers.utils.parseEther('0.00001')});
    await txn.wait();
    console.log("Some one has just registered the name \'satoshi\'");
  
    try {
        txn = await domainContract.connect(superCoder).withdraw();
        await txn.wait();
      } catch(error){
        console.log("Could not rob contract");
      }
    
      // Let's look in their wallet so we can compare later
      let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
      console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
    
      // Oops, looks like the owner is saving their money!
      txn = await domainContract.connect(owner).withdraw();
      await txn.wait();
      
      // Fetch balance of contract & owner
      const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
      ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    
      console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
      console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
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