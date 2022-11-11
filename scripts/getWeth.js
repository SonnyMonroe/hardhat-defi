const { getNamedAccounts, ethers } = require("hardhat")
const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    // call the "deposit" function on the weth contract
    // abi, contract address
    // contract address = 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6 (WETH, Goerli)
    const iWeth = await ethers.getContractAt(
        "IWeth",
        "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        deployer
    )
    const tx = await iWeth.deposit({ value: AMOUNT })
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth }
