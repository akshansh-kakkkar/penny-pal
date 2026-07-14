import { create } from "zustand";

interface UpdateExpenseProps {
    isOpen : boolean,
    open : (id : string)=> void;
    close : ()=>void;
    expenseId : string | null
}

export const updateExpenseDrawer = create<UpdateExpenseProps >((set)=>({
    isOpen : false,
    expenseId : null,
    open : (id)=>set({isOpen : true, expenseId : id}),
    close : ()=>set({isOpen : false})
}))