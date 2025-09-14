import { cn } from "@/lib/utils";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { IoLockClosed } from "react-icons/io5";
import { FaGripVertical } from "react-icons/fa6";
import BaseLinkForm from "./forms/base-link-form";
import { ABTestingForm } from "./forms/ab-testing-form";
import { ClickLimitsSchedulingForm } from "./forms/click-limit-sheclduling";
import { GeographicTargetingForm } from "./forms/geo-target-form";
import { DeviceBrowserTargetingForm } from "./forms/device-browser-targeting-form";
import { Link } from "@/lib/generated/prisma";
import DeleteDlogButton from "./forms/delete-dialog-button";
import ArchiveDialogButton from "./forms/archive-dialog-button";
import LayoutSelector from "./forms/layout-selector";
import AnimationSelector from "./forms/animation-selector";
import RedirectForm from "./forms/redirect-form";

export default function SortableItems({
  id,
  link,
}: {
  id: UniqueIdentifier;
  link: Link;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const iconsSocials = [
    {
      name: "Lock",
      icon: IoLockClosed,
    },
  ];

  return (
    <Card
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      data-sortable-id={id}
      className={cn("flex flex-row")}
    >
      <div className="flex items-center gap-3 p-1 w-fit">
        <FaGripVertical
          className={cn(
            "cursor-grab touch-none transition-all duration-200 hover:shadow-md active:cursor-grabbing h-8 w-8 text-muted-foreground/60 hover:text-muted-foreground transition-color",
            isDragging && "z-50 opacity-60 shadow-lg scale-105 rotate-2"
          )}
        />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div className="flex-1">
          <BaseLinkForm link={link} />
        </div>
        <div className="flex items-center gap-1.5 md:gap-4">
          <LayoutSelector link={link} />
          <RedirectForm link={link} />
          {/* {iconsSocials.map((item) => (
            <item.icon className="size-5" key={item.name} />
          ))} */}
          <AnimationSelector link={link} />
          <DeviceBrowserTargetingForm link={link} />
          <GeographicTargetingForm link={link} />
          <ClickLimitsSchedulingForm link={link} />
          <ABTestingForm link={link} />
          <ArchiveDialogButton link={link} />
          <DeleteDlogButton link={link} />
        </div>
      </div>
    </Card>
  );
}