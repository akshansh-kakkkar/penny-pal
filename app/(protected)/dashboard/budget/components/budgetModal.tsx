import { AnimatePresence, motion } from "framer-motion"
import { useBudgetModal } from "@/app/store/UseBudgetModal";
import { CircleCheck, DollarSignIcon, Flower, LoaderPinwheelIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ICON_MAP } from "@/app/lib/icon-map";
import { getCurrentMonthAndYear } from "@/app/lib/date"
import { useBudgetStore } from "@/app/store/BudgetStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import BudgetSlider from "./Slider";
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
interface Category {
    color: string;
    background: string;
    id: string;
    icon: keyof typeof ICON_MAP;
    name: string

}
export default function BudgetModal() {
    const { onClose, isOpen, budgetId } = useBudgetModal();
    const { month, year } = getCurrentMonthAndYear();
    const [budget, setBudget] = useState<BudgetForm>({ amount: 0, categories: [] });
    const isEditing = budgetId !== null;
    const { setBudget: zustBudget } = useBudgetStore();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !isEditing) return;
        async function loadBudget() {
            try {
                setLoading(true);
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
            } finally {
                setLoading(false)
            }
        }
        loadBudget();

    }, [isOpen, budgetId])

    useEffect(() => {
        if (!isOpen || isEditing) return;
        setBudget({
            amount: 0,
            categories: [],
        })
    }, [isOpen, isEditing]);

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const payload = {
                ...budget,
                month,
                year
            }
            const res = await fetch(isEditing ? `/api/budgets/${budgetId}` : `/api/budgets`, {
                method: isEditing ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message ?? "Soemthing went wrong");
                return;
            }
            toast.success(isEditing ? "Budget updated successfully" : "Budget created successfully")
            zustBudget(data)
            onClose();
        } catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        async function loadCategories() {
            try {
                setLoading(true)
                const res = await fetch('/api/categories')
                const data = await res.json();
                setCategories(data);
            }
            catch {
                toast.error("Failed to fetch categories")
            } finally {
                setLoading(false)
            }
        }
        loadCategories();
    }, [])

    const updateCategoryBudget = (categoryId: string, amount: number) => {
        setBudget((prev) => {
            const exists = prev.categories.find((c) => c.categoryId === categoryId)
            if (exists) {
                return {
                    ...prev, categories: prev.categories.map((c) => c.categoryId === categoryId ? { ...c, amount } : c)
                }
            }
            return {
                ...prev,
                categories: [
                    ...prev.categories,
                    {
                        categoryId,
                        amount
                    }
                ]
            }
        })
    }
    const allocatedTotal = budget.categories.reduce((sum, c) => sum + c.amount, 0);
    const remaining = budget.amount - allocatedTotal;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => onClose()}
                    className={` bg-black/20 fixed  flex inset-0 z-40 backdrop-blur-sm justify-center items-center  `}>
                    {loading ? (
                        <LoaderPinwheelIcon size={48} className='animate-spin text-[#715767]' strokeWidth={2} />
                    ) : (
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white relative  lg:w-[800px] sm:w-[400px] w-[320px]   md:w-[600px] flex-col flex gap-4   z-50 rounded-3xl p-6" >
                            <X onClick={() => onClose()} className="absolute right-4 text-[#715767] bg-[#F4D2EF] rounded-full p-1 hover:scale-[115%] top-4 cursor-pointer transition-all duration-300" />
                            <div className="flex flex-col">
                                <h2 className="text-xl text-[#715767] font-bold capitalize">
                                    {isEditing ? "Update Your Budget" : "Set Your Budget"}
                                </h2>
                                <p className="flex items-center  gap-2">
                                    <span className="text-md text-[#4D4449] font-semibold">Let's grow your savings together!</span>
                                    <span className="bg-[#F4D2EF] text-[#715767] p-1 rounded-full" ><Flower /></span>
                                </p>
                            </div>
                            <div className="w-full bg-[#F4D2EF]/50 rounded-full p-2 relative flex justify-center items-center">
                                <DollarSignIcon className="absolute left-12 text-[#4D4449]/90" size={32} strokeWidth={3} />
                                <input value={budget.amount} onChange={(e) => setBudget((prev) => ({
                                    ...prev, amount: Number(e.target.value)
                                }))} placeholder="0.00" className="border-[#715767] w-full flex   py-4 rounded-full text-start px-30 border-4 outline-none text-[#715767] text-2xl font-bold" />
                                <FontAwesomeIcon icon={faPiggyBank} className="absolute right-12 text-[#4D4449]/90 text-2xl animate-bounce animate-squish" />

                            </div>
                            <h4 className="text-md mx-4 text-[#4D4449] font-medium">Category Breakdown</h4>

                            <div className="flex flex-col gap-8 overflow-y-auto max-h-[300px] mx-2">
                                {categories.map((item) => {
                                    const allocated = budget.categories.find((c) => c.categoryId === item.id)
                                    const IconComponent = ICON_MAP[item.icon]
                                    const percentage = budget.amount === 0 ? 0 : (allocated?.amount ?? 0) / budget.amount * 100;
                                    return (
                                        <div key={item.id} className="py-4 px-4 rounded-2xl flex justify-between items-center border-2 mx-2 " style={{ backgroundColor: item.background, borderColor: item.color }} >
                                            <div className="flex flex-1 items-center gap-2 ">
                                                <div className="flex p-2 rounded-full w-fit" style={{ backgroundColor: item.color, }}>
                                                    <IconComponent size={24} style={{ color: item.background }} />
                                                </div>
                                                <div className="flex gap-1 flex-1 items-start text-start flex-col">
                                                    <div className="text-lg font-bold" style={{ color: item.color }}>{item.name}</div>
                                                    <BudgetSlider value={allocated?.amount ?? 0} max={budget.amount} color={item.color} onChange={(value)=>updateCategoryBudget(item.id, value)}/>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <input min={0} onChange={(e) => updateCategoryBudget(item.id, Number(e.target.value))} value={allocated?.amount ?? 0} style={{ color: item.color }} className="text-xl outline-none bg-transparent w-12 text-right flex font-bold" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={`rounded-2xl border-2 transition-all ${remaining < 0 ? "bg-red-50 animate-shake border-red-500" : "border-[#F4D2EF] bg-[#F4D2EF]/30"} p-4`}>
                                <div className="flex justify-between text-[#4D4449]">
                                    <span className="font-bold">Budget</span>
                                    <span className="font-bold">$ {budget.amount}</span>
                                </div>
                                <div className="mt-2 flex justify-between text-[#4D4449]">
                                    <span className="font-bold">Allocated</span>
                                    <span className="font-bold">${allocatedTotal}</span>
                                </div>
                                <div className="flex mt-2 justify-between">
                                    <span className="text-[#4D4449] font-bold">Remaining</span>
                                    <span
                                    className={`font-bold ${remaining < 0 ? "text-red-500 " : "text-green-500"}`}
                                    >${remaining}</span>
                                </div>
                            </div>
                            {
                                remaining < 0 && (
                                    <p className="text-red-500 text-sm  flex justify-center items-center font-bold text-center">You've allocated more than your total budget.</p>
                                )
                            }
                            <button disabled={remaining < 0 }  onClick={handleSubmit} className={`font-bold transition-all duration-300 text-4xl gap-4 w-full text-center flex justify-center items-center py-4 rounded-full ${remaining < 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" :"bg-[#F4D2EF] text-[#715767] cursor-pointer hover:scale-[102%] "}`}>
                                <span>
                                    <CircleCheck size={40} strokeWidth={2.5} />
                                </span>
                                <span>{isEditing ? "Update Budget" : "Set Budget"}</span>
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
} 