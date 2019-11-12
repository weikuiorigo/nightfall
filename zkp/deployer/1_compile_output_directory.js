
//1. Create the build/ directory.

const path = require('path');
const fs = require('fs-extra');

const builPath = path.resolve('zkp', 'build');

const createBuildFolder = () => {
	fs.emptyDirSync(builPath);
}

//2. Get the sources of our contracts.


//3. Compile the contracts and write the output to a file.



//Q1.1: “deployBackendContracts()” - deploys the VerifierRegistry, BN256G2, and GM17_v0 contracts

//Q2: Linking the real Addresss before the deploy - use linkBytecode instead, can we start with thise one?

//Q2: “deployErc20Contract(tokenContract)” - deploys an ERC20 token contract based on a provided JSON (the tokenContract), and then deploys the FTokenShield