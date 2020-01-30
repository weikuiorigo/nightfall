/**
@module vk-controller.js
@author iAmMichaelConnor
@desc this acts as a layer of logic between the restapi.js, which lands the
rest api calls, and the heavy-lifitng token-zkp.js and zokrates.js.  It exists so that the amount of logic in restapi.js is absolutely minimised.
*/

import config from 'config';
import { vks } from '@eyblockchain/nightlite';
import Web3 from './web3';
import { getTruffleContractInstance } from './contractUtils';

const web3 = Web3.connection();

/**
 * Loads VKs to the VkRegistry (Shield contracts)
 * @param {string} vkRegistryContractName The vkRegistry is just the contract which stores the verification keys. In our case, that's the FTokenShield.sol and NFTokenShield.sol contracts.
 */
async function initializeVks(vkRegistryContractName) {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  // Get vkRegistry contract details. The vkRegistry is just the contract which stores the verification keys. In our case, that's the FTokenShield.sol and NFTokenShield.sol contracts.
  const {
    contractJson: vkRegistryJson,
    contractInstance: vkRegistry,
  } = await getTruffleContractInstance(vkRegistryContractName);

  const blockchainOptions = {
    vkRegistryJson,
    vkRegistryAddress: vkRegistry.address,
    account,
  };

  // Load VK to the vkRegistry
  const vkPaths = config.VK_PATHS[vkRegistryContractName];
  const vkDescriptions = Object.keys(vkPaths);
  try {
    await Promise.all(
      vkDescriptions.map(vkDescription => {
        return vks.loadVk(vkDescription, vkPaths[vkDescription], blockchainOptions);
      }),
    );
  } catch (err) {
    throw new Error('Error while loading verification keys', err);
  }
}

async function runController() {
  await initializeVks('FTokenShield');
  await initializeVks('NFTokenShield');
}

if (process.env.NODE_ENV !== 'test') runController();

export default {
  runController,
};
