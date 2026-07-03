import { prisma } from "../lib/prisma";
import {
  CreateBudgetInput,
  updateBudgetInput,
} from "../lib/validations/budget";

export async function createBudget(
  data: CreateBudgetInput,
  userId: string,
) {
  return prisma.budget.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function getBudgets(userId: string) {
  return prisma.budget.findMany({
    where: {
      userId,
    },
    orderBy: [{ year: "desc" }, { month: "desc" }],
  });
}
export async function getBudgetById(id: string, userId: string) {
  return prisma.budget.findFirst({
    where: {
      id,
      userId,
    },
  });
}
export async function getBudgetByMonth(
  month: number,
  year: number,
  userId: string,
) {
  return prisma.budget.findFirst({
    where: {
      month,
      year,
      userId,
    },
  });
}

export async function updateBudget(
  id: string,
  data: updateBudgetInput,
  userId: string,
) {
  return prisma.budget.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteBudget(id: string, userId: string) {
  return prisma.budget.delete({
    where: {
      id,
    },
  });
}
