// import { PixelPreview } from "@/components/shared/pixel-preview";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  return (
    <div className="w-full h-full py-4">
      <div className="flex flex-row gap-1">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={user?.image as string} alt={user?.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user?.name}</span>
          <span className="text-muted-foreground truncate text-xs">
            {user?.email}
          </span>
        </div>
      </div>
    </div>
  );
}
