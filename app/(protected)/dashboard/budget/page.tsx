"use client"
import { useSession } from "@/app/lib/auth/auth-client"
import { ICON_MAP } from "@/app/lib/icon-map";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LandmarkIcon, Lightbulb, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner"
type Budget = {
    id: string;
    amount: number;
    month: number;
    year: number
}
interface Category { 
    id : string;
    name : string;
    background : string;
    color : string;
    icon : keyof typeof  ICON_MAP;
}
export default function page() {
    const [fetchBudgetLoading, setFetchBudgetLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [budget, setBudget] = useState<Budget | null>(null)
    const { data: session } = useSession();
    useEffect(()=>{
        async function fetchCategory() {
            try{
                const res = await fetch('/api/categories');
                if(!res.ok){
                    toast.error("failed to fetch Category")
                }
                const data = await res.json();
                setCategories(data)
            }catch{
                toast.error('Failed to fetch Category')
            }
        }
        fetchCategory();
    }, [])
    const getBudget = async () => {
        try {
            setFetchBudgetLoading(true)
            const res = await fetch(`/api/budgets/`);
            if (!res.ok) {
                toast.error('Failed to fetch the budget')
            }
            const data = await res.json();
            setBudget(data)
        } catch (error) {
            toast.error("Failed to fetch the budget")
        }
        finally {
            setFetchBudgetLoading(false)
        }
    }
    useEffect(() => {
        getBudget()
    }, [])
    return (
        <div className="min-h-screen flex flex-col mx-5 md:mx-10 xl:mx-20 relative py-10 md:py-20">
            <div className="absolute md:flex hidden -top-30 right-0 w-[350px] h-[350px]  sm:w-[400px] sm:h-[400px] bg-[#F4D2E5] rounded-full blur-[55px] z-10" />
            <div className="flex justify-between items-center ">
                <div className="flex flex-col gap-1">
                    <h2 className="text-4xl text-[#715767] font-bold">Set Your Budget</h2>
                    <p className="text-sm text-[#4D4449] font-medium">Let's give every penny a purposeful home!</p>
                </div>
                <div className="z-40 hidden  shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] md:flex gap-3 items-center text-center bg-[#FFFFFF]/45 border-2 border-[#FFFFFF]/60 px-4 py-2 rounded-full">
                    <div className="bg-[#715767] rounded-full items-center text-center justify-center flex  w-12 h-12 font-bold text-lg text-white border-4 border-[#F4D2E5]">
                        {session?.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-[#715767]  font-bold uppercase text-xl">{session?.user.name}</div>
                </div>
            </div>
            <div className="w-full z-40 my-6 flex gap-8">
                <div className="xl:w-[75%] w-full flex gap-12 relative flex-col md:p-20 p-6 bg-white/45 border-2 border-white/60 rounded-3xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] ">
                    <button className="absolute right-4 cursor-pointer hover:scale-[85%] transition-all duration-300 bg-[#715767] text-white p-3 rounded-full top-4">
                        <PencilIcon strokeWidth={2.5} />
                    </button>
                    <LandmarkIcon className="absolute  right-6 text-[#131D21] opacity-10 top-12" size={164} />
                    <h2 className="font-semibold text-xl md:text-3xl text-[#715767] flex md:justify-center md:items-center text-start items-center justify-items-start">Total Monthly Budget</h2>
                    <div className="flex justify-center items-center  rounded-3xl py-8 px-6 relative">
                        <div className="font-bold text-6xl text-[#715767] ">$ {budget?.amount || "__"}</div>
                    </div>
                </div>
                <div className="xl:w-[25%] hidden xl:flex z-40 p-6 itemce  text-center flex-col gap-6 bg-[#9FD2F9] rounded-3xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
                    <h2 className="flex gap-4 text-xl text-[#001E2F] text-center items-center font-bold">
                        <span>
                            <Lightbulb size={24} strokeWidth={2.5} />
                        </span>
                        <span>Smart Suggestion</span>
                    </h2>
                    <div className="text-lg text-[#0C4B6C] flex justify-center items-center font-medium text-center">
                        <div>
                            " Switching your <span>Online Subscriptions</span> to a quaterly plane could help you save money."
                        </div>
                    </div>
                    <div className="flex gap-4 flex-col justify-center items-center">
                        <FontAwesomeIcon icon={faPiggyBank} color="#0C4B6C"
                            className="text-8xl animate-bounce animate-squish" />
                        <div className="text-xl font-bold text-[#0C4B6C] ">`` I am your cute piggy ``</div>
                    </div>
                </div>
            </div>
            <div className=" w-full    xl:w-[73.5%] rounded-3xl bg-white/45 py-8 px-8 shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] ">
                <div className="flex justify-between items-center text-center ">
                    <div className="flex text-xl font-bold text-[#715767]">
                        Category Breakdown
                    </div>
                    <div className="font-bold  text-lg text-[#715767] ">Total Spent</div>
                </div>
                <div className="flex gap-4 py-4 flex-col">
                    {categories.map((category) => {
                        const IconComponent =ICON_MAP[category.icon];
                        return (
                            <div className="bg-white px-4 py-4 rounded-3xl flex flex-col gap-4 border-2" style={{ borderColor: category.color }}>
                                <div className="flex justify-between text-center items-center">
                                    <div className="flex items-center text-center gap-4">
                                        <div style={{ backgroundColor: category.background, borderColor: category.color, }} className={`border-4 w-fit p-2 rounded-full`}><IconComponent color={category.color} size={24} strokeWidth={2.5} /></div>
                                        <div className="sm:text-2xl hidden sm:block text-[#191C1E] font-bold">{category?.name}</div>
                                    </div>
                                    <div className="text-xl  text-[#715767] font-bold">$800</div>
                                </div>
                                <div className="bg-gray-200 w-full h-4 rounded-full" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}