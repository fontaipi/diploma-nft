document.addEventListener("DOMContentLoaded", () => {
    const web3 = new Web3(window.ethereum)
  
    document.getElementById("load_button").addEventListener("click", async () => {
      const contract = new web3.eth.Contract(TokenABI, "0x58606cCb777D70b58f7a68b9aB3E30aE3745e75E")
      const walletAddress = window.localStorage.getItem("userAddress")
      contract.defaultAccount = walletAddress
      const Balance = await contract.methods.balanceOf(walletAddress).call()
      
      document.getElementById("nfts").innerHTML = ""
      
      for(let i = 0; i < 1; i++) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call()
  
        let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()
  
        if (tokenMetadataURI.startsWith("ipfs://")) {
          tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
        }
  
        const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())
  
        const TokenElement = document.getElementById("nft_template").content.cloneNode(true)
        TokenElement.querySelector("h1").innerText = tokenMetadata["diploma_name"]
        TokenElement.querySelector("a").href = `https://testnets.opensea.io/assets/0x58606cCb777D70b58f7a68b9aB3E30aE3745e75E/${tokenId}`
        TokenElement.querySelector("img").src = tokenMetadata["image"]
        TokenElement.querySelector("img").alt = tokenMetadata["description"]
  
        document.getElementById("nfts").append(TokenElement)
      }
    })
  })
  
  TokenABI = [
    {
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
        "name": "student",
        "type": "address"
      }, {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }],
      "name": "awardDiploma",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
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
      "name": "baseURI",
      "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      }],
      "stateMutability": "view",
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
        "name": "data",
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
      "inputs": [],
      "name": "tokenCounter",
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
    }]