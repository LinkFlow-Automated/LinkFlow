import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { BreadcrumbNav } from "@/components/shared/sidebar/breadcrumb-nav";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TenantProvider } from "@/contexts/tenant-context";
import { getAllTenants } from "@/lib/actions/tenant.action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  params,
  children,
}: {
  params: Promise<{ layout: string }>;
  children: React.ReactNode;
}) {
  const paramsName = await params;
  const tenantName = paramsName.layout;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/login");
  }
  const userTenants = (await getAllTenants()) ?? [];

  // Find the requested tenant
  const currentTenant = userTenants.find((t) => t.username === tenantName);

  // If tenant doesn't exist or doesn't belong to user, redirect
  if (!currentTenant) {
    const primaryTenant = userTenants.find((t) => t.isPrimary);
    if (primaryTenant) {
      redirect(`/admin/${primaryTenant.username}`);
    } else if (userTenants.length > 0) {
      redirect(`/admin/${userTenants[0].username}`);
    } else {
      redirect("/onboarding"); // No profiles exist
    }
  }

  return (
    <TenantProvider
      initialTenant={currentTenant}
      initialTenants={userTenants}
      tenantSlug={tenantName}
    >
      <SidebarProvider>
        <AppSidebar
          session={session}
          tenants={userTenants}
          tenantSlug={tenantName}
          collapsible="icon"
        />
        <main className="flex-1 w-full">
          <div className="flex flex-col min-h-screen">
            <div className="flex items-center p-1 border-b bg-card">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbNav activeTenat={"admin"} />
            </div>
            <div className="flex-1 flex justify-center px-4">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </main>
      </SidebarProvider>
    </TenantProvider>
  );
}
