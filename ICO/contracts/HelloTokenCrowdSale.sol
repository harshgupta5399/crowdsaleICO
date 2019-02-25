pragma solidity ^0.4.18;

import './HelloToken.sol';
import 'zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol';
import 'zeppelin-solidity/contracts/token/PausableToken.sol';

contract HelloTokenCrowdSale is CappedCrowdsale, RefundableCrowdsale {
    struct record{
        uint noEthR;
        uint noTokenS;
        uint noWei;
        bool isWithdraw;
        uint freezeEnd;
    }
    struct roundinfo{
        uint _hardcap;
        uint _Rstartdate;
        uint _Renddate;
        uint _totalTokenSended;
        uint _amountReceived;
    }
    address manager;
    mapping(address=>record) Records;
    address[] public sender;
    mapping(uint=>roundinfo) roundInfo;

    uint public rate = 0;
    uint public totalRounds;
    uint public currentRound=0;
    bool public isSale;
    bool public isRoundActive;
    uint public softCap;
    uint public hardCap;



 // Token Distribution
  // =============================
  uint256 public maxTokens = 398320000e18; // There will be total 100 Hashnode Tokens
  uint256 public tokensForEcosystem = 365000000e18;
  uint256 public totalTokensForSale = 365000000e18;
  uint256 public tokensForTeam = 13520000e18;
  uint256 public tokensForALB = 19800000e18;
  //uint256 public totalTokensForSale = 60000000000000000000; // 60 HTs will be sold in Crowdsale
  //uint256 public totalTokensForSaleDuringPreICO = 20000000000000000000; // 20 out of 60 HTs will be sold during PreICO
  // ==============================




  // Events
  event EthTransferred(string text);
  event EthRefunded(string text);


  // Constructor
  // ============
  function HelloTokenCrowdSale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet, uint256 _goal, uint256 _cap,uint _totalRounds) CappedCrowdsale(_cap) FinalizableCrowdsale() RefundableCrowdsale(_goal) Crowdsale(_startTime, _endTime, _rate, _wallet) public {
      require(_goal <= _cap);
        totalRounds=_totalRounds;
        isSale=true;
        rate=_rate;
        softCap=_cap;
        hardCap=_goal;
        manager=msg.sender;
  }
  // =============

  // Token Deployment
  // =================
  function createTokenContract() internal returns (MintableToken) {
    return new HelloToken(); // Deploys the ERC20 token. Automatically called when crowdsale contract is deployed
  }
  // ==================

  


function getCurrentRound() public view returns(uint){
        return currentRound;
    }


function startRound(uint hardcap)public onlyOwner returns(uint) {
        require(isSale==true);
        require(currentRound<totalRounds);
        require(isRoundActive==false);
     //   require(now >= startDate && now <= endDate);
        currentRound++;
        isRoundActive=true;
        roundInfo[currentRound]._hardcap=hardcap;     
        roundInfo[currentRound]._Rstartdate=now;
        roundInfo[currentRound]._Renddate=0;
        roundInfo[currentRound]._totalTokenSended=0;
        roundInfo[currentRound]._amountReceived=0;
        
        return currentRound;
    }

    function displayRoundInfo(uint a) public onlyOwner constant returns (uint,uint,uint,uint,uint){
        return (
                roundInfo[a]._hardcap,
                roundInfo[a]._Rstartdate,
                roundInfo[a]._Renddate,
                roundInfo[a]._totalTokenSended,
                roundInfo[a]._amountReceived
              );
    }

    function endRound() internal returns(bool){
        require(isRoundActive==true);
        roundInfo[currentRound]._Renddate=now;
        isRoundActive=false;
        return true;
    }
    function endRoundOwner() public onlyOwner returns(bool){
        require(isRoundActive==true);
        roundInfo[currentRound]._Renddate=now;
        isRoundActive=false;
        return true;
    }
    function currentSatus()public onlyOwner view returns(bool){
        if(isRoundActive==true){
            return true;
        }
    }
     function hardcapAchieved(uint sendamountNsended)public returns(bool){
        if(roundInfo[currentRound]._hardcap<sendamountNsended){
            endRound();
            return true;
        }else
            return false;
    }
    function endICO(uint sendedTotalAmount) public onlyOwner returns(bool){
        require(isRoundActive==false);
        require(currentRound==totalRounds);
        isSale=false;
        if(softCap < sendedTotalAmount) return true;
        else return false;
    }
// Token Purchase
  // =========================
  function () external payable {
    uint256 tokensThatWillBeMintedAfterPurchase = msg.value.mul(rate);
       //require(now >= startDate && now <= endDate);
        require(isRoundActive==true);
        require(isSale==true);
        require(!hardcapAchieved(roundInfo[currentRound]._totalTokenSended+tokensThatWillBeMintedAfterPurchase));
       uint etherValue = msg.value/(1 ether);

      if ((token.totalSupply() + tokensThatWillBeMintedAfterPurchase) > tokensForEcosystem) {
        msg.sender.transfer(msg.value); // Refund them
        emit EthRefunded("PreICO Limit Hit");
        return;
      }

      buyTokens(msg.sender);

      roundInfo[currentRound]._totalTokenSended+=tokensThatWillBeMintedAfterPurchase;
      roundInfo[currentRound]._amountReceived+=msg.value;
       
        Records[msg.sender].noEthR+=etherValue;
        Records[msg.sender].noWei+=msg.value;
        Records[msg.sender].noTokenS+=tokensThatWillBeMintedAfterPurchase;
        Records[msg.sender].isWithdraw=false;
        Records[msg.sender].freezeEnd=endTime+2678400;
        sender.push(msg.sender);
  }

  function forwardFunds() internal {

          emit EthTransferred("forwarding funds to refundable vault");
          super.forwardFunds();
  }
  // ===========================
function showRecords() public constant returns (uint,uint,bool,address[]){
            return (Records[msg.sender].noEthR,
                    Records[msg.sender].noTokenS,
                    Records[msg.sender].isWithdraw,
                    sender); 
        }
function viewContractBalance() public onlyOwner constant returns(uint,uint){
        uint totalEther = address(this).balance/(1 ether);
	    return (totalEther,address(this).balance);
	}

  function withdrawEther(uint amount) public onlyOwner{
	    uint eth = amount/(1 ether);
		manager.transfer(amount);
		Records[manager].noWei-=amount;
		Records[manager].noEthR-=eth;
		Records[manager].isWithdraw=true;
	}
  // Finish: Mint Extra Tokens as needed before finalizing the Crowdsale.
  // ====================================================================

  function finish(address _teamFund, address _ALBFund) public onlyOwner {

      //require(!isFinalized);
      uint256 alreadyMinted = token.totalSupply();
      require(alreadyMinted < maxTokens);

      uint256 unsoldTokens = totalTokensForSale - alreadyMinted;
      if (unsoldTokens > 0) {
        tokensForEcosystem = tokensForEcosystem + unsoldTokens;
      }

      token.mint(_teamFund,tokensForTeam);
      token.mint(_ALBFund,tokensForALB);
      finalize();
  }
  // ===============================

  // REMOVE THIS FUNCTION ONCE YOU ARE READY FOR PRODUCTION
  // USEFUL FOR TESTING `finish()` FUNCTION
  function hasEnded() public view returns (bool) {
    return true;
  }
}