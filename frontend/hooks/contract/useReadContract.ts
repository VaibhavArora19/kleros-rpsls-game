import { ABI } from "@/constants/abi";
import { ethers } from "ethers";

export const useReadContract = () => {
  //*If player1 is viewing this then it won't be able to play if player2 hasn't played yet
  //*If player2 is viewing this then it won't be able to play if player2 address != j2.
  const checkPlayerValidation = async (contractAddress: string, playerAddress: string) => {
    try {
      //@ts-expect-error metamask might not be installed
      const provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(contractAddress, ABI, provider);

      const player1Address = await contract.j1();
      const player2Move = await contract.c2(); //p2 move
      const player2Address = await contract.j2(); //p2 address

      console.log("details", player1Address, playerAddress, player2Move);

      if (player2Move.toString === "0") {
        return { message: "Player 2's move" };
      } else if (player2Move.toString !== "0") {
        return { message: "Reveal Player 1's move" };
      }
      console.log("player2 move is", player2Move);
      console.log("player2 address is", player2Address);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return {
    checkPlayerValidation,
  };
};
