"use client"
import { AnimatePresence, motion } from "framer-motion";
import { DollarSignIcon, Heart, Icon, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from '../../../lib/Categories';
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useExpenseModal } from "@/app/store/useExpenseModal";
import { useExpenseStore } from "@/app/store/UseExpenseStore";
export default function () {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0])
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { isOpen, close } = useExpenseModal();
    const { addExpense } = useExpenseStore();
    const handleSubmit = async () => {
        try {
            setLoading(true);
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: category,
                    amount: Number(amount),
                    category,
                    date,
                    description,
                }),
            })
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "failed to send expense")
            }
            const data = await res.json();
            toast.success("Expense added successfully")
            setDescription("")
            setAmount("")
            setCategory("");
            addExpense(data);
            close();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        } finally {
            setLoading(false);
        }
    }
    const categories = CATEGORIES
    return (<>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => close()}
                    className={`min-w-screen bg-black/20 fixed md:hidden flex inset-0 z-40 backdrop-blur-sm justify-center items-center`}>
                    <motion.div
                        transition={{ damping: 25, stiffness: 220, type: "spring" }}
                        initial={{ y: "-100%" }}
                        exit={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        drag="y"
                        dragConstraints={{ top: -300, bottom: 0 }}
                        dragElastic={{ top: 0.2, bottom: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y < -150) {
                                close()
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`bg-white maxh  gap-4 sm:px-12 fixed top-0 overflow-y-auto p-6 rounded-b-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl`}
                    >
                        <div className="flex flex-col gap-2 justify-center items-center text-center">
                            <div className="font-bold text-2xl text-[#715767] ">Treat Yourself?</div>
                            <div className="flex justify-start font-semibold text-[#4D4449] text-md">Every penny tells a story, Bestie. Let's log this one!</div>
                            <div className="relative">
                                <DollarSignIcon className="absolute  top-1/4 left-6 bg-white  text-[#715767]" strokeWidth={2} size={32} />
                                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="flex w-full justify-center text-center px-6 items-center text-2xl py-2 rounded-3xl outline-none border-4 text-[#715767] font-bold border-[#F4D2E5]" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-md text-[#4D4449] font-bold">Where did it go?</div>
                            <div className="flex overflow-auto min-w-65 max-w-180 p-2 gap-2">
                                {categories.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div onClick={() => setCategory(item.id)} className={`flex tranition-all font-bold cursor-pointer select-none duration-300 border-4 gap-2 p-2 rounded-xl w-35 h-10 flex-shrink-0  items-center justify-center ${category === item.id ? "bg-[#715767] text-white border-[#F4D2EF]" : "bg-[#ffffff]/50 border-[#F4D2EF]  text-[#715767]"}`} key={item.id}>
                                            <IconComponent />
                                            <div>{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-md text-[#4D4449] font-bold">When happened?</div>
                            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="py-2 rounded-full border-2 px-4 border-[#F4D2EF] font-bold text-[#715767] outline-[#715767]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-md text-[#4D4449] font-bold">
                                Details? darling.
                            </div>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Pink latte with oat milk..." className="py-2 rounded-full border-2 px-4 border-[#F4D2EF] font-bold text-[#715767] outline-[#715767]" />
                        </div>
                        <div>
                            <button onClick={handleSubmit} disabled={loading} className="cursor-pointer hover:scale-[98%] transition-all duration-300 flex justify-center items-center w-full bg-[#715767] rounded-full py-4 text-lg md:text-2xl font-bold text-white gap-2 ">
                                {loading ? (
                                    <Loader2 size={32} strokeWidth={2} className="animate-spin" />
                                ) : (

                                    <div className="flex gap-3 items-center text-center justify-center">
                                        <span><Heart strokeWidth={3} /></span>
                                        <span>Save Expense</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </ motion.div>
            )}

        </AnimatePresence>
    </>
    )
}