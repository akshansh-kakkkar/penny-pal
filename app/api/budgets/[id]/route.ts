import { getSession } from "@/app/lib/session";
import { updateBudgetSchema } from "@/app/lib/validations/budget";
import { deleteBudget, getBudgetById, updateBudget } from "@/app/server/budget.service";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }
    const { id } = await params;
    const budget = await getBudgetById(id, session.user.id);
    if (!budget) {
      return NextResponse.json(
        { message: "Budget not found" },
        { status: 404 },
      );
    }
    const body = await req.json();
    const parsed = updateBudgetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }

    const updated = await updateBudget(id, parsed.data, session.user.id);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong while patching the budget",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session =await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const budget = await getBudgetById(
        id, 
        session.user.id
    )
    if(!budget){
        return NextResponse.json({message : "Budget not found"}, {status : 404})
    }
    await deleteBudget(
        id, session.user.id
    )
    return NextResponse.json({
        success : true
    })
   } catch (error) {
    return NextResponse.json({
      error: "Something went wrong while deleting the budget",
    });
  }
}
