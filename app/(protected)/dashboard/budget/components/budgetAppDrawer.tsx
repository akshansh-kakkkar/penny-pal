import { getCurrentMonthAndYear } from "@/app/lib/date";
import { ICON_MAP } from "@/app/lib/icon-map";
import { useBudgetStore } from "@/app/store/BudgetStore";
import { useBudgetDrawer } from "@/app/store/UseBudgetDrawer"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
                    categories: data.category.map((c: any) => ({
                        categoryId: c.category.id,
                        amount: c.amount
                    }))
                }
                setBudget(loadedBudget);
                setInitialBudget(loadedBudget)
            } catch {
                throw new Error("Failed to load budget")
            }
            finally {
                setLoading(false)
            }
        }
        loadBudget();
    }, [isOpen, budgetId]);

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
                    "Content-Type": "Application/json",
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
            throw new Error("Failed to update budget");
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
        async function loadCategories() {
            try {
                setLoading(true);
                const res = await fetch('/api/categories');
                const data = await res.json();
                setCategories(data);
            } catch {
                throw new Error("failed to load categories")
            } finally {
                setLoading(false);
            }
        }
        loadCategories();
    }, [])
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
                                onOpen
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white overflow-y-auto fixed bottom-0 p-6 rounded-t-4xl right-0 left-0 pb-12 py-4 flex flex-col z-50 backdrop-blur-2xl">

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}