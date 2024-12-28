import Image from "next/image";
import { Button } from "../ui/button";

type TProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartGame = (props: TProps) => {
  return (
    <div className="flex flex-col items-center justify-center mt-[12vh]">
      <div>
        <Image src="/startgame.png" alt="start game" width={500} height={500} />
      </div>
      <div className="mt-16">
        <Button className="w-[23rem] text-lg h-[3rem]" onClick={() => props.setStartGame(true)}>
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default StartGame;
