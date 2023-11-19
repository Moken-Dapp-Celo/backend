const { ethers } = require('ethers');
const mokenJson = require('../contracts/moken.json');
const MokenContract = () => {
	ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR); // Set to ERROR level to reduce logs

	const { MOKEN_ADDRESS, MNEMONIC } = process.env;

	const provider = new ethers.providers.JsonRpcProvider('https://smart.zeniq.network:9545');

	const wallet = new ethers.Wallet.fromMnemonic(MNEMONIC);
	const connectedWallet = wallet.connect(provider);

	const contract = new ethers.Contract(MOKEN_ADDRESS, mokenJson.abi, connectedWallet);

	return contract;
};

module.exports = { MokenContract };
