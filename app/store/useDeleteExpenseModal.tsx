import { create } from "zustand"
interface deleteExpenseModalStore {
    isOpen: boolean;
    open: (id: string) => void;
    onClose: () => void;
    expenseId: string | null
}
export const useDeleteExpenseModal = create<deleteExpenseModalStore>((set) => ({
    isOpen: false,
    expenseId: null,
    open: (id) => set({
        isOpen: true,
        expenseId: id
    }),
    onClose: () => set({
        isOpen: false,
        expenseId: null,
    })
}))