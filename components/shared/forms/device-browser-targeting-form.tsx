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
import { Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/ui/multi-select";

const deviceBrowserTargetingSchema = z.object({
  allowedDevices: z.array(z.enum(["mobile", "desktop", "tablet"])).optional(),
  blockedDevices: z.array(z.enum(["mobile", "desktop", "tablet"])).optional(),
  allowedBrowsers: z.array(z.string()).optional(),
  blockedBrowsers: z.array(z.string()).optional(),
  allowedOS: z.array(z.string()).optional(),
  blockedOS: z.array(z.string()).optional(),
  minScreenWidth: z.number().int().min(1).optional(),
  maxScreenWidth: z.number().int().min(1).optional(),
  minScreenHeight: z.number().int().min(1).optional(),
  maxScreenHeight: z.number().int().min(1).optional(),
});

type DeviceBrowserTargetingData = z.infer<typeof deviceBrowserTargetingSchema>;

const DEVICE_OPTIONS = [
  { value: "mobile", label: "Mobile" },
  { value: "desktop", label: "Desktop" },
  { value: "tablet", label: "Tablet" },
]

const BROWSER_OPTIONS = [
  { value: "Chrome", label: "Chrome" },
  { value: "Firefox", label: "Firefox" },
  { value: "Safari", label: "Safari" },
  { value: "Edge", label: "Edge" },
  { value: "Opera", label: "Opera" },
  { value: "Internet Explorer", label: "Internet Explorer" },
  { value: "Samsung Internet", label: "Samsung Internet" },
  { value: "UC Browser", label: "UC Browser" },
]

const OS_OPTIONS = [
  { value: "iOS", label: "iOS" },
  { value: "Android", label: "Android" },
  { value: "Windows", label: "Windows" },
  { value: "macOS", label: "macOS" },
  { value: "Linux", label: "Linux" },
  { value: "Chrome OS", label: "Chrome OS" },
  { value: "Windows Phone", label: "Windows Phone" },
  { value: "BlackBerry", label: "BlackBerry" },
]

interface DeviceBrowserTargetingFormProps {
  initialData?: Partial<DeviceBrowserTargetingData>;
  isEditing?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeviceBrowserTargetingForm({
  initialData,
  isEditing = false,
  open,
  onOpenChange,
}: DeviceBrowserTargetingFormProps) {
  const form = useForm<DeviceBrowserTargetingData>({
    resolver: zodResolver(deviceBrowserTargetingSchema),
    defaultValues: {
      allowedDevices: initialData?.allowedDevices || [],
      blockedDevices: initialData?.blockedDevices || [],
      allowedBrowsers: initialData?.allowedBrowsers || [],
      blockedBrowsers: initialData?.blockedBrowsers || [],
      allowedOS: initialData?.allowedOS || [],
      blockedOS: initialData?.blockedOS || [],
      minScreenWidth: initialData?.minScreenWidth,
      maxScreenWidth: initialData?.maxScreenWidth,
      minScreenHeight: initialData?.minScreenHeight,
      maxScreenHeight: initialData?.maxScreenHeight,
    },
  });

  const handleSubmit = async (data: DeviceBrowserTargetingData) => {
    try {
      // TODO: Implement your form submission logic here
      console.log('Form submitted:', data);
      // Example: await submitDeviceBrowserTargetingData(data);
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
      <DialogContent className="max-w-7xl min-w-5xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            <DialogTitle>
              {isEditing
                ? "Edit Device & Browser Targeting"
                : "Device & Browser Targeting"}
            </DialogTitle>
          </div>
          <DialogDescription>
            Control access based on device type, browser, and screen size
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Device Targeting */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Device Targeting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="allowedDevices"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Devices</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={DEVICE_OPTIONS}
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="Select allowed devices..."
                        />
                      </FormControl>
                      <FormDescription>Leave empty to allow all devices</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="blockedDevices"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blocked Devices</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={DEVICE_OPTIONS}
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="Select blocked devices..."
                        />
                      </FormControl>
                      <FormDescription>Devices to block access from</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Browser Targeting */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Browser Targeting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="allowedBrowsers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Browsers</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={BROWSER_OPTIONS}
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="Select allowed browsers..."
                        />
                      </FormControl>
                      <FormDescription>Leave empty to allow all browsers</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="blockedBrowsers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blocked Browsers</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={BROWSER_OPTIONS}
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="Select blocked browsers..."
                        />
                      </FormControl>
                      <FormDescription>Browsers to block access from</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Operating System Targeting */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Operating System Targeting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="allowedOS"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Operating Systems</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={OS_OPTIONS}
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="Select allowed OS..."
                        />
                      </FormControl>
                      <FormDescription>Leave empty to allow all OS</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="blockedOS"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blocked Operating Systems</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={OS_OPTIONS}
                          value={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="Select blocked OS..."
                        />
                      </FormControl>
                      <FormDescription>Operating systems to block</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Screen Size Targeting */}
            {/* <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Screen Size Targeting
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="minScreenWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Width (px)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="320"
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
                  name="maxScreenWidth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Width (px)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1920"
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
                  name="minScreenHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Height (px)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="568"
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
                  name="maxScreenHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Height (px)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1080"
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
              </div>
              <FormDescription>
                Leave empty to allow all screen sizes
              </FormDescription>
            </div> */}

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing
                  ? "Update Device Targeting"
                  : "Save Device Targeting"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
