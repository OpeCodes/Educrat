import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbInfoHexagonFilled } from "react-icons/tb";
export const useGetStudentSingleCourse = (slug: any) => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const {
    data: getStudentSingleCourse,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["singleCourse", slug],
    queryFn: async ({ queryKey }) => {
      const [, slug] = queryKey;
      const { data } = await customFetch.get(`/course/slug/${slug}`);
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
        duration: null,
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
  return { getStudentSingleCourse, isPending, isError, refetch };
};

export const useGetAllUserEnrolledCourse = () => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ["allEnrolledCourse"],
    queryFn: async () => {
      const { data } = await customFetch.get("/enrollment");
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
        duration: null,
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
//
export const useGetAlInstructorPublishedCourse = (id: any) => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const { data: getAlInstructorPublishedCourse, isError } = useQuery({
    queryKey: ["getAllInstructorPublishCourse", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(`/course/instructor/${id}`);
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
        duration: null,
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
  return { getAlInstructorPublishedCourse };
};

export const useCourseEnrollment = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: courseEnroll,
    isPending,
    error,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ courseId }: any) => {
      return customFetch.post(`/enrollment/course/${courseId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCourseEnroll"] });
      toast({
        title: `course enrollment successfull`,
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
  return { courseEnroll, isPending, error, isError, isSuccess };
};

export const useGetSingleEnrolledStudentCourse = (id: any) => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const {
    data: getSingleEnrolledCourse,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["getCourseStudentEnrollCourse", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(`/enrollment/${id}`);
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
        duration: null,
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
  return {
    getSingleEnrolledCourse,
    isPending,
  };
};

export const useGetSingleEnrolledCourse = (id: any) => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const {
    data: getSingleEnrolledCourse,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["getCourseEnroll", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(`/enrollment/course/${id}`);
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
        duration: null,
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
  return {
    getSingleEnrolledCourse,
    isPending,
  };
};

export const useGetStudentEnrolledCourse = (id: any) => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const {
    data: getStudentEnrolledCourse,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["getCourseReview111", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(
        `/enrollment/course/${id}/enrolled-students`
      );
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
        duration: null,
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
  return {
    getStudentEnrolledCourse,
    isPending,
  };
};

export const useGetInstructorenrolledCourse = (id: any) => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const { data: getInstructorenrolledCourse, isPending, isError } = useQuery({
    queryKey: ["getInstructorCourseReview", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(
        `/enrollment/instructor/${id}/enrolled-students`
      );
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
        duration: null,
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
  return {
    getInstructorenrolledCourse,
    isPending,
  };
};

export const useMarkLectureCompleted = () => {
  const queryClient = useQueryClient();

  const { mutate: markLectureCompleted } = useMutation({
    mutationFn: ({ enrollId, lectureId }: any) => {
      return customFetch.post(`/enrollment/${enrollId}/lecture/complete`, {
        lectureId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCourseStudentEnrollCourse"],
      });
    },
  });
  return { markLectureCompleted };
};

export const useMarkLectureUnfinished = () => {
  const queryClient = useQueryClient();

  const { mutate: markLectureUnfinshed } = useMutation({
    mutationFn: ({ enrollId, lectureId }: any) => {
      return customFetch.post(`/enrollment/${enrollId}/lecture/unfinished`, {
        lectureId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCourseStudentEnrollCourse"],
      });
    },
  });
  return { markLectureUnfinshed };
};
// ***************************************************reviews***************************************

export const useCreateEnrolledCourseReview = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: createEnrolledCourseReview,
    isPending: createEnrolledCourseReviewLoading,
  } = useMutation({
    mutationFn: ({ courseId, review }: any) => {
      return customFetch.post(`/course/review/course/${courseId}`, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCourseReview"] });
      queryClient.invalidateQueries({ queryKey: ["singleCourse"] });
      queryClient.invalidateQueries({ queryKey: ["courseReviewRating"] });
      toast({
        title: `review submitted`,
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
  return { createEnrolledCourseReview, createEnrolledCourseReviewLoading };
};
export const useGetCourseReview = (id: any) => {  
 const toast = useToast();
 const [errorToastShown, setErrorToastShown] = useState(false);
  const { data: getCourseReview, isPending,isError } = useQuery({
    queryKey: ["getCourseReview", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(`/course/review/course/${id}`);
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
        duration: null,
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
  return {
    getCourseReview,
    isPending,
  };
};

export const useInstructorReviewRating = (id: any) => {
  const { data: instructorReviewRating, isPending } = useQuery({
    queryKey: ["instructorReviewRating", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(
        `/course/review/instructor/${id}/rating`
      );
      return data;
    },
  });
  return {
    instructorReviewRating,
    isPending,
  };
};

export const useGetCourseReviewRating = (id: any) => {
  const { data: courseReviewRating, isPending } = useQuery({
    queryKey: ["courseReviewRating", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(
        `/course/review/course/${id}/rating`
      );
      return data;
    },
  });
  return {
    courseReviewRating,
    isPending,
  };
};
