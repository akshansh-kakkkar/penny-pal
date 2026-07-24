'use client'
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface MonthlyStat {
    month : string;
    year : number;
    amount : number;
}

export function SpendingFlow(){
    const [data, setData] = useState<MonthlyStat[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function loadData(){
            try{
                setLoading(true);
                const res = await fetch('/api/stats/monthly');
                if(!res.ok){
                    throw new Error("Failed to load chart");
                }
                const stats = await res.json();
                setData(stats)

            }catch{
                toast.error("failed to load chart")
            }finally{
                setLoading(false)
            }
        }
        loadData();
    }, []);
    return(
        <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#715767]">Spending Flow</h2>
            </div>
        </div>
    )
}