import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TooltipWrapper from "../tooltip-wrapper";
import { IoAddCircle } from "react-icons/io5";

export default function AddSocialIcon() {
  return (
    <Dialog>
      <TooltipWrapper content="Add icon">
        <DialogTrigger className="cursor-poointer" asChild>
          <IoAddCircle className="size-5 text-muted-foreground hover:text-primary cursor-pointer" />
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <IoAddCircle className="size-5" />
            <DialogTitle>Add Social Icon</DialogTitle>
          </div>
          <DialogDescription>
            Select a platform and enter the full URL to your profile.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
