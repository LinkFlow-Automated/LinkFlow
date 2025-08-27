"use client";

import * as React from "react";
import { HiUsers, HiLightBulb } from "react-icons/hi2";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiSettings3Fill } from "react-icons/ri";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { HiTrendingUp } from "react-icons/hi";

const sidebarData = {
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
          url: "/admin/breezi/1",
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
    {
      title: "Settings",
      url: "/setting",
      icon: RiSettings3Fill,
      hasSubmenu: true,
      items:[
        {
          title:"Integrations",
          url:"/integrations"
        },
        {title:"Preferences",url:"/preferences"}
      ]
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#" className="">
                <Image
                  src="/breezi-logo-resolution-logo-transparent.png"
                  width={1000}
                  height={1000}
                  alt={""}
                  className="!size-8 text-white"
                />
                <span className="text-base font-semibold">{`Breezi`}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
