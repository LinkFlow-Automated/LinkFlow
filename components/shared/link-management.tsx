"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItems from "./sortable-item";
import { useState } from "react";
import { GripVertical } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LinkManagement() {
  const [items, setItems] = useState([
    { id: 1, context: "Dashboard Overview" },
    { id: 2, context: "User Management" },
    { id: 3, context: "Analytics Reports" },
    { id: 4, context: "Settings & Configuration" },
  ]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragEvent = (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const activeIndex = items.findIndex(
          (item) => item.id === Number(active.id)
        );
        const overIndex = items.findIndex(
          (item) => item.id === Number(over.id)
        );
        const newItems = [...items];
        newItems.splice(activeIndex, 1);
        newItems.splice(overIndex, 0, items[activeIndex]);
        return newItems;
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const getActiveItem = () => {
    return items.find((item) => item.id === activeId);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEvent}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {items.map((item) => (
              <SortableItems
                key={item.id}
                id={item.id.toString()}
                context={item.context}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay
          adjustScale={false}
          dropAnimation={{
            duration: 200,
            easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
          }}
        >
          {activeId ? (
            <Card className="shadow-2xl border-primary/20 bg-background/95 backdrop-blur-sm">
              <div className="flex items-center gap-3 p-4">
                <GripVertical className="h-4 w-4 text-muted-foreground/60" />
                <span className="text-foreground font-medium">
                  {getActiveItem()?.context}
                </span>
              </div>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
