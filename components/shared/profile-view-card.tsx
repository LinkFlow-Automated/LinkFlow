import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  // FaTwitter,
  // FaYoutube,
} from "react-icons/fa6";
// import { SiLeetcode, SiWakatime } from "react-icons/si";
import ImageUploadForm from "./forms/image-upload-form";
import { Link, User } from "@/lib/generated/prisma";
import AddSocialIcon from "./forms/add-social-icon";
import { cn } from "@/lib/utils";
import { RiTwitterXFill } from "react-icons/ri";
import ProfileForm from "./forms/profile-form";

export default function ProfileViewCard({
  user,
}: {
  user: User & { links: Link[] };
}) {
  // const user = {
  //   name: "Anshul",
  //   bio: "Software Developer",
  //   avatar: "https://github.com/anshul-01.png",
  // };
  const icons = [
    {
      icon: FaGithub,
      label: "Github",
      className: "text-primary"
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      className: "text-blue-500"
    },
    {
      label: "Instagram",
      icon: FaInstagram,
      className: "text-red-400"
    },
    {
      label: "Twitter",
      icon: RiTwitterXFill,
      className: "text-primary"
    },
    {
      label: "Spotify",
      icon: FaSpotify,
      className: "text-green-500"
    },
    // {
    //   label: "LeetCode",
    //   icon: SiLeetcode,
    // },
    // {
    //   label: "Youtube",
    //   icon: FaYoutube,
    // },
    // {
    //   label: "Wakatime",
    //   icon: SiWakatime,
    // },
  ];
  return (
    <div className="w-fit">
      <div
        // size="lg"
        className=" flex flex-row gap-1.5 max-w-md md:min-w-md"
      >
        <ImageUploadForm user={user as User} />
        <div className="grid flex-1 text-left text-sm leading-tight">
         <ProfileForm userData={user} placeHolder="Test"/>
          <div className="flex flex-row gap-1.5 items-center">
            {icons.map((icon) => (
              // <div key={icon.label}>
                <icon.icon
                  key={icon.label}
                  className={cn(`size-5 text-muted-foreground hover:text-primary cursor-pointer`, icon.className)}
                />
              // </div>
            ))}
            <AddSocialIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
