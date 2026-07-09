"use client";
import { signOut, useSession } from "@/app/lib/auth/auth-client";
import {
  Banknote,
  LayoutDashboard,
  LogOutIcon,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
interface sideBarProps {
  openModal : ()=>void;
}
export default function SideBar({openModal} : sideBarProps) {
  const router = useRouter()
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <div className="bg-[#FFFFFF] hidden lg:flex flex-col justify-between py-16 px-4  shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] rounded-r-3xl w-[400px]">
      <div className="flex flex-col gap-10">
        <div className="flex gap-6 flex-col">
          <div className="font-bold text-4xl flex mx-4 items-center mb-4 text-[#715767]">PennyPal</div>
          <div className="flex text-center items-center justify-center gap-4">
            <div className="flex text-xl justify-center items-center text-center border-[#F4D2E5] border-5 rounded-full w-14 h-14 font-bold text-white bg-[#715767]">
              {session?.user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col text-start">
              {session?.user.name && <div className="font-bold capitalize text-[#715767] text-xl text-start">Hello, {session?.user.name} </div>}
              <div className="font-semibold text-[#4D4449]">Managing with Love</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mx-4">
              <Link href={"/dashboard"} className={`flex w-full rounded-full px-6 py-4 text-lg font-semibold text-[#725868] items-center text-center gap-4 ${pathName === "/dashboard" ? "bg-[#F4D2E5]" : ""}`} >
              <span>
                <LayoutDashboard className="text-[#715767]" size={24} strokeWidth={3} />
              </span>
              <span>Dashboard</span>
            </Link>
            <Link href={"/dashboard/expenses"} className={`flex rounded-full w-full px-6 py-4 font-semibold text-[#725868] items-center text-center gap-4 text-lg ${pathName === "/dashboard/expenses" ? "bg-[#F4D2E5]" : ""}`} >
              <span>
                <Banknote size={24} strokeWidth={3} />
              </span>
              <span>Expenses</span>
            </Link>
            <Link href={"/dashboard/budget"} className={`flex w-full px-6 py-4 rounded-full text-lg items-center text-center gap-4 font-semibold text-[#725868] ${pathName === "/dashboard/budget" ? "bg-[#F4D2E5]" : ""}`}>
              <span>
                <WalletIcon size={24} strokeWidth={3} />
              </span>
              <span>Budgets</span>
            </Link>
        </div>
      </div>
      <div className="flex gap-6 flex-col ">
        <button onClick={async()=>{ await signOut(); router.refresh()}} className="flex transition-all duration-300 cursor-pointer px-6 py-4 rounded-full hover:text-white hover:bg-[#725868a1] gap-6 items-center text-xl font-semibold text-center text-[#4D4449] mx-4 ">
          <span>
            <LogOutIcon strokeWidth={3} />
          </span>
          <span>Logout</span>
        </button>
        <button onClick={openModal} className="flex cursor-pointer hover:scale-[105%] hover:bg-[#725868]/90 duration-300 transition-all justify-center items-center text-center text-2xl bg-[#715767] rounded-full py-4 px-4 font-bold text-white">Add Expense</button>
      </div>
    </div>
  );
}
