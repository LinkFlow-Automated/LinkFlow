import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FiMessageCircle, FiSend } from "react-icons/fi";
import { HiHeart } from "react-icons/hi2";
import { CiBookmark } from "react-icons/ci";
import Image from "next/image";

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
  return (
    <Card className="m-0 p-0 gap-0">
      <CardHeader className="flex flex-row justify-between p-0 m-0 h-fit">
        <div className="flex-row flex items-center p-2 gap-2">
          <Avatar className="h-10 w-10 rounded-full grayscale">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
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

