import { Link } from "@/lib/generated/prisma";
import {
  createLink,
  deleteLink,
  updateLink,
  updateLinksOrder,
  fetchLinks,
} from "@/lib/services/link-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

      return { prevLinks, tempId };
    },
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
        old.map((link) => (link.id === context?.tempId ? data : link))
      );
    },
    onError: (err, newLink, context) => {
      console.log(err, newLink);
      queryClient.setQueryData(["links", userId], context?.prevLinks);
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

      return { prevLinks };
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
          old.map((link) => (link.id === data.id ? data : link))
        );
      }
    },
    onError: (err, updatedLink, context) => {
      console.log(err, updatedLink);
      queryClient.setQueryData(["links", userId], context?.prevLinks);
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

      return { prevLinks };
    },
    onSuccess: (data) => {
      // Optionally refetch or use returned data
      queryClient.invalidateQueries({ queryKey: ["links", userId] });
    },
    onError: (err, updates, context) => {
      console.log(err, updates);
      queryClient.setQueryData(["links", userId], context?.prevLinks);
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

      return { prevLinks };
    },
    onSuccess: (data, id) => {
      console.log(data);
      queryClient.setQueryData<Link[]>(["links", userId], (old = []) =>
        old.filter((link) => link.id !== id)
      );
    },
    onError: (err, id, context) => {
      console.log(err, id);
      queryClient.setQueryData(["links", userId], context?.prevLinks);
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
