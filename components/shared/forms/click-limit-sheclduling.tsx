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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Settings2 } from "lucide-react";
import { AiFillSchedule } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { HiUser } from "react-icons/hi2";
import DateTimePicker from "@/components/ui/date-time-picker";

const clickLimitsSchedulingSchema = z.object({
  maxClicks: z.number().int().min(1).optional(),
  maxClicksPerDay: z.number().int().min(1).optional(),
  maxClicksPerHour: z.number().int().min(1).optional(),
  maxClicksPerUser: z.number().int().min(1).optional(),
  scheduledAt: z.coerce.date().nullable(),
  expiresAt: z.coerce.date().nullable(),
  allowedDays: z.array(z.string()).optional(),
  allowedHours: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
  timezone: z.string().optional(),
});

type ClickLimitsSchedulingData = z.infer<typeof clickLimitsSchedulingSchema>;

const DAYS_OPTIONS = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

interface ClickLimitsSchedulingFormProps {
  initialData?: Partial<ClickLimitsSchedulingData>;
  isEditing?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ClickLimitsSchedulingForm({
  initialData,
  isEditing = false,
  open,
  onOpenChange,
}: ClickLimitsSchedulingFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const form = useForm<ClickLimitsSchedulingData>({
    resolver: zodResolver(clickLimitsSchedulingSchema),
    defaultValues: {
      maxClicks: initialData?.maxClicks,
      maxClicksPerUser: initialData?.maxClicksPerUser,
      expiresAt: initialData?.expiresAt || null,
      allowedDays: initialData?.allowedDays || [],
    },
  });

  const handleSubmit = async (data: ClickLimitsSchedulingData) => {
    try {
      console.log("Form submitted:", data);
      onOpenChange?.(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange?.(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {/* <Button variant="outline" className="border-0 cursor-pointer"> */}
          <AiFillSchedule className="size-5" />
        {/* </Button> */}
      </DialogTrigger>
      <DialogContent className="max-w-4xl min-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AiFillSchedule className="h-5 w-5" />
            <DialogTitle className="text-xl">
              {isEditing ? "Edit Link Settings" : "Click Limits & Scheduling"}
            </DialogTitle>
          </div>
          <DialogDescription>
            Control how your link can be accessed
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Basic Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <HiUser className="h-4 w-4" />
                Usage Limits
              </div>

              <FormField
                control={form.control}
                name="maxClicks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total clicks allowed</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 1000"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? parseInt(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Link expires after this many clicks (leave empty for
                      unlimited)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="scheduledAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Scheduled date</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select when link actives"
                        />
                      </FormControl>
                      <FormDescription>
                        Link will be active after this date
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration date</FormLabel>
                      <FormControl>
                        <DateTimePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select when link expires"
                        />
                      </FormControl>
                      <FormDescription>
                        Link wont be active after this date
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Advanced Settings */}
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full justify-between p-2"
                >
                  <span className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4" />
                    Advanced Options
                  </span>
                  <span className="text-xs">
                    {showAdvanced ? "Hide" : "Show"}
                  </span>
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="maxClicksPerUser"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clicks per person</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 3"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        How many times each person can use the link
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowedDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Active days</FormLabel>
                      <FormDescription className="mb-3">
                        Choose which days the link works (leave empty for all
                        days)
                      </FormDescription>
                      <div className="flex flex-wrap gap-2">
                        {DAYS_OPTIONS.map((day) => (
                          <div
                            key={day.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={day.value}
                              checked={
                                field.value?.includes(day.value) || false
                              }
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, day.value]);
                                } else {
                                  field.onChange(
                                    current.filter((d) => d !== day.value)
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={day.value}
                              className="text-sm font-medium cursor-pointer"
                            >
                              {day.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CollapsibleContent>
            </Collapsible>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="">
                {isEditing ? "Update Test" : "Create A/B Test"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
