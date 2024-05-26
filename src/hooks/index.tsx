import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
export const useGetUser = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/user");
      return data;
    },
  });
  return { data, isPending, isError, refetch };
};

export const useBecomeInstructor = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };
  const { mutate: becomeInstructor, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.put("/instructor/become-instructor", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      handleTabChange(1);
      toast({
        title: `You are now an instructor`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      if (error.response) {
        toast({
          title: `${error.response.data.error}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (error.request) {
        toast({
          title: "Network error occurred. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "An error occurred. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });
  return { becomeInstructor, isPending, tabIndex, handleTabChange };
};
