const Migrations = artifacts.require('./Migrations.sol');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};


//Probably will have to take that out too!