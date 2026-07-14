"use client"
import { useSession } from "@/app/lib/auth/auth-client"
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DollarSignIcon, LandmarkIcon, Lightbulb } from "lucide-react";

export default function page() {
    const { data: session } = useSession();
    return (
        <div className="min-h-screen mx-5 md:mx-10 xl:mx-40 relative py-10 md:py-20">
            <div className="absolute -top-30 -right-50 w-[350px] h-[350px]  sm:w-[400px] sm:h-[400px] bg-[#F4D2E5] rounded-full blur-[55px] z-10" />
            <div className="flex justify-between items-center ">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl text-[#715767] font-bold">Set Your Budget</h2>
                    <p className="text-sm text-[#4D4449] font-medium">Let's give every penny a purposeful home!</p>
                </div>
                <div className="z-40 shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] flex gap-3 items-center text-center bg-[#FFFFFF]/45 border-2 border-[#FFFFFF]/60 px-4 py-2 rounded-full">
                    <div className="bg-[#715767] rounded-full items-center text-center justify-center flex  w-12 h-12 font-bold text-lg text-white border-4 border-[#F4D2E5]">
                        {session?.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-[#715767]  font-bold uppercase text-xl">{session?.user.name}</div>
                </div>
            </div>
            <div className="w-full z-40 my-6 flex gap-8">
                <div className="w-[75%] flex gap-12 relative flex-col p-20 bg-white/45 border-2 border-white/60 rounded-3xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] ">
                    <LandmarkIcon className="absolute  right-6 text-[#131D21] opacity-10 top-12" size={164} />
                    <h2 className="font-semibold text-3xl text-[#715767] flex justify-center items-center">Total Monthly Budget</h2>
                    <div className="bg-white flex justify-center items-center  rounded-3xl py-8 px-6 shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] relative">
                        <div className="absolute left-12 text-[#715767] opacity-50 ">
                            <DollarSignIcon size={56} strokeWidth={2.5} />
                        </div>
                        <div className="font-bold text-6xl text-[#715767] ">3500</div>
                    </div>
                </div>
                <div className="w-[25%] z-40 p-6 itemce  text-center flex-col flex gap-6 bg-[#9FD2F9] rounded-3xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
                    <h2 className="flex gap-4 text-xl text-[#001E2F] text-center items-center font-bold">
                        <span>
                            <Lightbulb size={24} strokeWidth={2.5} />
                        </span>
                        <span>Smart Suggestion</span>
                    </h2>
                    <div className="text-lg text-[#0C4B6C] flex justify-center items-center font-medium text-center">
                        <div>
                            " Switching your <span>Online Subscriptions</span> to a quaterly plane could help you save money."
                        </div>
                    </div>
                    <div className="flex gap-4 flex-col justify-center items-center">
                        <FontAwesomeIcon icon={faPiggyBank} color="#0C4B6C"
                            className="text-8xl animate-bounce animate-squish" />
                            <div className="text-xl font-bold text-[#0C4B6C] ">`` I am your cute piggy ``</div>
                    </div>
                </div>
            </div>
        </div>
    )
}