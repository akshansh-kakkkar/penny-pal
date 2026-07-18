import { prisma } from "../lib/prisma";
import {
  CreateBudgetInput,
  updateBudgetInput,
} from "../lib/validations/budget";

export async function createBudget(data: CreateBudgetInput, userId: string) {
  const { categories, ...budget } = data;
  return prisma.budget.create({
    data: {
      ...budget,
      userId,
      categories: {
        create: categories.map((category) => ({
          categoryId: category.categoryId,
          amount: category.amount,
        })),
      },
    },
    include: {
      categories: {
        include: {
          category: true,
        }
      },
    },
  })
}


export async function getBudgets(userId: string) {
  return prisma.budget.findMany({
    where: {
      userId,
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
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
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
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
    include: {
      categories: {
        include: {
          category: true,
        }
      }
    }
  });
}

export async function updateBudget(
  id: string,
  data: updateBudgetInput,
  userId: string,
) {
  const budget = await prisma.budget.findFirst({
    where: {
      id,
      userId
    },
  })

  if (!budget) {
    throw new Error("Budget not found");
  }
  const {categories,...budgetData} = data;

  return prisma.$transaction(async(tx)=>{
    const updatedBudget = await tx.budget.update({
      where : { id },
      data : budgetData,
    })
    if(categories){
      await tx.budgetCategory.deleteMany({
        where : {
          budgetId : id,
        }
      })
      await tx.budgetCategory.createMany({
        data : categories.map((category)=>({
          budgetId : id,
          categoryId : category.categoryId,
          amount : category.amount
        }))
      })
    }
    return tx.budget.findUnique({
      where : { id },
      include : {
        categories : {
          include : {
            category : true
          }
        }
      }
    })
  })

}

export async function deleteBudget(id: string, userId: string) {

  const budget = await prisma.budget.findFirst({
    where: {
      id,
      userId
    },
  });
  if (!budget) {
    throw new Error("Budget not found")
  }
  return prisma.budget.delete({
    where: { id }
  })
}
