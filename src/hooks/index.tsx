import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";
import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbInfoHexagonFilled } from "react-icons/tb";
// import { setUser } from "../features/user/UserSlice";
// import { addUserLocalStorage } from "../store/localStorage";
// import { useDispatch } from "react-redux";

export const useGetUser = () => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/user");
      return data;
    },
  });
  useEffect(() => {
    if (isError && !errorToastShown) {
      setErrorToastShown(true);
      toast({
        title: "Error fetching data",
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: false,
        render: ({ onClose }) => (
          <Stack bg={"#FCBCA0"} py={3} px={4}>
            <Flex align={"center"} columnGap={2}>
              <Text>
                <TbInfoHexagonFilled size={30} />
              </Text>
              <Text fontWeight={"bold"}>Network Error</Text>
            </Flex>
            <Flex columnGap={3} mt={4}>
              <Text
                as={"button"}
                fontWeight={"bold"}
                onClick={() => window.location.reload()}
                color={"white"}
                py={1}
                px={4}
                backgroundColor={"black"}
              >
                Reload page
              </Text>
              <Text as={"button"} fontWeight={"bold"} onClick={onClose}>
                Dismiss
              </Text>
            </Flex>
          </Stack>
        ),
      });
    }
  }, [isError, errorToastShown, toast]);
  return { data, isPending, isError };
};

export const useBecomeInstructor = () => {
  const toast = useToast();
  // const dispatch= useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };
  const { mutate: becomeInstructor, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.put("/instructor/become-instructor", user);
    },
    onSuccess: () => {
      // dispatch(setUser(user.data));
      // addUserLocalStorage(user.data);
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

