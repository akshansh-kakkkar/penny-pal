"use client";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const handleScroll = ()=>{
        setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
  }, [])
  const router = useRouter()
  return (
    <>
      <div className={`sticky z-50   text-[#715767] bg-[#FAF9F6] flex items-center text-center justify-between ${scrolled ? "px-5 lg:px-12 xl:px-24 py-3 mx-4 mt-12 rounded-full shadow-lg top-4" : "px-5 top-0 lg:px-20 xl:px-40 py-6"}`}>
        <Link href={'/'} className="font-bold text-2xl">PennyPal</Link>
        <div className="hidden md:flex gap-10 text-md font-semibold capitalize text-center items-center">
          <Link href={"/about-us"}>About Us</Link>
          <Link href={"/features"}>Features</Link>
          <Link href={"/join-the-club"}>Join the Club</Link>
        </div>
        <div className="hidden md:flex gap-4 text-sm font-bold items-center text-center justify-center">
          <button onClick={()=>router.push('/auth/sign-in')} className="bg-[#715767] px-6 py-2 border-2 cursor-pointer transition-all hover:scale-[105%] hover:bg-[#826476] duration-300 border-[#715767] text-white rounded-full">
            Sign In
          </button>
          <button onClick={()=>router.push('/auth/login')} className="border-[#715767] cursor-pointer transition-all duration-300 hover:text-[#715767] hover:scale-[105%] px-6 py-2 border-2 rounded-full">
            Log In
          </button>
        </div>
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
      </div>
      <AnimatePresence>
        {isOpen && (
          <div className="flex justify-center items-center">
          <motion.div
            initial={{opacity : 0, y:-20}}
            transition={{ duration: 0.3 }}
            animate={{opacity : 1, y:0}}
            exit={{opacity : 0, y:-20}}
             className={`fixed z-50 md:hidden bg-[#FAF9F6] text-[#715767] shadow-[0px_60px_60px_rgba(244,210,229,0.4)]  min-h-[120px] shadow-lg ${scrolled ? " rounded-4xl top-20 w-[calc(100vw-2rem)] mx-4 flex justify-center items-center " : " rounded-b-4xl top-20 w-full"}`}>

              <div className="font-semibold justify-center items-center py-4 px-4  text-xl gap-4 flex-col flex">
                <Link href={"/about-us"}>About Us</Link>
                <Link href={"/features"}>Features</Link>
                <Link href={"/join-the-club"}>Join the Club</Link>
                <div className="flex gap-2 flex-col">
                  <button onClick={()=>router.push('/auth/sign-in')} className="bg-[#715767]  text-md px-22 py-1 border-2 cursor-pointer transition-all hover:text-[#715767] hover:bg-white duration-300 border-[#715767] text-white rounded-full">
                    Sign In
                  </button>
                  <button onClick={()=>router.push('/auth/login')} className="border-[#715767] px-22 text-md cursor-pointer transition-all duration-300 hover:bg-[#715767] hover:text-white px-3 py-1 border-2 rounded-full">
                    Log In
                  </button>
                </div>
              </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}