"use client"
import { CATEGORIES } from '@/app/lib/Categories';
import { Expense } from '@/app/store/UseExpenseStore';
import { viewExpense } from '@/app/store/UseViewExpenseModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, LoaderPinwheel, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
    if (!isOpen) return null;


    return (
        <AnimatePresence>
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
                            <div className='flex text-xl font-bold  text-center items-center text-[#715767]'>
                                Amount :  $ {expense?.amount}
                            </div>
                            <div>
                                <span>
                                    <Calendar />
                                </span>
                                <span></span>
                            </div>
                        </div>
                    </motion.div>
                )}

            </motion.div>
        </AnimatePresence>
    )
}