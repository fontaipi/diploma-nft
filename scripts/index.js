import TokenABI from "./abi.js"

document.addEventListener("DOMContentLoaded", () => {
    const web3 = new Web3(window.ethereum)
  
    document.getElementById("load_button").addEventListener("click", async () => {
      const contract = new web3.eth.Contract(TokenABI, "0xF5d972675c9f6f8F7cC7a9Bc338280D8ed533d31")
      const walletAddress = "0x2c1e1e64793c2480acfa9a20a946d1fbd468b78b" // window.localStorage.getItem("userAddress")
      contract.defaultAccount = walletAddress
      const Balance = await contract.methods.balanceOf(walletAddress).call()
      
      document.getElementById("nfts").innerHTML = ""
      
      for(let i = 0; i < Balance; i++) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call()
  
        let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()
  
        if (tokenMetadataURI.startsWith("ipfs://")) {
          tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
        }
  
        const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())
  
        const TokenElement = document.getElementById("nft_template").content.cloneNode(true)
        TokenElement.querySelector("h1").innerText = tokenMetadata["name"]
        TokenElement.querySelector("a").href = `https://testnets.opensea.io/assets/0xF5d972675c9f6f8F7cC7a9Bc338280D8ed533d31/${tokenId}`
        TokenElement.querySelector("img").src = tokenMetadata["image"]
        TokenElement.querySelector("img").alt = tokenMetadata["description"]
  
        document.getElementById("nfts").append(TokenElement)
      }
    })
  })