"use client";

import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between px-8 py-4">
      <div className="text-2xl font-semibold cursor-pointer" onClick={() => router.push("/")}>
        <h1>RPSLS Game</h1>
      </div>
      <div>
        <appkit-button />
      </div>
    </div>
  );
}

export default Navbar;
