// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NftCollection is ERC721, Ownable {

    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public totalMinted;

    mapping(uint256 => string) private _tokenURIs;

    constructor()
        ERC721("NftCollection", "NFT")
        Ownable(msg.sender)
    {}

    function mint(address to, string memory uri) public onlyOwner {
        require(to != address(0), "Invalid address");
        require(totalMinted < MAX_SUPPLY, "Max supply reached");

        uint256 tokenId = totalMinted;
        totalMinted++;

        _safeMint(to, tokenId);
        _tokenURIs[tokenId] = uri;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
}