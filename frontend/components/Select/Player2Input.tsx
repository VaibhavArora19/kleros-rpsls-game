import { Input } from "../ui/input";
import { Label } from "../ui/label";

type TProps = {
  player2Address: string;
  setPlayer2Address: React.Dispatch<React.SetStateAction<string>>;
};

const Player2Input = ({ player2Address, setPlayer2Address }: TProps) => {
  return (
    <div className="mt-16 w-[70%] m-auto">
      <div className="content-left items-start w-[10%] ml-2">
        <Label htmlFor="Player 2 Address" className="text-lg ">
          Player 2
        </Label>
      </div>
      <Input
        type="text"
        placeholder="Enter player 2 address"
        className="h-[4.4rem] text-lg p-2  m-auto"
        value={player2Address}
        onChange={(e) => setPlayer2Address(e.target.value)}
      />
    </div>
  );
};

export default Player2Input;
