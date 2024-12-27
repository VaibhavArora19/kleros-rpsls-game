import { getSigner } from "@/config/ethers";
import { CONTRACT_ADDRESS } from "@/constants";
import { ABI, BYTECODE } from "@/constants/abi";
import { Move } from "@/types/Move";
import { ethers, ContractFactory } from "ethers";

export const useWriteContact = () => {
  const startGame = async (salt: number, player2: string): Promise<string> => {
    const signer = await getSigner();

    const player1Address = await signer.getAddress();

    const player1Hash = ethers.solidityPackedKeccak256(["address", "uint256"], [player1Address, salt]);

    const contract = new ContractFactory(ABI, BYTECODE, signer);

    const tx = await (await contract.deploy(player1Hash, player2, { value: ethers.parseEther("0.001") })).waitForDeployment();

    const contractAddress = await tx.getAddress();

    return contractAddress;
  };

  const playMove = async (move: Move) => {
    const signer = await getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    await contract.play(move, { value: ethers.parseEther("0.001") });
  };

  const solve = async (move: Move, salt: number) => {
    const signer = await getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    await contract.solve(move, salt);
  };

  return {
    startGame,
    playMove,
    solve,
  };
};
