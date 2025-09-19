"use client";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  // KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  // sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItems from "./sortable-item";
import { useState } from "react";
import { GripVertical, Loader2, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useManageLink } from "@/hooks/use-manage-link";
import LinkHub from "./link-hub";
import { toast } from "sonner";
// Import your auth hook or user context
// import { useAuth } from "@/hooks/use-auth";

interface LinkManagementProps {
  userId: string; // Pass userId as prop or get from auth context
}

export default function LinkManagement({ userId }: LinkManagementProps) {
  const { createLink, updateLink, links, isCreating, isLoading } =
    useManageLink(userId);

  const items = links || [];
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragEvent = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeIndex = items.findIndex((item) => item.id === active.id);
    const overIndex = items.findIndex((item) => item.id === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    // Create new array with reordered items
    const newItems = [...items];
    const [movedItem] = newItems.splice(activeIndex, 1);
    newItems.splice(overIndex, 0, movedItem);

    // Update the order field for all affected items
    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    // Update each item that had its position changed
    updatedItems.forEach((item, index) => {
      const originalItem = items.find((i) => i.id === item.id);
      if (originalItem && item.order !== originalItem.order) {
        updateLink({
          ...originalItem,
          order: index + 1,
        });
      }
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleCreateLink = () => {
    const currentTime = Date.now();
    const newOrder =
      items.length > 0
        ? Math.max(...items.map((item) => item.order || 0)) + 1
        : 1;

    createLink({
      userId: userId, // Use the passed userId or user?.id from auth
      title: `New Link ${currentTime}`,
      description: null,
      url: "https://example.com",
      category: null,
      order: newOrder,
      isHadRedirectLink: false,
      layout: "",
      animation: "none",
      themeOverrides: {},
      redirectTo: "",
      clicks: 0,
      featured: false,
      autoSyncId: null,
      platform: null,
      thumbnail: "",
      type: "image",
      isArchived: false,
      visibility: "PUBLIC",
      scheduledAt: null,
      expiresAt: null,
      rules: {}, // Adjust based on your rulesSchema structure
      // createdAt: new Date(),
      metadata: {},
    });
    toast.success("Link created")
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
    // useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const getActiveItem = () => {
    return items.find((item) => item.id === activeId);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Add Link Button */}
      <div className="w-full flex justify-center md:justify-end">
        {/* <Button
          onClick={handleCreateLink}
          disabled={isCreating}
          // size="lg"
          className="flex items-center gap-2 justify-center cursor-pointer w-fit "
        >
          <Plus className="size-4" />
          {isCreating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Add Link"
          )}
        </Button> */}
        <LinkHub handleCreateLink={handleCreateLink} />
      </div>

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
            {items
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((item) => (
                <SortableItems
                  key={item.id}
                  id={item.id.toString()}
                  link={item}
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
                  {getActiveItem()?.title}
                </span>
              </div>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Show loading or empty state */}
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>Loading links...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No links yet. Click "Add Link" to create your first link.</p>
        </div>
      ) : null}
    </div>
  );
}
