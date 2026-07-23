import { create } from "zustand";

interface useBudgetProps  {
    isOpen : boolean;
    onOpen : (id : string)=> void;
    onClose : ()=>void;
    budgetId : string | null;
}

export const useBudgetDrawer = create<useBudgetProps>((set)=>({
    isOpen : false,
    budgetId : null,
    onOpen : (id)=>set({
        isOpen : true,
        budgetId : id ?? null,
    }),
    onClose : ()=>set({
        isOpen : false,
        budgetId : null,
    })
}))