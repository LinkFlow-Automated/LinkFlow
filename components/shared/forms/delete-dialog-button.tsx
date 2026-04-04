import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useManageLink } from "@/hooks/use-manage-link";
import { Link } from "@/lib/generated/prisma";
import { HiTrash } from "react-icons/hi2";
import TooltipWrapper from "../tooltip-wrapper";

export default function DeleteDlogButton({ link }: { link: Link }) {
  const { deleteLink, isDeleting } = useManageLink(link.profileId);
  return (
    <Dialog>
      <TooltipWrapper content="Delete Link">
        <DialogTrigger asChild className="cursor-pointer">
          <HiTrash className="size-5" />
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <HiTrash className="size-5" />
            <DialogTitle>Delete this Link</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete this link?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => deleteLink(link.id)}
            variant="destructive"
            className="cursor-pointer"
            disabled={isDeleting}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
