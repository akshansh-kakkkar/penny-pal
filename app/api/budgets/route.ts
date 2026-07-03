import { getSession } from "@/app/lib/session";
import { createBudget, getBudgetByMonth, getBudgets } from "@/app/server/budget.service";
import { NextRequest, NextResponse } from "next/server";
import { error } from 'console';
import { createBudgetSchema } from "@/app/lib/validations/budget";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const budget = await getBudgets(session.user.id);
    return NextResponse.json(budget)
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while fetching the budget." },
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
    const parsed = createBudgetSchema.safeParse(body)
    if(!parsed.success){
        return NextResponse.json(parsed.error.flatten(), {status : 400})
    }
    const existing = await getBudgetByMonth(
        parsed.data.month,
        parsed.data.year,
        session.user.id
    )
    if(existing){
        return NextResponse.json(
         {   message : "Budget already exists for this month" },
         {status : 409}
        )
    }
    const budget = await createBudget(
        parsed.data,
        session.user.id
    )
    return NextResponse.json(budget, {status : 201})
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while posting the budget" },
      { status: 500 },
    );
  }
}
