import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TooltipWrapper from "../tooltip-wrapper";
import { RiImageAddFill } from "react-icons/ri";

export default function AddLinkThumbnail() {
  return (
    <Dialog>
      <TooltipWrapper content="Add thumbnail to your link">
        <DialogTrigger asChild className="cursor-pointer">
          <RiImageAddFill className="size-5" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              <RiImageAddFill className="size-5" />
              <DialogTitle>Add a Custom Thumbnail</DialogTitle>
            </div>
            <DialogDescription>
              Make your link more engaging by adding a visual preview. For best results, use a
              high-quality JPG, PNG, or WEBP.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </TooltipWrapper>
    </Dialog>
  );
}
