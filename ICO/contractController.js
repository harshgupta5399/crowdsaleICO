var Web3 = require("web3");
var web3 = new Web3(
  "https://ropsten.infura.io/v3/b0caa819115e4d0a8c3bddf2b9da178f"
);
const address = "0xb5a0720e984038f7c30622a1c822273f7169ae67";
const tokenAdd="0xA5a207422F15656e605c109f1eF80878aC63DF3d";
const async = require("async");
const axios = require("axios");
const moment=require("moment")
const JSON=require('circular-json');
var _ = require("lodash");
const abi = [
  {
    constant: true,
    inputs: [],
    name: "rate",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "endTime",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "cap",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "goal",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "weiRaised",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "isRoundActive",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "finalize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "tokensForEcosystem",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "wallet",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalTokensForSale",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "startTime",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "goalReached",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "currentRound",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalRounds",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "isFinalized",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "softCap",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "claimRefund",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "tokensForALB",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    name: "sender",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "maxTokens",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "beneficiary",
        type: "address"
      }
    ],
    name: "buyTokens",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "isSale",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "hardCap",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "vault",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "token",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "tokensForTeam",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        name: "_startTime",
        type: "uint256"
      },
      {
        name: "_endTime",
        type: "uint256"
      },
      {
        name: "_rate",
        type: "uint256"
      },
      {
        name: "_wallet",
        type: "address"
      },
      {
        name: "_goal",
        type: "uint256"
      },
      {
        name: "_cap",
        type: "uint256"
      },
      {
        name: "_totalRounds",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "text",
        type: "string"
      }
    ],
    name: "EthTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "text",
        type: "string"
      }
    ],
    name: "EthRefunded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "Finalized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "purchaser",
        type: "address"
      },
      {
        indexed: true,
        name: "beneficiary",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      }
    ],
    name: "TokenPurchase",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "getCurrentRound",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "hardcap",
        type: "uint256"
      }
    ],
    name: "startRound",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "a",
        type: "uint256"
      }
    ],
    name: "displayRoundInfo",
    outputs: [
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "endRoundOwner",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "currentSatus",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "sendamountNsended",
        type: "uint256"
      }
    ],
    name: "hardcapAchieved",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "sendedTotalAmount",
        type: "uint256"
      }
    ],
    name: "endICO",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "showRecords",
    outputs: [
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "bool"
      },
      {
        name: "",
        type: "address[]"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "viewContractBalance",
    outputs: [
      {
        name: "",
        type: "uint256"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "amount",
        type: "uint256"
      }
    ],
    name: "withdrawEther",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_teamFund",
        type: "address"
      },
      {
        name: "_ALBFund",
        type: "address"
      }
    ],
    name: "finish",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "hasEnded",
    outputs: [
      {
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

const contract = new web3.eth.Contract(abi, address);

exports.getbalance = async function(req, res) {
  let balance = await web3.eth.getBalance(req.body.accountAddress);
  balance = web3.utils.fromWei(balance, "ether");
  res.send(balance);
};
exports.getCurrentRound = async function(req, res) {
  const currentRound = await contract.methods.getCurrentRound().call();
  res.send(currentRound);
};
exports.softCap = async function(req, res) {
  const softCap = await contract.methods.softCap.call();
  res.send(softCap);
};
exports.hardCap = async function(req, res) {
  const hardCap = await contract.methods.hardCap.call();
  res.send(hardCap);
};
exports.rate = async function(req, res) {
  const rate = await contract.methods.rate.call();
  res.send(rate);
};
exports.startTime = async function(req, res) {
  const startTime = await contract.methods.startTime.call();
  var date = new Date(startTime * 1000);
  res.send(date);
};
exports.endTime = async function(req, res) {
  const endTime = await contract.methods.endTime.call();
  // res.send(new Date(endTime));
  var date = new Date(endTime * 1000);
  res.send(date);
};
exports.maxTokens = async function(req, res) {
  const maxTokens = await contract.methods.maxTokens.call();
  res.send(maxTokens);
};
exports.roundInfo = async function(req, res) {
  console.log(req.body.roundNo);
  const roundInfo = await contract.methods
    .displayRoundInfo(req.body.roundNo)
    .call({ from: "0xE3Bdd7702D1707c48D4dAb27d6312180fc40D091" })
    .catch(err => {
      console.log(err);
    });
  res.send(roundInfo);
};
exports.showRecord = async function(req, res) {
  const record = await contract.methods
    .showRecords()
    .call({ from: req.body.user })
    .catch(err => {
      console.log(err);
    });
  res.send(record);
};

exports.dashboard = function(req, res) {
  // async.parallel(
  //   {
  //     one: async function(cb1) {
  //       var a=await contract.methods.getCurrentRound().call();
  //       console.log("a",a);
  //       cb1(null, a);
  //      },
  //     two: async  function(cb2) {
  //        var b=await contract.methods.getCurrentRound().call();
  //        cb2(null, b)
  //      }
  //   },
  //   function(err, result) {
  //     console.log("err",err)
  //     res.send(result);
  //   }
  // );

  function getCurrentRound(cb) {
    contract.methods.getCurrentRound().call()(function(err, currentRound) {
      console.log("error", err);
      cb(null, currentRound);
    });
  }

  async.parallel([getCurrentRound], function(error, results) {
    console.log("error", error);
    console.info("results", results);
  });
};

exports.getTransaction = function(req, res) {
  
  getTransaction(req.body.address, function(err, transactions) {
    console.log(transactions.length);
   
    getContractTranscation(transactions, address, function(err, statement) {
      //res.send(transactions)
      console.log(statement.length)
      res.send(statement);
    });
  });
};

function getTransaction(useraddress, callback) {
  axios
    .get(
      "http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=" +
        useraddress +
        "&startblock=0&endblock=99999999&sort=asc"
    )
    .then(function(response) {
      callback(null, response.data.result);
    })
    .catch(function(err) {
      console.log(err);
    });
}
function getContractTranscation(transaction, address, callback) {
  var details = [];
  
  _.forEach(transaction, function(val, key) {
    var transaction = {};
    if (val.value > 0 && val.to==address && val.isError==0) {
      transaction.time=moment.unix(val.timeStamp).utc().format("DD/MM/YYYY,HH:MM");
      transaction.value=val.value;
      transaction.gas=val.gas;
      transaction.to=val.to;
      transaction.form=val.from
      details.push(transaction);
    }
  });
  
  callback(null,details);
}

exports.getTokenTransfer=function(req,res){
  getERC20Transaction(req.body.user,function(err,transaction){
    console.log(transaction.length)
    //res.send(transaction)
    getParseERCTransaction(transaction,function(err,trans){
      res.send(trans)
    })
  })
  
}
function getERC20Transaction(useraddress,callback){
  axios
   .get("https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress="+tokenAdd+"&address="+useraddress+"&page=1&offset=100&sort=asc")
   //.get("http://api-ropsten.etherscan.io/api?module=account&action=tokentx&address="+req.body.user+"&startblock=0&endblock=999999999&sort=asc") 
   .then(function(response){
        callback(null,response.data.result)
    })
    .catch(function(err){
      console.log(err);
    })
}
function getParseERCTransaction(transaction,callback){
  var T=[];
    _.forEach(transaction,function(val,key){
      transaction={};
      transaction.val=val.value/1000000000000000000;
      transaction.time=moment.unix(val.timeStamp).utc().format("DD/MM/YYYY,HH:MM")
      T.push(transaction);
    })
    callback(null,T)
}
