import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addUserLocalStorage } from "../store/localStorage";
import { setUser } from "../features/user/UserSlice";
export const useGetUser = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/user");
      return data;
    },
  });
  return { data };
};
export const useLoginUser = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isPending, mutate: loginUser } = useMutation({
    mutationFn: (user) => {
      return customFetch.post("/auth/login", user);
    },
    onSuccess: (user) => {
      dispatch(setUser(user.data));
      addUserLocalStorage(user.data);
      toast({
        title: `welcome ${user.data.user.firstName}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
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
  return { isPending, loginUser };
};
