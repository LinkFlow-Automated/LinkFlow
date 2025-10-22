import LinkManagement from "@/components/shared/link-management";
import ProfileViewCard from "@/components/shared/profile-view-card";
import { auth } from "@/lib/auth";
import { Link, User } from "@/lib/generated/prisma";
import { getUserData } from "@/lib/actions/user-actions";
import { headers } from "next/headers";

export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const userData = await getUserData(user?.id as string);
  return (
    <div className="w-full h-full py-4 flex flex-col gap-4 items-center">
      {/* <ProfileViewCard user={userData as User & {links: Link[]}} /> */}
      <LinkManagement userId={user?.id as string} />
    </div>
  );
}
