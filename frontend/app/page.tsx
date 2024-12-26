"use client";

import Select from "@/components/Select/Select";
import StartGame from "@/components/StartGame/StartGame";
import { useState } from "react";

export default function Home() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  return (
    <div>
      {!isGameStarted ? (
        <div className={`transition-opacity duration-500`}>
          <StartGame setIsGameStarted={setIsGameStarted} />
        </div>
      ) : (
        <div className="z-10">
          <Select />
        </div>
      )}
    </div>
  );
}
