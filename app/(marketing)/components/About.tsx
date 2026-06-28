import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div
      className={`flex justify-center items-center md:px-40 py-24 bg-gradient-to-b from-[#F4D2E5]/40 to-[#FFFFFF]`}
    >
      <div className="flex lg:flex-row flex-col gap-6 ">
        <div
          className={`md:hover:scale-[105%] hover:scale-[115%] transition-all duration-500  shadow-[0px_20px_40px_rgba(113,87,103,0.1)] sm:w-110 h-130 w-70 flex justify-start items-start  flex-col shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] bg-[#FFFFFF] px-10 py-12 rounded-4xl gap-6`}
        >
          <div className="text-4xl max-w-80 font-bold text-[#715767]">
            A safe space for your wallet
          </div>
          <div className="text-md text-[#4D4449] font-medium">
            PennyPal is more than an app, it's a sanctuary for your financial
            wellness. We use bank-level security wrapped in a marshmallow cloud
            of comfort.
          </div>
          <div className="relative rounded-4xl w-[200px] h-[250px] md:w-[360px] md:h-[220px]">
            <Image
              src={"/assets/landing-page-features.png"}
              alt="landing-page image"
              className="absolute rounded-4xl "
              fill
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className=" relative hover:scale-[105%] transition-all duration-500 shadow-[0px_20px_40px_rgba(113,87,103,0.1)] w-70 sm:w-110 h-60 flex justify-start items-start  flex-col shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] bg-[#715767] px-10 py-6 rounded-4xl ">
            <div className="text-white text-xl font-semibold">
              Sweet Savings
            </div>
            <div className="text-white text-md font-normal">
              Users save an average of $240/month using PennyPal
            </div>
            <div className="absolute z-10 -bottom-0 -right-4 rounded-full">
              <Image
                src="/assets/stars.svg"
                alt="stars"
                className="rounded-full opacity-40"
                width={120}
                height={50}
              />
            </div>
          </div>
          <div className="gap-6 md:flex-row flex-col  flex justify-start items-start rounded-4xl ">
            <div className="bg-[#C8E9E2] hover:scale-[105%] transition-all duration-500 text-[#46645F] justify-center gap-4 items-center shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] py-6 rounded-3xl w-70 md:w-52 h-65 flex flex-col gap-2">
              <FontAwesomeIcon icon={faUsers} width={48} />
              <div className="text-xs font-bold">become a club members</div>
            </div>
            <div className="bg-[#F9D5B4] hover:scale-[105%] transition-all duration-500 text-[#74593F] justify-center items-center flex flex-col gap-2 shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] py-6  rounded-3xl md:w-52 w-70 h-65">
              <BadgeCheck size={48} fill="#74593F" className="text-[#F9D5B4]" />
              <div className="text-xs font-bold">Trust Verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
