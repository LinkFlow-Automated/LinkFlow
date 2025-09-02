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
import { Clock, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const form = useForm<ClickLimitsSchedulingData>({
    resolver: zodResolver(clickLimitsSchedulingSchema),
    defaultValues: {
      maxClicks: initialData?.maxClicks,
      maxClicksPerDay: initialData?.maxClicksPerDay,
      maxClicksPerHour: initialData?.maxClicksPerHour,
      maxClicksPerUser: initialData?.maxClicksPerUser,
      scheduledAt: initialData?.scheduledAt || null,
      expiresAt: initialData?.expiresAt || null,
      allowedDays: initialData?.allowedDays || [],
      allowedHours: initialData?.allowedHours || { start: "", end: "" },
      timezone: initialData?.timezone || "",
    },
  });

  const handleSubmit = async (data: ClickLimitsSchedulingData) => {
    try {
      // TODO: Implement your form submission logic here
      console.log("Form submitted:", data);
      // Example: await submitClickLimitsData(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
    // Additional cancel logic if needed
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl min-w-6xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5" />
            <DialogTitle>
              {isEditing ? "Edit Click Limits & Scheduling" : "Click Limits & Scheduling"}
            </DialogTitle>
          </div>
          <DialogDescription>
            Set usage limits and schedule to control link access
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Click Limits Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Click Limits</h3>
          <Form {...form}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxClicks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Total Clicks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
                    <FormDescription>
                      Total clicks before link expires
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxClicksPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Clicks per Day</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100"
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
                    <FormDescription>Daily click limit</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxClicksPerHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Clicks per Hour</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
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
                    <FormDescription>Hourly click limit</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxClicksPerUser"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Clicks per User</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5"
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
                    <FormDescription>Clicks per unique user</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
          </div>
          
          {/* Scheduling Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Scheduling</h3>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Control when your link is active</span>
            </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Date Range */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                  Date Range
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="scheduledAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date & Time</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? new Date(e.target.value) : null
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          When link becomes active
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
                        <FormLabel>End Date & Time</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            value={
                              field.value
                                ? new Date(field.value)
                                    .toISOString()
                                    .slice(0, 16)
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value ? new Date(e.target.value) : null
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>When link expires</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Days of Week */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                  Allowed Days
                </h3>
                <FormField
                  control={form.control}
                  name="allowedDays"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                              className="text-sm font-medium"
                            >
                              {day.label}
                            </label>
                          </div>
                        ))}
                      </div>
                      <FormDescription>
                        Leave empty to allow all days
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Time Range */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground">
                  Time Range
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="allowedHours.start"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allowedHours.end"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="UTC, EST, PST"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormDescription>
                  Leave empty to allow all hours
                </FormDescription>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>

                <Button type="submit">
                  {isEditing
                    ? "Update Limits & Schedule"
                    : "Save Limits & Schedule"}
                </Button>
              </div>
            </form>
          </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
