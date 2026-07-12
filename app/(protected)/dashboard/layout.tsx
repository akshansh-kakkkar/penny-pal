"use client"
import { useState } from "react";
import AppDrawer from "./components/AppDrawer";
import ExpenseModal from "./components/ExpenseModal";
import SideBar from "./components/SideBar";
import ExpensesAppDrawer from "./components/ExpensesAppDrawer";
export default function ({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="flex relative bg-[#FAF9F6] min-h-screen flex-1">
            <ExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <SideBar openModal={() => setIsModalOpen(true)} />
            <AppDrawer />
            <ExpensesAppDrawer />
            <main className="w-full lg:ml-[400px]">
                {children}
            </main>
        </div>
    )
}