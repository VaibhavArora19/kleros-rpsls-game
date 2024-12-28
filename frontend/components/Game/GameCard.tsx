import { useState } from "react";
import Options from "../Select/Options";
import { Card } from "../ui/card";
import { GoTrophy } from "react-icons/go";
import { Button } from "../ui/button";
import { useWriteContact } from "@/hooks/contract/useWriteContract";
import { Move } from "@/types/Move";

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
      <div className="flex justify-around mt-4 gap-24">
        <div>
          <h2 className="text-2xl">Player 1</h2>
        </div>
        <div className="text-xl">
          <GoTrophy className="mt-2 text-4xl text-orange-500" />
        </div>
        <div>
          <h2 className="text-2xl">Player 2</h2>
        </div>
      </div>
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
