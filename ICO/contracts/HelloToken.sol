pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract HelloToken is MintableToken {
  string public name = "Hello Token";
  string public symbol = "HT";
  uint8 public decimals = 18;
}