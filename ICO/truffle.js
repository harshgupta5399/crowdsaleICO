var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "b0caa819115e4d0a8c3bddf2b9da178f"; 
var mnemonic = "nothing essay shaft eagle romance science hold rail hip museum frequent cat";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      gas: 4600000,
      network_id: "*"
    },
    ropsten:  {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      gas: 7999999
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};