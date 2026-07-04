import { headers } from "next/headers";
import { auth } from "../lib/auth/auth";
import { redirect } from "next/navigation";
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/auth");
  }
  return (
    <>
      {children}
    </>
  );
}
