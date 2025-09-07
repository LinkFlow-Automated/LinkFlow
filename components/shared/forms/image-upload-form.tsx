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

// accept image or video
const fileUploadeSchema = z.object({
  imageOrVide: z.string().min(1, "Image or Video is required"),
});

export default function ImageUploadForm() {
  const user = {
    name: "Anshul",
    avatar: "https://github.com/anshul-01.png",
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="size-16 rounded-full cursor-pointer">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg">
            {user.name.split(" ")[0]}
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <PopoverWrapper title="Upload a photo or a gif">test</PopoverWrapper>
        <PopoverWrapper title="Upload a video">test</PopoverWrapper>
      </DialogContent>
    </Dialog>
  );
}
