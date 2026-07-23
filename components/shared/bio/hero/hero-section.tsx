import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaSpotify, FaYoutube } from "react-icons/fa6";
import { SiLeetcode, SiWakatime } from "react-icons/si";

interface HeroSectionProps {
  name?: string;
  bio?: string;
  avatar?: string | null;
  coverImage?: string;
  socialIcons?: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
  }[];
}

const defaultIcons = [
  { label: "Spotify", icon: FaSpotify },
  { label: "LeetCode", icon: SiLeetcode },
  { label: "Youtube", icon: FaYoutube },
  { label: "Wakatime", icon: SiWakatime },
];

export default function HeroSection({
  name = "Your Name",
  bio = "",
  avatar,
  coverImage = "/Sun.jpg",
  socialIcons = defaultIcons,
}: HeroSectionProps) {
  return (
    <div>
      <div className="relative m-0 p-0 h-24">
        <Image
          className="h-full w-full object-cover"
          width={1000}
          height={1000}
          alt=""
          src={coverImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
      <div
        className={cn(
          "flex flex-col items-center gap-1 -mt-11 relative justify-center"
        )}
      >
        <Avatar className={cn("size-22 rounded-full")}>
          <AvatarImage src={avatar ?? undefined} alt={name} />
          <AvatarFallback className="rounded-lg">
            {name.split(" ")[0]?.[0] ?? "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 leading-tight items-center flex flex-col gap-1">
          <div className="leading-tight items-center flex flex-col">
            <span className={cn("truncate font-medium text-xl")}>
              {name}
            </span>
            {bio && (
              <div className="text-center px-2">
                <p className={cn("text-muted-foreground text-xs")}>
                  {bio}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-2 items-center">
            {socialIcons.map((icon) =>
              icon.href ? (
                <a
                  key={icon.label}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                >
                  <icon.icon
                    className={cn(
                      "size-5 text-muted-foreground hover:text-primary cursor-pointer"
                    )}
                  />
                </a>
              ) : (
                <div key={icon.label}>
                  <icon.icon
                    className={cn(
                      "size-5 text-muted-foreground hover:text-primary cursor-pointer"
                    )}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
