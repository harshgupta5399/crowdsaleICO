var HelloTokenCrowdSale = artifacts.require("./HelloTokenCrowdSale.sol");

module.exports = function(deployer) {
  const startTime = Math.round((new Date(Date.now()).getTime())/1000);
  const endTime = Math.round((new Date().getTime() + (86400000 * 30))/1000); // Today + 20 days
  deployer.deploy(HelloTokenCrowdSale, 
    startTime, 
    endTime,
    5, 
    "0x8B952e3C9DfFC1F7b933EFc9541442E845f80A8a", // Replace this wallet address with the last one (10th account) from Ganache UI. This will be treated as the beneficiary address. 
    2000000000000000000, // 2 ETH
    500000000000000000000 ,// 500 ETH
    5
  );
};