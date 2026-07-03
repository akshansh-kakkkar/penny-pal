import { getSession } from "@/app/lib/session";
import { createExpenseSchema } from "@/app/lib/validations/expense";
import { createExpense, getExpense } from "@/app/server/expense.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const expenses = await getExpense(session.user.id, page, limit);
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch all Expenses" },
      { status: 500 },
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const parsed = createExpenseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(parsed.error.flatten(), { status: 400 });
    }
    const expense = await createExpense(parsed.data, session.user.id);
    return NextResponse.json(expense, {
      status: 201,
    });
  } catch (error) {
    NextResponse.json({ error: "Failed to post expense" }, { status: 500 });
  }
}
