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

const GameCard = (props: TProps) => {
  const { address } = useAppKitAccount();
  const [currentSelection, setCurrentSelection] = useState<Move | null>(null);
  const { playMove } = useWriteContact();
  const { checkPlayerValidation } = useReadContract();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getStatus() {
      if (!address) return;

      const status = await checkPlayerValidation(props.contractAddress, address);

      console.log("status is", status);
      setMessage(status?.message as string);
    }

    getStatus();
  }, [address]);

  const playMoveHandler = async () => {
    if (!currentSelection) return;
    setIsLoading(true);

    try {
      await playMove(currentSelection as Move, props.contractAddress);
      setIsLoading(false);
    } catch (error) {
      console.error("error: ", error);
      setIsLoading(false);
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
        {
          <Button className="text-lg p-6" disabled={isLoading} onClick={playMoveHandler}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Submitting move..." : message ? message : "..."}
          </Button>
        }
      </div>
    </Card>
  );
};

export default GameCard;
