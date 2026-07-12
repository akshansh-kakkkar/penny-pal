import { useDeleteDrawer } from "@/app/store/UseDeleteExpenseDrawer"
import { AnimatePresence, motion } from "framer-motion"
export default function DeleteExpenseDrawer() {
    const { close, isOpen } = useDeleteDrawer();
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            {isOpen && (
            <motion.div
                className=" min-w-screen bg-black/20 fixed inset-0 z-40 backdrop-blur-sm lg:hidden  "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} onClick={() => close()}   >
                <motion.div
                    className="bg-white overflow-y-auto fixed bottom-0 p-6 rounded-t-4xl right-0 left-0 pb-12 pt-4 px-4 flex flex-col z-50 backdrop-blur-2xl "
                        transition={{ damping: 25, stiffness: 220, type: "spring" }}
                        initial={{ y: "100%" }}
                        exit={{ y: "100%" }}
                        animate={{ y: 0 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom:300 }}
                        dragElastic={{ top: 0, bottom: 0.2 }}
                        onDragEnd={(e, info) => {
                            if (info.offset.y >70) {
                                close()
                            }
                        }}
                    onClick={(e) => e.stopPropagation()}            >
                </motion.div>
            </motion.div>
                        )}
        </AnimatePresence>
    )

}