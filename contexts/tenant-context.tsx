"use client";

import * as React from "react";
import { Profile } from "@/lib/generated/prisma";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTenants, getTenantBySlug } from "@/lib/actions/tenant.action";

type TenantContextType = {
  tenant: Profile | null;
  tenantSlug: string | null;
  allTenants: Profile[];
  isLoading: boolean;
  switchTenant: (slug: string) => void;
  refreshTenant: () => Promise<void>;
};

const TenantContext = React.createContext<TenantContextType | undefined>(
  undefined
);

type TenantProviderProps = {
  children: React.ReactNode;
  initialTenant: Profile | null;
  initialTenants: Profile[] | undefined;
  tenantSlug: string | null;
};

export function TenantProvider({
  children,
  initialTenant,
  initialTenants,
  tenantSlug,
}: TenantProviderProps) {
  const queryClient = useQueryClient();

  // Query for current tenant data
  const {
    data: tenant = initialTenant,
    isLoading: isTenantLoading,
    refetch: refetchTenant,
  } = useQuery({
    queryKey: ["tenant", tenantSlug],
    queryFn: async () => {
      if (!tenantSlug) return null;

      const response = await getTenantBySlug(tenantSlug);
      return response;
    },
    enabled: !!tenantSlug,
    initialData: initialTenant,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query for all user's tenants/profiles
  const { data: allTenants = initialTenants ?? [], isLoading: isTenantsLoading } =
    useQuery({
      queryKey: ["tenants"],
      queryFn: async () => {
        const response = await getAllTenants();
        if (!response) {
          throw new Error("Failed to fetch tenants");
        }
        return response;
      },
      initialData: initialTenants ?? [],
      staleTime: 10 * 60 * 1000, // 10 minutes
    });

  const switchTenant = React.useCallback(
    (slug: string) => {
      // Prefetch the new tenant data
      queryClient.prefetchQuery({
        queryKey: ["tenant", slug],
        queryFn: async () => {
          const response = await getTenantBySlug(slug);
          if (!response) throw new Error("Failed to fetch tenant");
          return response;
        },
      });
    },
    [queryClient]
  );

  const refreshTenant = React.useCallback(async () => {
    await refetchTenant();
    // Also refresh the tenants list
    await queryClient.invalidateQueries({ queryKey: ["tenants"] });
  }, [refetchTenant, queryClient]);

  const value = React.useMemo(
    () => ({
      tenant,
      tenantSlug,
      allTenants,
      isLoading: isTenantLoading || isTenantsLoading,
      switchTenant,
      refreshTenant,
    }),
    [
      tenant,
      tenantSlug,
      allTenants,
      isTenantLoading,
      isTenantsLoading,
      switchTenant,
      refreshTenant,
    ]
  );

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
}

// Custom hook to use tenant context
export function useTenant() {
  const context = React.useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}

// Optional: Hook to get tenant ID only (lightweight)
export function useTenantId() {
  const { tenant } = useTenant();
  return tenant?.id ?? null;
}

// Optional: Hook to get tenant slug only
export function useTenantSlug() {
  const { tenantSlug } = useTenant();
  return tenantSlug;
}

// Optional: Direct query hook for tenant-specific data
export function useTenantQuery<TData>(
  queryKey: string[],
  queryFn: (tenantId: string) => Promise<TData>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  const tenantId = useTenantId();

  return useQuery({
    queryKey: ["tenant-data", tenantId, ...queryKey],
    queryFn: () => {
      if (!tenantId) throw new Error("No tenant ID");
      return queryFn(tenantId);
    },
    enabled: !!tenantId && options?.enabled !== false,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });
}
