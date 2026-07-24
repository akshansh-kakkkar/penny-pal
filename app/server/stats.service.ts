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
  const budgetUsage = monthlyBudget === 0 ? 0 : (monthlyExpenses / monthlyBudget) * 100;
  const averageTransaction = count === 0 ? 0 : totalExpenses / count;

  return {
    totalExpenses,
    monthlyExpenses,
    budget: monthlyBudget,
    remainBudget: monthlyBudget - monthlyExpenses,
    transactionCount: count,
    budgetUsage,
    averageTransaction
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
    const key = `${expense.date.getFullYear()}-${expense.date.getMonth() + 1}`
    monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + expense.amount);
  });
  return Array.from(
    monthlyMap.entries()
  ).map(
    ([key, amount]) => {
      const [year, month] = key.split('-');
      return {
        month: new Date(Number(year), Number(month) - 1)
          .toLocaleString("default", { month: "short" }),
        year: Number(year),
        amount
      }
    }
  )
}

export async function getCategoryStats(userId: string) {
  const data = await prisma.category.findMany({
    include: {
      expenses : {
        where : {
          userId,
        },
        select : {
          amount : true
        }
      },
    },
  });
  return data.map((item) => ({
    id : item.id,
    name : item.name,
    icon : item.icon,
    color :  item.color,
    background : item.background,
    amount : item.expenses.reduce((sum,expense)=>sum + expense.amount, 0)
  }))
}