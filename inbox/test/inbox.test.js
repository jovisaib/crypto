const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require("../compile");

const INITIAL_CONSTANT = "hola, holita";
let accounts = null;
let inbox;

beforeEach(async () => {
	// Get a list of all accounts
	/*web3.eth.getAccounts()
		.then(a => {
			console.log(a);
		});*/
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({data: bytecode, arguments:[INITIAL_CONSTANT]})
		.send({from: accounts[0], gas: "1000000"});
});

describe("Inbox", ()=>{
	it("deploys a contract", () => {
		assert.ok(inbox.options.address);
	});

	it("sets a default message", async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, INITIAL_CONSTANT);
	});

	it("can change the message", async () => {
		const INPUT = "bye";
		await inbox.methods.setMessage(INPUT).send({from: accounts[0]});
		const message = await inbox.methods.message().call();
		assert.equal(message, INPUT);
	});
})
