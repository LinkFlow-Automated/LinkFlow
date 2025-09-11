"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons/lib";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | IconType;
    isActive?: boolean;
    hasSubmenu?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathName = usePathname();

  const isLinkActive = (url: string) => {
    // Handle root paths
    if (url === "/" || url === "/dashboard") {
      return pathName === `/` || pathName === `/dashboard`;
    }

    // Handle tenant-specific URLs
    if (url === `/` || url === `/`) {
      return pathName === `/` || pathName === `/`;
    }

    // For other paths, check if the current path matches the URL
    // This handles both cases: when URL already has tenant slug or when it doesn't
    if (url.startsWith(`/`)) {
      // URL already has tenant slug
      return pathName === url || pathName.startsWith(url);
    } else {
      // URL doesn't have tenant slug, so we need to check if the path matches after adding the slug
      const urlWithTenant = url.startsWith("/") ? `/${url}` : `/${url}`;

      return pathName === urlWithTenant || pathName.startsWith(urlWithTenant);
    }
  };

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu className="mt-4">
        {items.map((item) => {
          // Check if the item has submenu items
          const hasSubmenu =
            item.hasSubmenu || (item.items && item.items.length > 0);

          const isActive =
            isLinkActive(item.url) ||
            (item.items?.some((subItem) => isLinkActive(subItem.url)) ?? false);

          if (hasSubmenu) {
            // Render item with submenu
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isActive || item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        isActive && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      {item.icon && (
                        <item.icon className={cn(isActive && "text-primary")} />
                      )}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubItemActive = isLinkActive(subItem.url);
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                isSubItemActive &&
                                  "bg-primary/10 text-primary font-medium"
                              )}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            // Render item without submenu
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    isActive && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <Link href={item.url}>
                    {item.icon && (
                      <item.icon className={cn(isActive && "text-primary")} />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
