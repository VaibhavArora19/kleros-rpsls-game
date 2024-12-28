import { CardTitle } from "../ui/card";
import { GoTrophy } from "react-icons/go";

const GameTitle = () => {
  return (
    <CardTitle className="flex justify-around mt-4 gap-24">
      <div>
        <h2 className="text-2xl">Player 1</h2>
      </div>
      <div className="text-xl">
        <GoTrophy className="mt-2 text-4xl text-orange-500" />
      </div>
      <div>
        <h2 className="text-2xl">Player 2</h2>
      </div>
    </CardTitle>
  );
};

export default GameTitle;
