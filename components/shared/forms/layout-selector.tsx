import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TooltipWrapper from "../tooltip-wrapper";
import { RiLayout4Fill } from "react-icons/ri";
import { Link } from "@/lib/generated/prisma";
import z from "zod";
import { useState } from "react";
import { layoutOptions, LayoutType } from "@/lib/utils/card-layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { LayoutPreview } from "../layout-preview";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useManageLink } from "@/hooks/use-manage-link";
import { Loader2 } from "lucide-react";

const layoutSchema = z.object({
  layoutStyle: z.string().optional(),
});

type LayoutFormData = z.infer<typeof layoutSchema>;

// interface LayoutSelectorProps {
//   onLayoutSelect?: (layout: LayoutType) => void
//   defaultLayout?: LayoutType
// }

export default function LayoutSelector({ link }: { link: Link }) {
  const { updateLink, isUpdating } = useManageLink(link.profileId);
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>(
    link.layout as LayoutType
  );
  const [open, setOpen] = useState(false);

  const form = useForm<LayoutFormData>({
    resolver: zodResolver(layoutSchema),
    defaultValues: {
      layoutStyle: link.layout as LayoutType,
    },
  });

  const handleLayoutSelect = (layout: LayoutType) => {
    setSelectedLayout(layout);
    form.setValue("layoutStyle", layout);
    // onLayoutSelect?.(layout)
  };
  const handleSubmit = async () => {
    try {
      await updateLink({
        id: link.id,
        layout: selectedLayout,
      });
      toast.success(`Layout has been updated to ${selectedLayout}`);
      setOpen(false);
    } catch (error) {
      toast.error("Error updating layout");
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    form.reset();
    // setSelectedLayout("none");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper content="Select Layout">
        <DialogTrigger asChild>
          <RiLayout4Fill className="size-5" />
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent className="max-w-8xl max-h-[80vh] min-w-6xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <RiLayout4Fill className="size-5" />
            <DialogTitle>Choose a Page Layout</DialogTitle>
          </div>
          <DialogDescription>
            Change the visual arrangement of your links and content. Select a
            layout below to instantly see how your page will look to visitors.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="layoutStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {layoutOptions.map((option) => (
                          <Card
                            key={option.value}
                            className={`cursor-pointer transition-all duration-200 hover:shadow-md p-0 ${selectedLayout === option.value
                                ? "ring-2 ring-primary border-primary"
                                : "hover:border-primary/50"
                              }`}
                            onClick={() =>
                              handleLayoutSelect(option.value as LayoutType)
                            }
                          >
                            <CardContent className="p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <Label className="font-medium cursor-pointer">
                                  {option.label}
                                </Label>
                                {selectedLayout === option.value && (
                                  <Badge variant="default" className="text-xs">
                                    Selected
                                  </Badge>
                                )}
                              </div>

                              <LayoutPreview
                                layout={option.value as LayoutType}
                                isSelected={selectedLayout === option.value}
                              />

                              <p className="text-sm text-muted-foreground">
                                {option.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
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
                  disabled={isUpdating}
                  type="submit"
                  className="min-w-20 cursor-pointer"
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
