import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { FaSpotify } from "react-icons/fa6";

export default function LinkCard() {
  return (
    <Card className="p-3 bg-green-600">
      <CardContent className="flex flex-row justify-between p-0 m-0 items-center">
        <div className="flex flex-row gap-4">
          <FaSpotify className="size-8" />
          <div className="flex flex-col">
            <span className="leading-relaxed text-lg">Spotify</span>
          </div>
        </div>
        <MoreVertical className="size-4 text-muted-foreground" />
      </CardContent>
    </Card>
  );
}
