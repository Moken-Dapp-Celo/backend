const  {ethers} = require('ethers')
const Moken = require('../contracts/Moken.json')

const MokenContractAddress = async (mnemonic) => {
    const {  MOKEN_ADDRESS,API_KEY,BASE_URL  } = process.env
    const provider = new ethers.providers.JsonRpcProvider(`${BASE_URL}${API_KEY}`)
    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    const connectedWallet = wallet.connect(provider)
    
    const contract = new ethers.Contract(MOKEN_ADDRESS, Moken.abi, connectedWallet)

    return contract
}

module.exports = { MokenContractAddress }
