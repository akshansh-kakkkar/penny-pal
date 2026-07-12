"use client"
import { CATEGORIES } from "@/app/lib/Categories";
import { useDeleteExpenseModal } from "@/app/store/useDeleteExpenseModal"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, Loader2, LoaderPinwheel, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Expense } from "@/app/store/UseExpenseStore";
export default function DeleteExpenseModal({ onDeleted }: { onDeleted: (id: string) => void }) {
    const { onClose, isOpen, expenseId } = useDeleteExpenseModal();
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState<Expense | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const GetExpenseById = useCallback(async (id: string) => {
        try {
            await Promise.resolve();
            setLoading(true);
            const res = await fetch(`/api/expenses/${id}`, { method: "GET" })
            if (!res.ok) {
                return toast.error("Failed to fetch the treat hit the piggy or try hacking the website.")
            }
            const data = await res.json();
            setExpense(data);
        } catch {
            toast.error("failed to fetch the treat you can hit this piggy or try hacking the website.")
        } finally {
            setLoading(false)
        }
    }, [])
    const deleteExpenseById = async (id: string) => {
        try {
            setDeleteLoading(true);
            const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
            if (!res.ok) {
                throw new Error("Failed to delete the expense try not to spam.")
            }
            toast.success("Treat deleted successfully")
            onDeleted(id)
            onClose()
        }
        catch {
            toast.error("failed to delete the treat you can hit this piggy or try hacking the website.")
        }
        finally {
            setDeleteLoading(false)
        }
    }
    useEffect(() => {
        if (isOpen && expenseId) {
            GetExpenseById(expenseId)
        }
    }, [isOpen, expenseId, GetExpenseById])

    const category = CATEGORIES.find(c => c.id === expense?.category)
    const IconComponent = category?.icon

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => onClose()} className={` bg-black/20 fixed  hidden md:flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}
                >
                {
                    loading ? (
                        <LoaderPinwheel size={48} className='animate-spin text-[#715767]' strokeWidth={2} />
                    ) : (
                        <motion.div onClick={(e) => e.stopPropagation()} className="bg-white relative w-[448px] p-8 flex-col flex justify-center gap-4 items-center  rounded-3xl "
                        >
                            <div className="flex w-24 h-24 rounded-full blur-md bg-[#FFB8D1]/40 absolute top-0 right-0" />
                            <div className="bg-[#F4D2E5] shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] p-4 rounded-full" >
                                <Heart fill="#715767" className="text-[#715767]" size={32} />
                            </div>
                            <div className="text-[#715767] text-3xl font-bold">
                                Delete This Treat?
                            </div>
                            <div className="flex text-sm font-medium text-[#4D4449] text-center items-center flex w-full">
                                Are you sure you want to remove this expense? This action can&apos;t be undone, but your budget is still of you!
                            </div>
                            <div className="flex mb-4 border-2 border-white shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] justify-between items-center rounded-3xl bg-[#F4D2E5] py-2 px-5 text-center w-full">
                                <div className="flex items-center gap-4 ">
                                    <span className="bg-white p-2 rounded-full shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
                                        {IconComponent && (
                                            <IconComponent size={32} className="text-[#715767]" strokeWidth={2} />
                                        )}
                                    </span>
                                    <span className="text-xl font-bold text-[#715767] max-w-50 truncate ">{expense?.description}</span>
                                </div>
                                <div className="text-xl flex gap-2 font-bold text-[#715767] bg-white px-4 py-2 rounded-2xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]"><span>$</span><span>{expense?.amount}</span></div>
                            </div>
                            <div className="flex flex-col w-full gap-4">
                                <button disabled={deleteLoading} onClick={() => onClose()} className="w-full disabled:bg-gray-300 disabled:scale-[100%] disabled:cursor-not-allowed cursor-pointer hover:scale-[105%] hover:transition-all duration-300 bg-[#715767] py-4 justify-center items-center text-center  text-2xl rounded-full text-white font-semibold gap-2 flex">
                                    <span>Keep it!</span>
                                    <span>
                                        <Heart size={24} strokeWidth={3} />
                                    </span>
                                </button>
                                <button
                                    disabled={deleteLoading}
                                    onClick={() => {
                                        if (expenseId) {
                                            deleteExpenseById(expenseId)
                                        }
                                    }} className="text-[#715767] disabled:border-2 disabled:border-gray-300 disabled:cursor-not-allowed cursor-pointer border-2 rounded-full border-transparent  font-bold text-md gap-2 flex items-center text-center hover:border-[#715767] transition-all duration-300 justify-center w-full py-2">
                                    {
                                        deleteLoading ? (
                                            <Loader2 className="animate-spin" size={32} strokeWidth={2} />
                                        ) : (
                                            <div className="flex gap-2">
                                                <span><Trash2Icon size={20} strokeWidth={2.5} /></span>
                                                <span>Yes, delete</span>
                                            </div>
                                        )
                                    }
                                </button>
                            </div>
                        </motion.div>
                    )
                }
                </motion.div>
            )}
        </AnimatePresence >
    )
}