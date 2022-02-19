// contracts/Diploma.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Diploma is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor() public ERC721("LaCathoDiploma", "LCD") {
        tokenCounter = 0;
    }

    function awardDiploma(address student, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newItemId = tokenCounter;
        _mint(student, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter = tokenCounter + 1;
        return newItemId;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override onlyOwner {
        super.safeTransferFrom(from, to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override onlyOwner {
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override onlyOwner {
        super.safeTransferFrom(from, to, tokenId, data);
    }
}
