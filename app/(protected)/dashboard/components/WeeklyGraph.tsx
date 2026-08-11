"use client"

import { ParentSize } from "@visx/responsive";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import WeeklySpendingGraph from "./WeeklySpendingGraph";
interface WeeklyStats {
    week: string
    amount: number
}
export default function WeeklyGraph() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<WeeklyStats[]>([]);
    const fetchWeekly = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/stats/weekly');
            if (!res.ok) {
                toast.error('Failed to fetch stats.')
            }
            const data = await res.json()
            setData(data);
        } catch {
            return toast.error("Failed to fetch stats.")
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchWeekly()
    }, [])
    return (
        <div className="rounded-3xl h-[500px] md:h-[550px] border-2 border-white/60 bg-white/45 p-6 shadow-[0px_20px_40px_rgba(113,87,103,0.1)]">
            <div className="mb-8 mt-6 ml-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#715767]">Weekly Spending</h2>
                    <p className="text-sm text-[#4D4449]">
                        Breakdown of all your weekly expenses
                    </p>
                </div>
            </div>
            <div className="h-[320px] w-full">
                <ParentSize>
                    {({width,height})=>(
                        <WeeklySpendingGraph
                        width={width}
                        height={height}
                        weeklyStat={data}
                        />
                    )}
                </ParentSize>
            </div>
        </div>
    )
}