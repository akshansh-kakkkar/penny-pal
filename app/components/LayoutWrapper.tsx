"use client"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({children} : {children : React.ReactNode}){
    const pathName = usePathname();
    const isAuthPage = pathName.startsWith('/auth')
    const isDashboard = pathName.startsWith('/dashboard')
    return(
        <div className="flex flex-1 flex-col">
            {!isAuthPage || !isDashboard && <Navbar />}
            {children}
            {!isAuthPage || !isDashboard &&  <Footer />}
        </div>
    )
}