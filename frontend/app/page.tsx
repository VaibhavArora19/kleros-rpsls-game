"use client";

import GameCard from "@/components/Game/GameCard";
import SelectCard from "@/components/Select/SelectCard";
import StartGame from "@/components/StartGame/StartGame";
import { useState } from "react";

export default function Home() {
  const [startGame, setStartGame] = useState(false);

  //this determines that game already begun and player 1 has played their move
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  return (
    <div>
      {isGameInProgress ? (
        <div>
          <GameCard />
        </div>
      ) : (
        <div>
          {!startGame ? (
            <div className={`transition-opacity duration-500`}>
              <StartGame setStartGame={setStartGame} />
            </div>
          ) : (
            <div className="z-10">
              <SelectCard />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
