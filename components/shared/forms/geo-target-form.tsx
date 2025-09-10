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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { MultiSelect } from "@/components/ui/multi-select";
import { TiWorld } from "react-icons/ti";
import TooltipWrapper from "../tooltip-wrapper";

const COUNTRIES = [
  { label: "United States", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "United Kingdom", value: "GB" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Japan", value: "JP" },
  { label: "Australia", value: "AU" },
  { label: "Brazil", value: "BR" },
  { label: "India", value: "IN" },
  { label: "China", value: "CN" },
  { label: "Russia", value: "RU" },
  { label: "Mexico", value: "MX" },
  { label: "Italy", value: "IT" },
  { label: "Spain", value: "ES" },
  { label: "Netherlands", value: "NL" },
];

const REGIONS = [
  { label: "California", value: "california" },
  { label: "New York", value: "new-york" },
  { label: "Texas", value: "texas" },
  { label: "Florida", value: "florida" },
  { label: "Ontario", value: "ontario" },
  { label: "Quebec", value: "quebec" },
  { label: "England", value: "england" },
  { label: "Scotland", value: "scotland" },
  { label: "Bavaria", value: "bavaria" },
  { label: "Île-de-France", value: "ile-de-france" },
];

const CITIES = [
  { label: "New York City", value: "new-york-city" },
  { label: "Los Angeles", value: "los-angeles" },
  { label: "Chicago", value: "chicago" },
  { label: "Toronto", value: "toronto" },
  { label: "London", value: "london" },
  { label: "Paris", value: "paris" },
  { label: "Berlin", value: "berlin" },
  { label: "Tokyo", value: "tokyo" },
  { label: "Sydney", value: "sydney" },
  { label: "Mumbai", value: "mumbai" },
];

const geoTargetingSchema = z.object({
  countryAllow: z.array(z.string()).optional(),
  countryBlock: z.array(z.string()).optional(),
  regionAllow: z.array(z.string()).optional(),
  regionBlock: z.array(z.string()).optional(),
  cityAllow: z.array(z.string()).optional(),
  cityBlock: z.array(z.string()).optional(),
});

type GeoTargetingData = z.infer<typeof geoTargetingSchema>;

interface GeographicTargetingFormProps {
  initialData?: Partial<GeoTargetingData>;
  isEditing?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function GeographicTargetingForm({
  initialData,
  isEditing = false,
  open,
  onOpenChange,
}: GeographicTargetingFormProps) {
  const form = useForm<GeoTargetingData>({
    resolver: zodResolver(geoTargetingSchema),
    defaultValues: {
      countryAllow: initialData?.countryAllow || [],
      countryBlock: initialData?.countryBlock || [],
      regionAllow: initialData?.regionAllow || [],
      regionBlock: initialData?.regionBlock || [],
      cityAllow: initialData?.cityAllow || [],
      cityBlock: initialData?.cityBlock || [],
    },
  });

  const handleSubmit = async (data: GeoTargetingData) => {
    try {
      // TODO: Implement your form submission logic here
      console.log("Form submitted:", data);
      // Example: await submitGeoTargetingData(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
    // Additional cancel logic if needed
  };

  return (
    <Dialog>
      <TooltipWrapper content="Geographic Targeting">
        <DialogTrigger asChild className="cursor-pointer">
          {/* <Button variant="outline" className="border-0 cursor-pointer p-0"> */}
          <TiWorld className="h-5 w-5" />
          {/* </Button> */}
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent className="max-w-7xl min-w-3xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <TiWorld className="h-5 w-5" />
            <DialogTitle>
              {isEditing ? "Edit Geographic Targeting" : "Geographic Targeting"}
            </DialogTitle>
          </div>
          <DialogDescription>
            Control where your link is accessible based on location
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Country Targeting */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Country Targeting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="countryAllow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Countries</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={COUNTRIES}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select allowed countries..."
                        />
                      </FormControl>
                      <FormDescription>
                        Leave empty to allow all countries
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="countryBlock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blocked Countries</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={COUNTRIES}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select blocked countries..."
                        />
                      </FormControl>
                      <FormDescription>
                        Countries where link will be blocked
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Region Targeting */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                Region/State Targeting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="regionAllow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Regions</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={REGIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select allowed regions..."
                        />
                      </FormControl>
                      <FormDescription>
                        Specific regions/states to allow
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="regionBlock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blocked Regions</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={REGIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select blocked regions..."
                        />
                      </FormControl>
                      <FormDescription>Regions/states to block</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* City Targeting */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-foreground">
                City Targeting
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cityAllow"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Allowed Cities</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={CITIES}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select allowed cities..."
                        />
                      </FormControl>
                      <FormDescription>
                        Specific cities to allow
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cityBlock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blocked Cities</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={CITIES}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select blocked cities..."
                        />
                      </FormControl>
                      <FormDescription>Cities to block</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <DialogClose>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {isEditing ? "Update Targeting" : "Save Geographic Rules"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
