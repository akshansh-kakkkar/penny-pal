"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import GlobalLoader from "./GlobalLoader";

export default function PageTransition({children} : {children : React.ReactNode}){
    const pathName = usePathname();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        const timer = setTimeout(()=>{
            setLoading(false)
        },3000);
        return ()=>clearTimeout(timer)
    },[ pathName])
    if(loading) {
    return <GlobalLoader />
}
    return  <>{children}</>

} 

