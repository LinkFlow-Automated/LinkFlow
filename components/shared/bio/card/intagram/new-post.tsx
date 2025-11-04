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
    email: string;
    avatar: string;
  },
  postUrl: string
}) {
  return (
    <Card className="m-0 p-0">
      <CardHeader className="flex flex-row justify-between">
        <div className="">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Image src={postUrl} width={1000} height={1000} alt="photo of" className="object-cover w-full h-full" />
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
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

