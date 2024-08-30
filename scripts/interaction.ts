import { ethers } from "hardhat";

async function main() {
  const web3CXITokenAddress = "0x84E62AAF3bb5f86e6e4C172cCd1e1A080Ea3985F";
  const web3CXI = await ethers.getContractAt("IERC20", web3CXITokenAddress);

  const saveERC20ContractAddress = "0x3AEFf47a4e543e6672e5CAd81023874d3a8bdDAF";
  const saveERC20 = await ethers.getContractAt(
    "ISaveERC20",
    saveERC20ContractAddress
  );

  // Approve savings contract to spend token
  const approvalAmount = ethers.parseUnits("1000", 18);

  const approveTx = await web3CXI.approve(saveERC20, approvalAmount);
  approveTx.wait();

  const contractBalanceBeforeDeposit = await saveERC20.getContractBalance();
  console.log("Contract balance before :::", contractBalanceBeforeDeposit);

  const depositAmount = ethers.parseUnits("150", 18);
  const depositTx = await saveERC20.deposit(depositAmount);

  console.log(depositTx);

  depositTx.wait();

  const contractBalanceAfterDeposit = await saveERC20.getContractBalance();

  console.log("Contract balance after :::", contractBalanceAfterDeposit);

  // Withdrawal Interaction

  const withdrawalAmount = ethers.parseUnits("50", 18);

  console.log("Withdrawing tokens...");
  const withdrawTx = await saveERC20.withdraw(withdrawalAmount);
  await withdrawTx.wait();
  console.log(withdrawTx);
  console.log("Withdrawal transaction completed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
