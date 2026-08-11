"use client"

import { scaleBand, scaleLinear } from "@visx/scale";
import { useTooltip } from "@visx/tooltip";

type WeeklyStat = {
    week: string;
    amount: number;
}
type Props = {
    width: number;
    height: number;
    weeklyStat: WeeklyStat[];
}
export default function WeeklySpendingGraph({ width, height, weeklyStat }: Props) {
    const margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 50,
    }
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const xScale = scaleBand({
        domain: weeklyStat.map((d) => d.week),
        range: [0, xMax],
        padding: 0.35,
    });
    const yScale = scaleLinear({
        domain: [0, Math.max(...weeklyStat.map((d) => d.amount), 0)],
        range: [yMax, 0],
        nice: true,
    })
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip<WeeklyStat>();

    return (
        <svg width={width} height={height}>

            {weeklyStat.map((d) => {

                const x = xScale(d.week)!;
                const y = yScale(d.amount);
                const barHeight = yMax - y;
                return (
                    <g>
                        <rect
                            key={d.week}
                            x={x}
                            y={y}
                            height={barHeight}
                            width={xScale.bandwidth()}
                            rx={8}
                            fill="#715767"
                            onMouseMove={(e) => {
                                const bounds = e.currentTarget.getBoundingClientRect();
                                showTooltip({
                                    tooltipData: d,
                                    tooltipLeft: e.clientX - bounds.left,
                                    tooltipTop: e.clientY - bounds.top,
                                })
                            }}
                            onMouseLeave={hideTooltip}
                        />
                        <text x={x + xScale.bandwidth()/2} y={yMax + 25} textAnchor="middle" fontSize={12} fill="#715767">{d.week}</text>
                    </g>

                )


            })}
        </svg>
    )
}