

require("@nomiclabs/hardhat-waffle");

module.exports ={
   solidity : '0.8.0',
   networks: {
    goerli: {
      url:'https://eth-goerli.g.alchemy.com/v2/jOgDvSZVfwy88zlyPB7vW37fVTyB7nkh',
      accounts:['4092f14281a78f3e81294a42ba6e685e2518afdffa10c3e487ea59d48c8fc6fb']
    }
   }

   
}