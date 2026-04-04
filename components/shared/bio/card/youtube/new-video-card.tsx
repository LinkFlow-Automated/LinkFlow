"use client"

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { useImageColor } from "@/hooks/use-image-color";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { CiPlay1 } from "react-icons/ci";
import { TbEye } from "react-icons/tb";

export default function NewVideoCard({
  title,
  description,
  thumbnail,
  url,
  statistics,
  duration
}: {
  title?: string;
  description?: string;
  thumbnail?: string;
  url?: string;
  statistics?: string | any;
  duration?: number; // durationMs
}) {
  let statsObj: any = {};
  if (typeof statistics === "string") {
    try {
      statsObj = JSON.parse(statistics);
    } catch (e) { }
  } else if (statistics) {
    statsObj = statistics;
  }

  const formatCount = (count: string) => {
    if (!count) return "0";
    const num = parseInt(count, 10);
    if (Number.isNaN(num)) return count;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const fmtDuration = (ms: number) => {
    if (!ms) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = Math.floor(totalSeconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const video = {
    image: thumbnail || "/test/heart.jpg",
    title: title || "Bubble sort for the noob",
    views: formatCount(statsObj.viewCount) || "36k",
    likes: formatCount(statsObj.likeCount) || "6k",
    description: description || "The Check-Out Process: When the guest checks out, they see this complete list on your Booking Page...",
    url: url ? `https://youtube.com/watch?v=${url}` : "#",
    formattedDuration: fmtDuration(duration || 0)
  }

  const { backgroundColor, textColor, imgRef } = useImageColor(video.image);

  return (
    <Card className="m-0 p-2 gap-4 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.open(video.url, '_blank')}>
      <CardContent className="m-0 p-0 relative">
        <Image className="w-full h-full object-cover rounded-xl max-h-48" src={video.image} width={1000} height={1000} alt={`image of ${video.title}`} />
        <CiPlay1
          className="absolute left-2 bottom-2 flex items-center justify-center text-white text-3xl opacity-80"
        />
        <span
          className="absolute right-2 bottom-2 flex items-center justify-center text-white text-xs bg-black/60 px-1 py-0.5 rounded shadow-sm opacity-80"
        >{video.formattedDuration}</span>
      </CardContent>
      <CardFooter className="m-0 p-0 pt-3 flex flex-col items-start gap-1">
        <CardTitle className="text-base">{video.title}</CardTitle>
        <CardDescription className="text-xs line-clamp-2">{video.description}</CardDescription>
        <div className="flex flex-row gap-3 mt-1 text-muted-foreground">
          <div className="flex flex-row text-xs gap-1 items-center">
            <TbEye className="size-4" />
            <span>{video.views} views</span>
          </div>
          <div className="flex flex-row text-xs gap-1 items-center">
            <AiOutlineLike className="size-4" />
            <span>{video.likes} likes</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
