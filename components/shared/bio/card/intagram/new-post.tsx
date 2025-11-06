"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FiMessageCircle, FiSend } from "react-icons/fi";
import { HiHeart } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import Image from "next/image";
import { useImageColor } from "@/hooks/use-image-color";

export default function NewPostCard({
  user,
  postUrl
}: {
  user: {
    name: string;
    avatar: string;
  },
  postUrl: string
}) {

  const { backgroundColor, textColor, imgRef } = useImageColor(postUrl);

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
      <CardHeader className="flex flex-row justify-between p-0 m-0 h-fit">
        <div className="flex-row flex items-center p-2 gap-2">
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold">{user.name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className=" h-full p-0 m-0">
        <Image src={postUrl} width={1000} height={1000} alt="photo of" className="object-cover w-full h-full" />
      </CardContent>
      <CardFooter className="flex flex-row justify-between m-0 p-2">
        <div className="flex flex-row gap-2 w-fit max-w-fit">
          <HiHeart />
          <FiMessageCircle />
          <FiSend />
        </div>
        <div>
          <CiBookmark />
        </div>
      </CardFooter>
    </Card>
  )
}

