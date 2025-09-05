/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <> */
"use client";
// import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { IoPencil } from "react-icons/io5";
import z from "zod";

const baseLinkFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  //   description: z.string().min(1, { message: "Description is required" }),
  url: z.string().min(1, { message: "URL is required" }),
});

type BaseLinkForm = z.infer<typeof baseLinkFormSchema>;

interface BaseLinkFormProps {
  initialValues?: BaseLinkForm;
}

export default function BaseLinkForm({ initialValues }: BaseLinkFormProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  const form = useForm<BaseLinkForm>({
    resolver: zodResolver(baseLinkFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
      type: initialValues?.type || "",
      //   description: initialValues?.description || "",
      url: initialValues?.url || "",
    },
  });

  const handleSubmit = async (data: BaseLinkForm) => {
    try {
      console.log("Form submitted:", data);
      // TODO: Implement your form submission logic here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex flex-col items-start gap-1">
            {isEditingTitle ? (
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className=" dark:bg-card focus-visible:border-0 focus-visible:none focus-visible:ring-[0] border-0 h-fit px-0 py-0 selection:bg-card"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex flex-row items-center gap-2">
                <h3
                  onClick={() => setIsEditingTitle(true)}
                  className="font-medium text-foreground text-sm leading-tight truncate cursor-pointer hover:text-primary transition-colors"
                >
                  {form.watch("name")}
                </h3>
                {/* <Button
                  variant="outline"
                  className="p-0 m-0 border-0 bg-background cursor-pointer"
                  onClick={() => setIsEditingTitle(true)}
                >
                  <IoPencil />
                </Button> */}
              </div>
            )}
            {isEditingUrl ? (
              <FormField
                name="url"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:bg-card focus-visible:border-0 focus-visible:none focus-visible:ring-[0] border-0 h-fit px-0 py-0 selection:bg-card"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <div className="flex flex-row items-center gap-2">
                <h3
                  onClick={() => setIsEditingUrl(true)}
                  className="font-medium text-foreground text-sm leading-tight truncate cursor-pointer hover:text-primary transition-colors"
                >
                  {form.watch("url")}
                </h3>
                {/* <Button
                variant="outline"
                  className="p-0 m-0 border-0 cursor-pointer"
                  onClick={() => setIsEditingUrl(true)}
                >
                  <IoPencil />
                </Button> */}
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
