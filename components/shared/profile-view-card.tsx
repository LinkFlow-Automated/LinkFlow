import ImageUploadForm from "./forms/image-upload-form";
import { Link, Profile } from "@/lib/generated/prisma";
import AddSocialIcon from "./forms/add-social-icon";
import { cn } from "@/lib/utils";
import ProfileForm from "./forms/profile-form";
import { parseSocialLinks, socialPlatform } from "@/lib/social-platforms";

export default function ProfileViewCard({
  user,
}: {
  user: Profile & { links: Link[] };
}) {
  const socials = parseSocialLinks(user.socialLinks);

  return (
    <div className="w-fit">
      <div className=" flex flex-row gap-1.5 max-w-md md:min-w-md">
        <ImageUploadForm user={user as Profile} />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <ProfileForm userData={user} placeHolder="Test" />
          <div className="flex flex-row gap-1.5 items-center flex-wrap">
            {socials.map((social) => {
              const platform = socialPlatform(social.platform);
              if (!platform) return null;
              const Icon = platform.icon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform.label}
                >
                  <Icon
                    className={cn(
                      "size-5 text-muted-foreground hover:text-primary cursor-pointer",
                      platform.className
                    )}
                  />
                </a>
              );
            })}
            <AddSocialIcon
              profileId={user.id}
              socialLinks={user.socialLinks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
