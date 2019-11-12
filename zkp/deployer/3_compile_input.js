
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