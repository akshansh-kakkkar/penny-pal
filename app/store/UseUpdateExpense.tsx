import { create } from "zustand";

interface UpdateExpenseModal {
    isOpen : boolean;
    open   : (id : string)=> void;
    close : ()=> void;
    expenseId : string | null;

}

export const updateExpense = create<UpdateExpenseModal>((set)=>({
    isOpen : false,
    expenseId : null,
    open : (id)=> set({isOpen : true, expenseId : id}),
    close : ()=>set({isOpen : false})
}))