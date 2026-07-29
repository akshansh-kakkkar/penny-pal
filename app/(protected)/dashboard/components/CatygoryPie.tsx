"use client"

import { ParentSize } from "@visx/responsive";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CategoryPieGraph from "./CategoryPieGraph";

type CategoryStat = {
    id: string;
    background: string;
    color: string;
    name: string;
    amount: number;
    icon: string;
}
export default function CategoryPie() {
    const [data, setdata] = useState<CategoryStat[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCategoryStats = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/stats/categories');
                if (!res.ok) {
                    throw new Error("Failed to fetch category stats");
                }
                const result = await res.json();
                setdata(result)
            } catch (err) {
                toast.error("Failed to fetch category stats");

            } finally {
                setLoading(false)
            }
        }
        fetchCategoryStats();
    }, [])
    return (
        <div className="rounded-3xl border-2 border-white/60 bg-white/45 p-6 shadow-[0px_20px_40px_rgba(113,87,103,0.1)]">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-[#715767]">Category Spending</h2>
                    <p className="text-sm text-[#4D4449]">
                        Breakdown of all your expenses
                    </p>
                </div>
            </div>
            <div className="h-[420px] w-full">
                <ParentSize>
                    {({ width, height }) => (
                        <CategoryPieGraph
                            width={width}
                            height={height}
                            data={data}
                        />
                    )}
                </ParentSize>
            </div>
        </div>
    )
}