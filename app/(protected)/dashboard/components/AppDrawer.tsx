"use client";
import {
  Banknote,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Plus,
  WalletIcon,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, spring } from "framer-motion";
import Link from "next/link";
export default function AppDrawer() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="md:hidden z-10 flex mx-8 my-4 bg-white w-fit absolute bottom-5  left-4 p-2 rounded-full shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]"
      >
        <LayoutDashboard size={30} className="text-[#725868]" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className=" min-w-screen bg-black/20 fixed inset-0 z-40 backdrop-blur-sm md:hidden  "
          >
            <motion.div
              transition={{ damping: 25, stiffness: 220, type: spring }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              initial={{ y: "100%" }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 300 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 150) {
                  setOpen(false);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white overflow-y-auto fixed bottom-0 p-6 rounded-t-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl "
            >
              <div className="flex justify-center flex-col items-center gap-4">
                <div className="w-12 h-2 rounded-full bg-[#D1D5DB]/60 flex justify-center items-center" />
                <div className="flex justify-between w-full items-center">
                  <div className="flex flex-col">
                    <div className="text-2xl text-[#725868] font-bold">
                      Main Menu
                    </div>
                    <div className="text-sm text-[#4D4449] font-semibold ">
                      Quick Actions
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-[#F4D2E5] p-2 rounded-full"
                  >
                    <X size={24} className="text-[#725868] rounded-full" />
                  </button>
                </div>
                <div className="flex py-4 justify-start  items-center gap-16 text-start p-2 flex-wrap">
                  <Link
                    href={"/dashboard"}
                    className={`flex gap-4 flex-col items-center justify-center `}
                  >
                    <span
                      className={`rounded-xl text-[#725868] p-2 ${pathName === "/dashboard" ? "bg-[#F4D2EF]" : "bg-[#FDF2F8]"}`}
                    >
                      <LayoutGrid size={32} strokeWidth={2} />
                    </span>
                    <span className="text-sm font-bold text-[#4D4449]">
                      Dashboard
                    </span>
                  </Link>
                  <Link
                    href={"/dashboard/addexpense"}
                    className="flex gap-2 flex-col items-center justify-center"
                  >
                    <span
                      className={`rounded-xl text-[#725868] p-2 ${pathName === "/dashboard/addexpense" ? "bg-[#F4D2EF]" : "bg-[#FDF2F8]"}`}
                    >
                      <Plus size={32} strokeWidth={2} />
                    </span>
                    <span className="text-sm font-bold text-[#4D4449]">
                      Add Expense
                    </span>
                  </Link>
                  <Link
                    href={"/dashboard/addexpense"}
                    className={`flex gap-2 flex-col items-center justify-center`}
                  >
                    <span
                      className={`rounded-xl text-[#725868] p-2 ${pathName === "/dashboard/addexpense" ? "bg-[#F4D2EF]" : "bg-[#FDF2F8]"} `}
                    >
                      <Banknote size={32} strokeWidth={2} />
                    </span>
                    <span className="text-sm font-bold text-[#4D4449]">
                      Expenses
                    </span>
                  </Link>
                  <Link
                    href={"/dashboard/expenses"}
                    className="flex gap-2 flex-col items-center justify-center"
                  >
                    <span
                      className={`rounded-xl ${pathName === "/dashboard/expense" ? "bg-[#F4D2E5] " : "bg-[#FDF2F8]"} text-[#725868]  p-2 `}
                    >
                      <WalletIcon size={32} strokeWidth={2} />
                    </span>
                    <span className={`text-sm font-bold text-[#4D4449]`}>
                      Budgets
                    </span>
                  </Link>
                  <button className="flex gap-2 flex-col items-center justify-center">
                    <span className="text-red-400 bg-red-50 p-2 rounded-xl">
                      <LogOut size={32} strokeWidth={2} />
                    </span>
                    <span className="text-sm font-bold text-red-400 ">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
