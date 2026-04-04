import LinkManagement from "@/components/shared/link-management";
import ProfileViewCard from "@/components/shared/profile-view-card";
import { PreviewHydrator } from "@/components/shared/preview-hydrator";
import { auth } from "@/lib/auth";
import { Link, Profile } from "@/lib/generated/prisma";
import { getUserData } from "@/lib/actions/user-actions";
import { headers } from "next/headers";

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

  // Hydrate the preview store with server data
  const previewData = {
    displayName: currentProfile.displayName,
    username: currentProfile.username,
    bio: currentProfile.bio,
    image: currentProfile.image,
    backgroundColor: currentProfile.backgroundColor,
    textColor: currentProfile.textColor,
    buttonStyle: currentProfile.buttonStyle,
    links: (currentProfile.links || [])
      .filter((l: Link) => !l.platform) // standard links only
      .map((link: Link) => ({
      id: link.id,
      title: link.title,
      url: link.url,
      order: link.order ?? 0,
    })),
    widgets: (currentProfile.links || [])
      .filter((l: Link) => !!l.platform) // integrations
      .map((link: Link) => {
         return {
            id: link.id,
            type: link.platform || "",
            position: link.order ?? 0,
            config: {
               ...(typeof link.metadata === 'object' && link.metadata !== null ? link.metadata : {}),
               title: link.title,
               description: link.description,
               thumbnail: link.thumbnail,
               url: link.url,
            }
         };
      }),
  };

  return (
    <div className="w-full h-full py-4 flex flex-col gap-4 items-center">
      {/* Hydrate the Zustand preview store */}
      <PreviewHydrator data={previewData} />

      <ProfileViewCard user={currentProfile as Profile & { links: Link[] }} />
      <LinkManagement
        profileId={currentProfile.id as string}
        userId={user?.id as string}
      />
    </div>
  );
}
