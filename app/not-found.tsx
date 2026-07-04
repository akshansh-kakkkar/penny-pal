import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center text-center bg-gradient-to-b from-[#F4D2E5]/40 to-[#FFFFFF]">
      <div className=" min-h-100 max-w-200 gap-4 mx-3  flex-col bg-white/70 flex justify-center p-12 items-center rounded-4xl shadow-[0_10px_30px_rgba(0,0,0,0.03),0_25px_60px_rgba(233,196,214,0.18)]">
        <div>
          <FontAwesomeIcon
            icon={faPiggyBank}
            className="text-7xl animate-wiggle p-4 text-[#715767] shadow-[0_10px_30px_rgba(0,0,0,0.03),0_25px_60px_rgba(233,196,214,0.18)] rounded-full"
          />
        </div>
         <div className="md:text-4xl text-[#715767] font-bold">Opps! This penny is hiding.</div>
          <div className="sm:text-lg text-sm font-medium">We can't seem to find the page you're looking for it might have rolled under the sofa or moved to a new vault.</div>
          <Link href={'/'} className="flex gap-2 text-center items-center justify-center text-white hover:text-[#4D4449] bg-[#715767] rounded-full px-4 py-2 font-bold text-xl hover:bg-[#715767]/70 transition-all divide-neutral-300">
          <span><HomeIcon /></span>
          <span>Back to Home</span>
          </Link>
      </div>
    </div>
  );
}
