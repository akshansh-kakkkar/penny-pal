import { getCurrentMonthAndYear } from "@/app/lib/date";
import { ICON_MAP } from "@/app/lib/icon-map";
import { useBudgetDrawer } from "@/app/store/UseBudgetDrawer"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";
type BudgetForm = {
    amount : number;
    categories : {
        categoryId : string;
        amount : number
    }[]
}
interface BudgetData {
    id : string;
    amount : number;
    categories : {
        amount : number;
        category : {
            id : string;
            name : string;
            icon : keyof typeof ICON_MAP;
            color : string;
            bakcground : string;
        }
    }[] 
}
interface Category {
    color : string;
    background : string;
    id : string;
    name : string;
    icon : keyof typeof ICON_MAP
}
export default function () {
    const { isOpen, onOpen, onClose } = useBudgetDrawer();
    const {month, year} = getCurrentMonthAndYear();
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState<BudgetForm>({amount : 0, categories : []});
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="bg-black/20 h-screen min-w-screen inset-0 z-40 fixed backdrop-blur-sm lg:hidden"
                >

                    <motion.div
                        transition={{ damping: 25, stiffness: 220, type: "spring" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        initial={{ y: "100%" }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 300 }}
                        dragElastic={0.2}
                        onDragEnd={(e, _info) => {
                            if (_info.offset.y > 150) {
                                onOpen
                            }
                        }}
                        onClick={(e)=>e.stopPropagation()}
                        className="bg-white overflow-y-auto fixed bottom-0 p-6 rounded-t-4xl right-0 left-0 pb-12 py-4 flex flex-col z-50 backdrop-blur-2xl">

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}