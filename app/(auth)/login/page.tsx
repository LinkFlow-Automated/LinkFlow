import Image from "next/image";
import linkFlowLogo from "@/public/assets/linkflow-logo-trans.png";
import { LoginForm } from "@/app/(auth)/login/_components/form/login-form"
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-1 self-center font-bold text-2xl">
          <div className="text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <Image src={linkFlowLogo} width={35} height={30} className="size-6" alt="Logo" />
          </div>
          LinkFlow
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
