import { faMoneyBill, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Heart, PiggyBank } from "lucide-react";

export default function HearoSection() {
  return (
    <div
      className={`bg-gradient-to-b lg:flex-row flex-col min-h-[92vh] relative h-full flex gap-24 justify-center items-center text-center md:px-40  from-[#F4D2E5]/40 to-[#FFFFFF]`}
    >
      <div className="absolute hidden md:block top-2 opacity-40 text-[#715767] right-12">
        <FontAwesomeIcon
          width={100}
          height={100}
          icon={faPiggyBank}
          className="text-xl "
        />
      </div>
            <div className="absolute hidden md:block bottom-6 opacity-40 text-[#46645F] left-12">
        <FontAwesomeIcon
          width={100}
          height={100}
          icon={faMoneyBill}
          className="text-xl "
        />
      </div>
      <div className="flex flex-col text-center md:text-start justify-center items-center md:items-start md:justify-start gap-6">
        <div className="flex  gap-2 px-4 py-2 bg-[#C8E9E2] text-sm items-center text-center text-[#4C6A65] rounded-full font-bold">
          <span>
            <Heart fill="#4C6A65" />
          </span>
          <span>Voted Most Adorable Piggy Bank</span>
        </div>
        <div className="text-6xl font-extrabold md:w-120 text-[#715767]">
          Meet Your New Money Bestie!
        </div>
        <div className="text-2xl text-[#4D4449] text-center md:text-start font-medium md:w-150">
          Tracking expenses has never been this sweet. Join PennyPal and turn
          your savings into treats.
        </div>
        <div className="mt-4 font-semibold text-xl sm:text-2xl gap-8 flex ">
          <button className="bg-[#715767] border-2 py-4 px-4 md:py-6.5 md:px-10 text-white rounded-full">
            Join the Club
          </button>
          <button className="border-2 border-[#715767] text-[#715767] md:py-6.5 md:px-10 py-4 px-4 rounded-full">
            Explore Me!
          </button>
        </div>
      </div>

      <div className="xl:block hidden">
        <FontAwesomeIcon
          width={400}
          height={400}
          icon={faPiggyBank}
          className="text-8xl  bg-gradient-to-b rounded-full p-12 from-[#715767] to-[#e4b0d0] text-white"
        />
      </div>
    </div>
  );
}
