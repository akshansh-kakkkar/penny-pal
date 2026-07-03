import { z } from "zod";
export const createBudgetSchema = z.object({
    amount : z.number().positive(),
    month : z.number().min(1).max(12),
    year : z.number().min(2000)
})
export const updateBudgetSchema = createBudgetSchema.partial();
export type CreateBudgetInput = z.infer<typeof createBudgetSchema>
export type updateBudgetInput = z.infer<typeof updateBudgetSchema>