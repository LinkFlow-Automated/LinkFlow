"use client";
import { getProviderData } from "@/lib/actions/provider.actions";
import { useQuery } from "@tanstack/react-query";

export const useManageProvider = (userId: string) => {
  const { data: providers = [], isLoading, error, refetch } = useQuery({
    queryKey: ["providers", userId],
    queryFn: async () => getProviderData(userId),
    enabled: !!userId, // Don't run query if userId is missing
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Adjust based on your needs
  });

  return {
    providers,
    isLoading,
    error,
    refetch,
  };
};