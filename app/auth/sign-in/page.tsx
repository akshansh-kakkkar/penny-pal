"use client";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRight, Eye, EyeOff, LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/app/lib/auth/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function page() {
  const [togglePassword, setTogglePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setauthLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const googleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signIn.social({
        provider: "google",
        callbackURL: "/?toast=google-singin-success",
      });
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong try refreshing");
    } finally {
      setGoogleLoading(false);
    }
  };
  
  const handleLogin = async () => {
    try {
      setauthLoading(true);
      const response = await signIn.email({
        email,
        password,
      });
      if (response.error) {
        toast.error("Login Failed try refreshing the page.");
        return;
      }
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong while creating the user.");
    } finally {
      setauthLoading(false);
    }
  };
  return (
    <div
      className={`bg-gradient-to-b min-h-screen overflow-hidden from-[#F4D2E5]/40 to-[#FFFFFF] flex flex-col justify-center items-center relative`}
    >
      <div className="absolute -top-30 -left-30 w-[350px] h-[350px]  sm:w-[400px] sm:h-[400px] bg-[#F4D2E5] rounded-full blur-[30px] z-10" />
      <div className="rounded-4xl sm:min-w-[500px] bg-[#FFFFFF] gap-6 z-50 p-10 flex flex-col shadow-[0px_20px_40px_rgba(113,87,103,0.1)] shadow-lg shadow-[0px_10px_20px_rgba(244,210,229,0.2)]">
        <div className="flex flex-col">
          <div className="flex w-full flex-col justify-center items-center text-center p-2">
            <div className="flex justify-center items-center bg-[#F4D2E5] text-center w-18 h-18 p-2 animate-bounce rounded-full">
              <FontAwesomeIcon
                icon={faPiggyBank}
                color="#725868"
                className="text-4xl animate-squish"
              />
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="text-xl font-semibold text-[#715767]">PennyPal</div>
            <div className="text-[#1A1C1A] font-bold text-lg">Welcome Back</div>
            <div className="text-sm text-[#4D4449] font-semibold">
              Let's check in your savings.
            </div>
          </div>
          <div className="flex mt-4 text-left flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-xs px-2 text-[#715767] font-semibold ">
                Enter your email address
              </div>
              <div className="relative">
                <input
                  className="rounded-full peer bg-[#F4F3F1]  w-full px-4  p-2.5 pl-10 text-sm font-semibold  outline-[#715767] placeholder:font-medium placeholder:text-[#D0C3C9] text-[#715767]"
                  placeholder="buddy@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MailIcon
                  className="absolute z-20 top-1/5 transition-all duration-300 left-2 peer-focus:text-[#715767] text-[#D0C3C9]"
                  size={24}
                  strokeWidth={2}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs px-2 text-[#715767] font-semibold ">
                Enter your email address
              </div>
              <div className="relative">
                <input
                  className="rounded-full peer placeholder:text-2xl placeholder:translate-y-1 bg-[#F4F3F1]  w-full pl-10  p-2.5 px-10 text-sm font-semibold  outline-[#715767] placeholder:font-medium placeholder:text-[#D0C3C9] text-[#715767]"
                  placeholder={"• ".repeat(8)}
                  type={togglePassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {togglePassword ? (
                  <Eye
                    onClick={() => setTogglePassword(!togglePassword)}
                    className="absolute z-20 cursor-pointer top-1/4 transition-all duration-300 right-4 peer-focus:text-[#715767] text-[#D0C3C9]"
                    size={18}
                    strokeWidth={2}
                  />
                ) : (
                  <EyeOff
                    onClick={() => setTogglePassword(!togglePassword)}
                    className="absolute z-20 top-1/4 transition-all cursor-pointer duration-300 right-4 peer-focus:text-[#715767] text-[#D0C3C9]"
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
              <div className="flex mt-2 flex-col gap-4">
                <button
                  onClick={googleLogin}
                  className="flex cursor-pointer hover:border-2 duration-100  py-3 justify-center items-center bg-[#f4d2e543] text-[#725868] rounded-full w-full gap-2"
                >
                  <span>
                    <Image
                      src={"/assets/google-logo.png"}
                      height={24}
                      width={24}
                      alt="google-logo"
                    />
                  </span>
                  <span className="font-bold ">Continue with google</span>
                </button>
                <button
                  onClick={handleLogin}
                  className="flex py-3 justify-center items-center bg-[#F4D2E5] text-[#725868] rounded-full w-full gap-2"
                >
                  <span className="font-bold ">Let's Go!</span>
                  <span>
                    <ArrowRight size={20} strokeWidth={3} />
                  </span>
                </button>
                <div className="text-[#4D4449]  text-xs flex justify-center font-semibold">
                  Don't have a pal account?
                  <Link
                    href={`/auth/sign-up`}
                    className="text-[#725868] font-bold hover:underline  underline-offset-2"
                  >
                    &nbsp;Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-10 -bottom-30 -right-30 w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] bg-[#C8E9E2] rounded-full blur-[30px]" />
    </div>
  );
}
