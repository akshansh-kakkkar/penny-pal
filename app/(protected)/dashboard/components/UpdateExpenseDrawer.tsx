"use client"
import { CATEGORIES } from "@/app/lib/Categories";
import { updateExpenseDrawer } from "@/app/store/UseUpdateExpenseDrawer"
import { AnimatePresence, motion } from "framer-motion"
import { DollarSignIcon, Heart } from "lucide-react";
import { useEffect, useState } from "react";
export default function UpdateExpenseDrawer() {
    const { isOpen, close } = updateExpenseDrawer();
    const [category, setCategory] = useState("");
    const categories = CATEGORIES
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    onClick={close}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="min-h-screen z-40 backdrop-blur-sm bg-black/20 inset-0 fixed back md:hidden flex">
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        drag="y"
                        dragElastic={{ top: 0.2, bottom: 0 }}
                        dragConstraints={{ top: -300, bottom: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y < -150) {
                                close()
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white gap-4 sm:px-12 fixed top-0 overflow-y-auto p-6 rounded-b-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl">
                        <div className="flex flex-col gap-2 justify-center items-center text-center">
                            <h2 className="font-bold text-xl text-[#715767]">Want a change in the Treat?</h2>
                            <p className="justify-start text-sm  font-semibold text-[#4D4449]">Every penny tells a story, Bestie, Lets log this one.</p>
                            <div className="relative">
                                <DollarSignIcon className="absolute  top-1/6 left-6 bg-white  text-[#715767]" strokeWidth={2} size={32} />
                                <input type='number' placeholder="0.00" className="flex w-full justify-center text-center px-6 items-center text-2xl py-2 rounded-3xl outline-none border-4 text-[#715767] font-bold border-[#F4D2E5]" />
                            </div>
                            <div className="flex w-full justify-start flex-col gap-2">
                                <h2 className="text-sm text-start w-full text-[#4D4449] font-bold">Where did it go?</h2>
                                <div className="flex overflow-auto min-w-65 max-w-180 p-2 gap-2">
                                    {categories.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <div onClick={() => setCategory(item.id)} className={`flex tranition-all font-bold cursor-pointer select-none duration-300 border-4 gap-2 p-2 rounded-xl w-35 h-10 flex-shrink-0  items-center justify-center ${category === item.id ? "bg-[#715767] text-white border-[#F4D2EF]" : "bg-[#ffffff]/50 border-[#F4D2EF]  text-[#715767]"}`} key={item.id}>
                                                <IconComponent />
                                                <div>{item.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <h2 className="text-sm text-start w-full text-[#4D4449] font-bold">Details? darling.</h2>
                                <input type="text" placeholder="Pink latte with oat milk..." className="py-2 rounded-full border-2 px-4 border-[#F4D2EF] font-bold text-[#715767] outline-[#715767]" />
                                <button className="cursor-pointer mt-2 hover:scale-[98%] transition-all duration-300 flex justify-center items-center w-full bg-[#715767] rounded-full py-4 text-lg md:text-2xl font-bold text-white gap-2 ">
                                    <div className="flex gap-3 items-center text-center justify-center">
                                        <span><Heart strokeWidth={3} /></span>
                                        <span>Save Expense</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}