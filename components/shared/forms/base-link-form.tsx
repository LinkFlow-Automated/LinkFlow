/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <> */
"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useManageLink } from "@/hooks/use-manage-link";
import { Link } from "@/lib/generated/prisma";
import z from "zod";

const baseLinkFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
});

type BaseLinkForm = z.infer<typeof baseLinkFormSchema>;

interface BaseLinkFormProps {
  link: Link; // The link to edit
}

export default function BaseLinkForm({ link }: BaseLinkFormProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  const { updateLink } = useManageLink(link.userId);

  const form = useForm<BaseLinkForm>({
    resolver: zodResolver(baseLinkFormSchema),
    defaultValues: {
      name: link.title || "",
      type: link.category || "",
      url: link.url || "",
    },
  });

  // Auto-save when user stops editing
  const handleTitleBlur = async () => {
    setIsEditingTitle(false);
    const name = form.getValues("name");

    if (name && name !== link.title) {
      try {
        await updateLink({
          ...link,
          title: name,
        });
      } catch (error) {
        console.error("Error updating title:", error);
        // Reset to original value on error
        form.setValue("name", link.title || "");
      }
    }
  };

  const handleUrlBlur = async () => {
    setIsEditingUrl(false);
    const url = form.getValues("url");

    if (url && url !== link.url) {
      // Validate URL before saving
      const isValidUrl = z.string().url().safeParse(url);
      if (!isValidUrl.success) {
        console.error("Invalid URL format");
        form.setValue("url", link.url || "");
        return;
      }

      try {
        await updateLink({
          ...link,
          url: url,
        });
      } catch (error) {
        console.error("Error updating URL:", error);
        // Reset to original value on error
        form.setValue("url", link.url || "");
      }
    }
  };

  // Handle Enter key to save
  const handleKeyDown = (event: React.KeyboardEvent, type: "title" | "url") => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (type === "title") {
        handleTitleBlur();
      } else {
        handleUrlBlur();
      }
    }
    if (event.key === "Escape") {
      // Cancel editing and reset value
      if (type === "title") {
        form.setValue("name", link.title || "");
        setIsEditingTitle(false);
      } else {
        form.setValue("url", link.url || "");
        setIsEditingUrl(false);
      }
    }
  };

  // Update form when link prop changes
  useEffect(() => {
    form.reset({
      name: link.title || "",
      type: link.category || "",
      url: link.url || "",
    });
  }, [link, form]);

  return (
    <div className="w-full">
      <Form {...form}>
        <div className="flex flex-col items-start gap-1">
          {/* Title Field */}
          {isEditingTitle ? (
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      autoFocus
                      className="dark:bg-card focus-visible:border-0 focus-visible:none focus-visible:ring-[0] border-0 h-fit px-0 py-0 selection:bg-card text-sm font-medium"
                      placeholder="Enter title..."
                      onBlur={handleTitleBlur}
                      onKeyDown={(e) => handleKeyDown(e, "title")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <h3
              onClick={() => setIsEditingTitle(true)}
              className="font-medium text-foreground text-sm leading-tight truncate cursor-pointer hover:text-primary transition-colors w-full"
              title={form.watch("name") || "Click to edit title"}
            >
              {form.watch("name") || "Untitled Link"}
            </h3>
          )}

          {/* URL Field */}
          {isEditingUrl ? (
            <FormField
              name="url"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      autoFocus
                      className="dark:bg-card focus-visible:border-0 focus-visible:none focus-visible:ring-[0] border-0 h-fit px-0 py-0 selection:bg-card text-xs text-muted-foreground"
                      placeholder="Enter URL..."
                      onBlur={handleUrlBlur}
                      onKeyDown={(e) => handleKeyDown(e, "url")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ) : (
            <p
              onClick={() => setIsEditingUrl(true)}
              className="text-muted-foreground text-xs leading-tight truncate cursor-pointer hover:text-primary transition-colors w-full"
              title={form.watch("url") || "Click to edit URL"}
            >
              {form.watch("url") || "No URL set"}
            </p>
          )}

          {/* Show validation errors */}
          {form.formState.errors.name && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.name.message}
            </span>
          )}
          {form.formState.errors.url && (
            <span className="text-red-500 text-xs">
              {form.formState.errors.url.message}
            </span>
          )}
        </div>
      </Form>
    </div>
  );
}
