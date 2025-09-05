import ProfileForm from "@/components/shared/forms/profile-form";
import LinkManagement from "@/components/shared/link-management";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

export default async function page() {
  // const session = await auth.api.getSession({ headers: await headers() });
  // const user = session?.user;
  return (
    <div className="w-full h-full py-4 scroll-auto">
      <ProfileForm initialValues={{ name: "Anshul", bio: "Hello, I am Anshul" }} />
      <LinkManagement />
    </div>
  );
}
