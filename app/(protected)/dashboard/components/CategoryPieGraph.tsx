
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { TooltipWithBounds, useTooltip } from "@visx/tooltip";
import { animated, useSpring } from "@react-spring/web";
type CategoryStat = {
    id: string;
    name: string;
    amount: number;
    icon: string;
    color: string;
    background: string;
}
type props = {
    width: number;
    height: number;
    data: CategoryStat[];
}

export default function ({ width, height, data, }: props) {
    const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<CategoryStat>();
    if (width < 10 || height < 10) return null;
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    const radius = Math.min(width, height) / 2.4;
    const innerRadius = radius * 0.65;
    const AnimatedPath = animated("path");
    return (
        <div>
            <svg width={width} height={height}>
                <Group top={height / 2} left={width / 2}>
                    <Pie<CategoryStat>
                        data={data.filter((d) => d.amount > 0)}
                        pieValue={(d) => d.amount}
                        outerRadius={radius}
                        innerRadius={innerRadius}
                        padAngle={0.02}>
                        {
                            (pie) => pie.arcs.map((arc) => {
                                const [centroidX, centroidY] = pie.path.centroid(arc);
                                const isHovered = tooltipData?.id === arc.data.id;
                                return (
                                    <g key={arc.data.id} onMouseMove={(event) => {
                                        const rect = (event.currentTarget.ownerSVGElement ?? event.currentTarget).getBoundingClientRect();
                                        showTooltip({
                                            tooltipData: arc.data,
                                            tooltipLeft: event.clientX - rect.left,
                                            tooltipTop: event.clientY - rect.top,
                                        })
                                    }}
                                        onMouseLeave={hideTooltip}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <AnimatedPath
                                            d={pie.path(arc) ?? ""}
                                            fill={arc.data.color}
                                            stroke="white"
                                            strokeWidth={2}
                                        />
                                    </g>
                                )
                            })
                        }                    </Pie>

                </Group>
            </svg>
        </div>
    )
}