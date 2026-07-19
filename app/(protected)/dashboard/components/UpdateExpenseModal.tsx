"use client"
import { updateExpense } from "@/app/store/UseUpdateExpense";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useExpenseStore } from "@/app/store/UseExpenseStore"
import { toast } from "sonner";
import { DollarSignIcon, Heart, Loader2, LoaderPinwheelIcon } from "lucide-react";
import { ICON_MAP } from "@/app/lib/icon-map";
interface Category {
    id : string;
    name : string;
    icon : keyof typeof ICON_MAP
    color : string;
    background : string;
}
interface Expense {
    id : string;
    amount : number;
    description : string;
    date : string;
    title : string;
    category : {
        id : string;
        name : string;
        icon : keyof typeof ICON_MAP;
        color : string;
        background : string;
    }
}
export default function UpdateExpenseModal() {
    const { close, isOpen, expenseId } = updateExpense();
    const [expense, setExpense] = useState<Expense | null>(null);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState('');
    const [originalExpense, setOriginalExpense] = useState<Expense | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    useEffect(()=>{
           async function loadCategories(){
            try{
                const res = await fetch('/api/categories/');
                if(!res.ok){
                    throw new Error("Failed to load categories");
                }
                const data = await res.json();
                setCategories(data)
            }catch{
                throw new Error("Failed to load categories")
            }
           }
           loadCategories();
    },[])
    const fetchExpense = async (id: string) => {
        try {
            setFetchLoading(true);
            const res = await fetch(`/api/expenses/${id}`, { method: "GET" });
            if (!res.ok) {
                toast.error("Failed to fetch the expense data")
                return
            }
            const data = await res.json();
            setExpense(data);
            setOriginalExpense(data)
            setCategory(data.category.id);
            toast.success("Treat Updated Successfully.")

        } catch (error) {
            toast.error("failed to fetch the expense data")
        }
        finally {
            setFetchLoading(false)
        }
    }
    const { updatedExpense } = useExpenseStore();

    const updateExpenseData = async (id: string) => {
        if (!expenseId || !expense) return null;
        try {
            setUpdateLoading(true);
            const res = await fetch(`/api/expenses/${id}`, {
                method: "PATCH", headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: expense.amount,
                    categoryId: category,
                    description: expense.description,
                })

            })
            if (!res.ok) {
                toast.error("Failed to update  expense")
            }
            const data = await res.json();
            setExpense(data);
            updatedExpense(data)
            close();

        } catch (error) {
            toast.error("Failed to update the expense data please try again.")
        }
        finally {
            setUpdateLoading(false);
        }
    }

    useEffect(() => {
        if (!isOpen || !expenseId) return;
        fetchExpense(expenseId);
    }, [isOpen, expenseId])
    const isChanged = expense && originalExpense && (
        expense.amount !== originalExpense.amount || category !== originalExpense.category.id ||
        expense.description !== originalExpense.description
    )
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
                    {fetchLoading ? (
                        <LoaderPinwheelIcon size={48} className='animate-spin text-[#715767]' strokeWidth={2} />

                    ) : (
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white relative lg:w-[800px] sm:w-[400px] w-[320px]   md:w-[600px] flex-col flex justify-center gap-4 items-center  rounded-3xl p-10"
                        >
                            <div className="flex flex-col gap-2">
                                <div className="text-2xl  text-[#715767] font-bold">
                                    Want a change in the Treat?
                                </div>
                                <div className="text-sm ">
                                    Every penny tells a story, Bestie. Let's log this one!
                                </div>
                            </div>
                            <div className="relative">
                                <DollarSignIcon className="absolute  top-1/5 left-6 bg-white  text-[#715767]" strokeWidth={2} size={48} />
                                <input type="number" value={expense?.amount} onChange={(e) => setExpense((prev) => prev ? { ...prev, amount: Number(e.target.value) } : prev)} className="flex w-full justify-center text-center px-6 items-center text-4xl py-4 rounded-4xl outline-none border-4 text-[#715767] font-bold border-[#F4D2E5]" placeholder="0.00" />
                            </div>
                            <div className="flex w-full justify-start font-bold text-[#715767]">
                                Where did it go?
                            </div>
                            <div className=" overflow-x-auto w-full ">
                                <div className="min-w-max flex gap-8 mb-2">
                                    {categories.map((item) => {
                                        const IconComponent = ICON_MAP[item.icon];
                                        return (
                                            <div onClick={() =>setCategory(item.id)} className={`flex tranition-all font-bold cursor-pointer select-none duration-300 border-4 gap-2 p-2 rounded-3xl w-35 h-25 flex-shrink-0 flex-col items-center justify-center ${category === item.id ? "bg-[#715767] text-white border-[#F4D2EF]" : "bg-[#ffffff]/50 border-[#F4D2EF]  text-[#715767]"}`} key={item.id}>
                                             {IconComponent && (
                                                <span>
                                                    <IconComponent className="transition-all duration-300" size={category === item.id ? 48 : 32} />
                                                </span>
                                                )}
                                                <span>{item.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="flex gap-4 w-full justify-center items-center ">
                                <div className="flex gap-2 w-full flex-col">
                                    <div className="text-sm font-bold ml-4 text-[#4D4449]" >Details? darling.</div>
                                    <input onChange={(e) => setExpense((prev) => prev ? {
                                        ...prev,
                                        description: e.target.value
                                    } : prev)} value={expense?.description} type="text" placeholder="Pink latte with oat milk..." className="py-2 font-bold rounded-full border-2 px-4 border-[#F4D2EF] text-[#715767] outline-[#715767]" />
                                </div>
                            </div>
                            <button disabled={updateLoading || !isChanged } onClick={() => {
                                if (expenseId) {
                                    updateExpenseData(expenseId)
                                }
                            }} className="cursor-pointer hover:scale-[98%]  disabled:cursor-not-allowed disabled:bg-gray-400 transition-all duration-300 flex justify-center items-center w-full bg-[#715767] rounded-full py-4 text-lg md:text-2xl font-bold text-white gap-2 ">
                                {updateLoading ? (
                                    <Loader2 className="animate-spin" size={32} strokeWidth={2} />
                                ) : (


                                    <div className="flex gap-3 items-center text-center justify-center">
                                        <span><Heart strokeWidth={3} /></span>
                                        <span>Update Expense</span>
                                    </div>
                                )}
                            </button>
                        </motion.div>
                    )}
                </ motion.div>
            }
        </AnimatePresence>
    )
}