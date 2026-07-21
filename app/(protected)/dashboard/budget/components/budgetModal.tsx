import { AnimatePresence, motion } from "framer-motion"
import { useBudgetModal } from "@/app/store/UseBudgetModal";
import { CircleCheck, DollarSignIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ICON_MAP } from "@/app/lib/icon-map";
import { getCurrentMonthAndYear } from "@/app/lib/date"
import { useBudgetStore } from "@/app/store/BudgetStore";
type BudgetForm = {
    amount: number;
    categories: {
        categoryId: string;
        amount: number;
    }[]
}
interface BudgetData {
    id: string;
    amount: number;
    categories: {
        amount: number;
        category: {
            id: string;
            name: string;
            icon: keyof typeof ICON_MAP;
            color: string;
            background: string
        }
    }[]
}
export default function BudgetModal() {
    const { onClose, isOpen, budgetId } = useBudgetModal();
    const { month, year } = getCurrentMonthAndYear();
    const [budget, setBudget] = useState<BudgetForm>({ amount: 0, categories: [] });
    const isEditing = budgetId !== null;
    const {setBudget : zustBudget} = useBudgetStore();
    useEffect(() => {
        if (!isOpen || !isEditing) return;
        async function loadBudget() {
            try {
                const res = await fetch(`/api/budgets/${budgetId}`);
                if (!res.ok) {
                    toast.error('Failed to load budget');
                    return;
                }
                const data = await res.json();
                setBudget({
                    amount: data.amount,
                    categories: data.categories.map((c: any) => ({
                        categoryId: c.category.id,
                        amount: c.amount,
                    }))
                })
            }
            catch (error) {
                toast.error("Failed to load Budget")
            }
        }
        loadBudget();

    }, [isOpen, budgetId])

    useEffect(()=>{
        if(!isOpen || isEditing) return;
        setBudget({
            amount : 0,
            categories : [],
        })
    }, [isOpen, isEditing]);
    
    const handleSubmit = async ()=>{
        try{
            const payload = {
                ...budget,
                month,
                year
            }
            const res = await fetch( isEditing ? `/api/budgets/${budgetId}` : `/api/budgets`, {
                method : isEditing ? "PATCH" : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(payload)
            })
            const data =await res.json();

            if(!res.ok){
                toast.error(data.message ?? "Soemthing went wrong");
                return;
            }
            toast.success(isEditing ? "Budget updated successfully" : "Budget created successfully")
            zustBudget(data)
            onClose();
        }catch(error){
            toast.error("Something went wrong")
        }
    }
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => onClose()}
                    className={` bg-black/20 fixed  flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white relative  lg:w-[800px] sm:w-[400px] w-[320px]   md:w-[600px] flex-col flex justify-center gap-6 items-center  z-50 rounded-3xl p-10" >
                        <X onClick={() => onClose()} className="absolute right-4 text-[#715767] bg-[#F4D2EF] rounded-full p-1 hover:scale-[115%] top-4 cursor-pointer transition-all duration-300" />
                        <h2 className="text-3xl text-[#715767] font-bold capitalize">
                            {isEditing ? "Update Budget" : "Set Your Budget"}
                        </h2>
                        <div className="w-full relative flex justify-center items-center">
                            <DollarSignIcon className="absolute left-12 text-[#715767]/90" size={56} strokeWidth={3} />
                            <input value={budget.amount} onChange={(e)=>setBudget((prev)=>({
                                ...prev, amount : Number(e.target.value)
                            }))} placeholder="0.00" className="border-[#715767] w-full flex justify-center items-center py-1 rounded-full text-center border-4 text-[#715767] text-7xl font-bold" />
                        </div>
                        <button  onClick={handleSubmit} className="font-bold text-4xl gap-4 w-full text-center flex justify-center items-center bg-[#715767] text-white py-4 rounded-full">
                            <span>
                                <CircleCheck size={40} strokeWidth={2.5} />
                            </span>
                            <span>{isEditing ? "Update Budget" : "Set Budget"}</span>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}