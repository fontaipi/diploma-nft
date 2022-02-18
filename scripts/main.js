window.userAddress = null;
window.onload = async () => {
    // Init Web3 connected to ETH network
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
    } else {
        alert("No ETH brower extension detected.");
    }

    // Load in Localstore key
    window.userAddress = window.localStorage.getItem("userAddress");
    showAddress();
};

// Use this function to turn a 42 character ETH address
// into an address like 0x345...12345
function truncateAddress(address) {
    if (!address) {
        return "";
    }
    return `${address.substr(0, 5)}...${address.substr(
        address.length - 5,
        address.length
    )}`;
}

// Display or remove the users know address on the frontend
function showAddress() {
    if (!window.userAddress) {
        document.getElementById("userAddress").innerText = "";
        return false;
    }

    document.getElementById(
        "userAddress"
    ).innerText = `ETH Address: ${truncateAddress(window.userAddress)}`;
}

// remove stored user address and reset frontend
// function logout() {
//     window.userAddress = null;
//     window.localStorage.removeItem("userAddress");
//     showAddress();
// }

// Login with Web3 via Metamasks window.ethereum library
async function loginWithEth() {
    if (window.web3) {
        try {
            // We use this since ethereum.enable() is deprecated. This method is not
            // available in Web3JS - so we call it directly from metamasks' library
            const selectedAccount = await window.ethereum
                .request({
                    method: "eth_requestAccounts",
                })
                .then((accounts) => accounts[0])
                .catch(() => {
                    throw Error("No account selected!");
                });
            window.userAddress = selectedAccount;
            window.localStorage.setItem("userAddress", selectedAccount);
            showAddress();
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("No ETH brower extension detected.");
    }
}

// Go to blockchain and get the contract symbol. Keep in mind
// YOU MUST BE CONNECTED TO RINKEBY NETWORK TO USE THIS FUNCTION
// why -> because this specific contract address is on ethereum.
// When you click login, just make sure your network is Rinkeby and it will all workout.

async function getContractSymbol() {
    const CONTRACT_ADDRESS = "0xF5d972675c9f6f8F7cC7a9Bc338280D8ed533d31";
    const contract = new window.web3.eth.Contract(
        window.ABI,
        CONTRACT_ADDRESS
    );
    const symbol = await contract.methods
        .symbol()
        .call({ from: window.userAddress });
    alert(`Contract ${CONTRACT_ADDRESS} Symbol: ${symbol}`);
}

function handleFormSubmit(event) {
  event.preventDefault();
  
  const data = new FormData(event.target);
  
  const formJSON = Object.fromEntries(data.entries());
  
  console.log(formJSON);
}

const form = document.querySelector('.contact-form');
form.addEventListener('submit', handleFormSubmit);


window.ABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
  }, {
      "indexed": true,
      "internalType": "address",
      "name": "approved",
      "type": "address"
  }, {
      "indexed": true,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
  }, {
      "indexed": true,
      "internalType": "address",
      "name": "operator",
      "type": "address"
  }, {
      "indexed": false,
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
  }],
  "name": "ApprovalForAll",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "previousOwner",
      "type": "address"
  }, {
      "indexed": true,
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "account",
      "type": "address"
  }],
  "name": "Paused",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "account",
      "type": "address"
  }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "shares",
      "type": "uint256"
  }],
  "name": "PayeeAdded",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "from",
      "type": "address"
  }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
  }],
  "name": "PaymentReceived",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "to",
      "type": "address"
  }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
  }],
  "name": "PaymentReleased",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
  }, {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
  }, {
      "indexed": true,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "account",
      "type": "address"
  }],
  "name": "Unpaused",
  "type": "event"
}, {
  "inputs": [],
  "name": "TOKEN_LIMIT",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "to",
      "type": "address"
  }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }],
  "name": "approve",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "owner",
      "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "disablePublicSale",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "enablePublicSale",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }],
  "name": "getApproved",
  "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getMaxTokensAtOnce",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getTokenPrice",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "owner",
      "type": "address"
  }, {
      "internalType": "address",
      "name": "operator",
      "type": "address"
  }],
  "name": "isApprovedForAll",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
  }],
  "name": "mintMultipleTokens",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "_amount",
      "type": "uint256"
  }],
  "name": "mintMultipleTokensForTeam",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [],
  "name": "mintToken",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
}, {
  "inputs": [],
  "name": "name",
  "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }],
  "name": "ownerOf",
  "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "paused",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "index",
      "type": "uint256"
  }],
  "name": "payee",
  "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "publicSale",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address payable",
      "name": "account",
      "type": "address"
  }],
  "name": "release",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
  }],
  "name": "released",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "from",
      "type": "address"
  }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
  }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "from",
      "type": "address"
  }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
  }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }, {
      "internalType": "bytes",
      "name": "_data",
      "type": "bytes"
  }],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "operator",
      "type": "address"
  }, {
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
  }],
  "name": "setApprovalForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "_count",
      "type": "uint256"
  }],
  "name": "setMaxTokensAtOnce",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "_price",
      "type": "uint256"
  }],
  "name": "setTokenPrice",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "account",
      "type": "address"
  }],
  "name": "shares",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "bytes4",
      "name": "interfaceId",
      "type": "bytes4"
  }],
  "name": "supportsInterface",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "symbol",
  "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "teamSale",
  "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "togglePaused",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "toggleTeamSale",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "index",
      "type": "uint256"
  }],
  "name": "tokenByIndex",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "owner",
      "type": "address"
  }, {
      "internalType": "uint256",
      "name": "index",
      "type": "uint256"
  }],
  "name": "tokenOfOwnerByIndex",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }],
  "name": "tokenURI",
  "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalReleased",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalShares",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "from",
      "type": "address"
  }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
  }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
      "internalType": "address",
      "name": "newOwner",
      "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "stateMutability": "payable",
  "type": "receive"
}]

