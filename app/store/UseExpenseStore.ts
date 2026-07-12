import { create } from "zustand";
export interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    date: string;
}

interface ExpenseStore {
    expenses : Expense[];
    setExpenses : (expenses : Expense[]) => void 
    addExpense : (expense : Expense)=> void;
}

export const useExpenseStore = create<ExpenseStore>((set)=>({
    expenses : [],
    setExpenses : (expenses) => set({expenses}),
    addExpense : (expense) => set((state)=> ({
        expenses : [expense, ...state.expenses],
    }))
}))