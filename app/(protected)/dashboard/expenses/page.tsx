"use client"
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { title } from 'process';
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

    return (
        <div className={`min-h-screen mx-5 md:mx-10 xl:mx-40 py-10 md:py-20`}>
            <div className="flex  sm:flex-row flex-col gap-4 justify-center sm:justify-between items-center">
                <div className="text-4xl font-bold text-[#715767]">PennyPal</div>
                <div className="flex relative  ">
                    <Search className="absolute top-[18px] left-4 text-[#715767]" strokeWidth={4} />
                    <input type="text" placeholder="search..." className="font-bold outline-[#715767] px-4 rounded-full py-4 text-xl text-[#715767] items-center flex relative pl-14 text-lg  shadow-[0_4px_8px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)]" />
                </div>
            </div>
            {expenses.map((data: any) => (
                <div key={data.id}>
                    {data.description}
                    {data.category}
                </div>
            ))}
        </div>
    )
}