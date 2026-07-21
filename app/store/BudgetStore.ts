import { create } from "zustand";
type Budget = {
    id : string;
    name : string;
    amount : number;
}
interface BudgetStore{
    budget : Budget | null;
    setBudget : (budget : Budget | null)=> void;
}
export const useBudgetStore = create<BudgetStore>((set)=>({
    budget : null,
    setBudget : (budget)=> set({budget})
}))