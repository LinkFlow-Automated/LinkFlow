import { Link } from "@/lib/generated/prisma";
import { Dialog } from "@radix-ui/react-dialog";
import TooltipWrapper from "../tooltip-wrapper";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdArchive, MdUnarchive } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useManageLink } from "@/hooks/use-manage-link";

export default function ArchiveDialogButton({ link }: { link: Link }) {
  const { updateLink, isUpdating } = useManageLink(link.userId);
  return (
    <Dialog>
      {!link.isArchived ? (
        <TooltipWrapper content="Archive Link">
          <DialogTrigger asChild className="cursor-pointer">
            <MdArchive className="size-5" />
          </DialogTrigger>
        </TooltipWrapper>
      ) : (
        <TooltipWrapper content="Unarchive Link">
          <DialogTrigger asChild className="cursor-pointer">
            <MdUnarchive className="size-5" />
          </DialogTrigger>
        </TooltipWrapper>
      )}
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            {link.isArchived ? (
              <MdUnarchive className="size-5" />
            ) : (
              <MdArchive className="size-5" />
            )}
            <DialogTitle>
              {link.isArchived ? "Unarchive Link" : "Archive Link"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {link.isArchived
              ? "This will restore the link to your main dashboard, making it visible with your other active links."
              : "This action will hide the link from your main list to keep your dashboard organized. The link itself will remain active and continue to work."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="cursor-pointer" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() =>
                updateLink({
                  id: link.id,
                  isArchived: !link.isArchived,
                })
              }
              className="cursor-pointer"
              variant="secondary"
              disabled={isUpdating}
            >
              {/* {link.isArchived ? "Unarchive" : "Archive"} */}
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
