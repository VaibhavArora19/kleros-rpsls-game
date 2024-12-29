import { useEffect, useState } from "react";
import Options from "../Options/Options";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useWriteContact } from "@/hooks/contract/useWriteContract";
import { Move } from "@/constants/index";
import GameTitle from "./GameTitle";
import { useAppKitAccount } from "@reown/appkit/react";
import { useReadContract } from "@/hooks/contract/useReadContract";
import { Loader2 } from "lucide-react";

type TProps = {
  contractAddress: string;
};

export enum Status {
  PLAYER_1_MOVE,
  PLAYER_2_MOVE,
  PLAYER_1_TIMEOUT,
  PLAYER_2_TIMEOUT,
}

const GameCard = (props: TProps) => {
  const { address } = useAppKitAccount();
  const [currentSelection, setCurrentSelection] = useState<Move | null>(null);
  const { playMove, solve, timeout } = useWriteContact();
  const { checkStatus } = useReadContract();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [gameStatus, setGameStatus] = useState<Status | null>(null);

  useEffect(() => {
    async function getStatus() {
      if (!address) return;

      const { status, message } = (await checkStatus(props.contractAddress, address)) as any;

      if (!status || !message) return;

      console.log("status is", status);
      setGameStatus(status);
      setMessage(message as string);
    }

    getStatus();
  }, [address]);

  const playHandler = async () => {
    setIsLoading(true);

    try {
      if (gameStatus === Status.PLAYER_2_MOVE) {
        if (!currentSelection) return;
        await playMove(currentSelection as Move, props.contractAddress);
      } else if (gameStatus === Status.PLAYER_1_MOVE) {
        //TODO: figure out how to get the salt
        if (!currentSelection) return;
        await solve(currentSelection as Move, 12, props.contractAddress);
      } else if (gameStatus === Status.PLAYER_1_TIMEOUT) {
        await timeout("player1", props.contractAddress);
      } else if (gameStatus === Status.PLAYER_2_TIMEOUT) {
        await timeout("player2", props.contractAddress);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("error: ", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[40rem] m-auto mt-[10vh] pb-12">
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
        {
          <Button className="text-lg p-6" disabled={isLoading} onClick={playHandler}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Processing..." : message ? message : "..."}
          </Button>
        }
      </div>
    </Card>
  );
};

export default GameCard;
