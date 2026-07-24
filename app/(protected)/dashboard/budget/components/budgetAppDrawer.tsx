import { getCurrentMonthAndYear } from "@/app/lib/date";
import { ICON_MAP } from "@/app/lib/icon-map";
import { useBudgetStore } from "@/app/store/BudgetStore";
import { useBudgetDrawer } from "@/app/store/UseBudgetDrawer"
import { AnimatePresence, motion } from "framer-motion"
import { DollarSignIcon, Flower, LoaderPinwheelIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BudgetSlider from "./Slider";
type BudgetForm = {
    amount: number;
    categories: {
        categoryId: string;
        amount: number
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
            bakcground: string;
        }
    }[]
}
interface Category {
    color: string;
    background: string;
    id: string;
    name: string;
    icon: keyof typeof ICON_MAP
}
export default function () {
    const { isOpen, onOpen, onClose, budgetId } = useBudgetDrawer();
    const { month, year } = getCurrentMonthAndYear();
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState<BudgetForm>({ amount: 0, categories: [] });
    const isEditing = budgetId !== null;
    const { budget: zustBudget, setBudget: setBud } = useBudgetStore();
    const [initialBudget, setInitialBudget] = useState<BudgetForm | null>(null);
    const [loadingUpdateSetBudget, setLoadingUpdateSetBudget] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        if (!isOpen || !isEditing) return;
        async function loadBudget() {
            try {
                setLoading(true);
                const res = await fetch(`/api/budgets/${budgetId}`);
                if (!res.ok) {
                    throw new Error("Failed to load budget")
                }
                const data = await res.json();
                const loadedBudget = {
                    amount: data.amount,
                    categories: data.categories.map((c: any) => ({
                        categoryId: c.category.id,
                        amount: c.amount
                    }))
                }
                setBudget(loadedBudget);
                setInitialBudget(loadedBudget)
            } catch {
                toast.error("Failed to load budget")
            }
            finally {
                setLoading(false)
            }
        }
        loadBudget();
    }, [isOpen, budgetId, isEditing]);

    const handleSubmit = async () => {
        try {
            const payload = {
                ...budget,
                month,
                year
            }
            setLoadingUpdateSetBudget(true);
            const res = await fetch(isEditing ? `/api/budgets/${budgetId}` : "/api/budgets", {
                method: isEditing ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })
            if (!res.ok) {
                throw new Error("Failed to update budget")
            }
            const data = await res.json();
            toast.success(isEditing ? "Budget upated successfully" : "Budget created successfully")
            setBud(data);
            onClose();

        } catch {
            toast.error("Failed to update budget");
        } finally {
            setLoadingUpdateSetBudget(false);
        }
    }

    const updateCategoryBudget = (categoryId: string, amount: number) => {
        setBudget((prev) => {
            const exists = prev.categories.find((c) => c.categoryId === categoryId)
            if (exists) {
                return {
                    ...prev,
                    categories: prev.categories.map((c) => c.categoryId === categoryId ? { ...c, amount } : c)
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

    useEffect(() => {
        if (!isOpen || isEditing) return;
        setBudget({
            amount: 0,
            categories: []
        })
    }, [isOpen, isEditing]);
    useEffect(() => {
        if (!isOpen) return;
        async function loadCategories() {
            try {
                setLoading(true);
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch {
                toast.error("failed to load categories")
            } finally {
                setLoading(false);
            }
        }
        loadCategories();
    }, [isOpen, isEditing])
    const allocatedTotal = budget.categories.reduce((sum, c) => sum + c.amount, 0);
    const remaining = budget.amount - allocatedTotal;
    const hasChanges = !initialBudget || JSON.stringify({
        ...budget,
        categories: [...budget.categories].sort((a, b) =>
            a.categoryId.localeCompare(b.categoryId)
        )
    }) !== JSON.stringify({ ...initialBudget, categories: [...initialBudget.categories].sort((a, b) => a.categoryId.localeCompare(b.categoryId)) })

    const isDisabled = remaining < 0 || loadingUpdateSetBudget || (isEditing && !hasChanges)

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="bg-black/20 h-screen min-w-screen inset-0 z-40 fixed backdrop-blur-sm lg:hidden"
                >
                    {loading ? (
                        <div className="flex justify-center items-center h-screen w-full">
                            <LoaderPinwheelIcon size={48} className='  animate-spin text-[#715767]' strokeWidth={2} />
                        </div>
                    ) : (
                        <motion.div
                            transition={{ damping: 25, stiffness: 220, type: "spring" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            initial={{ y: "100%" }}
                            drag="y"
                            dragConstraints={{ top: 0, bottom: 300 }}
                            dragElastic={0.2}
                            onDragEnd={(e, _info) => {
                                if (_info.offset.y > 150) {
                                    onClose();
                                }
                            }}
                            onClick={(e) => e.stopPropagation()}

                            className="bg-white gap-4 overflow-y-auto fixed bottom-0 p-6 rounded-t-4xl right-0 left-0 pb-12 py-4 flex flex-col z-50 backdrop-blur-2xl">
                            <div>
                                <h2 className="text-2xl text-[#715767] font-bold">
                                    {isEditing ? "Update your budget" : "Set your budget"}
                                </h2>
                                <p className="flex gap-2 items-center text-center ">
                                    <span className="text-md font-semibold text-[#4D4449]">Let's grow and save together</span>
                                    <span className="text-[#715767] bg-[#F4D2EF] p-1 rounded-full "><Flower size={18} /></span>
                                </p>
                            </div>
                            <div className="w-full relative bg-[#F4D2EF]/50 rounded-full py-4 px-4  flex justify-center items-center text-center">
                                <DollarSignIcon className="top-7 left-10 absolute text-[#4D4449]/90 " size={24} strokeWidth={3} />
                                <input placeholder="0.00" value={budget.amount} onChange={(e) => setBudget((prev) => ({ ...prev, amount: Number(e.target.value) }))} className="font-bold pl-12 text-center text-2xl outline-none text-[#715767] border-[#715767] w-full h-full border-2 rounded-full py-2 px-4" />
                            </div>
                            <div className={`flex flex-col py-2 px-2 overflow-y-auto gap-8 max-h-[250px] `}>
                                {categories.map((item) => {
                                    const allocated = budget.categories.find((c) => c.categoryId === item.id);
                                    const IconComponent = ICON_MAP[item.icon]
                                    return (
                                        <div key={item.id} className="py-4 relative px-4 rounded-2xl flex justify-between items-center border-2 mx-2 " style={{ backgroundColor: item.background, borderColor: item.color }}>
                                            <div className="flex flex-1 items-center gap-2" >
                                                <div className="flex p-2 rounded-full w-fit" style={{ backgroundColor: item.color, }} >
                                                    <IconComponent  size={24} style={{ color: item.background }} />
                                                </div>
                                                <div className="flex gap-1 flex-1 items-start text-start flex-col" >
                                                    <div className="flex gap-1 font-bold items-start text-start flex-col" style={{ color: item.color }}>{item.name}</div>
                                                    <BudgetSlider value={allocated?.amount ?? 0} max={budget.amount} color={item.color} onChange={(value) => updateCategoryBudget(item.id, value)} />
                                                </div>
                                            </div>

                                            <div className="flex absolute right-4 top-4">
                                                <input min={0} type="number" onChange={(e) => updateCategoryBudget(item.id, Number(e.target.value))} value={allocated?.amount ?? 0} style={{ color: item.color }} className="text-xl outline-none bg-transparent w-12 text-right flex font-bold" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}