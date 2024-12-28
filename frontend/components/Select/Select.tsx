import { Button } from "../ui/button";
import { useState } from "react";
import { useWriteContact } from "@/hooks/contract/useWriteContract";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getAddress } from "@/config/ethers";
import { ethers } from "ethers";
import Options from "./Options";
import { Move } from "@/types/Move";
import { useManageSmartContract } from "@/hooks/server/contract";

const Select = () => {
  const { startGame } = useWriteContact();
  const [currentSelection, setCurrentSelection] = useState<Move | null>(null);
  const [player2Address, setPlayer2Address] = useState<string>("");

  const startGameHandler = async () => {
    const userAddress = await getAddress();

    if (player2Address.length !== 42 || !currentSelection || ethers.getAddress(player2Address) === ethers.getAddress(userAddress)) {
      return;
    }

    //TODOD: Figure out how to store the number and the contract address of the current game
    await startGame(12, player2Address);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-semibold">Select your choice 🎮</h1>
      <Options currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} />
      <div className="mt-16 m-auto grid w-[70%] items-center gap-1.5">
        <Label htmlFor="Player 2 Address" className="text-left text-lg pl-2">
          Player 2
        </Label>
        <Input
          type="text"
          placeholder="Enter player 2 address"
          className="h-[4.4rem] text-lg"
          value={player2Address}
          onChange={(e) => setPlayer2Address(e.target.value)}
        />
      </div>
      <Button
        className="mt-12 w-[15rem] h-[3.3rem] text-lg mb-8"
        disabled={currentSelection && player2Address.length === 42 ? false : true}
        onClick={startGameHandler}
      >
        Select
      </Button>
    </div>
  );
};

export default Select;
