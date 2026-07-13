"use client"
import { CATEGORIES } from "@/app/lib/Categories";
import { useViewExpenseDrawer } from "@/app/store/UseViewExpenseDrawer"
import { AnimatePresence, motion } from "framer-motion"
import { X, LoaderPinwheel, Calendar, Clock } from 'lucide-react';
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Expense } from "@/app/store/UseExpenseStore"
export default function ViewExpenseDrawer() {
    const { isOpen, close, expenseId } = useViewExpenseDrawer();
    const [expense, setExpense] = useState<Expense | null>(null);
    const [fetchExpenseLoading, setFetchExpenseLoading] = useState(false);
    const fetchExpenseById = async (id: string) => {
        try {
            setFetchExpenseLoading(true);
            const res = await fetch(`/api/expenses/${id}`)
            if (!res.ok) {
                toast.error("Failed to fetch teh expense by Id sorry.")
            }
            const data = await res.json();
            setExpense(data)
        } catch (error) {
            toast.error("Failed to fetch the expense by Id.")
        } finally {
            setFetchExpenseLoading(false);
        }
    }
    const category = CATEGORIES.find((c) => c.id === expense?.category);
    const IconComponent = category?.icon;
    useEffect(() => {
        if (!isOpen || !expenseId) return
        fetchExpenseById(expenseId)

    }, [isOpen, expenseId])
    const date = expense ? new Date(expense.createdAt) : null
    const formattedDate = date?.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })
    const formattedTime = date?.toLocaleTimeString("en-IN", {
        hour: 'numeric',
        minute: "numeric",
        hour12: true
    })
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => close()}
                    className={`min-w-screen bg-black/20 fixed md:hidden flex inset-0 z-40 backdrop-blur-sm justify-center items-center`}>
                    {
                        fetchExpenseLoading ? (
                            <LoaderPinwheel size={48} className='animate-spin text-[#715767]' strokeWidth={2} />
                        ) : (
                            <motion.div
                                transition={{ damping: 25, stiffness: 220, type: "spring" }}
                                initial={{ y: "100%" }}
                                exit={{ y: "100%" }}
                                animate={{ y: 0 }}
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 300 }}
                                dragElastic={{ top: 0, bottom: 0.2 }}
                                onDragEnd={(e, info) => {
                                    if (info.offset.y > 50) {
                                        close()
                                    }
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white  overflow-y-auto items-center w-full min-h-[400px] fixed bottom-0 p-6 gap-2 rounded-t-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl "
                            >
                                <button onClick={close} className='absolute top-4 right-4  border-4 cursor-pointer border-[#F4D2E5] cursor-pointer hover:border-[#715767] transition-all duration-300 bg-[#F4D2E5] rounded-full p-1 text-[#715767]'>
                                    <X />
                                </ button>
                                <div className="flex flex-col justify-center mt-6 w-full h-full">
                                    {IconComponent && (
                                        <div className="flex w-full justify-center items-center">
                                            <div style={{ backgroundColor: category.background, borderColor: category.color, }} className={`border-4 w-fit mb-2   p-4 rounded-full`}>
                                                <IconComponent color={category.color} size={32} strokeWidth={2} />
                                            </div>
                                        </div>)}
                                    <div className="flex justify-center items-center w-full text-2xl font-bold text-[#715767]">{expense?.description}</div>
                                    <div className="flex items-center text-center w-full font-semibold justify-center text-[#4D4449]  text-sm">{category?.name}</div>
                                    <div className="flex justify-center items-center text-center w-full gap-4 text-2xl my-2 font-bold text-[#715767]">
                                        <span className="text-[#1c1a1c]">Amount:</span>$ {expense?.amount}
                                    </div>
                                    <div className="flex relative my-4 justify-center border-2 rounded-full py-2 text-[#715767] border-[#715767] font-bold text-xl">
                                        <div className="absolute top-2 left-4">
                                            <Calendar strokeWidth={2.5} />
                                        </div>
                                        <div>{formattedDate}</div>
                                    </div>
                                    <div className="flex relative justify-center border-2 rounded-full py-2 text-[#715767] border-[#715767] font-bold text-xl">
                                        <div className="absolute top-2 left-4">
                                            <Clock strokeWidth={2.5} />
                                        </div>
                                        <div>{formattedTime}</div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }

                </motion.div>
            )}
        </AnimatePresence>
    )
}