import SpacePunksTokenABI from "./abi.js"

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

window.ABI = SpacePunksTokenABI