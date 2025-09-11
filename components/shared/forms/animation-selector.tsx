import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TooltipWrapper from "../tooltip-wrapper";
import { MdAnimation } from "react-icons/md";

export default function AnimationSelector() {
  return (
    <Dialog>
      <TooltipWrapper content="Animate link">
        <DialogTrigger asChild>
          <MdAnimation className="size-5" />
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MdAnimation className="size-5" />
            <DialogTitle>Animate link</DialogTitle>
          </div>
          <DialogDescription>
            Select the animation for the link
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
