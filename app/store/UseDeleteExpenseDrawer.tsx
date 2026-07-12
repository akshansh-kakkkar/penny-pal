import { create } from "zustand";
interface deleteDrawerProps {
    isOpen: boolean;
    oppen: (id: string) => void;
    close: () => void;
    expenseId: string | null
}

export const useDeleteDrawer = create<deleteDrawerProps>((set) => ({
    isOpen: false,
    expenseId: null,
    oppen: (id) => set({
        isOpen: true,
        expenseId: id,
    }),
    close: () => set({
        isOpen: false,
    })
}))