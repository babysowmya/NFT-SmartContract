const { expect } = require("chai");
const hre = require("hardhat");

describe("NftCollection", function () {
  let nft, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await hre.ethers.getSigners();

    nft = await hre.ethers.deployContract("NftCollection", [
      "MyNFT",
      "MNFT",
      10,
      "https://mybaseuri.com/"
    ]);

    await nft.waitForDeployment();
  });

  it("Should allow only owner to mint", async function () {
    await expect(
      nft.connect(addr1).safeMint(addr1.address, 1)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should increase totalSupply on mint", async function () {
    await nft.safeMint(addr1.address, 1);
    expect(await nft.totalSupply()).to.equal(1);
  });

  it("Should fail when mint exceeds maxSupply", async function () {
    for (let i = 0; i < 10; i++) {
      await nft.safeMint(owner.address, i + 1);
    }
    await expect(
      nft.safeMint(owner.address, 11)
    ).to.be.revertedWith("Max supply reached");
  });
});
