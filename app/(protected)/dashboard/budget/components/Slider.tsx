import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BudgetSliderProps {
    value: number;
    max: number;
    color: string;
    onChange: (value: number) => void;
}

export default function BudgetSlider({
    value, max, color, onChange
}: BudgetSliderProps) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [width, setWidth] = useState(0);
    const dragging = useRef(false);
    const lastValue = useRef(value)
    const travel = width

    useEffect(() => {
        const el = sliderRef.current;
        if (!el) return;

        const observer = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [])
    useEffect(() => {
        if (dragging.current) return;
        if(!travel) return;

        animate(x, (value/Math.max(max,1)) * travel, {
            type: "spring",
            stiffness: 300,
            damping: 25
        })
    }, [value,max, travel]);
    const fillWidth = useTransform(x, [0, Math.max(travel, 1)], ["0%", "100%"])
    const updateFromPointer = (clientX : number)=>{
        if(!sliderRef.current) return;  
        if(!travel) return;

        const rect = sliderRef.current.getBoundingClientRect();
        let position = clientX - rect.left;
        position = Math.max(0,Math.min(position, travel));
        x.set(position);
        const raw = (position/travel) * max;
        const snapped = Math.min(max, Math.max(0, Math.round(raw)));
        if(snapped !== lastValue.current){
            lastValue.current = snapped;
            onChange(snapped)
        }
    }
    const handlePointersDown = (e : React.PointerEvent<HTMLDivElement>) =>{
      dragging.current = true;
      updateFromPointer(e.clientX);
      const move = (event : PointerEvent)=>{
        updateFromPointer(event.clientX);
      }
      const up = ()=>{
        dragging.current = false;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      }
              window.addEventListener("pointermove", move)
        window.addEventListener("pointerup", up)
    }
    useEffect(()=>{
        lastValue.current = value;
    }, [value])

    return (
        <div 
        ref={sliderRef}
        onPointerDown={handlePointersDown}
        className="bg-white shadow-sm w-full h-2 rounded-full overflow-visible relative">
            <motion.div 
            className={`h-full rounded-full absolute left-0 top-0`} 
            style={{ backgroundColor: color , width: fillWidth}}/>
            <motion.div
                className="absolute top-1/2 h-5 rounded-full w-5 border-2 border-white shadow-lg cursor-grab active:cursor-grabbing" 
                style={{ backgroundColor: color, x, translateY: "-50%", translateX:'-50%' }} 
                whileTap={{scale : 1.2}}/>
        </div>
    )
}