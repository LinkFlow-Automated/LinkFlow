"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  // DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaShopify,
  FaSpotify,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa6";
import { TbBrandGumroad } from "react-icons/tb";
import { useState } from "react";
import { providers } from "@/lib/connect/registry";
import ConnectProviderPrompt from "../connect-provider-prompt";
import { navBarProviders } from "@/lib/const/conts";
import { IconType } from "react-icons/lib";
import ProviderDashboard from "./provider-dashboard";

// Platform configurations
export const platformConfigs = {
  spotify: {
    name: "Spotify",
    color: "#1DB954",
    icon: FaSpotify,
    description:
      "Link Spotify to track favorite artists and get concert recommendations tailored to your listening.",
    cards: [
      {
        id: 1,
        title: "Blinding Lights",
        background: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
        image: "/blinding-lights-cover.jpg",
      },
      {
        id: 2,
        title: "Bad Guy",
        background: "linear-gradient(135deg, #00CDAC 0%, #02AAB0 100%)",
        image: "/bad-guy-cover.jpg",
      },
      {
        id: 3,
        title: "Don't Start Now",
        background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
        image: "/dont-start-now-cover.jpg",
      },
      {
        id: 4,
        title: "Bohemian Rhapsody",
        background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
        image: "/bohemian-rhapsody-cover.jpg",
      },
      {
        id: 5,
        title: "HUMBLE.",
        background: "linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)",
        image: "/humble-cover.jpg",
      },
      {
        id: 6,
        title: "The Less I Know The Better",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        image: "/the-less-i-know-cover.jpg",
      },
      {
        id: 7,
        title: "Good Days",
        background: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
        image: "/good-days-cover.jpg",
      },
      {
        id: 8,
        title: "Levitating",
        background: "linear-gradient(135deg, #654EA3 0%, #EAAFC8 100%)",
        image: "/levitating-cover.jpg",
      },
      {
        id: 9,
        title: "Watermelon Sugar",
        background: "linear-gradient(135deg, #FF5858 0%, #F09819 100%)",
        image: "/watermelon-sugar-cover.jpg",
      },
      {
        id: 10,
        title: "Save Your Tears",
        background: "linear-gradient(135deg, #4ECDC4 0%, #556270 100%)",
        image: "/save-your-tears-cover.jpg",
      },
      {
        id: 11,
        title: "Stay",
        background: "linear-gradient(135deg, #2193B0 0%, #6DD5ED 100%)",
        image: "/stay-cover.jpg",
      },
      {
        id: 12,
        title: "Industry Baby",
        background: "linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)",
        image: "/industry-baby-cover.jpg",
      },
      {
        id: 13,
        title: "As It Was",
        background: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)",
        image: "/as-it-was-cover.jpg",
      },
      {
        id: 14,
        title: "Heat Waves",
        background: "linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)",
        image: "/heat-waves-cover.jpg",
      },
      {
        id: 15,
        title: "AVF",
        background: "linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)",
        image: "/heat-waves-cover.jpg",
      },
      {
        id: 16,
        title: "Disque dor",
        background: "linear-gradient(135deg, #FFECD2 0%, #FCB69F 100%)",
        image: "/heat-waves-cover.jpg",
      },
    ],
  },
  instagram: {
    name: "Instagram",
    color: "#E4405F",
    icon: FaInstagram,
    description:
      "Connect Instagram to showcase your visual content and reach a broader audience.",
    cards: [
      {
        id: 1,
        title: "Stories",
        background:
          "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
        image: "/instagram-stories-icon.jpg",
      },
      {
        id: 2,
        title: "Reels",
        background:
          "linear-gradient(135deg, #405de6 0%, #5851db 50%, #833ab4 100%)",
        image: "/instagram-reels-icon.png",
      },
      {
        id: 3,
        title: "Posts",
        background:
          "linear-gradient(135deg, #fcb045 0%, #fd1d1d 50%, #833ab4 100%)",
        image: "/instagram-posts-icon.jpg",
      },
    ],
  },
  youtube: {
    name: "YouTube",
    color: "#FF0000",
    icon: FaYoutube,
    description:
      "Link YouTube to sync your video content and grow your subscriber base.",
    cards: [
      {
        id: 1,
        title: "Shorts",
        background: "linear-gradient(135deg, #ff0000 0%, #ff4444 100%)",
        image: "/youtube-shorts-icon.jpg",
      },
      {
        id: 2,
        title: "Videos",
        background: "linear-gradient(135deg, #cc0000 0%, #ff0000 100%)",
        image: "/youtube-videos-icon.jpg",
      },
      {
        id: 3,
        title: "Live",
        background: "linear-gradient(135deg, #ff4444 0%, #cc0000 100%)",
        image: "/youtube-live-icon.jpg",
      },
    ],
  },
  shopify: {
    name: "Shopify",
    color: "#7AB55C",
    icon: FaShopify,
    description:
      "Connect Shopify to sync your store products and boost online sales.",
    cards: [
      {
        id: 1,
        title: "Products",
        background: "linear-gradient(135deg, #7AB55C 0%, #A3D977 100%)",
        image: "/shopify-products-icon.jpg",
      },
      {
        id: 2,
        title: "Orders",
        background: "linear-gradient(135deg, #5DA946 0%, #7AB55C 100%)",
        image: "/shopify-orders-icon.jpg",
      },
      {
        id: 3,
        title: "Analytics",
        background: "linear-gradient(135deg, #A3D977 0%, #C7E89B 100%)",
        image: "/shopify-analytics-icon.jpg",
      },
    ],
  },
  tiktok: {
    name: "TikTok",
    color: "#000000",
    icon: FaTiktok,
    description:
      "Connect TikTok to showcase your short-form videos and reach younger audiences.",
    cards: [
      {
        id: 1,
        title: "Videos",
        background:
          "linear-gradient(135deg, #FF0050 0%, #000000 50%, #00F2EA 100%)",
        image: "/tiktok-videos-icon.jpg",
      },
      {
        id: 2,
        title: "Trending",
        background: "linear-gradient(135deg, #000000 0%, #FF0050 100%)",
        image: "/tiktok-trending-icon.jpg",
      },
      {
        id: 3,
        title: "Live",
        background: "linear-gradient(135deg, #00F2EA 0%, #000000 100%)",
        image: "/tiktok-live-icon.jpg",
      },
    ],
  },
  discord: {
    name: "Discord",
    color: "#5865F2",
    icon: FaDiscord,
    description:
      "Connect Discord to link your server and grow your community engagement.",
    cards: [
      {
        id: 1,
        title: "Server",
        background: "linear-gradient(135deg, #5865F2 0%, #7289DA 100%)",
        image: "/discord-server-icon.jpg",
      },
      {
        id: 2,
        title: "Community",
        background: "linear-gradient(135deg, #7289DA 0%, #99AAB5 100%)",
        image: "/discord-community-icon.jpg",
      },
      {
        id: 3,
        title: "Voice Chat",
        background: "linear-gradient(135deg, #4752C4 0%, #5865F2 100%)",
        image: "/discord-voice-icon.jpg",
      },
    ],
  },
  twitch: {
    name: "Twitch",
    color: "#9146FF",
    icon: FaTwitch,
    description:
      "Connect Twitch to showcase your live streams and build your streaming community.",
    cards: [
      {
        id: 1,
        title: "Live Streams",
        background: "linear-gradient(135deg, #9146FF 0%, #B97EFF 100%)",
        image: "/twitch-live-icon.jpg",
      },
      {
        id: 2,
        title: "Clips",
        background: "linear-gradient(135deg, #772CE8 0%, #9146FF 100%)",
        image: "/twitch-clips-icon.jpg",
      },
      {
        id: 3,
        title: "VODs",
        background: "linear-gradient(135deg, #B97EFF 0%, #D4A7FF 100%)",
        image: "/twitch-vods-icon.jpg",
      },
    ],
  },
  github: {
    name: "GitHub",
    color: "#181717",
    icon: FaGithub,
    description:
      "Connect GitHub to showcase your code repositories and development projects.",
    cards: [
      {
        id: 1,
        title: "Repositories",
        background: "linear-gradient(135deg, #181717 0%, #4A4A4A 100%)",
        image: "/github-repos-icon.jpg",
      },
      {
        id: 2,
        title: "Contributions",
        background: "linear-gradient(135deg, #0D1117 0%, #21262D 100%)",
        image: "/github-contributions-icon.jpg",
      },
      {
        id: 3,
        title: "Projects",
        background: "linear-gradient(135deg, #4A4A4A 0%, #6E6E6E 100%)",
        image: "/github-projects-icon.jpg",
      },
    ],
  },
  gumroad: {
    name: "Gumroad",
    color: "#FF90E8",
    icon: TbBrandGumroad,
    description:
      "Connect Gumroad to sell your digital products and reach more customers.",
    cards: [
      {
        id: 1,
        title: "Products",
        background: "linear-gradient(135deg, #ff90e8 0%, #ffc0e8 100%)",
        image: "/digital-products-icon.jpg",
      },
      {
        id: 2,
        title: "Analytics",
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        image: "/analytics-dashboard-icon.png",
      },
      {
        id: 3,
        title: "Sales",
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        image: "/sales-chart-icon.jpg",
      },
    ],
  },
};

interface ConnectionDialogProps {
  platform: keyof typeof platformConfigs;
  step?: number;
  totalSteps?: number;
  onConnect?: () => void;
  onSkip?: () => void;
  onBack?: () => void;
  connectedProviders?: {
    id: string;
    provider: string;
    expiresAt: Date | null;
  }[];
  icon: IconType
  userId: string
}

export function ConnectionDialog({
  platform,
  connectedProviders,
  icon,
  userId
}: ConnectionDialogProps) {
  const config = platformConfigs[platform];
  const [open, setOpen] = useState(false);

  const handleConnect = async () => {
    const url = await providers[platform].authUrl("");
    window.location.href = url;
    setOpen(false);
  };

  const isConnected = connectedProviders?.some(
    (provider) => provider.provider === platform
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          key={config.name}
          variant="outline"
          className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted/50 cursor-pointer bg-transparent"
        >
          <div className="flex items-center gap-3 w-full overflow-hidden">
            <div
              className="p-2 rounded-lg text-white flex-shrink-0"
              style={{ backgroundColor: config.color }}
            >
              <config.icon className="size-5" />
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <span className="font-medium text-sm">{config.name}</span>
              <span className="text-xs text-muted-foreground text-left line-clamp-1">
                {config.description}
              </span>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`${
          isConnected ? "min-w-3xl min-h-fit p-6" : "min-w-xl p-0"
        } max-w-7xl w-full gap-0 bg-background`}
      >
        {isConnected ? (
          <ProviderDashboard
            providerName={config.name}
            linkNav={navBarProviders[platform]}
            icon={icon}
            userId={userId}
          />
        ) : (
          <ConnectProviderPrompt config={config} />
        )}
        {!isConnected && (
          <DialogFooter className="p-6 z-10 absolute left-0 bottom-0 w-full text-start sm:justify-center items-center space-y-2 bg-gradient-to-t from-background from-[10%] to-transparent">
            <Button
              onClick={handleConnect}
              className="text-base font-medium text-white self-center cursor-pointer"
              style={{ backgroundColor: config.color }}
            >
              <config.icon className="mr-2 text-lg" />
              Connect {config.name}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
