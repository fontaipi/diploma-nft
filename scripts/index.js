import SpacePunksTokenABI from "./abi.js"

document.addEventListener("DOMContentLoaded", () => {
    const web3 = new Web3(window.ethereum)
  
    document.getElementById("load_button").addEventListener("click", async () => {
      const contract = new web3.eth.Contract(SpacePunksTokenABI, "0xF5d972675c9f6f8F7cC7a9Bc338280D8ed533d31")
      const walletAddress = "0x2c1e1e64793c2480acfa9a20a946d1fbd468b78b" // window.localStorage.getItem("userAddress");
      contract.defaultAccount = walletAddress
      const spacePunksBalance = await contract.methods.balanceOf(walletAddress).call()
      
      document.getElementById("nfts").innerHTML = ""
  
      for(let i = 0; i < spacePunksBalance; i++) {
        const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call()
  
        let tokenMetadataURI = await contract.methods.tokenURI(tokenId).call()
  
        if (tokenMetadataURI.startsWith("ipfs://")) {
          tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
        }
  
        const tokenMetadata = await fetch(tokenMetadataURI).then((response) => response.json())
  
        const spacePunkTokenElement = document.getElementById("nft_template").content.cloneNode(true)
        spacePunkTokenElement.querySelector("h1").innerText = tokenMetadata["name"]
        spacePunkTokenElement.querySelector("a").href = `https://opensea.io/assets/0x45db714f24f5a313569c41683047f1d49e78ba07/${tokenId}`
        spacePunkTokenElement.querySelector("img").src = tokenMetadata["image"]
        spacePunkTokenElement.querySelector("img").alt = tokenMetadata["description"]
  
        document.getElementById("nfts").append(spacePunkTokenElement)
      }
    })
  })