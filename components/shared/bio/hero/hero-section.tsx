import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FaSpotify, FaYoutube } from "react-icons/fa6";
import { SiLeetcode, SiWakatime } from "react-icons/si";

export default function HeroSection() {
  const user = {
    name: "Anshul",
    bio: "Artist and Beatmaker",
    avatar: "https://github.com/anshul-01.png",
  };
  const icons = [
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
      <div className="m-0 p-0"></div>
      <div className={cn("flex flex-col items-center gap-1")}>
        <Avatar className={cn("size-18 rounded-full")}>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg">
            {user.name.split(" ")[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 leading-tight items-center flex flex-col gap-1">
          <div className="leading-tight items-center flex flex-col">
            <span className={cn("truncate font-medium text-xl")}>
              {user.name}
            </span>
            <span className={cn("text-muted-foreground truncate text-md")}>
              {user.bio}
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            {icons.map((icon) => (
              <div key={icon.label}>
                <icon.icon
                  className={cn(
                    "size-5 text-muted-foreground hover:text-primary cursor-pointer"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
