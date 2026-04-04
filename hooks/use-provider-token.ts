import { useQuery } from "@tanstack/react-query";

export function useProviderToken(provider: string) {
    return useQuery({
        queryKey: ["provider-token", provider],
        queryFn: async () => {
            const res = await fetch(`/api/provider/${provider}/refresh`);
            if (!res.ok) throw new Error("Failed to get token");
            const data = await res.json();
            return data.accessToken as string;
        },
        staleTime: 1000 * 60 * 50, // 50 minutes (tokens usually expire in 1 hour)
        retry: 1,
    });
}
