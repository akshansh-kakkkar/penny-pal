import { z } from "zod";
export const createExpenseSchema = z.object({
  title: z.string().min(1),
  amount: z.number().positive(),
  description: z.string().optional(),
  date: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;

export type updateExpenseInput = z.infer<typeof updateExpenseSchema>;
