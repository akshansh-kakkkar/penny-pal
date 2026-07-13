import { create } from "zustand";
export interface Expense {
    id: string;
    amount: number;
    category: string;
    description: string;
    createdAt: string;

}

interface ExpenseStore {
    expenses : Expense[];
    setExpenses : (expenses : Expense[]) => void 
    addExpense : (expense : Expense)=> void;
    removeExpenses : (id : string)=>void;
}

export const useExpenseStore = create<ExpenseStore>((set)=>({
    expenses : [],
    setExpenses : (expenses) => set({expenses}),
    addExpense : (expense) => set((state)=> ({
        expenses : [expense, ...state.expenses],
    })),
    removeExpenses : (id)=> set((state)=>({
        expenses : state.expenses.filter(exp=> exp.id !== id)
    }))
}))