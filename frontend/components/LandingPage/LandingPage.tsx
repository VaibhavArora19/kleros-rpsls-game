import { options } from "../Options/Options";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="mt-[25vh] items-center text-center">
      <div className="flex gap-4 justify-center">
        {options.map((option) => {
          return (
            <div key={option.name} className="w-[4rem]">
              {option.icon()}
            </div>
          );
        })}
      </div>
      <div className="w-[25%] m-auto mt-8">
        <h1 className="text-7xl font-bold">Rock Paper Scissors Lizard Spock</h1>
        <p className="mt-8 text-2xl text-gray-500">
          Challenge your friends in an exciting game in this expanded version with more choices and strategic depth. Choose from Rock, Paper,
          Scissors, Lizard, and Spock!
        </p>
      </div>
      <Button className="text-lg w-[170px] h-[60px] mt-8 " onClick={() => router.push("/play")}>
        Play now
      </Button>
    </div>
  );
};

export default LandingPage;