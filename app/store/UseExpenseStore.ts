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
    updatedExpense : (expense : Expense)=> void;
}

export const useExpenseStore = create<ExpenseStore>((set)=>({
    expenses : [],
    setExpenses : (expenses) => set({expenses}),
    addExpense : (expense) => set((state)=> ({
        expenses : [expense, ...state.expenses],
    })),
    removeExpenses : (id)=> set((state)=>({
        expenses : state.expenses.filter(exp=> exp.id !== id)
    })),
    updatedExpense : (updatedExpense)=> set((state)=>({
        expenses : state.expenses.map((expense)=> expense.id === updatedExpense.id ? updatedExpense : expense)
    }))
}))