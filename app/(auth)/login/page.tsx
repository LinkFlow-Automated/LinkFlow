import Image from "next/image";
import linkFlowLogo from "@/public/assets/linkflow-logo-trans.png";


import { LoginForm } from "@/app/(auth)/login/_components/form/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a className="flex items-center gap-1 self-center font-bold select-none">
          <div className="text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <Image src={linkFlowLogo} width={20} height={20} className="size-6 select-none" alt="Logo" />
          </div>
          LinkFlow
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
