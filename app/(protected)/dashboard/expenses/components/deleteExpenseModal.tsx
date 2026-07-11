"use client"
import { useDeleteExpenseModal } from "@/app/store/useDeleteExpenseModal"
import { AnimatePresence, motion } from "framer-motion"
import { Heart } from "lucide-react";
import { useState } from "react";
import {toast} from "sonner"
export default function DeleteExpenseModal() {
    const { onClose, isOpen } = useDeleteExpenseModal();
    const [loading, setLoading] = useState(false);
    if (!isOpen) return null;
    const GetExpenseById =async (id : string)=>{
        try{
            setLoading(true);
            const res = await fetch
        }catch(error){
            toast.error("failed to delete the treat you can hit this piggy or try hacking the website.")
        }finally{
            setLoading(false)
        }
    }
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onClose()} className={` bg-black/20 fixed  hidden md:flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}
            >
                <motion.div onClick={(e) => e.stopPropagation()} className="bg-white relative w-[448px] p-8 flex-col flex justify-center gap-4 items-center  rounded-3xl"
                >
                    <div className="flex w-24 h-24 rounded-full blur-md bg-[#FFB8D1]/40 absolute top-0 right-0" />
                        <div className="bg-[#F4D2E5] p-4 rounded-full" >
                       <Heart fill="#715767" className="text-[#715767]" size={32}  /> 
                    </div>
                    <div className="text-[#715767] text-3xl font-bold">
                        Delete This Treat?
                    </div>
                    <div>
                       Are you sure you want to remove this expense? This action can't be undone, but your budget is still of you! 
                    </div>
                    <div>
                        <div>
                            <span></span>
                            <span></span>
                        </div>
                        <div>${15.00}</div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>

    )
}