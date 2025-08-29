import { Link } from "@/lib/generated/prisma";
import {
  createLink,
  deleteLink,
  updateLink,
} from "@/lib/services/link-management";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useManageLink = () => {
  const queryClient = useQueryClient();

  const createMutaion = useMutation({
    mutationFn: createLink,
    onMutate: async (newLink) => {
      await queryClient.cancelQueries({
        queryKey: ["links"],
      });
      const prevLinks = queryClient.getQueryData(["links"]);
      queryClient.setQueryData(["links"], (old: Link[]) => [...old, newLink]);
      return {
        prevLinks,
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["links"], (old: Link[]) =>
        old.map((link) => (link.id === data.id ? data : link))
      );
    },
    onError: (err, newLink, context) => {
      console.log(err, newLink);
      queryClient.setQueryData(["links"], context?.prevLinks);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateLink,
    onMutate: async (newLink) => {
      await queryClient.cancelQueries({
        queryKey: ["links"],
      });
      const prevLinks = queryClient.getQueryData(["links"]);
      queryClient.setQueryData(["links"], (old: Link[]) =>
        old.map((link) => (link.id === newLink.id ? newLink : link))
      );
      return {
        prevLinks,
      };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["links"], (old: Link[]) =>
        old.map((link) => (link.id === data?.id ? data : link))
      );
    },
    onError: (err, newLink, context) => {
      console.log(err, newLink);
      queryClient.setQueryData(["links"], context?.prevLinks);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLink,
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["links"],
      });
      const prevLinks = queryClient.getQueryData(["links"]);
      queryClient.setQueryData(["links"], (old: Link[]) =>
        old.filter((link) => link.id !== id)
      );
      return {
        prevLinks,
      };
    },
    onSuccess: (data, id) => {
      console.log(data);
      queryClient.setQueryData(["links"], (old: Link[]) =>
        old.filter((link) => link.id !== id)
      );
    },
    onError: (err, id, context) => {
      console.log(err, id);
      queryClient.setQueryData(["links"], context?.prevLinks);
    },
  });

  return {
    createLink: createMutaion.mutate,
    updateLink: updateMutation.mutate,
    deleteLink: deleteMutation.mutate,
  };
};
