"use client";
import { useSession } from "@/app/lib/auth/auth-client";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Currency, LayoutDashboard, LogOutIcon, Wallet, Wallet2, Wallet2Icon, WalletIcon,  } from "lucide-react";
import Link from "next/link";
export default function SideBar() {
  const { data: session } = useSession();
  return (
    <div className="bg-[#FFFFFF] flex flex-col justify-between py-16 px-4  shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] rounded-r-4xl w-[320px]">
      <div className="flex flex-col gap-10">
        <div>
          <div>PennyPal</div>
          <div>
            <div>{session?.user.name.charAt(0).toUpperCase()}</div>
            {session?.user.name && <div>Hello, {session?.user.name} </div>}
          </div>
        </div>
        <div>
          <div>
            <Link href={'/dashbaord'}>
            <span><LayoutDashboard /></span>
            <span>Dashboard</span>
            </Link>
          </div>
          <div>
            <Link href={'/dashboard/expenses'}>
            <span>
                <FontAwesomeIcon icon={faMoneyBill} />
            </span>
            <span>Expenses</span>
            </Link>
          </div>
          <div>
            <Link href={'/dashboard/budget'}>
            <span><WalletIcon /></span>
            <span>Budgets</span>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div>
            <span><LogOutIcon /></span>
            <span>Logout</span>
        </div>
        <div>
            Add Expenses
        </div>
      </div>
    </div>
  );
}
