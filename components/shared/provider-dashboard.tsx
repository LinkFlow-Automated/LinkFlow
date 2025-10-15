import { IconType } from "react-icons/lib";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { providers } from "@/lib/connect/registry";

interface ProviderDashboard {
  providerName: string;
  linkNav: {
    label: string;
    icon: IconType;
  }[];
  icon: IconType
}
export default function ProviderDashboard({
  providerName,
  linkNav,
  icon: IconT
}: ProviderDashboard) {
  const [selectedCategory, setSelectedCategory] = useState(linkNav[0]);
  const {isFetching, isLoading, data, error} = useQuery({
    queryKey: ["provider-dashboard", selectedCategory],
    queryFn: async () => {
      const provider = providers[providerName.toLocaleLowerCase()];
      if (!provider) throw new Error("Provider not found");
      return await provider?.getData("LFxZHQKRZOsoJ1D9BtolENsrl38ocoSVRd9nTEZBRoA", "products");
    },
    enabled: !!selectedCategory && !!providerName,
  });
  console.log(data, error)
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold">
          <IconT className=" self-center size-10 inline-block" /> {providerName} Workspace
        </DialogTitle>
        <DialogDescription>
          Your creative hub is ready. Use your connected {providerName} content
          to design and share links, cards, and more.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row gap-4 space-y-6 relative p-3">
        <div className="w-1/4">
          <div className="flex flex-col gap-2">
            {linkNav.map((link) => (
              <Button
                key={link.label}
                variant={selectedCategory === link ? "default" : "outline"}
                onClick={() => setSelectedCategory(link)}
                className={`cursor-pointer flex justify-start gap-2 border-none ${
                  selectedCategory === link ? "" : "hover:bg-muted"
                }`}
              >
                <link.icon className="size-5" />
                {link.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-3/4">
          <ScrollArea className="h-96">
            <div className="grid grid-cols-2 gap-3 p-2"></div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
