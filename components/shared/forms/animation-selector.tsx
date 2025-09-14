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

const animationSchema = z.object({
  animationStyle: z.string().optional(),
});

type AnimationFormData = z.infer<typeof animationSchema>;

interface AnimationSelectorProps {
  onAnimationSelect?: (animation: AnimationType) => void;
  defaultAnimation?: AnimationType;
}

export default function AnimationSelector({
  onAnimationSelect,
  defaultAnimation = "none",
}: AnimationSelectorProps) {
  const [selectedAnimation, setSelectedAnimation] =
    useState<AnimationType>(defaultAnimation);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AnimationFormData>({
    resolver: zodResolver(animationSchema),
    defaultValues: {
      animationStyle: defaultAnimation,
    },
  });

  const handleAnimationSelect = (animation: AnimationType) => {
    setSelectedAnimation(animation);
    form.setValue("animationStyle", animation);
    onAnimationSelect?.(animation);
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    form.reset();
    setSelectedAnimation("none")
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipWrapper content="Animate link">
        <DialogTrigger asChild>
          <MdAnimation className="size-5" />
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="max-w-6xl max-h-[80vh] min-w-4xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MdAnimation className="size-5" />
            <DialogTitle>Choose Animation Style</DialogTitle>
          </div>
          <DialogDescription>
            Select an animation style for your link. Preview each animation to
            see how it looks.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4">
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
                          className={`cursor-pointer transition-all duration-200 hover:shadow-md p-0 ${
                            selectedAnimation === option.value
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

            <div className="flex justify-end gap-2 pt-4 border-t">
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
              <Button type="button" onClick={handleApply} className="min-w-20">
                Apply
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
