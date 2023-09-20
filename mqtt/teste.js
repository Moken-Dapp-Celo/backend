const ethers = require('ethers');
const mokenJson = require("../contracts/moken.json");
// The ABI of your contract
const contractAbi = mokenJson.abi; // Replace with your actual contract's ABI

// The data you provided
const data = '0xad8d5eff000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000cec2caccfd25eac254a609c07d598808911b82af';

// The function signature
const functionSignature = data.slice(0, 10); // 0x + 8 characters

// The function arguments (excluding the first 4 bytes)
const functionArguments = '0x' + data.slice(10);

// Create an interface from the ABI
const iface = new ethers.utils.Interface(contractAbi);

// Decode the function call
const decodedData = iface.decodeFunctionData('checkIn', functionArguments);

console.log(decodedData);
