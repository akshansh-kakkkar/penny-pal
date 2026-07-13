"use client"
import { CATEGORIES } from '@/app/lib/Categories';
import { useDeleteExpenseModal } from '@/app/store/useDeleteExpenseModal';
import { Expense, useExpenseStore } from '@/app/store/UseExpenseStore';
import { viewExpense } from '@/app/store/UseViewExpenseModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, LoaderPinwheel, Pencil, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import DeleteExpenseModal from './deleteExpenseModal';

export default function ViewExpenseModal() {
    const { isOpen, close, expenseId } = viewExpense();
    const [expense, setExpense] = useState<Expense | null>(null);
    const [viewLoading, setViewLoading] = useState(false);

    const viewExpenseById = async (id: string) => {
        try {
            setViewLoading(true);
            const res = await fetch(`/api/expenses/${id}`)
            const data = await res.json();
            if (!res.ok) {
                toast.error("Something is wrong her Idk what though.")
            }
            setExpense(data)
        } catch (error) {
            toast.error("Failed to fetch the expense try refreshing. this is not my fault I am a small piggy.")
        } finally {
            setViewLoading(false)
        }
    }

    const category = CATEGORIES.find((c) => c.id === expense?.category);
    const IconComponent = category?.icon;
    useEffect(() => {
        if (!isOpen || !expenseId) return;
        viewExpenseById(expenseId);

    }, [isOpen, expenseId]);

    const date = expense ? new Date(expense.createdAt) : null;
    const formattedDate = date?.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "numeric",
        year: "2-digit",
    })

    const formattedTime = date?.toLocaleTimeString("en-IN", {
        hour: 'numeric',
        minute: "2-digit",
        hour12: true
    })
    const {removeExpenses} = useExpenseStore()
    const {open : deleteOpen} = useDeleteExpenseModal();
    
return (
<>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={close}
                    className={` bg-black/20 fixed  hidden md:flex inset-0 z-40 backdrop-blur-sm justify-center items-center`}>
                    {viewLoading ? (
                        <LoaderPinwheel size={48} className='animate-spin text-[#715767]' strokeWidth={2} />
                    ) : (
                        <motion.div onClick={(e) => e.stopPropagation()} className="bg-white  relative p-8 flex-col w-[400px] flex justify-center gap-2 items-center  rounded-3xl">
                            <button onClick={close} className='absolute top-4 right-4  border-4 cursor-pointer border-[#FEDBE7] cursor-pointer hover:bg-[#715767] hover:text-white transition-all duration-300 bg-[#FFB8D1] rounded-full p-2 text-[#715767]'>
                                <X />
                            </ button>
                            <div className='flex justify-center text-center items-center gap-4 flex-col w-full'>
                                {IconComponent && (
                                    <div style={{ backgroundColor: category.background, borderColor: category.color, }} className={`border-4 mb-2   p-4 rounded-full`}>
                                        <IconComponent color={category.color} size={48} strokeWidth={2} />
                                    </div>)}
                                <div className='flex text-2xl font-medium  text-center items-center text-[#1A1C1A]'>
                                    {expense?.description}
                                </div>
                                <div className=' text-xl font-bold flex gap-3  text-center items-center text-[#715767]'>
                                    <span className='text-[#1a1C1A]'>Amount: </span>$ {expense?.amount}
                                </div>
                                <div className='flex  w-full justify-center relative gap-5 text-lg font-bold shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] py-2 px-4 rounded-full border-2 border-[#715767] items-center text-center text-[#715767] bg-[#ffffff]'>
                                    <span className='absolute left-6 top-2.5'>
                                        <Calendar strokeWidth={2.5} />
                                    </span>
                                    <span>
                                        {formattedDate}
                                    </span>
                                </div>
                                <div className='flex gap-5 w-full justify-center relative  text-lg font-bold shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] py-2 px-4 rounded-full border-2 border-[#715767] items-center text-center text-[#715767] bg-[#ffffff]'>
                                    <span className='absolute left-6 top-2.5'>
                                        <Clock strokeWidth={2.5} />
                                    </span>
                                    <span>
                                        {formattedTime}
                                    </span>
                                </div>
                                <div className='flex justify-between items-center w-full'>
                                    <button className='bg-[#715767] cursor-pointer transition-all duration-300 hover:scale-[105%] rounded-full p-4 text-white '>
                                        <span>
                                            <Pencil size={24} strokeWidth={2.5} />
                                        </span>
                                    </button>
                                    <button onClick={()=>{ if(expenseId){
                                        deleteOpen(expenseId);
                                    
                                    }
                                    setTimeout(()=>{
                                        close();
                                    }, 250)
                                    }}  className='bg-[#715767] cursor-pointer duration-300 transition-all hover:scale-[105%] rounded-full p-4 text-white '><Trash2 size={24} strokeWidth={2.5} /></button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </motion.div>
            )}
        </AnimatePresence>
        <DeleteExpenseModal onDeleted={removeExpenses} />
        </>
    )
}