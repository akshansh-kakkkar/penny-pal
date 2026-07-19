import { create } from "zustand";
import { ICON_MAP } from "../lib/icon-map";
export interface Expense {
    id: string;
    amount: number;
    description: string;
    createdAt: string;
    title : string;
    category : {
        id : string;
        name : string;
        icon : keyof typeof ICON_MAP;
        color : string;
        background : string
    }

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