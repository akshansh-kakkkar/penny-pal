"use client"
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function () {
    const [isOpen, setIsOpen] = useState(false);

    return (<>
        <button onClick={() => setIsOpen(true)} className="absolute flex top-20 right-8 md:hidden cursor-pointer hover:scale-[110%] transition-all duration-300  text-xl justify-center gap-2 bg-[#715767] text-white px-4 py-2 rounded-full font-bold  items-center text-center">
          <span className="hidden sm:block"><Plus strokeWidth={3} /></span>
          <span className="text-sm sm:text-xl">Add Expense</span>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={()=>setIsOpen(false)}
                    className={`min-w-screen bg-black/20 fixed md:hidden flex inset-0 z-40 backdrop-blur-sm justify-center items-center`}>
                    <motion.div
                        transition={{ damping: 25, stiffness: 220, type: "spring" }}
                        initial={{ y: "100%" }}
                        exit={{ y: "100%" }}
                        animate={{ y: 0 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 3000 }}
                        dragElastic={0.2}
                        onDragEnd={(e, info) => {
                            if (info.offset.y > 150) {
                                setIsOpen(false)
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`bg-white fixed bottom-0 overflow-y-auto p-6 rounded-t-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl`}
                    >

                    </motion.div>
                </ motion.div>
            )}

        </AnimatePresence>
    </>
    )
}