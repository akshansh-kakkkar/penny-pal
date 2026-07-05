import { Search } from "lucide-react";

export default function page(){
    return (
        <div className={`mx-40 my-8`}>
            <div className="flex justify-between items-center">
                <div>PennyPal</div>
                    <div className="flex relative  ">
                        <Search className="absolute top-4 left-4 " />
                        <input type="text" placeholder="search..." className="font-medium px-4 rounded-full py-4 items-center flex relative pl-14 text-lg  shadow-[0_4px_8px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)]" />
                    </div>
            </div>
        </div>
    )
}