"use client";

import { scaleLinear, scalePoint } from "@visx/scale";
import { LinearGradient } from "@visx/gradient"
import { AreaClosed, LinePath } from "@visx/shape"
import { curveCatmullRom } from "d3-shape";
type DailyStat = {
    day: string;
   amount: number;
}
type Props = {
    data: DailyStat[];
    width?: number;
    height?: number
}


export default function SpendingGraph({
    data, width = 900, height = 320,
}: Props) {
    if (!data.length) return null;
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
    console.log(data);
    return (
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
                y={(d)=> yScale(d.amount)}
                curve={curveCatmullRom.alpha(0.5)}
                stroke="#715767"
                strokeLinecap="round"
                strokeWidth={5}
                />
                
                {data.map((d) => (
                    <circle
                        key={d.day}
                        cx={xScale(d.day)?? 0}
                        cy={yScale(d.amount)}
                        r={5}
                        fill="white"
                        stroke="#6E5867"
                        strokeWidth={3}
                    />
                ))}
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
    )
}