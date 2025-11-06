"use client"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { useImageColor } from "@/hooks/use-image-color";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { CiPlay1 } from "react-icons/ci";
import { TbEye } from "react-icons/tb";

export default function NewVideoCard() {
  const video = {
    image: "/test/heart.jpg",
    title: "Bubble sort for the noob",
    views: "36k",
    likes: "6k",
    description: "The Check-Out Process: When the guest checks out, they see this complete list on your Booking Page. The Pay Final Bill button here will be your most complex payment screen, as it must handle a large bill being paid by multiple methods (e.t., part in USD cash, the rest on a credit card)."
  }

  const { backgroundColor, textColor, imgRef } = useImageColor(video.image);

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
    <Card className="m-0 p-2 gap-4">
      <CardContent className="m-0 p-0 relative">
        <Image className="w-full h-full object-cover rounded-xl" src={video.image} width={1000} height={1000} alt={`image of ${video.title}`} />
        <CiPlay1
          className="absolute left-2 bottom-2 flex items-center justify-center text-white text-sm opacity-80 hover:opacity-100 cursor-pointer"
        />
        <span
          className="absolute right-2 bottom-2 flex items-center justify-center text-white text-sm opacity-80 hover:opacity-100 cursor-pointer"
        >24:00</span>
      </CardContent>
      <CardFooter className="m-0 p-0 flex flex-col items-start gap-2">
        <CardTitle>{video.title}</CardTitle>
        <CardDescription className=" line-clamp-2">{video.description}</CardDescription>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row text-xs gap-1 items-center">
            <TbEye />
            <span>{video.views} views</span>
          </div>
          <div className="flex flex-row text-xs gap-1 items-center">
            <AiOutlineLike />
            <span>{video.likes} likes</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

