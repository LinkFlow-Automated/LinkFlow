/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <> */
"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, User } from "@/lib/generated/prisma";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const profileFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  bio: z.string().min(1, { message: "Bio is required" }),
  //   image: z.string().min(1, { message: "Image is required" }),
});

type ProfileForm = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  userData: User & { links: Link[] };
  placeHolder: string;
  className?: string;
}

export default function ProfileForm({
  userData,
  placeHolder,
  className,
}: ProfileFormProps) {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userData?.username || "",
      bio: userData?.bio || "",
    },
  });

  const handleSubmit = async (data: ProfileForm) => {
    try {
      console.log("Form submitted:", data);
      // TODO: Implement your form submission logic here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className={cn("", className)}>{placeHolder}</span>
      </DialogTrigger>
      <DialogContent className="max-w-7xl min-w-4xl max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-row">
              <div></div>
              <div className="flex flex-col">
                <FormField
                  name="name"
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
                <FormField
                  name="bio"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="dark:bg-card focus-visible:border-0 focus-visible:none focus-visible:ring-[0] border-0 h-fit px-0 py-0 selection:bg-card"
                          placeholder="Bio"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
