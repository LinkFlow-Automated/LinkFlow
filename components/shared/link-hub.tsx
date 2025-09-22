"use client";

import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TooltipWrapper from "./tooltip-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { IoHeart } from "react-icons/io5";
import { AiFillShop } from "react-icons/ai";
import { MdContacts } from "react-icons/md";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { FiLink } from "react-icons/fi";
import {
  FaSpotify,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaShopify,
  FaEtsy,
  FaAmazon,
  FaPaypal,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaDiscord,
  FaTwitch,
  FaGithub,
  FaBehance,
} from "react-icons/fa";
import { SiNotion, SiCalendly, SiFormspree } from "react-icons/si";
import { useState } from "react";
import { RiLightbulbFill } from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { ConnectionDialog, platformConfigs } from "./provider-connect";
import { toast } from "sonner";
import { useManageLink } from "@/hooks/use-manage-link";
import { Link } from "@/lib/generated/prisma";

interface HubLinkProps {
  userId: string;
  items: Link[];
}

const platformData = {
  suggested: [
    {
      name: "Collection",
      icon: HiViewGridAdd,
      color: "bg-green-500",
      description: "Organize your links into a section.",
      needsConnection: false,
    },
    {
      name: "Link",
      icon: FiLink,
      color: "bg-red-500",
      description: "A single, direct link to any URL.",
      needsConnection: false,
    },
    {
      name: "Product",
      icon: AiFillShop,
      color: "bg-blue-500",
      description: "Link to an item you are selling.",
      needsConnection: false,
    },
    {
      name: "Form",
      icon: SiFormspree,
      color: "bg-yellow-500",
      description: "Capture leads or feedback from visitors.",
      needsConnection: false,
    },
  ],
  connect: [
    {
      name: "Spotify",
      icon: FaSpotify,
      color: "bg-green-500",
      description: "Connect your music",
      needsConnection: true,
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      color: "bg-red-500",
      description: "Connect your channel",
      needsConnection: true,
    },
    {
      name: "Shopify",
      icon: FaShopify,
      color: "bg-green-600",
      description: "Connect your store",
      needsConnection: true,
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      description: "Connect your profile",
      needsConnection: true,
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      color: "bg-black",
      description: "Connect your videos",
      needsConnection: true,
    },
    {
      name: "Discord",
      icon: FaDiscord,
      color: "bg-indigo-500",
      description: "Connect your server",
      needsConnection: true,
    },
    {
      name: "Twitch",
      icon: FaTwitch,
      color: "bg-purple-600",
      description: "Connect your stream",
      needsConnection: true,
    },
    {
      name: "GitHub",
      icon: FaGithub,
      color: "bg-gray-800",
      description: "Connect your code",
      needsConnection: true,
    },
  ],
  social: [
    {
      name: "Instagram",
      icon: FaInstagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      description: "Share your photos",
      needsConnection: false,
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "bg-blue-400",
      description: "Share your thoughts",
      needsConnection: false,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "bg-blue-600",
      description: "Professional network",
      needsConnection: false,
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      color: "bg-black",
      description: "Short form videos",
      needsConnection: false,
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      color: "bg-red-500",
      description: "Video content",
      needsConnection: false,
    },
    {
      name: "Discord",
      icon: FaDiscord,
      color: "bg-indigo-500",
      description: "Community chat",
      needsConnection: false,
    },
    {
      name: "Behance",
      icon: FaBehance,
      color: "bg-blue-500",
      description: "Creative portfolio",
      needsConnection: false,
    },
  ],
  shop: [
    {
      name: "Shopify",
      icon: FaShopify,
      color: "bg-green-600",
      description: "Online store",
      needsConnection: false,
    },
    {
      name: "Etsy",
      icon: FaEtsy,
      color: "bg-orange-500",
      description: "Handmade goods",
      needsConnection: false,
    },
    {
      name: "Amazon",
      icon: FaAmazon,
      color: "bg-orange-400",
      description: "Marketplace",
      needsConnection: false,
    },
    {
      name: "PayPal",
      icon: FaPaypal,
      color: "bg-blue-600",
      description: "Payment link",
      needsConnection: false,
    },
    {
      name: "Website",
      icon: FaGlobe,
      color: "bg-blue-500",
      description: "Your store website",
      needsConnection: false,
    },
  ],
  contact: [
    {
      name: "Email",
      icon: FaEnvelope,
      color: "bg-gray-500",
      description: "Send an email",
      needsConnection: false,
    },
    {
      name: "Phone",
      icon: FaPhone,
      color: "bg-green-500",
      description: "Call directly",
      needsConnection: false,
    },
    {
      name: "Location",
      icon: FaMapMarkerAlt,
      color: "bg-red-500",
      description: "Find us here",
      needsConnection: false,
    },
    {
      name: "Website",
      icon: FaGlobe,
      color: "bg-blue-500",
      description: "Visit our site",
      needsConnection: false,
    },
    {
      name: "Calendly",
      icon: SiCalendly,
      color: "bg-blue-500",
      description: "Schedule a meeting",
      needsConnection: false,
    },
    {
      name: "Notion",
      icon: SiNotion,
      color: "bg-black",
      description: "Contact form",
      needsConnection: false,
    },
  ],
};

export default function LinkHub({ userId, items }: HubLinkProps) {
  const { createLink, isCreating, isLoading } = useManageLink(userId);
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("suggested");

  const categories = [
    { label: "Suggested", value: "suggested", icon: RiLightbulbFill },
    { label: "Connect", value: "connect", icon: PiPlugsConnectedFill },
    { label: "Social", value: "social", icon: IoHeart },
    { label: "Shop", value: "shop", icon: AiFillShop },
    { label: "Contact", value: "contact", icon: MdContacts },
  ];

  const currentPlatforms =
    platformData[selectedCategory as keyof typeof platformData] || [];

  const handleCreateLink = ({
    provider,
  }: {
    provider?: string | undefined;
  }) => {
    // const currentTime = Date.now();
    const newOrder =
      items.length > 0
        ? Math.max(...items.map((item) => item.order || 0)) + 1
        : 1;

    createLink({
      userId: userId, // Use the passed userId or user?.id from auth
      title: `New Link`,
      description: null,
      url: "https://example.com",
      category: null,
      order: newOrder,
      isHadRedirectLink: false,
      layout: "",
      animation: "none",
      themeOverrides: {},
      redirectTo: "",
      clicks: 0,
      featured: false,
      autoSyncId: null,
      platform: null,
      thumbnail: "",
      type: "image",
      isArchived: false,
      visibility: "PUBLIC",
      scheduledAt: null,
      expiresAt: null,
      rules: {}, // Adjust based on your rulesSchema structure
      // createdAt: new Date(),
      metadata: {
        provider: provider?.toLowerCase(),
      },
    });
    setOpen(false);
    toast.success("Link created");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper content="Create your link">
        <DialogTrigger className="w-full">
          <Button
            size={"lg"}
            className="flex items-center gap-2 justify-center cursor-pointer w-full"
          >
            <Plus className="size-5" />
            Add link
          </Button>
        </DialogTrigger>
      </TooltipWrapper>
      <DialogContent className="max-w-7xl min-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Plus className="size-5" />
            <DialogTitle> Add Link</DialogTitle>
          </div>
          <DialogDescription>
            <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
              <IoIosSearch className="h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search a link"
                className="border-0 focus-visible:ring-0 shadow-none"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4">
          <div className="w-1/4">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <Button
                  key={category.label}
                  variant={
                    selectedCategory === category.value ? "default" : "outline"
                  }
                  className={`cursor-pointer flex justify-start gap-2 border-none ${
                    selectedCategory === category.value ? "" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <category.icon className="size-5" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="w-3/4">
            <ScrollArea className="h-96">
              <div className="grid grid-cols-2 gap-3 p-2">
                {currentPlatforms.map((platform) => {
                  if (platform.needsConnection) {
                    return (
                      <ConnectionDialog
                        key={platform.name}
                        platform={
                          platform.name.toLowerCase() as keyof typeof platformConfigs
                        }
                      />
                    );
                  } else {
                    return (
                      <Button
                        key={platform.name}
                        onClick={() =>
                          handleCreateLink({ provider: platform.name })
                        }
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted/50 cursor-pointer bg-transparent"
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div
                            className={`p-2 rounded-lg ${platform.color} text-white flex-shrink-0`}
                          >
                            <platform.icon className="size-5" />
                          </div>
                          <div className="flex flex-col items-start overflow-hidden">
                            <span className="font-medium text-sm">
                              {platform.name}
                            </span>
                            <span className="text-xs text-muted-foreground text-left line-clamp-1 overflow-hidden w-full">
                              {platform.description}
                            </span>
                          </div>
                        </div>
                      </Button>
                    );
                  }
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
