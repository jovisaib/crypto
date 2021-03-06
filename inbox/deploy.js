const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const {interface, bytecode} = require("./compile");


const provider = new HDWalletProvider(
	"mnemonic",
	"https://rinkeby.infura.io/v3/eeee747f9fe8425498d8b53ec4dda4a1"
);

const web3 = new Web3 = new Web3(provider);


const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log("Attempting to deploy from account", accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({data: bytecode, arguments:["hola"] })
		.send(from: accounts[0], gas: "1000000");

	console.log("Contract deployed to ", result.options.address);
};

deploy();
