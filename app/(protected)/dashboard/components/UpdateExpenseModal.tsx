"use client"
import { updateExpense } from "@/app/store/UseUpdateExpense";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {Expense} from "@/app/store/UseExpenseStore"
import { toast } from "sonner";
import { describe } from "node:test";
export default function UpdateExpenseModal() {
    const { close, isOpen, expenseId } = updateExpense();
    const [expense, setExpense] = useState<Expense | null>(null);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const fetchExpense = async(id : string)=>{
        try{
            setFetchLoading(true);
            const res = await fetch(`api/expenses/${id}`, {method : "GET"});
            if(!res.ok){
                toast.error("Failed to fetch the expense data")
                return
            }
           const data =await res.json();
           setExpense(data); 

        }catch(error){
            toast.error("failed to fetch the expense data")
        }
        finally{
            setFetchLoading(false)
        }
    }
    const updateExpenseData = async(id : string)=>{
        if(!expenseId || !expense) return null;
        try{
            setUpdateLoading(true);
            const res =await fetch(`/api/expenses/${id}`, {method : "PATCH", headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                amount : expense.amount,
                category : expense.category,
                description : expense.description,
            })

        })
        if(!res.ok){
            toast.error("Failed to update  expense")
        }
            const data =await res.json();
        }catch(error){
            toast.error("Failed to update the expense data please try again.")
        }
        finally{
            setUpdateLoading(true);
        }
    }
    useEffect(()=>{
        if(!isOpen || !expenseId) return;
        fetchExpense(expenseId);
    }, [isOpen, expenseId])
    return (
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={close}
                    className={`bg-black/20 fixed  hidden md:flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white relative lg:w-[800px] sm:w-[400px] w-[320px]   md:w-[600px] flex-col flex justify-center gap-4 items-center  rounded-3xl p-10"
                    >

                    </motion.div>
                </ motion.div>
            }
        </AnimatePresence>
    )
}