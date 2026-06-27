import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heart } from "lucide-react";

export default function HearoSection() {
  return (
    <div
      className={`bg-gradient-to-b min-h-[80vh] flex gap-24 justify-center items-center text-center px-40  from-[#F4D2E5]/40 to-[#FFFFFF]`}
    >
      <div className="flex flex-col text-start items-start justify-start gap-6">
                <div className="flex gap-2 px-4 py-2 bg-[#C8E9E2] text-sm items-center text-center text-[#4C6A65] rounded-full font-bold">
            <span><Heart fill="#4C6A65" /></span>
            <span>Voted Most Adorable Piggy Bank</span>
        </div>
        <div className="text-6xl font-extrabold w-120 text-[#715767]">Meet Your New Money Bestie!</div>
        <div className="text-2xl text-[#4D4449] font-medium w-150">Tracking expenses has never been this sweet. Join PennyPal and turn your savings into treats.</div>
        <div className="mt-4 font-semibold text-2xl gap-8 flex ">
            <button className="bg-[#715767] border-2 py-6.5 px-10 text-white rounded-full">Join the Club</button>
            <button className="border-2 border-[#715767] text-[#715767] py-6.5 px-10 rounded-full">Explore Me!</button>
        </div>
      </div>

      <div>
        <FontAwesomeIcon
          width={400}
          height={400}
          icon={faPiggyBank}
          className="text-8xl bg-gradient-to-b rounded-full p-12 from-[#715767] to-[#e4b0d0] text-white"
        />
      </div>
    </div>
  );
}
