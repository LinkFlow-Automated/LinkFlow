"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useImageColor } from "@/hooks/use-image-color";

export default function ProfileInstaCard({
  user
}: {
  user: {
    name: string;
    avatar: string;
  }
}) {

  const { backgroundColor, textColor, imgRef } = useImageColor(user.avatar);

  const layoutConfig = {
    compact: {
      padding: "p-2",
      imageSize: "h-12 w-12",
      imageSizeNum: 48,
      titleSize: "text-sm",
      subtitleSize: "text-xs",
      iconSize: "size-5",
      gap: "gap-2",
      showBadge: false,
      showDetails: false,
    },
    minimal: {
      padding: "p-3",
      imageSize: "h-18 w-18",
      imageSizeNum: 64,
      titleSize: "text-base",
      subtitleSize: "text-sm",
      iconSize: "size-6",
      gap: "gap-3",
      showBadge: true,
      showDetails: false,
    },
    detailed: {
      padding: "p-4",
      imageSize: "h-20 w-20",
      imageSizeNum: 80,
      titleSize: "text-lg",
      subtitleSize: "text-base",
      iconSize: "size-8",
      gap: "gap-4",
      showBadge: true,
      showDetails: true,
    },
  };

  // const config = layoutConfig[layout];

  return (
    <Card className="m-0 p-0 gap-0">
      <CardContent className="flex flex-col gap-3 p-2">
        <div className="flex flex-row justify-between items-center">
          <div>
            <Avatar className="h-18 w-18 rounded-full">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">{user.name.split(" ").filter(Boolean).map(l => l[0].toUpperCase()).join("").slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="text-left text-sm leading-tight self-start">
              <span className="truncate font-bold">{user.name}</span>
            </div>

            <div className="flex flex-row flex-1 text-left w-full text-xs justify-center leading-tight gap-1.5 items-center">
              <div className="flex flex-col gap-1 items-center">
                <span className="font-bold">100</span>
                <span>Posts</span>
              </div>
              <div className="flex flex-col gap-1 items-center ">
                <span className="font-bold">58k</span>
                <span>Followers</span>
              </div>
              <div className="flex flex-col gap-1 items-center ">
                <span className="font-bold">300</span>
                <span>Followings</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

