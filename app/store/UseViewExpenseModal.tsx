import { create } from "zustand";

interface ViewExpense{
    isOpen : boolean,
    open : (id : string)=>void;
    close : ()=>void;
    expenseId : string | null;
}

export const viewExpense = create<ViewExpense>((set)=>({
    isOpen : false,
    expenseId : null,
    open : (id)=>set({isOpen : true, expenseId : id}),
    close : ()=>set({isOpen : false}),
}))