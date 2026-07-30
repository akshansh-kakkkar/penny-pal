'use client'
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SpendingGraph from "./SpendingGraph";
import { ParentSize } from "@visx/responsive"
import { Loader2 } from "lucide-react";
interface DailyStat {
    day: string;
    amount: number;
}

export function SpendingFlow() {
    const [data, setData] = useState<DailyStat[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const res = await fetch('/api/stats/daily');
                if (!res.ok) {
                    throw new Error("Failed to load chart");
                }
                const stats = await res.json();
                console.log("API Response", stats)
                setData(stats)

            } catch {
                toast.error("failed to load chart")
            } finally {
                setLoading(false)
            }
        }
        loadData();
    }, []);
    return (
        <div className="rounded-3xl h-[450px] bg-white p-12 shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
            {loading ? (
                <div className="flex justify-center items-center text-center w-full h-full">
                    <Loader2 className="text-[#715767] animate-spin" size={64} strokeWidth={2} />
                </div>
            ) : (
                <>

                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#715767]">Spending Flow</h2>
                    </div>
                    <div className="h-[320px] w-full">
                        <ParentSize>
                            {({ width }) => (
                                <SpendingGraph width={width} height={320} data={data} />
                            )}
                        </ParentSize>
                    </div>
                </>
            )}
        </div>
    )
}