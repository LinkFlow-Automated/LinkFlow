
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({headers: await headers()});
  return (
    <div className="flex flex-col font-bold text-5xl antialiased items-center justify-center h-screen">
      Welcome to LinkFlow {session?.user?.name || "Guest"}!
    </div>
  );
}
