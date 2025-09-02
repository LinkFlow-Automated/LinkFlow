import { cn } from "@/lib/utils";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { MdAnimation } from "react-icons/md";
import { TiWorld } from "react-icons/ti";
import { IoLockClosed } from "react-icons/io5";
import { RiLayout4Fill, RiShareForwardFill } from "react-icons/ri";
import { PiDevicesFill } from "react-icons/pi";
import { FaGripVertical } from "react-icons/fa6";
import { HiBeaker } from "react-icons/hi2";
import { AiFillSchedule } from "react-icons/ai";

export default function SortableItems({
  id,
  context,
}: {
  id: UniqueIdentifier;
  context: string;
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
      name: "Layout",
      icon: RiLayout4Fill,
    },
    {
      name: "Devices target",
      icon: PiDevicesFill,
    },
    {
      name: "Geo Target",
      icon: TiWorld,
    },
    {
      name: "Click Limits & Scheduling",
      icon: AiFillSchedule,
    },
    {
      name: "AB Testing",
      icon: HiBeaker,
    },
    {
      name: "Forward Link",
      icon: RiShareForwardFill,
    },
    {
      name: "Animate",
      icon: MdAnimation,
    },
    {
      name: "Lock",
      icon: IoLockClosed,
    },
  ]

  return (
    <Card
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      key={id}
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
          <span className="text-foreground font-medium select-none">
            {context}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {iconsSocials.map((item, i) => (
            <item.icon className="size-4" key={item.name} />
          ))}
        </div>
      </div>
    </Card>
  );
}
