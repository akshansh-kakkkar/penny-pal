"use client"
import { faL } from "@fortawesome/free-solid-svg-icons";
import { LayoutDashboard } from "lucide-react";
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react";
import {motion} from "framer-motion"
export default function AppDrawer(){
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const pathName = usePathname();
    return(
        <>
        <button onClick={()=>setOpen((prev)=> !prev)} className="md:hidden z-100 flex mx-8 my-4 bg-white w-fit absolute bottom-5  left-4 p-2 rounded-full shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]" >
            <LayoutDashboard size={30} className="text-[#725868]" />
        </button>
        {
            open && (
                <motion.div onClick={()=>setOpen(false)} className=" min-w-screen md:hidden backdrop-blur-2xl">
                d
                </motion.div>
            )
        }
        </>
    )
}