import { Handbag, PiggyBank, ShoppingBag, ShoppingBagIcon, Wallet } from "lucide-react";

export default function page() {
  return (
    <div className="min-h-screen xl:mx-40  md:py-20   ">
      <div className="grid  grid-cols-3  gap-6 place-items-center justify-center items-center ">
        <div className="flex  flex-col col-span-1 w-[300px] h-[200px] justify-between h p-6 bg-white rounded-4xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
          <div className="flex w-full items-start  justify-between">
            <div className="p-2 bg-[#F4D2E5] rounded-full">
              <PiggyBank className="text-[#725868] p-1" size={32} />
            </div>
            <div className="text-[#4C6A65]  rounded-full font-extrabold py-1 px-4 bg-[#C8E9E2]">
              +12%
            </div>
          </div>
          <div className="flex gap-2 w-full flex-col">
            <div className="text-2xl font-semibold text-[#4D4449]">
              Total Saved
            </div>
            <div className="text-4xl font-extrabold text-[#1A1C1A]">
              $4,250.00
            </div>
          </div>
        </div>
        <div className="flex  flex-col col-span-1 w-[300px] h-[200px] justify-between h p-6 bg-white rounded-4xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
          <div className="flex w-full items-start  justify-between">
            <div className="p-2 bg-[#FFDAD6] rounded-full">
              <Handbag className="text-[#93000A] p-1" size={32} />
            </div>

          </div>
          <div className="flex gap-2 w-full flex-col">
            <div className="md:text-2xl text-lg font-semibold text-[#4D4449]">
              Spent this week
            </div>
            <div className="text-4xl font-extrabold text-[#1A1C1A]">
              $342.50
            </div>
          </div>
        </div>
        <div className="flex  flex-col col-span-1 w-[300px] h-[200px] justify-between h p-6 bg-white rounded-4xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
          <div className="flex w-full items-start  justify-between">
            <div className="p-2 bg-[#F9D5B4] rounded-full">
              <Wallet className="text-[#765B41] p-1" size={32} />
            </div>
            <div className="text-[#4D4449] font-extrabold py-1 px-4 ">
              March
            </div>
          </div>
          <div className="flex gap-2 w-full flex-col">
            <div className="text-2xl font-semibold text-[#4D4449]">
              Budget Status
            </div>
            <div className="text-4xl font-extrabold text-[#1A1C1A]">
              $4,250.00
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
