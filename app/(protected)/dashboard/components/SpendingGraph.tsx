"use client";

import { scaleLinear, scalePoint } from "@visx/scale";
import { LinearGradient } from "@visx/gradient"
import { AreaClosed, LinePath } from "@visx/shape"
import { curveCatmullRom } from "d3-shape";
import { TooltipWithBounds, useTooltip } from "@visx/tooltip"
import { useState } from "react";
type DailyStat = {
    day: string;
    amount: number;
}
type Props = {
    data: DailyStat[];
    width: number;
    height?: number
}


export default function SpendingGraph({
    data, width, height = 320,
}: Props) {

    if (!data.length) return null;
    const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<DailyStat>();
    const margin = { top: 20, right: 20, bottom: 45, left: 10, };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const max = Math.max(...data.map((d) => d.amount));
    const xScale = scalePoint<string>({
        domain: data.map((d) => d.day),
        range: [0, innerWidth],
        padding: 0.5,
    })
    const yScale = scaleLinear<number>({
        domain: [0, max * 1.15],
        range: [innerHeight, 0],
        nice: true,
    });
    function handleMove(e: React.MouseEvent<SVGRectElement>) {
        const bounds = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        let closes = data[0];
        let minDistance = Infinity;
        for (const point of data) {
            const x = xScale(point.day) ?? 0;
            const distance = Math.abs(mouseX - x);
            if (distance < minDistance) {
                minDistance = distance;
                closes = point;
            }
        }
        showTooltip({
            tooltipData: closes,
            tooltipLeft: xScale(closes.day) ?? 0,
            tooltipTop: yScale(closes.amount)
        })
    }
    return (
        <div>
        <svg
            width={"100%"}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
        >
            <LinearGradient
                id="graph-gradient"
                from="#EEDCE7"
                to="#ffffff"
                fromOpacity={0.9}
                toOpacity={0}
            />
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AreaClosed
                    data={data}
                    x={(d) => xScale(d.day) ?? 0}
                    y={(d) => yScale(d.amount)}
                    curve={curveCatmullRom.alpha(0.5)}
                    yScale={yScale}
                    fill="url(#graph-gradient)"
                />
                <LinePath
                    data={data}
                    x={(d) => xScale(d.day) ?? 0}
                    y={(d) => yScale(d.amount)}
                    curve={curveCatmullRom.alpha(0.5)}
                    stroke="#715767"
                    strokeLinecap="round"
                    strokeWidth={5}
                />
                <rect
                    width={innerWidth}
                    height={innerHeight}
                    fill="transparent"
                    onMouseMove={handleMove}
                    onMouseLeave={hideTooltip}
                />
                {tooltipOpen && tooltipData && (
                        <circle
                            cx={xScale(tooltipData.day)}
                            cy={yScale(tooltipData.amount)}
                            r={6}
                            fill="white"
                            stroke="#715767"
                            strokeWidth={4}
                        />
                )}
                {data.map((d) => (
                    <text
                        key={d.day + '-label'}
                        x={xScale(d.day)}
                        y={innerHeight + 28}
                        textAnchor="middle"
                        className="fill-zinc-500"
                        fontSize={13}
                    >
                        {d.day}
                    </text>
                ))}
            </g>
        </svg>
        {tooltipOpen && tooltipData && (
            <TooltipWithBounds
            left={tooltipLeft} top={tooltipTop} className="rounded-xl border bg-white px-3 py-2 shadow-lg">
                <p className="font-semibold text-[#4D4449]">
                    <span>Amount: </span>
                    $ {tooltipData.amount}
                </p>
                <p className="text-sm font-semibold text-[#4D4449]">
                    <span>Day: </span>
                    {tooltipData.day}
                </p>
            </TooltipWithBounds>
        )}
        </ div>
    )
}