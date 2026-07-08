import { AnimatePresence } from "framer-motion";

interface ExpenseDrawerprops {
    isOpen: boolean;
    onClose: () => void;
}
export default function ({ isOpen, onClose }: ExpenseDrawerprops) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="">
                    
                </div>
            )}

        </AnimatePresence>
    )
}