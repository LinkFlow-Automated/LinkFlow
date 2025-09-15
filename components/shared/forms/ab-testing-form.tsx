"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Loader2, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HiBeaker } from "react-icons/hi2";
import TooltipWrapper from "../tooltip-wrapper";
import { Link } from "@/lib/generated/prisma";
import { useManageLink } from "@/hooks/use-manage-link";
import { toast } from "sonner";

const abTestingSchema = z.object({
  // Basic fields
  testName: z.string().min(1, "Test name is required"),
  testGoal: z.string().optional(),

  // Variant A (Control)
  variantAName: z.string().min(1, "Variant A name is required"),
  variantAUrl: z.string().url("Invalid URL format").optional(),

  // Variant B (Test)
  variantBName: z.string().min(1, "Variant B name is required"),
  variantBUrl: z.string().url("Invalid URL format").optional(),

  // Traffic split
  trafficSplit: z.number().min(0).max(100),

  // Advanced settings (optional)
  testDuration: z.number().int().min(1).optional(),
  minSampleSize: z.number().int().min(1).optional(),
  confidenceLevel: z.number().min(80).max(99).optional(),
});

type ABTestingData = z.infer<typeof abTestingSchema>;

interface ABTestingFormProps {
  link: Link;
  isEditing?: boolean;
}

export function ABTestingForm({ link, isEditing = false }: ABTestingFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { updateLink, isUpdating } = useManageLink(link.userId);
  const [open, setOpen] = useState(false);

  const initialData = link?.rules
    ? ((link.rules as any).abTesting as ABTestingData)
    : undefined;

  const form = useForm<ABTestingData>({
    resolver: zodResolver(abTestingSchema),
    defaultValues: {
      testName: initialData?.testName || "",
      testGoal: initialData?.testGoal || "",
      variantAName: initialData?.variantAName || "Original",
      variantAUrl: initialData?.variantAUrl || "",
      variantBName: initialData?.variantBName || "Variant B",
      variantBUrl: initialData?.variantBUrl || "",
      trafficSplit: initialData?.trafficSplit ?? 50,
      testDuration: initialData?.testDuration,
      minSampleSize: initialData?.minSampleSize,
      confidenceLevel: initialData?.confidenceLevel,
    },
  });

  const trafficSplit = form.watch("trafficSplit");

  const handleSubmit = async (data: ABTestingData) => {
    try {
      await updateLink({
        id: link.id,
        rules: {
          ...((link.rules as object) || {}),
          abTesting: data,
        },
      });
      toast.success("A/B Test has been updated");
      setOpen(false);
    } catch (error) {
      toast.error("Error updating A/B Test");
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper content="Create A/B Test">
        <DialogTrigger asChild className="cursor-pointer">
          {/* <Button variant="outline" className="border-0 cursor-pointer"> */}
          <HiBeaker className="size-5" />
          {/* </Button> */}
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent className="max-w-7xl min-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <HiBeaker className="h-5 w-5" />
            <DialogTitle>
              {isEditing ? "Edit A/B Test" : "Create A/B Test"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {isEditing
              ? "Update the destination URLs for your split test. Changes will affect new traffic immediately."
              : "Find out which destination URL performs better. We'll automatically split traffic between two versions and track the results."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Basic Test Info */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="testName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Homepage CTA Button Test"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Give your test a descriptive name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="testGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you trying to improve?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Increase click-through rate, More sign-ups"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the goal of this test
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Variants Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                Your Variants
                <Badge variant="secondary" className="text-xs">
                  Traffic: {100 - trafficSplit}% / {trafficSplit}%
                </Badge>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Variant A - Control */}
                <Card className="bg-card border-green-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      Control ({100 - trafficSplit}%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <FormField
                      control={form.control}
                      name="variantAName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Original" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="variantAUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL (optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Variant B - Test */}
                <Card className="bg-card border-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2 ">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      Test Variant ({trafficSplit}%)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <FormField
                      control={form.control}
                      name="variantBName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Variant B" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="variantBUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL (optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com/variant-b"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Traffic Split Slider */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="trafficSplit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Traffic Split</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="10"
                            max="90"
                            step="5"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>More Control</span>
                            <span>50/50 Split</span>
                            <span>More Test</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        How much traffic goes to each variant
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Advanced Settings Toggle */}
            <div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm"
              >
                <Settings className="h-4 w-4" />
                Advanced Settings
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {showAdvanced && (
                <Card className="mt-4 border-gray-200">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="testDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Test Duration (days)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                placeholder="14"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number(e.target.value)
                                      : undefined
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              How long to run the test
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="minSampleSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min Sample Size</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                placeholder="1000"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number(e.target.value)
                                      : undefined
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Minimum visitors needed
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confidenceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confidence Level (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="80"
                                max="99"
                                placeholder="95"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      ? Number(e.target.value)
                                      : undefined
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Statistical confidence
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
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
              <Button type="submit" className="cursor-pointer">
                {isUpdating ? (
                  <Loader2 className="animate-spin size-4" />
                ) : isEditing ? (
                  "Update Test"
                ) : (
                  "Create A/B Test"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
