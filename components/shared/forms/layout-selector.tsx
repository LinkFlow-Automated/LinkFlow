import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TooltipWrapper from "../tooltip-wrapper";
import { RiLayout4Fill } from "react-icons/ri";
import { Link } from "@/lib/generated/prisma";

export default function LayoutSelector({link}:{link:Link}) {
  return (
    <Dialog>
      <TooltipWrapper content="Select Layout">
        <DialogTrigger asChild>
          <RiLayout4Fill className="size-5" />
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <RiLayout4Fill className="size-5" />
            <DialogTitle>Select Layout</DialogTitle>
          </div>
          <DialogDescription>Select the layout for the link</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
