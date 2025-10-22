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
import { AudioWaveform, Command, GalleryVerticalEnd, LucideIcon } from "lucide-react";
import { TeamSwitcher } from "./team-switcher";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { GiScissors } from "react-icons/gi";
import { IconType } from "react-icons";
import { Profile } from "@/lib/generated/prisma";
import { useTenant } from "@/contexts/tenant-context";

// Type definitions
type Team = {
  name: string;
  logo: LucideIcon;
  plan: string;
  slug?: string;
};

type NavSubItem = {
  title: string;
  url: string;
};

type NavMainItem = {
  title: string;
  url: string;
  icon: IconType;
  hasSubmenu?: boolean;
  items?: NavSubItem[];
};

type NavToolItem = {
  title: string;
  url: string;
  icon: IconType;
};

type NavSecondaryItem = {
  title: string;
  url: string;
  icon: IconType;
};

type SidebarData = {
  teams: Team[];
  navMain: NavMainItem[];
  navTools: NavToolItem[];
  navSecondary: NavSecondaryItem[];
};

type User = {
  name: string;
  email: string;
  avatar: string;
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  tenants?: Profile[];
  session?: unknown;
  tenantSlug?: string;
};

/**
 * Prefixes URLs with tenant slug
 * @param url - Original URL
 * @param slug - Tenant slug
 * @returns Prefixed URL or original if slug is missing
 */
const prefixUrlWithTenant = (url: string, slug?: string): string => {
  if (!slug) return url;
  
  // Don't prefix external links or anchors
  if (url.startsWith('http') || url.startsWith('#')) {
    return url;
  }
  
  // Remove leading slash if present
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
  
  return `/${slug}/${cleanUrl}`;
};

/**
 * Updates all navigation items with tenant-prefixed URLs
 */
const updateNavWithTenant = (
  navItems: NavMainItem[],
  tenantSlug?: string
): NavMainItem[] => {
  return navItems.map((item) => ({
    ...item,
    url: prefixUrlWithTenant(item.url, tenantSlug),
    items: item.items?.map((subItem) => ({
      ...subItem,
      url: prefixUrlWithTenant(subItem.url, tenantSlug),
    })),
  }));
};

const updateToolsWithTenant = (
  toolItems: NavToolItem[],
  tenantSlug?: string
): NavToolItem[] => {
  return toolItems.map((item) => ({
    ...item,
    url: prefixUrlWithTenant(item.url, tenantSlug),
  }));
};

const updateSecondaryWithTenant = (
  secondaryItems: NavSecondaryItem[],
  tenantSlug?: string
): NavSecondaryItem[] => {
  return secondaryItems.map((item) => ({
    ...item,
    url: prefixUrlWithTenant(item.url, tenantSlug),
  }));
};

const baseSidebarData: SidebarData = {
  teams: [],
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
    {
      title: "Instagram Auto-Reply",
      url: "/tools/instagram-reply",
      icon: BiSolidMessageRoundedDetail,
    },
    { title: "BreeziShort", url: "/tools/link-shortener", icon: GiScissors },
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

/**
 * Convert Profile tenants to Team format
 */
const convertTenantsToTeams = (tenants?: Profile[]): Team[] => {
  if (!tenants || tenants.length === 0) return [];

  return tenants.map((tenant) => ({
    name: tenant.displayName || tenant.username,
    logo: GalleryVerticalEnd, // You can customize based on tenant type
    plan: tenant.isPrimary ? "Primary" : "Profile",
    slug: tenant.username,
  }));
};

export function AppSidebar({ 
  tenants, 
  session, 
  tenantSlug, 
  ...props 
}: AppSidebarProps) {
  const sessionData = useSession();

  const user: User = {
    name: sessionData.data?.user.name ?? "Guest",
    email: sessionData.data?.user.email ?? "",
    avatar: sessionData.data?.user.image ?? "",
  };

  // Find active tenant
  const activeTenant = tenants?.find(
    (tenant: Profile) => tenant.username === tenantSlug
  );

  // Convert tenants to teams format
  const teams = React.useMemo(() => convertTenantsToTeams(tenants), [tenants]);

  // Generate tenant-aware navigation
  const sidebarData: SidebarData = React.useMemo(
    () => ({
      teams,
      navMain: updateNavWithTenant(baseSidebarData.navMain, tenantSlug),
      navTools: updateToolsWithTenant(baseSidebarData.navTools, tenantSlug),
      navSecondary: updateSecondaryWithTenant(
        baseSidebarData.navSecondary,
        tenantSlug
      ),
    }),
    [teams, tenantSlug]
  );

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher 
          teams={sidebarData.teams} 
          activeTenant={tenantSlug || ''}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavTools items={sidebarData.navTools} />
        <NavSecondary items={sidebarData.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}