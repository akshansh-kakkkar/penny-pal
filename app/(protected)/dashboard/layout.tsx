import SideBar from "./components/SideBar";

export default function({children} : {children : React.ReactNode}){
    return (
        <div className="flex bg-gradient-to-b from-[#F4D2E5]/40 to-[#F4D2E5]/20 min-h-screen flex-1">
            <SideBar />
            <main className="w-full">{children}</main>
        </div>
    )
}