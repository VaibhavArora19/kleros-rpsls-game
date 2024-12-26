import { getSigner } from "@/config/ethers";
import { CONTRACT_ADDRESS } from "@/constants";
import { ABI } from "@/constants/abi";
import { Move } from "@/types/Move";
import { ethers } from "ethers";

export const useWriteContact = () => {
  const startGame = async () => {
    const signer = await getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    //* also calculate the hash for the user
    await contract.RPS({ value: ethers.parseEther("0.001") });
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
