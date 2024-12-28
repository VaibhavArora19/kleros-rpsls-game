import { FaRegHandRock } from "react-icons/fa";
import { FaRegHandPaper } from "react-icons/fa";
import { FaRegHandScissors } from "react-icons/fa";
import { FaRegHandLizard } from "react-icons/fa";
import { FaRegHandSpock } from "react-icons/fa";
import { Move } from "@/constants/index";

export type Option = {
  name: string;
  icon: () => JSX.Element;
  move: Move;
};

type TProps = {
  currentSelection: Move | null;
  setCurrentSelection: React.Dispatch<React.SetStateAction<Move | null>>;
};

export const options: Option[] = [
  {
    name: "Rock",
    icon: () => <FaRegHandRock className="text-3xl text-center" />,
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

const Options = ({ currentSelection, setCurrentSelection }: TProps) => {
  return (
    <div className="flex justify-center flex-wrap items-center content-center mt-16 gap-8">
      {options.map((option) => {
        return (
          <div
            className={`${
              currentSelection === option.move ? "border-gray-700" : ""
            } hover:border-gray-700  border-[2px] rounded-sm w-24 h-24 flex justify-center flex-col text-center items-center cursor-pointer`}
            key={option.name}
            onClick={() => setCurrentSelection(option.move)}
          >
            <div className="mb-2">{option.icon()}</div>
            <h4>{option.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Options;
