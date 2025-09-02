"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Beaker } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";


const abTestingSchema = z.object({
  abTestId: z.string().optional(),
  abTestVariant: z.enum(["A", "B"]).optional(),
  trafficSplit: z.number().int().min(0).max(100).optional(),
  testDescription: z.string().max(500).optional(),
  testGoal: z.string().max(200).optional(),
  isControlGroup: z.boolean(),
  alternateUrl: z.string().url("Invalid URL format").optional(),
  testDuration: z.number().int().min(1).optional(),
  minSampleSize: z.number().int().min(1).optional(),
  confidenceLevel: z.number().min(80).max(99).default(95).optional(),
});

type ABTestingData = z.infer<typeof abTestingSchema>;

const VARIANT_OPTIONS = [
  { value: "A", label: "Variant A (Control)" },
  { value: "B", label: "Variant B (Test)" },
];

const CONFIDENCE_LEVELS = [
  { value: 80, label: "80%" },
  { value: 90, label: "90%" },
  { value: 95, label: "95%" },
  { value: 99, label: "99%" },
];

interface ABTestingFormProps {
  initialData?: Partial<ABTestingData>;
  isEditing?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ABTestingForm({
  initialData,
  isEditing = false,
  open,
  onOpenChange,
}: ABTestingFormProps) {
  const form = useForm<ABTestingData>({
    resolver: zodResolver(abTestingSchema),
    defaultValues: {
      abTestId: initialData?.abTestId || "",
      abTestVariant: initialData?.abTestVariant,
      trafficSplit: initialData?.trafficSplit || 50,
      testDescription: initialData?.testDescription || "",
      testGoal: initialData?.testGoal || "",
      isControlGroup: initialData?.isControlGroup ?? false,
      alternateUrl: initialData?.alternateUrl || "",
      testDuration: initialData?.testDuration,
      minSampleSize: initialData?.minSampleSize,
      confidenceLevel: initialData?.confidenceLevel || 95,
    },
  });

  const handleSubmit = async (data: ABTestingData) => {
    try {
      // TODO: Implement your form submission logic here
      console.log('Form submitted:', data);
      // Example: await submitABTestData(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    form.reset();
    // Additional cancel logic if needed
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl min-w-5xl w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            <DialogTitle>
              {isEditing ? "Edit A/B Test" : "A/B Testing"}
            </DialogTitle>
          </div>
          <DialogDescription>
            Test different variations of your link to optimize performance
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Basic Test Configuration */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Test Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="abTestId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="test-homepage-cta-001"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription>
                        Unique identifier for this test
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="abTestVariant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Variant Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select variant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {VARIANT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="trafficSplit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Traffic Split (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="50"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number.parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Percentage of traffic for this variant
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isControlGroup"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-y-0 pt-2">
                      <div className="space-y-0.5">
                        <FormLabel>Control Group</FormLabel>
                        <FormDescription>
                          Mark this as the control variant
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Test Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Test Details
              </h3>
              <FormField
                control={form.control}
                name="testGoal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Goal</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Increase click-through rate"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      What you're trying to optimize
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="testDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what changes you're testing..."
                        className="resize-none"
                        rows={3}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Detailed description of the test
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alternateUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alternate URL (Variant B)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/variant-b"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      URL for the test variant (if different from main URL)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Statistical Configuration */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Statistical Configuration
              </h3>
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
                                ? Number.parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
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
                                ? Number.parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confidenceLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confidence Level</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(Number.parseInt(value))
                        }
                        value={field.value?.toString() || "95"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CONFIDENCE_LEVELS.map((level) => (
                            <SelectItem
                              key={level.value}
                              value={level.value.toString()}
                            >
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update A/B Test" : "Save A/B Test Configuration"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
