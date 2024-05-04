import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { Stack, useToast, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { GetToastErrorHandling } from "../../components";

export const useCourseCategory = () => {
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);

  const { data, isPending, isError } = useQuery({
    queryKey: ["courseCategory"],
    queryFn: async () => {
      try {
        const { data } = await customFetch.get("/course/category");
        setError(null);
        return data;
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An unexpected error occurred.");
        }
        throw error;
      }
    },
  });
  useEffect(() => {
    if (isError) {
      if (error) {
        toast({
          status: "error",
          position: "bottom-right",
          duration: 10000,
          isClosable: true,
          render: ({ onClose }) => (
            <GetToastErrorHandling error={error} onClose={onClose} />
          ),
        });
      } else {
        toast({
          status: "error",
          position: "bottom-right",
          duration: 10000,
          isClosable: true,
          render: ({ onClose }) => (
            <GetToastErrorHandling error={"Network Error"} onClose={onClose} />
          ),
        });
      }
    }
  }, [isError, error, toast]);
  return { data, isPending };
};

export const useCreateCourse = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: createCourse, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.post("/course", user);
    },
    onSuccess: (user: any) => {
      queryClient.invalidateQueries({ queryKey: ["singleCourse"] });
      queryClient.invalidateQueries({ queryKey: ["allUserCourse"] });

      toast({
        title: `course create successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate(`/instructor/courses/${user?.data?.id}/manage/basics`);
      }, 1000);
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
  return { createCourse, isPending };
};

export const useSingleCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: singleCourse,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ singleId, user }: any) => {
      return customFetch.put(`course/${singleId}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleCourse"] });
      queryClient.invalidateQueries({ queryKey: ["allUserCourse"] });

      toast({
        title: `course updated successfully`,
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
  return { singleCourse, isPending, error, isError };
};

export const useGetSingleCourse = (id: any) => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const {
    data: getSingleCourse,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["singleCourse", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Destructure the queryKey to get the 'id'
      const { data } = await customFetch.get(`/course/${id}`);
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
  return { getSingleCourse, isPending, isError, refetch };
};

export const useGetCourse = () => {
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);
  const { data, isPending, isError } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      try {
        const { data } = await customFetch.get(`/course/?limit=20`);
        setError(null);
        return data;
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An unexpected error occurred.");
        }
        throw error;
      }
    },
  });
  useEffect(() => {
    if (isError) {
      if (error) {
        toast({
          status: "error",
          position: "bottom-right",
          duration: 10000,
          isClosable: true,
          render: ({ onClose }) => (
            <GetToastErrorHandling error={error} onClose={onClose} />
          ),
        });
      } else {
        toast({
          status: "error",
          position: "bottom-right",
          duration: 10000,
          isClosable: true,
          render: ({ onClose }) => (
            <GetToastErrorHandling error={"Network Error"} onClose={onClose} />
          ),
        });
      }
    }
  }, [isError, error, toast]);
  return { data, isPending };
};

export const useGetAllUserCourse = () => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ["allUserCourse"],
    queryFn: async () => {
      const { data } = await customFetch.get("/course/user");
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
  return { data, isPending, isError, refetch };
};

export const useSingleStatusCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: singleStatusCourse,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ id, status }: any) => {
      return customFetch.put(`course/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singleCourse"] });
      queryClient.invalidateQueries({ queryKey: ["allUserCourse"] });

      toast({
        title: `course status updated successfully`,
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
  return { singleStatusCourse, isPending, error, isError };
};

export const useDeleteCourseModule = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteCourseModule, isPending: deleteCourseModuleLoading } =
    useMutation({
      mutationFn: ({ courseId }: any) => {
        return customFetch.delete(`/course/${courseId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allUserCourse"] });
        toast({
          title: `course deleted successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/instructor/courses");
        }, 1000);
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
  return { deleteCourseModule, deleteCourseModuleLoading };
};
