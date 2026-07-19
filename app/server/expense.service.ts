import { prisma } from "../lib/prisma";
import {
  CreateExpenseInput,
  updateExpenseInput,
} from "../lib/validations/expense";
export async function createExpense(
  data: CreateExpenseInput,
  userId: string,
) {
  return prisma.expense.create({
    data: {
      ...data,
      date: data.date ? new Date(data.date) : new Date(),
      userId,
    },
    include : {
      category : true,
    },
  });
}

export async function getExpense(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [expenses, total] = await Promise.all([
    prisma.expense.findMany({
      where: {
        userId,
      },
      include: {
        category: true
      },
      orderBy: {
        date: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.expense.count({
      where: {
        userId,
      },
    }),
  ]);
  return {
    expenses,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
}

export async function getExpenseById(id: string, userId: string) {
  return prisma.expense.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      category: true,
    }
  })
}

export async function updateExpense(id: string, data: updateExpenseInput, userId: string) {
  const expense = await prisma.expense.findFirst({
    where: {
      id,
      userId,
    }
  })
  if(!expense){
    throw new Error("Expense not found")
  }
  return prisma.expense.update({
    where : {id},
    data: {
      ...data,
      ...(data.date && { date: new Date(data.date) })
    },
    include : {
      category : true
    }
  })
}

export async function deleteExpense(id: string, userId: string) {
  const expense = await prisma.expense.findFirst({
    where : {
      id,
      userId,
    }
  })
  if(!expense){
    throw new Error("Expense not found")
  }
  return prisma.expense.delete({
    where: {
      id,
    }
  })
}