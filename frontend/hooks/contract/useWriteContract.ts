import { getSigner } from "@/config/ethers";
import { ABI, BYTECODE } from "@/constants/abi";
import { Move } from "@/constants/index";
import { ethers, ContractFactory } from "ethers";
import { useSaveSmartContractAddress } from "../server/contract";
import { decryptNumber, encryptNumber } from "@/lib/encrypt";
import { useGetEncryptedNumber } from "../server/encrypted-number";

export const useWriteContact = () => {
  const { mutateAsync } = useSaveSmartContractAddress();
  const { mutateAsync: getEncryptedNumber } = useGetEncryptedNumber();

  const startGame = async (salt: number, player1: string, player2: string): Promise<string> => {
    try {
      const signer = await getSigner();

      const player1Address = await signer.getAddress();

      const encryptedNumber = await encryptNumber(player1, salt);

      const player1Hash = ethers.solidityPackedKeccak256(["address", "uint256"], [player1Address, salt]);

      const contract = new ContractFactory(ABI, BYTECODE, signer);

      const tx = await (await contract.deploy(player1Hash, player2, { value: ethers.parseEther("0.0001"), gasLimit: "900000" })).waitForDeployment();

      const contractAddress = await tx.getAddress();

      await mutateAsync({
        contractAddress,
        encryptedNumber,
      });

      return contractAddress;
    } catch (error) {
      console.log("error: ", error);
      throw new Error("Error starting game");
    }
  };

  const playMove = async (move: Move, contractAddress: string) => {
    try {
      if (!contractAddress) return;

      const signer = await getSigner();

      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const tx = await contract.play(move, { value: ethers.parseEther("0.0001"), gasLimit: "300000" });

      await tx.wait();
    } catch (error) {
      console.log("error: ", error);
      throw new Error("Error starting game");
    }
  };

  const solve = async (move: Move, contractAddress: string) => {
    try {
      const encryptedNumber = await getEncryptedNumber();

      const signer = await getSigner();

      const address = await signer.getAddress();

      const decryptedNumber = await decryptNumber(address, encryptedNumber);

      const contract = new ethers.Contract(contractAddress, ABI, signer);

      await contract.solve(move, decryptedNumber, { gasLimit: "300000" });
    } catch (error) {
      console.error("error: ", error);
      throw new Error("Error solving game");
    }
  };

  const timeout = async (player: "player1" | "player2", contractAddress: string) => {
    try {
      const signer = await getSigner();

      const contract = new ethers.Contract(contractAddress, ABI, signer);

      if (player === "player1") {
        await contract.j1Timeout({ gasLimit: "300000" });
      } else {
        await contract.j2Timeout({ gasLimit: "300000" });
      }
    } catch (error) {
      console.error("error: ", error);
      throw new Error("Error timing out");
    }
  };

  return {
    startGame,
    playMove,
    solve,
    timeout,
  };
};
