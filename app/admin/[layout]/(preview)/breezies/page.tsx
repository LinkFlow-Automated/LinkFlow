import LinkManagement from "@/components/shared/link-management";
import ProfileViewCard from "@/components/shared/profile-view-card";
import { auth } from "@/lib/auth";
import { Link, Profile, User } from "@/lib/generated/prisma";
import { getUserData } from "@/lib/actions/user-actions";
import { headers } from "next/headers";
import { getAllTenants } from "@/lib/actions/tenant.action";

export default async function page({
  params,
}: {
  params: Promise<{ layout: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const paramsName = await params;
  const tenantName = paramsName.layout;

  // Get user data with profiles
  const userData = await getUserData(user?.id as string);

  // Find the current profile/tenant
  const currentProfile = userData?.profiles.find(
    (profile) => profile.username === tenantName
  );

  if (!userData || !currentProfile) {
    return <div>Profile not found</div>;
  }

  // Transform the data to match the expected format
  const userWithLinks = {
    ...userData,
    links: currentProfile.links,
  };

  console.log(currentProfile);

  return (
    <div className="w-full h-full py-4 flex flex-col gap-4 items-center">
      <ProfileViewCard user={currentProfile as Profile & { links: Link[] }} />
      <LinkManagement
        profileId={currentProfile.id as string}
        userId={user?.id as string}
      />
    </div>
  );
}
