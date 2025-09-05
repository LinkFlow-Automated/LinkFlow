import LinkManagement from "@/components/shared/link-management";
import ProfileViewCard from "@/components/shared/profile-view-card";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

export default async function page() {
  // const session = await auth.api.getSession({ headers: await headers() });
  // const user = session?.user;
  return (
    <div className="w-full h-full py-4 scroll-auto flex flex-col gap-4 items-center">
      <ProfileViewCard />
      <LinkManagement />
    </div>
  );
}
