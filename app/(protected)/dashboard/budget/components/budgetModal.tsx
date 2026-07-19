import { AnimatePresence, motion } from "framer-motion"
import { useBudgetModal } from "@/app/store/UseBudgetModal";
import { CircleCheck, DollarSignIcon, X } from "lucide-react";

export default function BudgetModal() {
    const { onClose, isOpen, budgetId } = useBudgetModal();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={()=>onClose()}
          className={` bg-black/20 fixed  hidden lg:flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white relative  lg:w-[800px] sm:w-[400px] w-[320px]   md:w-[600px] flex-col flex justify-center gap-6 items-center  z-50 rounded-3xl p-10" >
                                <X onClick={()=>onClose()} className="absolute right-4 text-[#715767] bg-[#F4D2EF] rounded-full p-1 hover:scale-[115%] top-4 cursor-pointer transition-all duration-300"  />
                                    <h2 className="text-3xl text-[#715767] font-bold capitalize">Set Your Budget</h2>
                                    <div className="w-full relative flex justify-center items-center">
                                        <DollarSignIcon className="absolute left-12 text-[#715767]/90" size={56} strokeWidth={3} />
                                        <input placeholder="0.00" className="border-[#715767] w-full flex justify-center items-center py-1 rounded-full text-center border-4 text-[#715767] text-7xl font-bold" />
                                    </div>
                                    <button className="font-bold text-4xl gap-4 w-full text-center flex justify-center items-center bg-[#715767] text-white py-4 rounded-full">
                                        <span>
                                            <CircleCheck size={40} strokeWidth={2.5} />
                                        </span>
                                        <span>Set Budget</span>
                                    </button>
                    </motion.div>
                </motion.div>
            )}d
        </AnimatePresence>
    )
}