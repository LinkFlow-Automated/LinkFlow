/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <> */
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/lib/actions/user-actions";
import { Link, Profile, User } from "@/lib/generated/prisma";
// import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const profileFormSchema = z.object({
  username: z.string().min(1, { message: "Name is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  //   image: z.string().min(1, { message: "Image is required" }),
});

type ProfileForm = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  userData: Profile & { links: Link[] };
  placeHolder: string;
  className?: string;
}

export default function ProfileForm({
  userData,
  placeHolder,
  className,
}: ProfileFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  console.log(userData)

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: userData?.username || "",
      bio: userData?.bio || "",
    },
  });

  const handleSubmit = async (data: ProfileForm) => {
    setIsUpdating(true);
    try {
      console.log("Form submitted:", data);
      await updateUserProfile(userData.id, data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{userData?.username }</span>
        <span className="text-muted-foreground truncate text-md line-clamp-1">
          {userData?.bio}
        </span>
      </DialogTrigger>
      <DialogContent className=" overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-row ">
              <div className="grid gap-4">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          // className="dark:bg-card focus-visible:border-0 focus-visible:none focus-visible:ring-[0] border-0 h-fit px-0 py-0 selection:bg-card"
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
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
                        <Textarea
                          // className="dark:bg-card focus-visible:border-0 focus-visible:none focus-visible:ring-[0] border-0 h-fit px-0 py-0 selection:bg-card"
                          placeholder="Bio"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-3 pt-4">
              <DialogClose>
                <Button
                  // onClick={handleCancel}
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
