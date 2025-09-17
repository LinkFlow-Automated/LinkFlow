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

interface HubLinkProps {
  handleCreateLink: () => void;
}
const platformData = {
  suggested: [
    {
      name: "Collection",
      icon: HiViewGridAdd,
      color: "bg-green-500",
      description: "Organize your links into a section.",
    },
    {
      name: "Link",
      icon: FiLink,
      color: "bg-red-500",
      description: "A single, direct link to any URL.",
    },
    {
      name: "Product",
      icon: AiFillShop,
      color: "bg-blue-500",
      description: "Link to an item you are selling.",
    },
    {
      name: "Form",
      icon: SiFormspree,
      color: "bg-yellow-500",
      description: "Capture leads or feedback from visitors.",
    },
  ],
  connect: [
    {
      name: "Spotify",
      icon: FaSpotify,
      color: "bg-green-500",
      description: "Connect your music",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      color: "bg-red-500",
      description: "Connect your channel",
    },
    {
      name: "Shopify",
      icon: FaShopify,
      color: "bg-green-600",
      description: "Connect your store",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      description: "Connect your profile",
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      color: "bg-black",
      description: "Connect your videos",
    },
    {
      name: "Discord",
      icon: FaDiscord,
      color: "bg-indigo-500",
      description: "Connect your server",
    },
    {
      name: "Twitch",
      icon: FaTwitch,
      color: "bg-purple-600",
      description: "Connect your stream",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      color: "bg-gray-800",
      description: "Connect your code",
    },
  ],
  social: [
    {
      name: "Instagram",
      icon: FaInstagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      description: "Share your photos",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      color: "bg-blue-400",
      description: "Share your thoughts",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      color: "bg-blue-600",
      description: "Professional network",
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      color: "bg-black",
      description: "Short form videos",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      color: "bg-red-500",
      description: "Video content",
    },
    {
      name: "Discord",
      icon: FaDiscord,
      color: "bg-indigo-500",
      description: "Community chat",
    },
    {
      name: "Behance",
      icon: FaBehance,
      color: "bg-blue-500",
      description: "Creative portfolio",
    },
  ],
  shop: [
    {
      name: "Shopify",
      icon: FaShopify,
      color: "bg-green-600",
      description: "Online store",
    },
    {
      name: "Etsy",
      icon: FaEtsy,
      color: "bg-orange-500",
      description: "Handmade goods",
    },
    {
      name: "Amazon",
      icon: FaAmazon,
      color: "bg-orange-400",
      description: "Marketplace",
    },
    {
      name: "PayPal",
      icon: FaPaypal,
      color: "bg-blue-600",
      description: "Payment link",
    },
    {
      name: "Website",
      icon: FaGlobe,
      color: "bg-blue-500",
      description: "Your store website",
    },
  ],
  contact: [
    {
      name: "Email",
      icon: FaEnvelope,
      color: "bg-gray-500",
      description: "Send an email",
    },
    {
      name: "Phone",
      icon: FaPhone,
      color: "bg-green-500",
      description: "Call directly",
    },
    {
      name: "Location",
      icon: FaMapMarkerAlt,
      color: "bg-red-500",
      description: "Find us here",
    },
    {
      name: "Website",
      icon: FaGlobe,
      color: "bg-blue-500",
      description: "Visit our site",
    },
    {
      name: "Calendly",
      icon: SiCalendly,
      color: "bg-blue-500",
      description: "Schedule a meeting",
    },
    {
      name: "Notion",
      icon: SiNotion,
      color: "bg-black",
      description: "Contact form",
    },
  ],
};

export default function LinkHub({ handleCreateLink }: HubLinkProps) {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper content="Create your link">
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 justify-center cursor-pointer">
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
                {currentPlatforms.map((platform) => (
                  <Button
                    key={platform.name}
                    onClick={
                      platform.name === "Link"
                        ? handleCreateLink
                        : () => console.log("hi")
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
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
