import SideBar from "./components/SideBar";

export default function({children} : {children : React.ReactNode}){
    return (
        <div className="flex bg-[#FAF9F6] min-h-screen flex-1">
            <SideBar />
            <main className="w-full">{children}</main>
        </div>
    )
}