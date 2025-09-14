"use client";

import * as React from "react";
import { HiUsers, HiLightBulb, HiMiniCpuChip } from "react-icons/hi2";
import { HiCalendar } from "react-icons/hi";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiPlug2Fill, RiRobot2Fill, RiSettings3Fill } from "react-icons/ri";
import { MdOutlineHelp } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useSession } from "@/lib/auth-client";
import { HiTrendingUp } from "react-icons/hi";
import { NavTools } from "./nav-tool";
import { NavSecondary } from "./nav-secondary";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import { TeamSwitcher } from "./team-switcher";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { GiScissors } from "react-icons/gi";

const sidebarData = {
  teams: [
    {
      name: "Rley",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Good Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "My Breezi",
      url: "/admin",
      icon: TbLayoutDashboardFilled,
      hasSubmenu: true,
      items: [
        {
          title: "Breezies",
          url: "/admin/breezies",
        },
        {
          title: "Shop",
          url: "/admin/shop",
        },
        {
          title: "Design",
          url: "/admin/design",
        },
      ],
    },
    {
      title: "Audience",
      url: "/admin/audience",
      icon: HiUsers,
    },
    {
      title: "Insight",
      url: "/admin/insight",
      icon: HiLightBulb,
    },
    {
      title: "Growth",
      url: "/growth",
      icon: HiTrendingUp,
      hasSubmenu: true,
      items: [
        { title: "Monetization", url: "/monetization" },
        { title: "AI Boost", url: "/ai" },
        { title: "Campaigns", url: "/campaigns" },
      ],
    },
  ],
  navTools: [
    { title: "BreeziBuzz", url: "/tools/social-planner", icon: HiCalendar },
    { title: "BreeziAI", url: "/tools/ai-generator", icon: HiMiniCpuChip },
    { title: "BreeziBot", url: "/tools/automation-bot", icon: RiRobot2Fill },
    { title: "BreeziConnect", url: "/tools/Integration", icon: RiPlug2Fill },
    {title: "Instagram Auto-Reply", url:"/tools/", icon : BiSolidMessageRoundedDetail},
    {title: "BreeziShort", url:"/tools/link-shortener", icon : GiScissors}
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: RiSettings3Fill,
    },
    {
      title: "Get Help",
      url: "#",
      icon: MdOutlineHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  const user = {
    name: session.data?.user.name as string,
    email: session.data?.user.email as string,
    avatar: session.data?.user.image as string,
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavTools items={sidebarData.navTools} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
