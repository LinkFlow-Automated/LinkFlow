import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import z from "zod";
import PopoverWrapper from "../popover-wrapper";
import { User } from "better-auth";
import UploadFile from "../upload-file";
import { Profile } from "@/lib/generated/prisma";

// accept image or video
const fileUploadeSchema = z.object({
  imageOrVideo: z.string().min(1, "Image or Video is required"),
});

export default async function ImageUploadForm({ user }: { user: Profile }) {

  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="size-16 rounded-full cursor-pointer">
          <AvatarImage className="object-cover" src={user?.image || undefined} alt={user.username} />
          <AvatarFallback className="rounded-lg">
            {user.username.split(" ")[0]}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <PopoverWrapper title="Upload a photo or a gif"><UploadFile userId={user.id}/></PopoverWrapper>
        <PopoverWrapper title="Upload a video">test</PopoverWrapper>
      </DialogContent>
    </Dialog>
  );
}
