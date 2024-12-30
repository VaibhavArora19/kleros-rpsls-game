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
import { toast, ToastContainer } from "react-toastify";
import { FaQuestion } from "react-icons/fa";
import { useDeleteSmartContractAddress } from "@/hooks/server/contract";
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/navigation";

type TProps = {
  contractAddress: string;
};

export enum Status {
  PLAYER_1_MOVE,
  PLAYER_2_MOVE,
  PLAYER_1_TIMEOUT,
  PLAYER_2_TIMEOUT,
  GAME_ENDED,
}

const GameCard = (props: TProps) => {
  const { address } = useAppKitAccount();
  const [currentSelection, setCurrentSelection] = useState<Move | null>(null);
  const { playMove, solve, timeout } = useWriteContact();
  const { checkStatus } = useReadContract();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [gameStatus, setGameStatus] = useState<Status | null>(null);
  const { mutateAsync } = useDeleteSmartContractAddress();
  const router = useRouter();

  useEffect(() => {
    async function getStatus() {
      if (!address) return;

      const { status, message } = (await checkStatus(props.contractAddress)) as { status: Status; message: string };

      if (status === undefined || status === null || !message) return;

      setGameStatus(status);
      setMessage(message as string);
    }

    getStatus();
  }, [address]);

  const playHandler = async () => {
    setIsLoading(true);

    try {
      switch (gameStatus) {
        case Status.PLAYER_2_MOVE:
          if (!currentSelection) break;
          await playMove(currentSelection as Move, props.contractAddress);
          toast.success("Move submitted successfully!");
          break;

        case Status.PLAYER_1_MOVE:
          if (!currentSelection) {
            toast.error("Please select a move!");
            setIsLoading(false);
            break;
          }
          await solve(currentSelection as Move, props.contractAddress);
          toast.success("Move revealed successfully!");

          break;

        case Status.PLAYER_1_TIMEOUT:
          await timeout("player1", props.contractAddress);
          toast.success("Player 1 Timed out!");

          break;

        case Status.PLAYER_2_TIMEOUT:
          await timeout("player2", props.contractAddress);
          toast.success("Player 2 Timed out!");

          break;

        case Status.GAME_ENDED:
          await mutateAsync();
          toast.success("Game ended!");
          router.refresh();
      }

      setIsLoading(false);
    } catch (error) {
      console.error("error: ", error);
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Card className="w-[40rem] m-auto mt-[9vh] pb-12">
      <GameTitle />
      <div className="flex justify-around mt-12 gap-24">
        <div className="w-[6rem] h-[6rem] rounded-lg bg-gray-300">
          {gameStatus !== Status.GAME_ENDED ? (
            <FaQuestion className="text-center flex justify-center m-auto mt-[2.2rem] text-gray-800 text-xl" />
          ) : (
            <TiTick className="text-center flex justify-center m-auto mt-[2.2rem] text-green-600 text-xl" />
          )}
        </div>
        <h1 className="font-medium text-3xl pt-8">VS</h1>
        <div className="w-[6rem] h-[6rem] rounded-lg bg-gray-300">
          {gameStatus !== Status.PLAYER_2_MOVE && gameStatus !== Status.PLAYER_2_TIMEOUT ? (
            <TiTick className="text-center flex justify-center m-auto mt-[2.5rem] text-green-600 text-xl" />
          ) : (
            <FaQuestion className="text-center flex justify-center m-auto mt-[2.2rem] text-xl" />
          )}
        </div>
      </div>
      <div className="mt-12">
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
      <ToastContainer />
    </Card>
  );
};

export default GameCard;
