"use client"
import { CATEGORIES } from "@/app/lib/Categories";
import { DollarSignIcon, Heart, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
interface addExpenseProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExpenseModal({ isOpen, onClose }: addExpenseProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = CATEGORIES;
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!category && !description.trim() && !amount) {
        toast.error("All fields are reqired");
        return
      }
      if (!amount || Number(amount) <= 0) {
        toast.error("Please enter a valid amount.");
        return;
      }
      if (!category) {
        toast.error("Please select a category")
        return;
      }
      if (!date) {
        toast.error("Date is required.")
        return;
      }
      if (!description.trim()) {
        toast.error("Description is required.")
        return;
      }
      const res = await fetch('/api/expenses', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: category,
          amount: Number(amount),
          category,
          date,
          description,
        })
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Failed to create expense")
      }
      const data = await res.json();
      toast.success('Expense added successfully!');
      setAmount("");
      setCategory('');
      setDate(new Date().toISOString().split("T")[0]);
      setDescription("");
      onClose();

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      else {
        toast.error("Something went wrong.")
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
          className={` bg-black/20 fixed  hidden md:flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white relative lg:w-[800px] sm:w-[400px] w-[320px]   md:w-[600px] flex-col flex justify-center gap-4 items-center  rounded-3xl p-10"
          >
            <X onClick={onClose} className="absolute right-4 text-[#715767] bg-[#F4D2EF] rounded-full p-1 hover:scale-[115%] top-4 cursor-pointer transition-all duration-300" />
            <div className="flex flex-col justify-center text-center items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-bold text-[#715767]">Treat Yourself?</h2>
                <p className="text-sm font-semibold text-[#4D4449] ">Every penny tells a story, Bestie. Let's log this one!</p>
              </div>
            </div>
            <div className="relative">
              <DollarSignIcon className="absolute  top-1/5 left-6 bg-white  text-[#715767]" strokeWidth={2} size={48} />
              <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="flex w-full justify-center text-center px-6 items-center text-4xl py-4 rounded-4xl outline-none border-4 text-[#715767] font-bold border-[#F4D2E5]" placeholder="0.00" />
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
                      <div onClick={() => setCategory(item.id)} className={`flex tranition-all font-bold cursor-pointer select-none duration-300 border-4 gap-2 p-2 rounded-3xl w-35 h-25 flex-shrink-0 flex-col items-center justify-center ${category === item.id ? "bg-[#715767] text-white border-[#F4D2EF]" : "bg-[#ffffff]/50 border-[#F4D2EF]  text-[#715767]"}`} key={item.id}>
                        <span>
                          <IconComponent className="transition-all duration-300"  size={category === item.id ? 48 : 32} />
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
                  <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="py-2 rounded-full border-2 px-4 border-[#F4D2EF] font-bold text-[#715767] outline-[#715767]" />
                </div>
                <div className="flex gap-2 w-full sm:w-1/2 flex-col">
                  <p className="text-sm font-bold ml-4 text-[#4D4449]">Details? darling.</p>
                  <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Pink latte with oat milk..." className="py-2 font-bold rounded-full border-2 px-4 border-[#F4D2EF] text-[#715767] outline-[#715767]" />
                </div>
              </div>

              <div>
                <button onClick={handleSubmit} className="cursor-pointer hover:scale-[98%] transition-all duration-300 flex justify-center items-center w-full bg-[#715767] rounded-full py-4 text-lg md:text-2xl font-bold text-white gap-2 ">
                  {loading ? (
                    <Loader2 size={32} strokeWidth={2} className="animate-spin" />
                  ) : (
                    <div className="flex gap-3 items-center text-center justify-center">
                      <span>
                        <Heart strokeWidth={3} />
                      </span>
                      <span>Save Expense</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
