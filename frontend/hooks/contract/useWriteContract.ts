import { getSigner } from "@/config/ethers";
import { ABI, BYTECODE } from "@/constants/abi";
import { Move } from "@/constants/index";
import { ethers, ContractFactory } from "ethers";
import { useDeleteSmartContractAddress, useSaveSmartContractAddress } from "../server/contract";

export const useWriteContact = () => {
  const { mutateAsync } = useSaveSmartContractAddress();
  const { mutateAsync: deleteContract } = useDeleteSmartContractAddress();

  const startGame = async (salt: number, player2: string): Promise<string> => {
    const signer = await getSigner();

    const player1Address = await signer.getAddress();

    const player1Hash = ethers.solidityPackedKeccak256(["address", "uint256"], [player1Address, salt]);

    const contract = new ContractFactory(ABI, BYTECODE, signer);

    const tx = await (await contract.deploy(player1Hash, player2, { value: ethers.parseEther("0.001") })).waitForDeployment();

    const contractAddress = await tx.getAddress();

    await mutateAsync(contractAddress);

    return contractAddress;
  };

  const playMove = async (move: Move, contractAddress: string) => {
    if (!contractAddress) return;

    const signer = await getSigner();

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const tx = await contract.play(move, { value: ethers.parseEther("0.001") });

    await tx.wait();
  };

  const solve = async (move: Move, salt: number, contractAddress: string) => {
    try {
      const signer = await getSigner();

      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await contract.solve(move, salt);

      await deleteContract();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const timeout = async (player: "player1" | "player2", contractAddress: string) => {
    try {
      const signer = await getSigner();

      const contract = new ethers.Contract(contractAddress, ABI, signer);

      if (player === "player1") {
        await contract.j1Timeout();
      } else {
        await contract.j2Timeout();
      }

      await deleteContract();
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return {
    startGame,
    playMove,
    solve,
    timeout,
  };
};
