"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MdAnimation } from "react-icons/md";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import z from "zod";
import { animationOptions, AnimationType } from "@/lib/utils/card-animation";
import TooltipWrapper from "../tooltip-wrapper";
import { AnimationPreview } from "../animation-preview";
import { toast } from "sonner";
import { Link } from "@/lib/generated/prisma";
import { useManageLink } from "@/hooks/use-manage-link";
import { Loader2 } from "lucide-react";

const animationSchema = z.object({
  animationStyle: z.string().optional(),
});

type AnimationFormData = z.infer<typeof animationSchema>;

interface AnimationSelectorProps {
  onAnimationSelect?: (animation: AnimationType) => void;
  defaultAnimation?: AnimationType;
  link: Link;
}

export default function AnimationSelector({
  onAnimationSelect,
  link,
}: AnimationSelectorProps) {
  const { updateLink, isUpdating } = useManageLink(link.profileId);
  const [open, setOpen] = useState(false);
  const [selectedAnimation, setSelectedAnimation] =
    useState<AnimationType>("none");

  const form = useForm<AnimationFormData>({
    resolver: zodResolver(animationSchema),
    defaultValues: {
      animationStyle: link.animation as AnimationType,
    },
  });

  const handleAnimationSelect = (animation: AnimationType) => {
    setSelectedAnimation(animation);
    form.setValue("animationStyle", animation);
    onAnimationSelect?.(animation);
  };

  const handleSubmit = async () => {
    try {
      await updateLink({
        id: link.id,
        animation: selectedAnimation,
      });
      toast.success(`Animation has been updated to ${selectedAnimation}`);
      setOpen(false);
    } catch (error) {
      toast.error("Error updating animation");
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
    setSelectedAnimation("none");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper content="Animate link">
        <DialogTrigger asChild>
          <MdAnimation className="size-5" />
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="max-w-6xl max-h-[80vh] min-w-4xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MdAnimation className="size-5" />
            <DialogTitle>Add an Animation Effect</DialogTitle>
          </div>
          <DialogDescription>
            Make your link stand out and grab your audience's attention. Select
            an animation from the options below to see a live preview.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="animationStyle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {animationOptions.map((option) => (
                        <Card
                          key={option.value}
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md p-0 ${selectedAnimation === option.value
                              ? "ring-2 ring-primary border-primary"
                              : "hover:border-primary/50"
                            }`}
                          onClick={() =>
                            handleAnimationSelect(option.value as AnimationType)
                          }
                        >
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="font-medium cursor-pointer">
                                {option.label}
                              </Label>
                              {selectedAnimation === option.value && (
                                <Badge variant="default" className="text-xs">
                                  Selected
                                </Badge>
                              )}
                            </div>

                            <AnimationPreview
                              animation={option.value as AnimationType}
                              isSelected={selectedAnimation === option.value}
                            />

                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button
                  onClick={handleCancel}
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isUpdating}
                type="submit"
                className="min-w-20 cursor-pointer"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
