import { prisma } from "../lib/prisma";

export async function getDashboardStats(userId: string) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const [total, monthly, budget, count] = await Promise.all([
    prisma.expense.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    }),
    prisma.expense.aggregate({
      where: {
        userId,
        date: {
          gte: start,
          lt: end,
        },
      },
      _sum: {
        amount: true,
      },
    }),
    prisma.budget.findFirst({
      where: {
        userId,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      },
    }),
    prisma.expense.count({
      where: {
        userId,
        },
    }),
  ]);
  const totalExpenses = total._sum?.amount ?? 0;
  const monthlyExpenses = monthly._sum?.amount ?? 0;
  const monthlyBudget = budget?.amount ?? 0;
  return {
    totalExpenses,
    monthlyExpenses,
    budget: monthlyBudget,
    remainBudget: monthlyBudget - monthlyExpenses,
    transactionCount: count,
  };
}

export async function getMonthlyStats(userId: string) {
  const expenses = await prisma.expense.findMany({
    where: {
      userId,
    },
    select: {
      amount: true,
      date: true,
    },
    orderBy: {
      date: "desc",
    },
  });
  const monthlyMap = new Map<string, number>();
  expenses.forEach((expense) => {
    const key = expense.date.toLocaleDateString("default", {
      month: "short",
    });
    monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + expense.amount);
  });
  return Array.from(
    monthlyMap.entries()
  ).map(
    ([month ,amount]) => ({
        month, amount
    })
  )
}

export async function getCategoryStats(userId:string) {
    const data = await prisma.expense.groupBy({
        by : ["category"],
        where : {
            userId,
        },
        _sum : {
            amount : true
        },
    });
    return data.map((item)=>({
        category : item.category,
        amount : item._sum.amount ?? 0
    }))
}