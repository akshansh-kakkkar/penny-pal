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

export async function getDailyStats(userId: string) {
  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() -6);
  start.setHours(0,0,0,0);

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      date : {
        gte : start,
      },
    },
        orderBy: {
      date: "asc",
    },
    select : {
      amount : true,
      date : true,
    }
  });
  if(expenses.length === 0){
    return[]
  }
  const dailyMap = new Map<string, number>();
  for (const expense of expenses){
    const key =  `${expense.date.getFullYear()}-${expense.date.getMonth() + 1}-${expense.date.getDate()}`;
    dailyMap.set(key, (dailyMap.get(key)?? 0) +  expense.amount)
  }
  const result = [];
  for (let i =0; i < 7; i++){
    const date = new Date(start);
    date.setDate(start.getDate() + i); 
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    result.push({
      day : date.toLocaleDateString("default", {
        day : "numeric",
      }),
      amount : dailyMap.get(key) ??0
    })
  }
  return result;
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