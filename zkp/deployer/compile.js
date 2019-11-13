
const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const builPath = path.resolve('../', 'build');
const contractsFolderPath = path.resolve('../', 'contracts');

const createBuildFolder = () => {
	fs.emptyDirSync(builPath);
}

const buildSources = () => {

	const sources = {};
	const contractsFiles = fs.readdirSync(contractsFolderPath);

	contractsFiles.forEach(file => {
		const contractFullPath = path.resolve(contractsFolderPath, file);
		sources[file] = {
			content: fs.readFileSync(contractFullPath, 'utf8')
		};
	});

	return sources;
}

const input = {
	language: 'Solidity',
	sources: buildSources(),
	settings: {
		outputSelection: {
			'*': {
				'*': [ 'abi', 'evm.bytecode' ]
			}
		}
	}
}

const compileContracts = () => {
	const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

	for (let contract in compiledContracts) {
		for(let contractName in compiledContracts[contract]) {
			fs.outputJsonSync(
				path.resolve(builPath, `${contractName}.json`),
				compiledContracts[contract][contractName],
				{
					spaces: 2
				}
			)
		}
	}
}


(function run () {
	createBuildFolder();
	compileContracts();
	console.log("Test - Test")
})();

//Q1.1: “deployBackendContracts()” - deploys the VerifierRegistry, BN256G2, and GM17_v0 contracts

//Q2: Linking the real Addresss before the deploy - use linkBytecode instead, can we start with thise one?

//Q2: “deployErc20Contract(tokenContract)” - deploys an ERC20 token contract based on a provided JSON (the tokenContract), and then deploys the FTokenShield