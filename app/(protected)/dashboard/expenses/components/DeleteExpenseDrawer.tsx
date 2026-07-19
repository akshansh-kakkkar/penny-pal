"use client"
import { useDeleteDrawer } from "@/app/store/UseDeleteExpenseDrawer"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, Loader2, LoaderPinwheel, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { Expense } from "@/app/store/UseExpenseStore";
import { ICON_MAP } from "@/app/lib/icon-map";
export default function DeleteExpenseDrawer({ deleted }: { deleted: (id: string) => void }) {
    const { close, isOpen, expenseId } = useDeleteDrawer();
    const [expense, setExpense] = useState<Expense | null>(null)
    const [Loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchExpenseById = useCallback(async (id: string) => {
        try {
            setLoading(true)
            const res = await fetch(`/api/expenses/${id}`, { method: "GET" });
            if (!res.ok) {
                return toast.error("Failed to fetch the expense.")
            }
            const data = await res.json();
            setExpense(data)
        }
        catch {
            toast.error("Failed to fetch the expense")
        }
        finally {
            setLoading(false)
        }
    }, [])
    const DeleteExpenseById = async (id: string) => {
        try {
            setDeleteLoading(true);
            const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
            if (!res.ok) {
                throw new Error("Failed to delete the expense.")
            }
            toast.success("Expense deleted successfully.")
            deleted(id)
            close()

        } catch {
            toast.error('Failed to delete expense.')
        }
        finally {
            setDeleteLoading(false)
        }
    }
    useEffect(() => {
        if (isOpen && expenseId) {
            fetchExpenseById(expenseId)
        }
    }, [isOpen, expenseId, fetchExpenseById])
    const IconComponent = expense ? ICON_MAP[expense?.category.icon] : null

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className=" min-w-screen bg-black/20 fixed inset-0 z-40 backdrop-blur-sm lg:hidden  "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} onClick={() => close()}   >
                    {Loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <LoaderPinwheel size={48} className='animate-spin text-[#715767]' strokeWidth={2} />
                        </div>
                    ) : (

                        <motion.div
                            className="bg-white  overflow-y-auto items-center w-full min-h-[400px] fixed bottom-0 p-6 gap-2 rounded-t-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl "
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
                            onClick={(e) => e.stopPropagation()}>
                            <div className="flex w-24 h-24 rounded-full blur-md bg-[#FFB8D1]/40 absolute top-0 right-0" />
                            <div className="w-12 h-2 rounded-full bg-[#D1D5DB]/60  flex justify-center -center" />
                            <div className="flex flex-col gap-1 pt-4 w-full items-center justify-center">
                                <div className="bg-[#F4D2E5] w-fit shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] p-4 rounded-full" >
                                    <Heart fill="#715767" className="text-[#715767]" size={32} />
                                </div>
                                <div className="text-[#715767] text-xl font-bold">
                                    Delete This Treat?
                                </div>
                                <div className="flex text-sm font-medium text-[#4D4449] text-center items-center  w-full">
                                    Are you sure you want to remove this expense? This action can&apos;t be undone, but your budget is still of you!
                                </div>
                                <div className="flex mb-4 border-2 border-white shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] justify-between items-center rounded-3xl bg-[#F4D2E5] py-2 px-5 text-center w-full">
                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                        <span className="bg-white p-2 rounded-full shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
                                            {IconComponent && (
                                                <IconComponent size={32} className="text-[#715767]" strokeWidth={2} />
                                            )}
                                        </span>
                                        <span className="text-xl block font-bold text-[#715767] truncate ">{expense?.description}</span>
                                    </div>
                                    <div className="text-xl flex gap-2 font-bold text-[#715767] bg-white px-4 py-2 rounded-2xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]"><span>$</span><span>{expense?.amount}</span></div>
                                </div>
                                <div className="flex flex-col w-full gap-4">
                                    <button disabled={deleteLoading} onClick={() => close()} className="w-full disabled:bg-gray-300 disabled:scale-[100%] disabled:cursor-not-allowed cursor-pointer hover:scale-[105%] hover:transition-all duration-300 bg-[#715767] py-4 justify-center items-center text-center  text-2xl rounded-full text-white font-semibold gap-2 flex">
                                        <span>Keep it!</span>
                                        <span>
                                            <Heart size={24} strokeWidth={3} />
                                        </span>
                                    </button>
                                    <button
                                        disabled={deleteLoading}
                                        onClick={() => {
                                            if (expenseId) {
                                                DeleteExpenseById(expenseId)
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
                            </div>
                        </motion.div>
                    )}

                </motion.div>
            )}
        </AnimatePresence>
    )

}