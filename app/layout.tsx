import "./globals.css";
import { Quicksand } from "next/font/google";
import LayoutWrapper from "./components/LayoutWrapper";
import PageTransition from "./components/PageTransition";

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
    <html lang="en">
      <body
        className={`relative flex flex-col min-h-screen antialiased ${quickSand.className}`}
      >
        <PageTransition>
          <LayoutWrapper>
            <main className="flex-1">{children}</main>
          </LayoutWrapper>
        </PageTransition>
      </body>
    </html>
  );
}
