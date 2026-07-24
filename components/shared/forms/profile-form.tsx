"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/lib/actions/user-actions";
import { usePreviewStore } from "@/stores/preview-store";
import { Link, Profile } from "@/lib/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const profileFormSchema = z.object({
  displayName: z.string().min(1, { message: "Name is required" }).max(100),
  bio: z.string().max(500, { message: "Bio is too long" }).optional(),
});

type ProfileForm = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  userData: Profile & { links: Link[] };
  placeHolder: string;
  className?: string;
}

export default function ProfileForm({ userData }: ProfileFormProps) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: userData?.displayName || "",
      bio: userData?.bio || "",
    },
  });

  const handleSubmit = async (data: ProfileForm) => {
    setIsUpdating(true);
    try {
      await updateUserProfile(userData.id, {
        displayName: data.displayName,
        bio: data.bio ?? "",
      });
      // Sync to preview store for live update
      usePreviewStore.getState().setProfile({
        displayName: data.displayName,
        bio: data.bio ?? "",
      });
      toast.success("Profile updated");
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  const triggerName = userData?.displayName || userData?.username;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="grid flex-1 text-left text-sm leading-tight cursor-pointer">
        <span className="truncate font-medium">{triggerName}</span>
        <span className="text-muted-foreground truncate text-md line-clamp-1">
          {userData?.bio}
        </span>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-row ">
              <div className="grid gap-4 w-full">
                <FormField
                  name="displayName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="bio"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Bio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-3 pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isUpdating}
                className="cursor-pointer"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  "Update profile"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
