import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfileInstaCard({
  user
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  }
}) {
  return (
    <Card className="m-0 p-0">
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">{user.name.split(" ").filter(Boolean).map(l => l[0].toUpperCase()).join("").slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-row flex-1 text-left text-sm leading-tight">
            <span>Post</span>
            <span>Follower Number</span>
            <span>Following Number</span>
          </div>
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {user.email}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

