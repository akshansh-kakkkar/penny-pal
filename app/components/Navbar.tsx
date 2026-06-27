"use client";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const handleScroll = ()=>{
        setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
  }, [])
  return (
    <>
      <div className={`sticky z-50   text-[#715767] bg-[#FAF9F6] flex items-center text-center justify-between ${scrolled ? "px-5 lg:px-12 xl:px-24 py-3 mx-4 mt-12 rounded-full shadow-lg top-4" : "px-5 top-0 lg:px-20 xl:px-40 py-6"}`}>
        <div className="font-bold text-2xl">PennyPal</div>
        <div className="hidden md:flex gap-10 text-md font-semibold capitalize text-center items-center">
          <Link href={"/about-us"}>About Us</Link>
          <Link href={"/features"}>Features</Link>
          <Link href={"/join-the-club"}>Join the Club</Link>
        </div>
        <div className="hidden md:flex gap-4 text-sm font-bold items-center text-center justify-center">
          <button className="bg-[#715767] px-6 py-2 border-2 cursor-pointer transition-all hover:text-[#715767] hover:bg-white duration-300 border-[#715767] text-white rounded-full">
            Sign In
          </button>
          <button className="border-[#715767] cursor-pointer transition-all duration-300 hover:bg-[#715767] hover:text-white px-6 py-2 border-2 rounded-full">
            Log In
          </button>
        </div>
        <AnimatePresence>
          <motion.div
            transition={{ duration: 0.5 }}
            initial={{ rotate: 0 }}
            animate={{ rotate: isOpen ? 360 : 0 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden"
          >
            {isOpen ? (
              <X strokeWidth={3} size={24} />
            ) : (
              <Menu strokeWidth={3} size={24} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="md:hidden z-50 flex relative"
          >
            <div className="fixed bg-[#FAF9F6] text-[#715767]  shadow-[0px_60px_60px_rgba(244,210,229,0.4)] left-4 rounded-4xl   min-w-[180px] min-h-[120px] top-24 shadow-lg  justify-center items-center text-center">
              <div
                className="flex absolute right-6 top-4"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <X />
              </div>
              <div className="font-semibold py-12 px-12 text-left text-xl gap-4 flex-col flex">
                <Link href={"/about-us"}>About Us</Link>
                <Link href={"/features"}>Features</Link>
                <Link href={"/join-the-club"}>Join the Club</Link>
                <div className="flex gap-2 flex-col">
                  <button className="bg-[#715767] text-md px-3 py-1 border-2 cursor-pointer transition-all hover:text-[#715767] hover:bg-white duration-300 border-[#715767] text-white rounded-full">
                    Sign In
                  </button>
                  <button className="border-[#715767] text-md cursor-pointer transition-all duration-300 hover:bg-[#715767] hover:text-white px-3 py-1 border-2 rounded-full">
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}