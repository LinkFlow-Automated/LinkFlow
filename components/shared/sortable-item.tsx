import { cn } from "@/lib/utils";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Card } from "@/components/ui/card";

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

  return (
    <Card
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      key={id}
      data-sortable-id={id}
      className={cn(
        "cursor-grab touch-none transition-all duration-200 hover:shadow-md active:cursor-grabbing",
        isDragging && "z-50 opacity-60 shadow-lg scale-105 rotate-2"
      )}
    >
      <div className="flex items-center gap-3 p-4">
        <GripVertical className="h-4 w-4 text-muted-foreground/60 hover:text-muted-foreground transition-colors" />
        <span className="text-foreground font-medium select-none">
          {context}
        </span>
      </div>
    </Card>
  );
}
