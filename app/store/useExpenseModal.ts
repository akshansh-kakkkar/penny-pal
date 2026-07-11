import { create } from "zustand";

interface ExpenseModalStore {
    isOpen : boolean,
    open : ()=>void;
    close : ()=>void;
}

export const useExpenseModal = create<ExpenseModalStore>((set)=>({
    isOpen : false,
    open : ()=>set({isOpen : true}),
    close : ()=>set({isOpen : false})
}))

