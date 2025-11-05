import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfileInstaCard({
  user
}: {
  user: {
    name: string;
    avatar: string;
  }
}) {
  return (
    <Card className="m-0 p-0 gap-0">
      <CardContent className="flex flex-col gap-3 p-2">
        <div className="flex flex-row justify-between items-center">
          <div>
            <Avatar className="h-12 w-12 rounded-lg grayscale">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">{user.name.split(" ").filter(Boolean).map(l => l[0].toUpperCase()).join("").slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-row flex-1 text-left w-1/2 text-xs justify-center leading-tight gap-1.5 items-center">
            <div className="flex flex-col gap-1 ">
              <span>100</span>
              <span>Posts</span>
            </div>
            <div className="flex flex-col gap-1 ">
              <span>58k</span>
              <span>Followers</span>
            </div>
            <div className="flex flex-col gap-1 ">
              <span>300</span>
              <span>Followings</span>
            </div>
          </div>
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
        </div>
      </CardContent>
    </Card>
  )
}

