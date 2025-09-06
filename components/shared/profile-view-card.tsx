import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSpotify,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiLeetcode, SiWakatime } from "react-icons/si";
import ImageUploadForm from "./forms/image-upload-form";

export default function ProfileViewCard() {
  const user = {
    name: "Anshul",
    bio: "Software Developer",
    avatar: "https://github.com/anshul-01.png",
  };
  const icons = [
    {
      icon: FaGithub,
      label: "Github",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
    },
    {
      label: "Instagram",
      icon: FaInstagram,
    },
    {
      label: "Twitter",
      icon: FaTwitter,
    },
    {
      label: "Spotify",
      icon: FaSpotify,
    },
    {
      label: "LeetCode",
      icon: SiLeetcode,
    },
    {
      label: "Youtube",
      icon: FaYoutube,
    },
    {
      label: "Wakatime",
      icon: SiWakatime,
    },
  ];
  return (
    <div>
      <div
        // size="lg"
        className=" flex flex-row gap-2 max-w-md min-w-md"
      >
        {/* <Avatar className="size-16 rounded-full">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg">
            {user.name.split(" ")[0]}
          </AvatarFallback>
        </Avatar> */}
        <ImageUploadForm />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="text-muted-foreground truncate text-md">
            {user.bio}
          </span>
          <div className="flex flex-row gap-2">
            {icons.map((icon) => (
              <div key={icon.label}>
                <icon.icon className="size-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
