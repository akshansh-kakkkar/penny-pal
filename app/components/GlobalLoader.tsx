"use client";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lightbulb } from "lucide-react";
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
    }, 700);
    return () => clearInterval(interval);
  }, []);
  const [progress, setprogress] = useState(0);
  useEffect(()=>{
    const interval = setInterval(()=>{
      setprogress((p)=>{
        if(p >= 100){
          clearInterval(interval);
          return 100;
        }
        return p + 2
      })
    }, 25)
return ()=>clearInterval(interval)
  }, [])
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full min-h-screen  bg-gradient-to-b from-[#F4D2E5]/40 to-[#FFFFFF]">
        <div className="flex bg-[#F4D2E5] rounded-full  shadow-[0px_60px_60px_rgba(244,210,229,0.4)]  animate-bounce justify-center items-center text-center py-6 p-4">
          <FontAwesomeIcon
            color="#725868"
            width={64}
            height={64}
            className=" animate-squish text-5xl"
            icon={faPiggyBank}
          />
        </div>
            <div className="font-bold text-4xl text-[#715767]">Penny Pal</div>
      <div className="relative   w-72 h-6 bg-[#F4D2E5] overflow-hidden rounded-full border-6 border-white backdrop-blur-2xl">
        <div className="absolute shadow-2xl h-full rounded-full bg-[#715767] transition-all duration-75" style={{width : `${progress}%`}} />
      </div>
      <div className="flex font-bold text-[#4D4449] text-sm animate-bounce h-4 ">
        {TextLines[textIndex]}
      </div>
            <div className="font-bold  shadow-[0px_60px_60px_rgba(244,210,229,0.4)]  m flex rounded-4xl py-2 px-4 gap-1 sm:gap-2 items-center text-center justify-center bg-[#FFFFFF]/30 border-2 border-[#ffffff]/80 text-xs text-[#715767]">
              <span><Lightbulb size={18} /></span>
              <span>Tip: Save money and buy carrots.</span>
            </div>

    </div>
  );
}
