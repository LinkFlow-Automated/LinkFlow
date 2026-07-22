import { IconType } from "react-icons/lib";
import { Button } from "../../ui/button";
import { ScrollArea } from "../../ui/scroll-area";
import { DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { providers } from "@/lib/connect/registry";
import SkeletonContent from "./skeleton-content";
import { useManageLink } from "@/hooks/use-manage-link";
import { toast } from "sonner";
import Image from "next/image";
import { transformProviderData } from "@/lib/utils/transform-provider-data";
import { platformConfigs } from "./provider-connect";

interface ProviderDashboard {
  providerName: string;
  linkNav: {
    label: string;
    icon: IconType;
  }[];
  icon: IconType;
  userId: string;
}
export default function ProviderDashboard({
  providerName,
  linkNav,
  icon: IconT,
  userId,
}: ProviderDashboard) {
  const [selectedCategory, setSelectedCategory] = useState(linkNav[0]);

  const {
    createLink,
    isCreating,
    isLoading: isCreatingLoading,
  } = useManageLink(userId);

  const { isLoading, data, error } = useQuery({
    queryKey: ["provider-dashboard", selectedCategory, userId, providerName],
    queryFn: async () => {
      // 1. Get a fresh access token from the refresh endpoint
      const tokenRes = await fetch(
        `/api/provider/${providerName.toLowerCase()}/refresh`
      );
      if (!tokenRes.ok) throw new Error("Failed to get access token");
      const { accessToken } = await tokenRes.json();

      // 2. Fetch data from the provider using the fresh token
      const provider = providers[providerName.toLowerCase()];
      if (!provider) throw new Error("Provider not found");
      return await provider.getData(
        accessToken,
        selectedCategory.label.toLowerCase()
      );
    },
    enabled: !!selectedCategory && !!providerName,
  });

  const handleCreateLink = ({
    provider,
    type,
    data,
  }: {
    provider: keyof typeof platformConfigs | string;
    type: string;
    data?: any;
  }) => {
    const transformedData = transformProviderData({
      provider: provider as any,
      type: type as any,
      data,
      userId,
    });
    createLink(transformedData);
    toast.success("Link created");
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold">
          <IconT className=" self-center size-10 inline-block" /> {providerName}{" "}
          Workspace
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
            <div className="grid grid-cols-4 gap-3 p-2">
              {isLoading &&
                Array.from({ length: 8 }).map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <>
                  <SkeletonContent key={index} />
                ))}
              {!isLoading && error && (
                <div className="col-span-4 text-center text-muted-foreground h-full flex justify-center items-center flex-col gap-3 p-4">
                  <IconT className="size-10 opacity-60" />
                  <div>
                    <h1 className="text-xl font-bold text-foreground">
                      Couldn&apos;t load your {providerName} content
                    </h1>
                    <p className="text-sm">
                      Your connection may have expired. Reconnect {providerName}{" "}
                      to continue.
                    </p>
                  </div>
                  <Button asChild className="cursor-pointer">
                    <a
                      href={`/api/provider/${providerName.toLowerCase()}/connect`}
                    >
                      Reconnect {providerName}
                    </a>
                  </Button>
                </div>
              )}
              {!isLoading && !error && !(data?.products?.length > 0) && (
                <div className="col-span-4 text-center text-muted-foreground h-full flex justify-center items-center flex-col p-2">
                  <h1 className="text-2xl font-bold">
                    No{" "}
                    {selectedCategory.label === "Store Link"
                      ? "store"
                      : "products"}{" "}
                    found.
                  </h1>
                  <p>
                    Please check if you have any{" "}
                    {selectedCategory.label === "Store Link"
                      ? "store"
                      : "products"}{" "}
                    on your {providerName} account.
                  </p>
                </div>
              )}
              {!isLoading && !error && data?.products?.length > 0 && (
                <div className="col-span-4 text-center text-muted-foreground h-full flex justify-between items-start flex-col p-2">
                  {data.products.map((product: any) => (
                    <div
                      key={product.id}
                      className="flex flex-col gap-2 items-center"
                    >
                      <Image
                        height={1000}
                        width={1000}
                        src={product.preview_url || "/1.jpg"}
                        alt={product.title || ""}
                        className="size-16 rounded-md"
                      />
                      <p className="text-sm font-medium self-start">
                        {product.name || ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
