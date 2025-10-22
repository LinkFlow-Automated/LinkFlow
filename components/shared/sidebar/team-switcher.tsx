"use client";
import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type Team = {
  name: string;
  logo: React.ElementType;
  plan: string;
  slug?: string;
};

type TeamSwitcherProps = {
  activeTenant: string;
  teams: Team[];
};

export function TeamSwitcher({ activeTenant, teams }: TeamSwitcherProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  // Find active team based on activeTenant prop
  const activeTeam = React.useMemo(() => {
    const found = teams.find((team) => team.slug === activeTenant);
    return found || teams[0];
  }, [teams, activeTenant]);

  // Handle team/profile switching
  const handleTeamSwitch = React.useCallback(
    (team: Team) => {
      if (!team.slug) return;

      // Get current path segments after tenant slug
      const segments = pathname.split("/").filter(Boolean);

      // Remove the first segment (current tenant slug)
      const pathAfterTenant = segments.slice(1).join("/");

      // Navigate to new tenant with same path
      if (pathAfterTenant) {
        router.push(`/${team.slug}/${pathAfterTenant}`);
      } else {
        // Default to admin dashboard
        router.push(`/${team.slug}/admin`);
      }
    },
    [pathname, router]
  );

  // Handle add new profile
  const handleAddProfile = React.useCallback(() => {
    router.push(`/${activeTenant}/admin/profiles/new`);
  }, [router, activeTenant]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Bio Page
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.slug || team.name}
                onClick={() => handleTeamSwitch(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <team.logo className="size-3.5 shrink-0" />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <span>{team.name}</span>
                  {team.slug === activeTenant && (
                    <span className="text-xs text-muted-foreground">✓</span>
                  )}
                </div>
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="gap-2 p-2"
              onClick={handleAddProfile}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add profile
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}