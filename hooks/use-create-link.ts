import { Link } from "@/lib/generated/prisma";
import { createLink } from "@/lib/services/link-management";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
};
