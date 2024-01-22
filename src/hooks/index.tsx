import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";
import { useToast } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

export const useGetUser = () => {
  const { data, isPending,isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/user");
      return data;
    },
  });
  return { data, isPending,isError };
};

export const useBecomeInstructor = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: becomeInstructor, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.patch("/user/instructor", user);
    },
    onSuccess: () => {
      toast({
        title: `You are now an instructor`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/instructor/courses");
    },
    onError: (error: any) => {
      toast({
        title: `${error.response.data.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { becomeInstructor, isPending };
};





//invalidate the course in the usesinglecourse