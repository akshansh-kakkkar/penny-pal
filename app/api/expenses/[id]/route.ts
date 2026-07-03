import { getSession } from "@/app/lib/session";
import {
  createExpenseSchema,
  updateExpenseSchema,
} from "@/app/lib/validations/expense";
import {
  createExpense,
  deleteExpense,
  getExpenseById,
  updateExpense,
} from "@/app/server/expense.service";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const expense = await getExpenseById(id, session.user.id);
    if (!expense) {
      return NextResponse.json(
        { message: "Expense not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the expense" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const body = await req.json();
    const parsed = updateExpenseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }
    const expense = await updateExpense(id, parsed.data, session.user.id);
    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update the expense" },
      { status: 500 },
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    const expense = await getExpenseById(id, session.user.id);
    if (!expense) {
      return NextResponse.json(
        { message: "Expesne not found" },
        { status: 404 },
      );
    }

    await deleteExpense(id, session.user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    NextResponse.json({ error: "Expense not found" }, { status: 404 });
  }
}
