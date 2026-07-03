"use client";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
  const TextLines = [
    "Gathering your treats...",
    "Polishing your pennies...",
    "Organizing with love...",
    "Waking up the piggy...",
    "Counting the gold...",
    "",
  ];
  const [textIndex, setTextIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((i) => (i + 1) % TextLines.length);
    }, 1500);
    return () => clearInterval(interval);
  });
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full min-h-screen  bg-gradient-to-b from-[#F4D2E5]/40 to-[#FFFFFF]">
      <div>
        <div className="flex bg-[#F4D2E5] rounded-full animate-bounce justify-center items-center text-center p-4">
          <FontAwesomeIcon
            color="#725868"
            width={64}
            height={64}
            className=" animate-squish text-2xl"
            icon={faPiggyBank}
          />
        </div>
      </div>
      <div className="font-semibold text-[#4D4449] text-sm "></div>
      <div className="relative mt-8 w-72 h-6 bg-[#F4D2E5] overflow-hidden rounded-full border-6 border-white">
        <div className="absolute h-full rounded-full animate-penny-loader bg-[#715767] transition-all duration-75" />
      </div>
      <div className="flex font-bold text-[#4D4449] text-sm animate-bounce h-4 ">
        {TextLines[textIndex]}
      </div>
      <div className="font-bold text-4xl text-[#715767]">Penny Pal</div>
    </div>
  );
}
