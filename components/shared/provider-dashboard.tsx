import { IconType } from "react-icons/lib";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";

interface ProviderDashboard {
  providerName: string;
  linkNav: {
    label: string;
    icon: IconType;
  }[];
}
export default function ProviderDashboard({
  providerName,
  linkNav,
}: ProviderDashboard) {
    const [selectedCategory, setSelectedCategory] = useState(linkNav[0]);
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold">
          {providerName} Workspace
        </DialogTitle>
        <DialogDescription>
          Your creative hub is ready. Use your connected {providerName} content
          to design and share links, cards, and more.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row gap-4 space-y-6 relative p-3">
        <div className="w-1/4">
          <div className="flex flex-col gap-2">
            {linkNav.map((link, index) => (
              <Button
                key={index}
                variant={
                  selectedCategory === link ? "default" : "outline"
                }
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
          <ScrollArea className="h-96"></ScrollArea>
        </div>
      </div>
    </>
  );
}
