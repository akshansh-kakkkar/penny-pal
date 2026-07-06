"use client"
import { CATEGORIES } from "@/app/lib/Categories";
import { DollarSignIcon, Heart, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
interface addExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpenseModal({ isOpen, onClose }: addExpenseProps) {
  const [amount, setAmount] = useState("");
  const [category, setcategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = CATEGORIES;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
          className={` bg-black/20 fixed  flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white relative lg:w-[800px] sm:w-[400px] w-[300px]   md:w-[600px] flex-col flex justify-center gap-4 items-center  rounded-3xl p-10"
          >
            <X className="absolute right-4 text-[#715767] bg-[#F4D2EF] rounded-full p-1 hover:scale-[115%] top-4 cursor-pointer transition-all duration-300" />
            <div className="flex flex-col justify-center text-center items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-bold text-[#715767]">Treat Yourself?</h2>
                <p className="text-sm font-semibold text-[#4D4449] ">Every penny tells a story, Bestie. Let's log this one!</p>
              </div>
            </div>
            <div className="relative">
              <DollarSignIcon className="absolute  top-1/5 left-6 bg-white  text-[#715767]" strokeWidth={2} size={48} />
              <input type="number" className="flex w-full justify-center text-center px-6 items-center text-4xl py-4 rounded-4xl outline-none border-4 text-[#715767] font-bold border-[#F4D2E5]" placeholder="0.00" />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <p className="text-md text-[#4D4449] font-bold">Where did it go?</p>
              </div>

              <div className=" overflow-x-auto w-full ">
                <div className="min-w-max flex gap-8 my-2">
                  {categories.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div className="flex bg-[#ffffff]/50 border-[#F4D2EF] text-[#715767] border-4 gap-2 p-2 rounded-3xl w-30 h-25 flex-shrink-0 flex-col items-center justify-center" key={item.id}>
                        <span>
                          <IconComponent size={32} />
                        </span>
                        <span>{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex sm:flex-row flex-col gap-6 justify-center  items-center w-full ">
                <div className="flex gap-2 sm:w-1/2 w-full flex-col">
                  <p className="text-sm font-bold ml-4 text-[#4D4449]" >When happened?</p>
                  <input type="date" className="py-2 rounded-full border-2 px-4 border-[#F4D2EF] font-bold text-[#715767]" />
                </div>
                <div className="flex gap-2 w-full sm:w-1/2 flex-col">
                  <p className="text-sm font-bold ml-4 text-[#4D4449]">Details? darling.</p>
                  <input type="text" placeholder="Pink latte with oat milk..." className="py-2 font-bold rounded-full border-2 px-4 border-[#F4D2EF] text-[#715767]" />
                </div>
              </div>

              <div>
                <button className="flex justify-center items-center w-full bg-[#715767] rounded-full py-4 text-lg md:text-2xl font-bold text-white gap-2 ">
                  <span>
                    <Heart strokeWidth={3} />
                  </span>
                  <span>Save Expense</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
