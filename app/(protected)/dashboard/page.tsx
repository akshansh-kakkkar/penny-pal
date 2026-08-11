
"use client";
import { Handbag, PiggyBank, Wallet, Plus, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ExpensesAppDrawer from "./components/ExpensesAppDrawer";
import { useExpenseModal } from "@/app/store/useExpenseModal";
import ExpenseModal from "./components/ExpenseModal";
import { SpendingFlow } from "./components/SpendingFlowGraph";
import CategoryChart from "./components/CatygoryPie";
import {toast} from "sonner"
import WeeklyGraph from "./components/WeeklyGraph";
type DashboardStats = {
  totalExpenses: number;
  monthlyExpenses: number;
  budget: number;
  remainingBudget: number;
  transactionCount: number;
  budgetUsage: number;
  averageTransaction: number;
}
export default function page() {
  const [loader, setLoader] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
 const fetchStats = async ()=>{
  try{
    setLoader(true)
    const res = await fetch("/api/stats")
    const data = await res.json();
    setStats(data)
}
catch(error){
  toast.error("Failed to fetch Stats")
}
finally{
  setLoader(false)
}
 }
 useEffect(()=>{
  fetchStats();
 },[])
  const cards = [
    {
      id: 1,
      title: "Total Expenses",
      value: `$${stats?.totalExpenses.toFixed(2) ?? "0.00"}`,
      icon: <PiggyBank className="text-[#715767] p-1" size={32} />,
      iconBg: "bg-[#F4D2E5]",
      badgeBg: "bg-[#C8E9E2]",
      badgeText: "text-[#4C6A65]",
      badge: "+12%",
    },
    {
      id: 2,
      title: "Monthly Expenses",
      value: `$${stats?.monthlyExpenses.toFixed(2) ?? "0.00"}`,
      icon: <Handbag className="text-[#93000A] p-1" size={32} />,
      iconBg: "bg-[#FFDAD6]",
    },
    {
      id: 3,
      title: "Remaining Budget",
      icon: <Wallet className="text-[#765B41] p-1" size={32} />,
      iconBg: "bg-[#F9D5B4]",
      badge: "March",
      badgeText: "text-[#765B41]",
      value: (

      <div className="h-4 rounded-full bg-[#F5E7D8] overflow-hidden">
      <div style={{ width: `${Math.min(stats?.budgetUsage ?? 0, 100)}%` }} className="h-4 rounded-full bg-[#715767] duration-700 transition-all" />
        </div>
      ),
    }
  ];
  const [currentCard, setCurrentCard] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useExpenseModal();
  return (
    <>
      <div className="min-h-screen mx-5 md:mx-10 xl:mx-40 py-20">
        <div className=" justify-between items-center flex  xl:flex sm:mx-8 mb-8">
          <div className="items-center flex py-2 w-fit   gap-2  text-2xl ">
            <span><LayoutGrid className="hidden sm:block" strokeWidth={3} fill="#715767" color="#715767" size={32} /></span>
            <span className="font-bold text-[#715767] " >Dashboard</span>
          </div>
          <button onClick={() => setIsOpen(true)} className="md:flex hidden cursor-pointer hover:scale-[110%] transition-all duration-300  text-xl justify-center gap-2 bg-[#715767] text-white px-4 py-2 rounded-full font-bold  items-center text-center">
            <span><Plus strokeWidth={3} /></span>
            <span>Add Expense</span>
          </button>
          <button onClick={() => open()} className="absolute flex top-21 right-8 md:hidden cursor-pointer hover:scale-[110%] transition-all duration-300  text-xl justify-center gap-2 bg-[#715767] text-white px-4 py-2 rounded-full font-bold  items-center text-center">
            <span className="hidden sm:block"><Plus strokeWidth={3} /></span>
            <span className="text-sm sm:text-xl">Add Expense</span>
          </button>
        </div>
        <div className="hidden  sm:grid  grid-cols-3  xl:gap-24 place-items-center justify-center items-center ">
          <div className="flex  flex-col col-span-1 w-[200px] xl:w-[300px] h-[200px] justify-between h p-6 bg-white rounded-4xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
            <div className="flex w-full items-start  justify-between">
              <div className="p-2 bg-[#F4D2E5] rounded-full">
                <PiggyBank className="text-[#715767] p-1" size={32} />
              </div>
              <div className="text-[#4C6A65] text-sm md:text-base  rounded-full font-bold py-1 px-4 bg-[#C8E9E2]">
                +
              </div>
            </div>
            <div className="flex gap-2 w-full flex-col">
              <div className="md:text-2xl text-lg font-semibold text-[#4D4449]">
                Total Expenses
              </div>
              <div className="md:text-4xl text-3xl font-extrabold text-[#1A1C1A]">
                ${stats?.totalExpenses.toFixed(2) ?? "0.00"}
              </div>
            </div>
          </div>
          <div className="flex  flex-col col-span-1 w-[200px] xl:w-[300px] h-[200px] justify-between h p-6 bg-white rounded-4xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
            <div className="flex w-full items-start  justify-between">
              <div className="p-2 bg-[#FFDAD6] rounded-full">
                <Handbag className="text-[#93000A] p-1" size={32} />
              </div>
            </div>
            <div className="flex gap-2 w-full flex-col">
              <div className="md:text-2xl text-lg font-semibold text-[#4D4449]">
                Monthly Expenses
              </div>
              <div className="md:text-4xl text-3xl font-extrabold text-[#1A1C1A]">
                ${stats?.monthlyExpenses.toFixed(2) ?? "0.00"}
              </div>
            </div>
          </div>
          <div className="flex  flex-col col-span-1 w-[200px] xl:w-[300px] h-[200px] justify-between h p-6 bg-white rounded-4xl shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
            <div className="flex w-full items-start  justify-between">
              <div className="p-2 bg-[#F9D5B4] rounded-full">
                <Wallet className="text-[#765B41] p-1" size={32} />
              </div>
              <div className="text-[#4D4449] font-extrabold py-1 px-4 ">
                March
              </div>
            </div>
            <div className="flex gap-2 w-full flex-col">
              <div className="md:text-2xl text-lg font-semibold text-[#4D4449]">
                Remaining Budget
              </div>
              <div className="md:text-4xl text-3xl font-extrabold text-[#1A1C1A]">
                {stats?.budget ? `$${stats.remainingBudget.toFixed(2)}` : "N/A"}
              </div>
            </div>
          </div>
        </div>

        <div className={`sm:hidden overflow-hidden`}>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) {
                setCurrentCard((prev) =>
                  prev === cards.length - 1 ? 0 : prev + 1,
                );
              }
              if (info.offset.x > 50) {
                setCurrentCard((prev) =>
                  prev === 0 ? cards.length - 1 : prev - 1,
                );
              }
            }}
            className="flex"
            animate={{ x: `-${currentCard * 100 }% ` }}
          >
            {cards.map((card) => (
              <div key={card.id} className="min-w-full p-2">
                <div className="bg-white justify-center  flex gap-4 flex-col border-2 rounded-4xl  border-[#715767] p-3 shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]"
                >
                  <div className="flex justify-between">
                    <div className={`p-2 rounded-full ${ card.iconBg } `}>
                      {card.icon}
                    </div>
                    <div>
                      {card.badge && (
                        <div
                          className={`px-4 py-1 rounded-full ${ card.badgeBg ?? "" } font-semibold ${ card.badgeText } ?? ""}`}
                        >
                          {card.badge}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xl font-semibold text-[#4D4449]">
                    {card.title}
                  </div>
                  <div className={`text-4xl text-[#1A1C1A] font-bold`}>
                    {card.value}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="flex justify-center gap-3 my-4 ">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCard(index)}
                className={`transition-all cursor-pointer rounded-full ${ currentCard === index ? "w-6 h-2 bg-[#715767]" : " w-6 h-2 bg-gray-300" } `}
              ></button>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <SpendingFlow />
          <CategoryChart />
          <WeeklyGraph />
        </div>
      </div>
      <ExpenseModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
