"use client"
import { CircleEllipsis, ListFilter, PencilIcon, Search, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/app/lib/Categories";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
export default function page() {
    const [expenses, setExpenses] = useState<any[]>([]);
    useEffect(() => {

        const fetchExpenses = async () => {
            const res = await fetch('/api/expenses', {
                method: "GET"
            })
            if (!res.ok) {
                throw new Error("Failed to fetch expenses")
            }
            const data = await res.json()
            setExpenses(data.expenses);

        }
        fetchExpenses();
    }, [])
    const categoryMap = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

    return (
        <div className={`min-h-screen mx-5 md:mx-10 xl:mx-40 py-10 md:py-20`}>
            <div className="flex  sm:flex-row flex-col gap-4 justify-center sm:justify-between items-center">
                <div className="text-3xl font-bold text-[#715767]">PennyPal</div>
                <div className="flex relative  ">
                    <Search className="absolute top-[18px] left-4 text-[#715767]" strokeWidth={4} />
                    <input type="text" placeholder="search..." className="font-bold outline-[#715767] px-4 rounded-full py-4 text-xl text-[#715767] items-center flex relative pl-14 text-lg  shadow-[0_4px_8px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)]" />
                </div>
            </div>
            <div className="flex justify-between py-4 items-center text-center">
                <div className="flex flex-col gap-2 text-start">
                    <span className={`text-2xl md:text-4xl font-bold text-[#1A1C1A]`} >My Expenses</span>
                    <span className="text-sm md:text-md  text-[#4D4449] font-medium">Keep track of all those loverly treats!</span>
                </div>
                <div className="flex gap-4 items-center font-bold text-sm md:text-xl text-center justify-center text-[#4C6A65] bg-[#C8E9E2] rounded-full py-2 md:py-4 px-4 md:px-8">
                    <span><ListFilter /></span>
                    <span className="md:block hidden">Filter Treats</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center text-center justify-start w-full h-full ">
                {expenses.map((expense: any) => {
                    const category = categoryMap[expense.category];
                    return (
                        <div key={expense.id} className="flex w-full px-6 py-6 rounded-full justify-between text-center items-center bg-white shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] gap-4">
                            <div className="flex flex-1 min-w-0 gap-5 items-center text-center">
                                <div>
                                    {category && (
                                        <div style={{ backgroundColor: category.background }} className="p-4 w-fit shrink-0 rounded-full " >
                                            <category.icon color={category.color} size={24} strokeWidth={2} />
                                        </div>
                                    )}
                                </ div>
                                <p className="truncate text-lg  md:text-2xl font-bold text-[#1A1C1A]">
                                    {expense.description}
                                </p>
                            </div>
                            <div className="md:flex hidden gap-6 items-center text-center">
                               <DropdownMenu>
                                <button>
                                    <DropdownMenuTrigger className={"hover:bg-[#f4d2e5] text-[#715767] p-1 cursor-pointer rounded-full "} >
                                        <CircleEllipsis />
                                    </DropdownMenuTrigger>
                                </button>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className={`flex focus:bg-[#f4d2e5] cursor-pointer focus:text-[#715767] font-bold text-[#715767] items-center text-md text-center gap-4`}>
                                        <span><PencilIcon size={24} strokeWidth={3} /></span>
                                        <span>edit</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className={`flex focus:bg-[#f4d2e5] cursor-pointer focus:text-[#715767] text-[#715767] font-bold items-center text-md text-center gap-4`}>
                                        <span><Trash2Icon  size={24} strokeWidth={3} /></span>
                                        <span>delete </span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}