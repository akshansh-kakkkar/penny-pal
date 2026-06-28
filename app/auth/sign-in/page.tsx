import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRight, Dot } from "lucide-react";

export default function page() {
  return (
    <div
      className={`bg-gradient-to-b min-h-screen from-[#F4D2E5]/40 to-[#FFFFFF] flex flex-col justify-center items-center`}
    >
      <div className="rounded-4xl bg-[#FFFFFF] gap-6  p-10 flex flex-col shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
        <div className="flex flex-col `">
          <div className="flex w-full justify-center items-center text-center p-2">
            <FontAwesomeIcon
              color="#725868"
              className="bg-[#F4D2E5] p-4 rounded-full"
              width={64}
              height={64}
              icon={faPiggyBank}
            />
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="text-xl text-[#715767] font-bold">
              Join PennyPal
            </div>
            <div className="text-sm text-[#4D4449] font-semibold">
              Your friendly financial companion!
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-2 flex-col">
            <div className="text-xs px-4 text-[#715767] font-semibold">What's your name, pal?</div>
            <div>
                
              <input className="rounded-full bg-[#F4F3F1]  w-full  p-2.5 px-4.5 text-sm font-semibold  outline-[#715767] placeholder:font-medium placeholder:text-[#D0C3C9] text-[#715767]" placeholder="Buddy" type="text" />
            </div>
          </div>
          <div>
            <div>Where should we send letters?</div>
            <div>
              <input placeholder="buddy@example.com" type="email" />
            </div>
          </div>
          <div>
            <div>Create a secret password</div>
          </div>
          <div>
            <input placeholder={"."} type="password" />
          </div>
        </div>
        <div>
          <span>Let's Go!</span>
          <span>
            <ArrowRight />
          </span>
        </div>
        <div>Already have a pal account? Signin</div>
      </div>
    </div>
  );
}
