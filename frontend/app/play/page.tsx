"use client";

import GameCard from "@/components/Game/GameCard";
import SelectCard from "@/components/Select/SelectCard";
import { useGetSmartContractAddress } from "@/hooks/server/contract";
import { Loader2 } from "lucide-react";

const Play = () => {
  const { data, isLoading } = useGetSmartContractAddress();

  if (isLoading) {
    return (
      <div className="m-auto flex justify-center text-3xl">
        <Loader2 className="animate-spin text-3xl" />
      </div>
    );
  }

  return <div>{!data ? <SelectCard /> : <GameCard contractAddress={data} />}</div>;
};

export default Play;
