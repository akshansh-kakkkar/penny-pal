"use client";
import { signIn } from "@/app/lib/auth/auth-client";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockIcon,
  MailIcon,
  Smile,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {toast} from "sonner"
export default function page() {
  const [eyeStatus, setEyeStatus] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authLoading, setauthLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const googleSignIn =async ()=>{
    try{
      await signIn.social({
        provider : "google",
        callbackURL : "/?toast=google-login-success"
      })
    }
    catch(error){
      toast.error("Something went wrong try refreshing the page")
    }
  }
  return (
    <div
      className={`bg-gradient-to-b min-h-screen overflow-hidden from-[#F4D2E5]/40 to-[#FFFFFF] flex flex-col justify-center items-center relative`}
    >
      <div className="absolute -top-30 -left-30 w-[350px] h-[350px]  sm:w-[400px] sm:h-[400px] bg-[#F4D2E5] rounded-full blur-[40px] z-10" />
      <div className="rounded-4xl bg-[#FFFFFF] gap-6 z-50 p-10 flex flex-col shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
        <div className="flex flex-col `">
          <div className="flex w-full justify-center items-center text-center p-2">
            <div className="flex bg-[#F4D2E5] rounded-full w-18 h-18  animate-bounce justify-center items-center text-center p-2">
              <FontAwesomeIcon
                color="#725868"
                className=" animate-squish text-4xl"
                icon={faPiggyBank}
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="text-xl text-[#715767] font-bold">
              Join PennyPal
            </div>
            <div className="text-sm text-[#4D4449] font-semibold">
              Your friendly financial companion!
            </div>
          </div>
        </div>
        <div>
        <div onClick={googleSignIn} className=" py-2 bg-[#f4d2e543] text-[#725868] cursor-pointer hover:border-2 transition-all duration-100  flex justify-center items-center w-full gap-4 rounded-full text-center font-bold">
          <Image src={'/assets/google-logo.png'} alt="google-auth" width={24} height={24} />
          <span>Continue with Google</span>
        </div>
        <div className="flex text-xs translate-y-4 justify-center items-center font-bold text-[#725868]">
          or
        </div>
        </div>
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-2 flex-col">
            <div className="text-xs px-2 text-[#715767] font-semibold">
              What's your name, pal?
            </div>
            <div className="relative">
              <input
                className="rounded-full peer bg-[#F4F3F1]  w-full  p-2.5 pl-10 px-4 text-sm font-semibold  outline-[#715767] placeholder:font-medium placeholder:text-[#D0C3C9] text-[#715767]"
                placeholder="Buddy"
                type="text"
              />
              <Smile
                className="absolute z-20 top-1/5 transition-all duration-300 left-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                size={24}
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xs px-2 text-[#715767] font-semibold">
              Where should we send letters?
            </div>
            <div className="relative">
              <input
                className="rounded-full peer bg-[#F4F3F1]  w-full px-4  p-2.5 pl-10 text-sm font-semibold  outline-[#715767] placeholder:font-medium placeholder:text-[#D0C3C9] text-[#715767]"
                placeholder="buddy@example.com"
                type="email"
              />
              <MailIcon
                className="absolute z-20 top-1/5 transition-all duration-300 left-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                size={24}
                strokeWidth={2}
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4 sm:gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-xs px-2 text-[#715767] font-semibold">
                Create a secret password
              </div>
              <div className="relative">
                <input
                  className="rounded-full peer placeholder:text-2xl  placeholder:translate-y-1 bg-[#F4F3F1]  w-full  p-2.5 px-10 text-sm font-semibold  outline-[#715767] placeholder:font-medium placeholder:text-[#D0C3C9] text-[#715767]"
                  placeholder={"• ".repeat(8)}
                  type={eyeStatus ? "text" : "password"}
                />
                {eyeStatus ? (
                  <Eye
                    onClick={() => setEyeStatus(false)}
                    className="absolute cursor-pointer  flex justify-center  items-center z-20 top-1/4 transition-all duration-300 right-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                    size={18}
                    strokeWidth={2}
                  />
                ) : (
                  <EyeOff
                    onClick={() => setEyeStatus(true)}
                    className="absolute cursor-pointer  flex justify-center  items-center z-20 top-1/4 transition-all duration-300 right-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                    size={18}
                    strokeWidth={2}
                  />
                )}
                <LockIcon
                  className="absolute z-20 top-1/5 transition-all duration-300 left-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                  size={24}
                  strokeWidth={2}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs px-2 text-[#715767] font-semibold">
                Confirm secret password
              </div>
              <div className="relative">
                <input
                  className="rounded-full peer placeholder:text-2xl placeholder:translate-y-1 bg-[#F4F3F1]  w-full  p-2.5 px-10 text-sm font-semibold  outline-[#715767] placeholder:font-medium placeholder:text-[#D0C3C9] text-[#715767]"
                  placeholder={"• ".repeat(8)}
                  type={eyeStatus ? "text" : "password"}
                />
                {eyeStatus ? (
                  <Eye
                    onClick={() => setEyeStatus(false)}
                    className="absolute  flex justify-center cursor-pointer  items-center z-20 top-1/4 transition-all duration-300 right-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                    size={18}
                    strokeWidth={2}
                  />
                ) : (
                  <EyeOff
                    onClick={() => setEyeStatus(true)}
                    className="absolute  flex justify-center cursor-pointer  items-center z-20 top-1/4 transition-all duration-300 right-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                    size={18}
                    strokeWidth={2}
                  />
                )}

                <LockIcon
                  className="absolute z-20 top-1/5 transition-all duration-300 left-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                  size={24}
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex  py-4 justify-center items-center bg-[#F4D2E5] text-[#725868] rounded-full w-full gap-2">
          <span className="font-bold ">Let's Go!</span>
          <span>
            <ArrowRight size={20} strokeWidth={3} />
          </span>
        </div>
        <div className="flex gap-2 flex-col flex-col-reverse">
          <div className="text-[#4D4449] text-xs flex justify-center font-semibold">
            Already have a pal account?
            <Link
              href={`/auth/login`}
              className="text-[#725868] font-bold hover:underline  underline-offset-2"
            >
              &nbsp;Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute z-10 -bottom-30 -right-30 w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] bg-[#C8E9E2] rounded-full blur-[40px]" />
    </div>
  );
}
