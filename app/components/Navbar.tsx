import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <div className=" px-5 lg:px-20 xl:px-40 py-6 text-[#715767] bg-[#FAF9F6] flex items-center text-center justify-between">
      <div className="font-bold text-2xl">
        Penny Pal
      </div>
      <div className="hidden md:flex gap-10 text-md font-semibold capitalize text-center items-center">
        <div>About Us</div>
        <div>Features</div>
        <div>Join the Club</div>
      </div>
      <div className="hidden md:flex gap-4 text-sm font-bold items-center text-center justify-center">
        <button className="bg-[#715767] px-6 py-2 border-2 cursor-pointer transition-all hover:text-[#715767] hover:bg-white duration-300 border-[#715767] text-white rounded-full">Sign In</button>
        <button className="border-[#715767] cursor-pointer transition-all duration-300 hover:bg-[#715767] hover:text-white px-6 py-2 border-2 rounded-full">Log In</button>
      </div>
      <div className="flex md:hidden">
        <Menu strokeWidth={3} size={24} />
      </div>
    </div>
  );
}
