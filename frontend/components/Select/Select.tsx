"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { useWriteContact } from "@/hooks/contract/useWriteContract";
import { getAddress } from "@/config/ethers";
import { ethers } from "ethers";
import Options from "../Options/Options";
import { Move } from "@/constants/index";
import { Loader2 } from "lucide-react";
import Player2Input from "./Player2Input";
import { ToastContainer, toast } from "react-toastify";

const Select = () => {
  const { startGame } = useWriteContact();
  const [currentSelection, setCurrentSelection] = useState<Move | null>(null);
  const [player2Address, setPlayer2Address] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const startGameHandler = async () => {
    try {
      const userAddress = await getAddress();

      if (player2Address.length !== 42 || !currentSelection || ethers.getAddress(player2Address) === ethers.getAddress(userAddress)) {
        return;
      }
      setIsLoading(true);

      //* A random number is generated to be used as the salt
      const number = Math.floor(Math.random() * 100000);

      await startGame(number, currentSelection, player2Address);

      setIsLoading(false);

      toast.success("Move submitted successfully!");
    } catch (error) {
      setIsLoading(false);
      console.error("error: ", error);
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-semibold">Select your choice 🎮</h1>
      <Options currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} />
      <Player2Input player2Address={player2Address} setPlayer2Address={setPlayer2Address} />
      {isLoading ? (
        <Button disabled className="mt-12 w-[15rem] h-[3.8rem] text-xl mb-8">
          <Loader2 className="animate-spin" />
          Starting game...
        </Button>
      ) : (
        <Button
          className="mt-12 w-[15rem] h-[3.8rem] text-xl mb-8"
          disabled={currentSelection && player2Address.length === 42 ? false : true}
          onClick={startGameHandler}
        >
          Select
        </Button>
      )}
      <ToastContainer />
    </div>
  );
};

export default Select;
