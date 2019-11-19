const Verifier_Registry = artifacts.require('Verifier_Registry.sol');

const BN256G2 = artifacts.require('BN256G2');
//Eliptic curve operations

const GM17_v0 = artifacts.require('GM17_v0.sol');

const FToken = artifacts.require('FToken.sol');
const NFTokenMetadata = artifacts.require('NFTokenMetadata.sol');
const FTokenShield = artifacts.require('FTokenShield.sol');
const NFTokenShield = artifacts.require('NFTokenShield.sol');

// Q0: Why is the solidity contract imported?

module.exports = function(deployer) {
  deployer.then(async () => {

//Put in ZKP folders underneath source, we don't want to call truffle migrates library anymore call within ZKP, new file, src directory, "deployer" put the functions, create a npm script that calls the function manually instead of index, deploy contract script that calls that file and execute those contract 
// Make sure that the file is executable, script will look like node. Script executable, can I get these files to get the nodes script to run these files by themselves instead of NPM. 
// Truffle Migration, Truffle contract- "node initianalize.js". I can use it almost as is

// Q1: Deployer.deploy is truffle - 
// Q1.1: “deployBackendContracts()” - deploys the VerifierRegistry, BN256G2, and GM17_v0 contracts

    await deployer.deploy(Verifier_Registry);

    await deployer.deploy(BN256G2);

//Q2: Linking the real Addresss before the deploy - use linkBytecode instead, can we start with thise one?

    await deployer.link(BN256G2, [GM17_v0]);

//Q3: where does the function lives? “deployErc721Contract(tokenContract)”, same as the FToken version but with the ERC721 version instead.
  
    await deployer.deploy(GM17_v0, Verifier_Registry.address);

    await deployer.deploy(NFTokenMetadata);

    await deployer.deploy(NFTokenShield, Verifier_Registry.address, GM17_v0.address, NFTokenMetadata.address);

    //Q2: “deployErc20Contract(tokenContract)” - deploys an ERC20 token contract based on a provided JSON (the tokenContract), and then deploys the FTokenShield

    await deployer.deploy(FToken);

    await deployer.deploy(FTokenShield, Verifier_Registry.address, GM17_v0.address, FToken.address);
  });
};
