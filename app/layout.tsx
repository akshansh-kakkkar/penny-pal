import "./globals.css";
import { Quicksand, Geist } from "next/font/google";
import LayoutWrapper from "./components/LayoutWrapper";
import PageTransition from "./components/PageTransition";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const quickSand = Quicksand({
  subsets: ["latin"],
});

export const metadata = {
  title: "Penny Pal",
  description: "Your friendly expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`relative flex flex-col min-h-screen antialiased ${quickSand.className}`}
      >
        <PageTransition>
          <LayoutWrapper>
            <main className="flex-1">{children}</main>
            <Toaster richColors position="top-right" />
          </LayoutWrapper>
        </PageTransition>

      </body>
    </html>
  );
}
