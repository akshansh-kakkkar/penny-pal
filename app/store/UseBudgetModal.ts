import {create} from "zustand"

interface UseBudgetProps{
    isOpen : boolean;
    onOpen : (id?: string)=> void;
    onClose : ()=> void;
    budgetId : string | null;
}

export const useBudgetModal = create<UseBudgetProps>((set)=>({
    isOpen : false,
    budgetId : null,
    onOpen : (id)=>set({
        isOpen : true,
        budgetId : id ?? null,
    }),
    onClose : ()=>set({
        isOpen : false
    })
}))