"use client"
import { AnimatePresence, motion } from "framer-motion";
import { DollarSignIcon, Heart, Icon, Plus } from "lucide-react";
import { useState } from "react";
import { CATEGORIES } from '../../../lib/Categories';
export default function () {
    const [isOpen, setIsOpen] = useState(false);
    const category = CATEGORIES
    return (<>
        <button onClick={() => setIsOpen(true)} className="absolute flex top-21 right-8 md:hidden cursor-pointer hover:scale-[110%] transition-all duration-300  text-xl justify-center gap-2 bg-[#715767] text-white px-4 py-2 rounded-full font-bold  items-center text-center">
            <span className="hidden sm:block"><Plus strokeWidth={3} /></span>
            <span className="text-sm sm:text-xl">Add Expense</span>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className={`min-w-screen bg-black/20 fixed md:hidden flex inset-0 z-40 backdrop-blur-sm justify-center items-center`}>
                    <motion.div
                        transition={{ damping: 25, stiffness: 220, type: "spring" }}
                        initial={{ y: "-100%" }}
                        exit={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        drag="y"
                        dragConstraints={{ top: -300, bottom: 0 }}
                        dragElastic={{ top: 0.2, bottom: 0 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y < -150) {
                                setIsOpen(false)
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`bg-white max-h-120  gap-4 sm:px-12 fixed top-0 overflow-y-auto p-6 rounded-b-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl`}
                    >
                        <div className="flex flex-col gap-2 justify-center items-center text-center">
                            <div className="font-bold text-2xl text-[#715767] ">Treat Yourself?</div>
                            <div className="flex justify-start font-semibold text-[#4D4449] text-md">Every penny tells a story, Bestie. Let's log this one!</div>
                            <div className="relative">
                                <DollarSignIcon className="absolute  top-1/4 left-6 bg-white  text-[#715767]" strokeWidth={2} size={32} />
                                <input type="number" className="flex w-full justify-center text-center px-6 items-center text-2xl py-2 rounded-3xl outline-none border-4 text-[#715767] font-bold border-[#F4D2E5]" placeholder="0.00" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-md text-[#4D4449] font-bold">Where did it go?</div>
                            <div className="flex overflow-auto min-w-65 max-w-180 p-2 gap-2">
                                {CATEGORIES.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <div className={`flex tranition-all font-bold cursor-pointer select-none duration-300 border-4 gap-2 p-2 rounded-xl w-35 h-10 flex-shrink-0  items-center justify-center ${category === item.id ? "bg-[#715767] text-white border-[#F4D2EF]" : "bg-[#ffffff]/50 border-[#F4D2EF]  text-[#715767]"}`} key={item.id}>
                                            <IconComponent />
                                            <div>{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="text-md text-[#4D4449] font-bold">When happened?</div>
                            <input type="date" className="py-2 rounded-full border-2 px-4 border-[#F4D2EF] font-bold text-[#715767] outline-[#715767]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div  className="text-md text-[#4D4449] font-bold">
                                Details? darling.
                            </div>
                            <input type="text" placeholder="description"  className="py-2 rounded-full border-2 px-4 border-[#F4D2EF] font-bold text-[#715767] outline-[#715767]" />
                        </div>
                        <div>
                            <button className="cursor-pointer hover:scale-[98%] transition-all duration-300 flex justify-center items-center w-full bg-[#715767] rounded-full py-4 text-lg md:text-2xl font-bold text-white gap-2 ">
                                <div className="flex gap-3 items-center text-center justify-center">
                                <span><Heart strokeWidth={3} /></span>
                                <span>Save Expense</span>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </ motion.div>
            )}

        </AnimatePresence>
    </>
    )
}