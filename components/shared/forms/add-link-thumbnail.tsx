"use client";

import type React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RiImageAddFill } from "react-icons/ri";
import z from "zod";
import type { Link, ThumbnailType } from "@/lib/generated/prisma";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as Icons from "react-icons/ri";
import TooltipWrapper from "../tooltip-wrapper";
import IconPicker from "./icon-picker";
import Image from "next/image";
import { uploadThemes } from "@/lib/utils/upload-theme";
import { useManageLink } from "@/hooks/use-manage-link";
import { toast } from "sonner";

const AddLinkThumbnailSchema = z.object({
  type: z.enum(["image", "icon"]),
  image: z.string().optional(),
  icon: z.string().optional(),
});
type AddLinkThumbnailProp = z.infer<typeof AddLinkThumbnailSchema>;

export default function AddLinkThumbnail({ link }: { link: Link }) {
  const { updateLink, isUpdating } = useManageLink(link.userId);
  const [thumbnailType, setThumbnailType] = useState<"image" | "icon">("image");
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<AddLinkThumbnailProp>({
    resolver: zodResolver(AddLinkThumbnailSchema),
    defaultValues: {
      type: link.type as ThumbnailType,
      image: link.type === "image" ? (link.thumbnail as string) : "",
      icon: link.type === "icon" ? (link.thumbnail as string) : "",
    },
  });

  const onSubmit = async (data: AddLinkThumbnailProp) => {
    try {
      await updateLink({
        id: link.id,
        type: data.type,
        thumbnail: data.type === "image" ? data.image : data.icon,
      });
      toast.success("Your thumbnail has been updated");
      setOpen(false);
    } catch (error) {
      toast.error("Error updating thumbnail");
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper content="Add thumbnail to your link">
        <DialogTrigger asChild className="cursor-pointer">
          <RiImageAddFill className="size-5" />
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <RiImageAddFill className="size-5" />
              <DialogTitle>Add a Custom Thumbnail</DialogTitle>
            </div>
            <DialogDescription>
              Make your link more engaging by adding a visual preview. Choose
              between uploading an image or selecting an icon.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Tabs
                value={thumbnailType}
                onValueChange={(value) =>
                  setThumbnailType(value as "image" | "icon")
                }
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="image">Upload Image</TabsTrigger>
                  <TabsTrigger value="icon">Select Icon</TabsTrigger>
                </TabsList>

                <TabsContent value="image" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Upload Image</FormLabel> */}
                        <FormControl>
                          <div className="space-y-4 mt-2">
                            <UploadButton
                              appearance={uploadThemes.modern.uploadButton}
                              endpoint="imageUploader"
                              onClientUploadComplete={(res: any) => {
                                if (res?.[0]?.url) {
                                  field.onChange(res[0].url);
                                  form.setValue("type", "image");
                                }
                              }}
                              onUploadError={(error: Error) => {
                                console.error("Upload error:", error);
                              }}
                            />
                            {field.value && (
                              <div className="flex items-center gap-2">
                                <Image
                                  width={1000}
                                  height={1000}
                                  src={field.value || "/placeholder.svg"}
                                  alt="Thumbnail preview"
                                  className="w-16 h-16 object-cover rounded border"
                                />
                                <div className="text-sm text-muted-foreground">
                                  Image uploaded successfully
                                </div>
                              </div>
                            )}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="icon" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Icon</FormLabel>
                        <FormControl>
                          <IconPicker
                            onIconSelect={(iconName) => {
                              field.onChange(iconName);
                              form.setValue("type", "icon");
                            }}
                            selectedIcon={field.value}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <div className="border-t pt-4">
                <div className="text-sm font-medium mb-2">Preview:</div>
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  {thumbnailType === "image" && form.watch("image") ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={form.watch("image") || "/placeholder.svg"}
                      alt="Preview"
                      className="w-8 h-8 object-cover rounded"
                    />
                  ) : thumbnailType === "icon" && form.watch("icon") ? (
                    (() => {
                      const IconComponent = Icons[
                        form.watch("icon") as keyof typeof Icons
                      ] as React.ComponentType<{
                        className?: string;
                      }>;
                      return IconComponent ? (
                        <IconComponent className="w-8 h-8 text-primary" />
                      ) : null;
                    })()
                  ) : (
                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                      <RiImageAddFill className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-sm">
                      {link.title || "Link Title"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {link.url || "https://example.com"}
                    </div>
                  </div>
                </div>
              </div>

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
                <Button
                  type="submit"
                  disabled={!form.watch("image") && !form.watch("icon") && isUpdating}
                >
                  Save Thumbnail
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </TooltipWrapper>
    </Dialog>
  );
}
