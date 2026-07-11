import {create} from "zustand"
interface deleteExpenseModalStore {
    isOpen : boolean;
    open : ()=>void;
    onClose : ()=>void;
}
export const useDeleteExpenseModal = create<deleteExpenseModalStore>((set)=>({
    isOpen: false,
    open : ()=> set({isOpen : true}),
    onClose :()=>set({isOpen : false})
}))