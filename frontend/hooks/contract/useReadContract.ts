import { Status } from "@/components/Game/GameCard";
import { ABI } from "@/constants/abi";
import { ethers } from "ethers";

export const useReadContract = () => {
  //*If player1 is viewing this then it won't be able to play if player2 hasn't played yet
  //*If player2 is viewing this then it won't be able to play if player2 address != j2.
  const checkStatus = async (contractAddress: string) => {
    try {
      //@ts-expect-error metamask might not be installed
      const provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(contractAddress, ABI, provider);

      const player2Move = await contract.c2(); //p2 move

      const lastAction = await contract.lastAction();

      const stake = await contract.stake();

      if (stake.toString() === "0") {
        return {
          status: Status.GAME_ENDED,
          message: "Restart game",
        };
      }
      const currentTime = new Date().getTime() / 1000;

      if (currentTime > Number(lastAction) + 300) {
        if (player2Move.toString() === "0") {
          return { status: Status.PLAYER_2_TIMEOUT, message: "Player 2 Timeout" };
        } else {
          return { status: Status.PLAYER_1_TIMEOUT, message: "Player 1 Timeout" };
        }
      }

      if (player2Move.toString() === "0") {
        return { status: Status.PLAYER_2_MOVE, message: "Player 2's move" };
      } else if (player2Move.toString() !== "0") {
        return { status: Status.PLAYER_1_MOVE, message: "Reveal Player 1's move" };
      }

      return {
        status: Status.GAME_ENDED,
        message: "Restart game",
      };
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return {
    checkStatus,
  };
};
