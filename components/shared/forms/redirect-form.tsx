import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import TooltipWrapper from "../tooltip-wrapper";
import { RiShareForwardFill } from "react-icons/ri";
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const redirectSchema = z.object({
  redirectLink: z.string().optional(),
});

type redirectProp = z.infer<typeof redirectSchema>;

export default function RedirectForm() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(redirectSchema),
    defaultValues: {
      redirectLink: "",
    },
  });
  const handleSubmit = async (data: redirectProp) => {
    try {
      //   await updateLink({
      //     id: link.id,
      //     rules: {
      //       ...((link.rules as object) || {}),
      //       abTesting: data,
      //     },
      //   });
      toast.success("A/B Test has been updated");
      setOpen(false);
    } catch (error) {
      toast.error("Error updating A/B Test");
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper content={"Forward Link"}>
        <DialogTrigger asChild>
          <RiShareForwardFill className="size-5" />
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <RiShareForwardFill className="h-5 w-5" />
            <DialogTitle>
              {/* {isEditing ? "Edit A/B Test" : "Create A/B Test"} */}
              Forward Link
            </DialogTitle>
          </div>
          <DialogDescription>
            Temporarily send all visitors straight to a link, instead of your
            Breezi
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div>
              <FormField
                control={form.control}
                name="redirectLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Redirect link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., https://example.com"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                      Give your test a descriptive name
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit" className="cursor-pointer">
                {/* {isUpdating ? (
                  <Loader2 className="animate-spin size-4" />
                ) : isEditing ? (
                  "Update Test"
                ) : (
                  "Create A/B Test"
                )} */}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
