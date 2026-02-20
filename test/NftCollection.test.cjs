const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NftCollection", function () {
  let nft, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const NftCollection = await ethers.getContractFactory("NftCollection");

    // ✅ NO constructor arguments
    nft = await NftCollection.deploy();
    await nft.waitForDeployment();
  });

  it("Should allow only owner to mint", async function () {
    await nft.mint(addr1.address, "ipfs://test");

    expect(await nft.ownerOf(0)).to.equal(addr1.address);
  });

  it("Should prevent non-owner minting", async function () {
    await expect(
      nft.connect(addr1).mint(addr1.address, "ipfs://test")
    ).to.be.reverted;
  });
});