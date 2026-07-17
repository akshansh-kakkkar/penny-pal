"use client"
import { CircleEllipsis, ListFilter, PencilIcon, Search, Trash2Icon, LoaderPinwheel, Plus, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/prisma/seed";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useDeleteExpenseModal } from '@/app/store/useDeleteExpenseModal';
import DeleteExpenseModal from './components/deleteExpenseModal';
import ExpenseModal from '../components/ExpenseModal';
import { useExpenseStore, Expense } from '@/app/store/UseExpenseStore';
import DeleteExpenseDrawer from './components/DeleteExpenseDrawer';
import { useDeleteDrawer } from '@/app/store/UseDeleteExpenseDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import { useExpenseModal } from '@/app/store/useExpenseModal';
import ViewExpenseModal from './components/ViewExpensesModal.tsx';
import { viewExpense } from '@/app/store/UseViewExpenseModal';
import { getPagination } from '@/app/lib/helper/pagination';
import ViewExpenseDrawer from './components/ViewExpenseDrawer';
import { useViewExpenseDrawer } from '@/app/store/UseViewExpenseDrawer';
import { updateExpense } from '@/app/store/UseUpdateExpense';
import UpdateExpenseModal from '../components/UpdateExpenseModal';
import { updateExpenseDrawer } from '@/app/store/UseUpdateExpenseDrawer';
import UpdateExpenseDrawer from '../components/UpdateExpenseDrawer';

export default function ExpensesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { open } = useDeleteExpenseModal();
    const { expenses, setExpenses } = useExpenseStore();
    const { oppen } = useDeleteDrawer();
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1)
    const { open: openView } = viewExpense()
    const {open : openUpdateDrawer} = updateExpenseDrawer();
    const removeExpense = (id: string) => {
        setExpenses(expenses.filter(exp => exp.id !== id))
    }
    const { open: OpenExpenseModal } = useExpenseModal()
    const categoryMap = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]))

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/expenses?page=${page}&limit=10`, { method: "GET" });
                const data = await res.json();
                if (!res.ok) {
                    toast.error("Pagenation does not work.")
                    return
                }
                setExpenses(data.expenses);
                setTotalPages(data.pages);
                return;
            } catch (error) {
                toast.error("Pagenation failed to render.")
            } finally {
                setLoading(false);
            }

        }
        fetchExpense()
    },
        [page, setExpenses])
    const pagination = getPagination(page, totalPages);
    const { open: openViewDrawer } = useViewExpenseDrawer()
    const { open: openUpdateForm } = updateExpense();
    return (
        <>
            {
                loading ? (
                    <div className='flex h-screen justify-center items-center text-center'>
                        <LoaderPinwheel size={48} className='animate-spin text-[#715767]' strokeWidth={2} />
                    </div>
                ) : (
                    expenses.length == 0 ? (
                        <div className='flex flex-col justify-center items-center min-h-screen'>
                            <div className=' bg-white mx-12 rounded-3xl flex flex-col justify-center gap-4 items-center  px-12 py-12 shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] '>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faPiggyBank}
                                        className="lg:text-[64px] animate-wiggle animate-squish text-[32px]  bg-gradient-to-b rounded-full lg:py-14 lg:px-12 px-6 py-8 from-[#715767] to-[#e4b0d0] text-white"
                                    />
                                </div>
                                <div className='flex text-center flex-col gap-4 justify-center items-center'>
                                    <div className='md:text-2xl text-xl text-[#715767] font-bold'>A Blank Slate for Your Pennies!</div>
                                    <div className='text-sm md:text-md max-w-180 text-[#4D4449] font-medium text-center t'>Looks like you haven't logged any treats or expenses yet. Don't worry, every financial journey starts with a single step (or a single coffee). Let's start tracking!</div>
                                    <button onClick={() => setIsModalOpen(true)} className='hidden md:flex gap-2 bg-[#715767] text-white py-2 px-4 rounded-full font-bold cursor-pointer hover:scale-[105%] transition-all duration-300'>
                                        <span><Plus strokeWidth={3} /></span>
                                        <span>Add Expense</span>
                                    </button>
                                    <button onClick={OpenExpenseModal} className='flex md:hidden gap-2 bg-[#715767] text-white py-2 px-4 rounded-full font-bold cursor-pointer hover:scale-[105%] transition-all duration-300'>
                                        <span><Plus strokeWidth={3} /></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (

                        <div className={`min-h-screen mx-5 md:mx-10 xl:mx-40 py-10 md:py-20`}>
                            <div className="flex  sm:flex-row flex-col gap-4 justify-center sm:justify-between items-center">
                                <div className="text-3xl font-bold text-[#715767]">PennyPal</div>
                                <div className="flex relative  ">
                                    <Search className="absolute top-[18px] left-4 text-[#715767]" strokeWidth={4} />
                                    <input type="text" placeholder="search..." className="font-bold outline-[#715767] px-4 rounded-full py-4 text-xl text-[#715767] items-center flex relative pl-14 text-lg  shadow-[0_4px_8px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)]" />
                                </div>
                            </div>
                            <div className="flex justify-between py-4 items-center text-center">
                                <div className="flex flex-col gap-2 text-start">
                                    <span className={`text-2xl md:text-4xl font-bold text-[#1A1C1A]`} >My Expenses</span>
                                    <span className="text-sm md:text-md  text-[#4D4449] font-medium">Keep track of all those loverly treats!</span>
                                </div>
                                <div className="flex gap-4 items-center font-bold text-sm md:text-xl text-center justify-center text-[#4C6A65] bg-[#C8E9E2] rounded-full py-2 md:py-4 px-4 md:px-8">
                                    <span><ListFilter /></span>
                                    <span className="md:block hidden">Filter Treats</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 items-center text-center justify-start w-full h-full ">
                                {expenses.map((expense: Expense) => {
                                    const category = categoryMap[expense.category];
                                    const date = new Date(expense.createdAt);
                                    const time = date.toLocaleTimeString("en-IN", {
                                        hour: 'numeric',
                                        minute: "2-digit",
                                        hour12: true
                                    }).toLowerCase().replace("am", "a.m.").replace("pm", "p.m.")
                                    const formatted = `${time} ${date.toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "numeric",
                                        year: "2-digit",
                                    })}`
                                    return (
                                        <div key={expense.id} className="flex w-full px-6 py-6 rounded-full justify-between text-center items-center bg-white shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] gap-4">
                                            <div className="flex flex-1 gap-5 min-w-0 items-center">
                                                <div className='shrink-0'>
                                                    {category && (
                                                        <div style={{ backgroundColor: category.background, borderColor: category.color }} className="p-4 border-2 w-fit shrink-0 rounded-full " >
                                                            <category.icon color={category.color} size={24} strokeWidth={2} />
                                                        </div>
                                                    )}
                                                </ div>
                                                <div className='flex text-left flex-1 flex-col min-w-0 '>
                                                    <p className="truncate text-lg md:text-2xl font-bold text-[#715767]">
                                                        {expense.description}
                                                    </p>
                                                    <p className='font-semibold text-[#4D4449] text-sm'>{formatted}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-6 items-center shrink-0">
                                                <div className='flex text-2xl text-[#715767] font-bold'>${expense.amount}</div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className={"hover:bg-[#f4d2e5] text-[#715767] p-1 cursor-pointer rounded-full "} >
                                                        <CircleEllipsis />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem onClick={() => openView(expense.id)} className={` md:flex focus:bg-[#f4d2e5] hidden cursor-pointer focus:text-[#715767] text-[#715767] font-bold items-center text-md text-center gap-4`}>
                                                            <span><Eye size={24} strokeWidth={3} /></span>
                                                            <span>View </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openViewDrawer(expense.id)} className={`flex md:hidden focus:bg-[#f4d2e5] cursor-pointer focus:text-[#715767] text-[#715767] font-bold items-center text-md text-center gap-4`}>
                                                            <span><Eye size={24} strokeWidth={3} /></span>
                                                            <span>View </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openUpdateForm(expense.id)} className={`md:flex focus:bg-[#f4d2e5] hidden cursor-pointer focus:text-[#715767] text-[#715767] font-bold items-center text-md text-center gap-4`}>
                                                            <span><PencilIcon size={24} strokeWidth={3} /></span>
                                                            <span>Edit</span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => openUpdateDrawer(expense.id)} className={`flex md:hidden focus:bg-[#f4d2e5] cursor-pointer focus:text-[#715767] text-[#715767] font-bold items-center text-md text-center gap-4`}>
                                                            <span><PencilIcon size={24} strokeWidth={3} /></span>
                                                            <span>Edit </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => open(expense.id)} className={`md:flex focus:bg-[#f4d2e5] hidden cursor-pointer focus:text-[#715767] text-[#715767] font-bold items-center text-md text-center gap-4`}>
                                                            <span><Trash2Icon size={24} strokeWidth={3} /></span>
                                                            <span>Delete </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => oppen(expense.id)} className={`flex md:hidden focus:bg-[#f4d2e5] cursor-pointer focus:text-[#715767] text-[#715767] font-bold items-center text-md text-center gap-4`}>
                                                            <span><Trash2Icon size={24} strokeWidth={3} /></span>
                                                            <span>Delete </span>
                                                        </DropdownMenuItem>

                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='flex justify-between shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)] px-4 py-2 rounded-full items-center gap-6 my-8 bg-white'>
                                <button
                                    className='bg-[#F4D2E5] shadow-[0_0_50px_rgba(244,180,210,0.55)] text-[#715767] rounded-full p-2'
                                    disabled={page === 1} onClick={() => setPage(page - 1)}>
                                    <ChevronLeft size={32} strokeWidth={4} />
                                </button>
                                <div className=' gap-4 hidden md:flex items-center'>

                                    {pagination.map((item, index) => item === '...' ? (
                                        <span className='flex gap-4' key={index}>...</span>
                                    ) : (
                                        <button key={item} onClick={() => setPage(item)} className={`w-12 h-12 rounded-full shadow-[0_0_50px_rgba(244,180,210,0.55)] text-2xl font-bold transition ${item === page ? "bg-[#715767] text-white border-4 border-[#F4D2E5]" : "text-[#715767] hover:bg-pink-200"}`} >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                                <div className='md:hidden flex text-lg text-[#715767] font-bold'>
                                    {page} of {totalPages}
                                </div>
                                <button className='text-[#715767] border-2 border-[#FEDBE7] shadow-[0_0_50px_rgba(244,180,210,0.55)] bg-[#F4D2E5] rounded-full p-2'
                                    disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                                    <ChevronRight size={32} strokeWidth={4} />
                                </button>
                            </div>
                        </div>
                    )
                )}
            <DeleteExpenseModal onDeleted={removeExpense} />
            <DeleteExpenseDrawer deleted={removeExpense} />
            <ExpenseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <UpdateExpenseModal />
            <UpdateExpenseDrawer />
            <ViewExpenseModal />
            <ViewExpenseDrawer />
        </>
    )
}