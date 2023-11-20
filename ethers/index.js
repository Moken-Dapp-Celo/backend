const { ethers } = require('ethers');
const mokenJson = require('../contracts/moken.json');

const MokenContract = () => {
	const { MOKEN_ADDRESS, MNEMONIC } = process.env;

	const provider = new ethers.JsonRpcProvider('https://celo-alfajores.infura.io/v3/3a875265268f48ca90c24be81622f718');

	const mnemonic = ethers.Mnemonic.fromPhrase(MNEMONIC);
	const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic);
	const connectedWallet = wallet.connect(provider);

	console.log('Connected to wallet:', connectedWallet.address);
	const contract = new ethers.Contract(MOKEN_ADDRESS, mokenJson.abi, connectedWallet);
	return contract;
};

module.exports = { MokenContract };
