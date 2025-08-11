import Image from "next/image";
import breeziLogo from "@/public/assets/breezi-logo-resolution-logo-transparent.png";
import { SignupForm } from "@/app/(auth)/signup/_components/form/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-5">
        <Link href="/" className="flex items-center gap-1 self-center font-bold text-2xl">
          <div className="text-primary-foreground flex size-8 items-center justify-center rounded-md">
            <Image src={breeziLogo} width={30} height={30} className="size-6" alt="Logo" />
          </div>
          Breezi.
        </Link>
        <SignupForm />
      </div>
    </div>
  )
}