import { useState } from "react";
import Options from "../Options/Options";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useWriteContact } from "@/hooks/contract/useWriteContract";
import { Move } from "@/constants/index";
import GameTitle from "./GameTitle";

const GameCard = () => {
  const [currentSelection, setCurrentSelection] = useState<Move | null>(null);
  const { playMove } = useWriteContact();

  const playMoveHandler = async () => {
    if (!currentSelection) return;

    try {
      await playMove(currentSelection as Move);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <Card className="w-[27%] m-auto mt-[15vh] pb-12">
      <GameTitle />
      <div className="flex justify-around mt-16 gap-24">
        <div className="w-[6rem] h-[6rem] rounded-lg bg-white"></div>
        <h1 className="font-medium text-3xl pt-8">VS</h1>
        <div className="w-[6rem] h-[6rem] rounded-lg bg-white"></div>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl font-semibold text-center">Make your choice</h1>
        <Options currentSelection={currentSelection} setCurrentSelection={setCurrentSelection} />
      </div>
      <div className="flex justify-center items-center mt-12">
        <Button className="text-lg p-6" onClick={playMoveHandler}>
          Play Move
        </Button>
      </div>
    </Card>
  );
};

export default GameCard;
