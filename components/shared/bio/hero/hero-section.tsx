import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaSpotify, FaYoutube } from "react-icons/fa6";
import { SiLeetcode, SiWakatime } from "react-icons/si";

export default function HeroSection() {
  const user = {
    name: "Aurora",
    bio: "Aurora Aksnes, known mononymously as Aurora, is a Norwegian singer, songwriter and record producer. Born in Stavanger and raised in Høle and Os, she started writing songs and learning dance at age six",
    avatar: "/test/aurora.jpg",
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
      <div className="m-0 p-0 h-24">
        <Image
          className="h-full w-full object-cover"
          width={1000}
          height={1000}
          alt=""
          src={"/Sun.jpg"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div
        className={cn(
          "flex flex-col items-center gap-1 -mt-11 relative justify-center"
        )}
      >
        <Avatar className={cn("size-22 rounded-full")}>
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
            <div className="text-center px-2">
              <p className={cn("text-muted-foreground text-xs")}>
                {user.bio}
              </p>
            </div>
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
