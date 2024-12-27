import { FaRegHandRock } from "react-icons/fa";
import { FaRegHandPaper } from "react-icons/fa";
import { FaRegHandScissors } from "react-icons/fa";
import { FaRegHandLizard } from "react-icons/fa";
import { FaRegHandSpock } from "react-icons/fa";
import { Button } from "../ui/button";
import { useState } from "react";
import { Move } from "@/types/Move";
import { useWriteContact } from "@/hooks/contract/useWriteContract";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Option = {
  name: string;
  icon: () => JSX.Element;
  move: Move;
};

const Options: Option[] = [
  {
    name: "Rock",
    icon: () => <FaRegHandRock className="text-3xl text-center " />,
    move: Move.Rock,
  },
  {
    name: "Paper",
    icon: () => <FaRegHandPaper className="text-3xl text-center " />,
    move: Move.Paper,
  },
  {
    name: "Scissors",
    icon: () => <FaRegHandScissors className="text-3xl text-center " />,
    move: Move.Scissors,
  },
  {
    name: "Lizard",
    icon: () => <FaRegHandLizard className="text-3xl text-center " />,
    move: Move.Lizard,
  },
  {
    name: "Spock",
    icon: () => <FaRegHandSpock className="text-3xl text-center " />,
    move: Move.Spock,
  },
];

const Select = () => {
  const { startGame } = useWriteContact();
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  const [player2Address, setPlayer2Address] = useState<string>("");

  const startGameHandler = async () => {
    if (player2Address.length !== 42 || !currentSelection) {
      return;
    }

    await startGame(12, player2Address);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-semibold">Select your choice 🎮</h1>
      <div className="flex justify-center flex-wrap items-center content-center mt-16 gap-8">
        {Options.map((option) => {
          return (
            <div
              className={`${
                currentSelection === option.name ? "border-gray-400" : ""
              } hover:border-gray-400  border-[4px] rounded-sm w-24 h-24 flex justify-center flex-col text-center items-center cursor-pointer`}
              key={option.name}
              onClick={() => setCurrentSelection(option.name)}
            >
              <div className="mb-2">{option.icon()}</div>
              <h4>{option.name}</h4>
            </div>
          );
        })}
      </div>
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
