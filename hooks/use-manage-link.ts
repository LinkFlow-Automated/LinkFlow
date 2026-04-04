import { Link } from "@/lib/generated/prisma";
import {
  createLink,
  deleteLink,
  updateLink,
  updateLinksOrder,
  fetchLinks,
} from "@/lib/services/link-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePreviewStore } from "@/stores/preview-store";

/** Sync TanStack Query link cache to Zustand preview store */
const syncLinksToPreview = (queryClient: ReturnType<typeof useQueryClient>, userId: string) => {
  const cached = queryClient.getQueryData<Link[]>(["links", userId]) ?? [];
  usePreviewStore.getState().setLinks(
    cached.map((l) => ({ id: l.id, title: l.title, url: l.url, order: l.order ?? 0 }))
  );
};

export const useManageLink = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: links = [], isLoading } = useQuery({
    queryKey: ["links", userId],
    queryFn: () => fetchLinks(userId),
  });

  const createMutation = useMutation({
    mutationFn: createLink,
    onMutate: async (newLink) => {
      await queryClient.cancelQueries({
        queryKey: ["links", userId],
      });
      const prevLinks = queryClient.getQueryData<Link[]>(["links", userId]);

      // Create optimistic update with temporary ID
      const tempId = `temp-${Date.now()}`;
      const optimisticLink = {
        ...newLink,
        id: tempId,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Link;

      queryClient.setQueryData<Link[]>(["links", userId], (old = []) => [
        ...old,
        optimisticLink,
      ]);

      syncLinksToPreview(queryClient, userId);
      return { prevLinks, tempId };
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
        old.map((link) => (link.id === context?.tempId ? data : link))
      );
      syncLinksToPreview(queryClient, userId);
    },
    onError: (err, newLink, context) => {
      console.log(err, newLink);
      queryClient.setQueryData(["links", userId], context?.prevLinks);
      syncLinksToPreview(queryClient, userId);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateLink,
    onMutate: async (updatedLink) => {
      await queryClient.cancelQueries({
        queryKey: ["links", userId],
      });
      const prevLinks = queryClient.getQueryData<Link[]>(["links", userId]);

      queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
        old.map((link) =>
          link.id === updatedLink.id ? { ...link, ...updatedLink } : link
        )
      );

      syncLinksToPreview(queryClient, userId);
      return { prevLinks };
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
          old.map((link) => (link.id === data.id ? data : link))
        );
      }
      syncLinksToPreview(queryClient, userId);
    },
    onError: (err, updatedLink, context) => {
      console.log(err, updatedLink);
      queryClient.setQueryData(["links", userId], context?.prevLinks);
      syncLinksToPreview(queryClient, userId);
    },
  });

  // New mutation for batch updating order
  const updateOrderMutation = useMutation({
    mutationFn: updateLinksOrder, // This should accept an array of {id, order}
    onMutate: async (updates) => {
      await queryClient.cancelQueries({
        queryKey: ["links", userId],
      });
      const prevLinks = queryClient.getQueryData<Link[]>(["links", userId]);

      // Optimistically update the order
      queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
        old.map((link) => {
          const update = updates.find((u) => u.id === link.id);
          return update ? { ...link, order: update.order } : link;
        })
      );

      syncLinksToPreview(queryClient, userId);
      return { prevLinks };
    },
    onSuccess: (data) => {
      // Optionally refetch or use returned data
      queryClient.invalidateQueries({ queryKey: ["links", userId] });
      syncLinksToPreview(queryClient, userId);
    },
    onError: (err, updates, context) => {
      console.log(err, updates);
      queryClient.setQueryData(["links", userId], context?.prevLinks);
      syncLinksToPreview(queryClient, userId);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLink,
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["links", userId],
      });
      const prevLinks = queryClient.getQueryData<Link[]>(["links", userId]);

      queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
        old.filter((link) => link.id !== id)
      );

      syncLinksToPreview(queryClient, userId);
      return { prevLinks };
    },
    onSuccess: (data, id) => {
      console.log(data);
      queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
        old.filter((link) => link.id !== id)
      );
      syncLinksToPreview(queryClient, userId);
    },
    onError: (err, id, context) => {
      console.log(err, id);
      queryClient.setQueryData(["links", userId], context?.prevLinks);
      syncLinksToPreview(queryClient, userId);
    },
  });

  return {
    links,
    isLoading,
    createLink: createMutation.mutate,
    updateLink: updateMutation.mutate,
    updateLinksOrder: updateOrderMutation.mutate,
    deleteLink: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
