import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { Flex, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { GetToastErrorHandling } from "../../components";

export const useGetAllEducratInstructors = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/instructor");
      return data;
    },
  });

  return { data, isPending, isError };
};

export const useGetStudentSingleCourse = (slug: any) => {
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);
  const {
    data: getStudentSingleCourse,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["singleCourse", slug],
    queryFn: async ({ queryKey }) => {
      const [, slug] = queryKey;
      try {
        const { data } = await customFetch.get(`/course/slug/${slug}`);
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
//
export const useGetAlInstructorPublishedCourse = (id: any) => {
  const { data: getAlInstructorPublishedCourse } = useQuery({
    queryKey: ["getAllInstructorPublishCourse", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(`/course/instructor/${id}`);
      return data;
    },
  });
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
  const [error, setError] = useState<string | null>(null);
  const {
    data: getSingleEnrolledCourse,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["getCourseStudentEnrollCourse", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      try {
        const { data } = await customFetch.get(`/enrollment/${id}`);
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
  return {
    getSingleEnrolledCourse,
    isPending,
  };
};

export const useGetSingleEnrolledCourse = (id: any) => {
  const { data: getSingleEnrolledCourse, isPending } = useQuery({
    queryKey: ["getCourseEnroll", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(`/enrollment/course/${id}`);
      return data;
    },
  });
  return {
    getSingleEnrolledCourse,
    isPending,
  };
};

export const useGetStudentEnrolledCourse = (id: any) => {
  const { data: getStudentEnrolledCourse, isPending } = useQuery({
    queryKey: ["getCourseReview111", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(
        `/enrollment/course/${id}/enrolled-students`
      );
      return data;
    },
  });
  return {
    getStudentEnrolledCourse,
    isPending,
  };
};

export const useGetInstructorenrolledCourse = (id: any) => {
  const { data: getInstructorenrolledCourse, isPending } = useQuery({
    queryKey: ["getInstructorCourseReview", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(
        `/enrollment/instructor/${id}/enrolled-students`
      );
      return data;
    },
  });

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


export const useGetSingleEducratInstructor = (slug: any) => {
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);
  const {
    data: getSingleEducratInstructor,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["singleCourse", slug],
    queryFn: async ({ queryKey }) => {
      const [, slug] = queryKey;
      try {
        const { data } = await customFetch.get(`/instructor/slug/${slug}`,);
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
  return { getSingleEducratInstructor, isPending, isError, refetch };
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
  const { data: getCourseReview, isPending } = useQuery({
    queryKey: ["getCourseReview", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(`/course/review/course/${id}`);
      return data;
    },
  });
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

export const useGetInstructorReview = (id: any) => {
  const { data: getInstructorReview, isPending } = useQuery({
    queryKey: ["InstructorReview", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await customFetch.get(
        `/course/review/instructor/${id}/`
      );
      return data;
    },
  });
  return {
    getInstructorReview,
    isPending,
  };
};

// ************************************wishlist*****************************

export const useGetStudentWishList = () => {
  const toast = useToast();
  const [errorToastShown, setErrorToastShown] = useState(false);
  const {
    data: getStudentWishList,
    isError,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["getStudentWishList"],
    queryFn: async () => {
      const { data } = await customFetch.get("/wishlist");
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
  return { getStudentWishList, isPending, isError, refetch };
};

export const useCreateCourseWishList = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: createCourseWishList,
    isPending: createCourseWishListLoading,
  } = useMutation({
    mutationFn: ({ courseId}: any) => {
      return customFetch.post(`/wishlist/course/${courseId}`,);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStudentWishList"] });
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
  return { createCourseWishList, createCourseWishListLoading };
};

export const useDeleteCourseWishList = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: deleteCourseWishList,
    isPending: deleteCourseWishListLoading,
  } = useMutation({
    mutationFn: ({ courseId }: any) => {
      return customFetch.delete(`/wishlist/course/${courseId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStudentWishList"] });
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
  return { deleteCourseWishList, deleteCourseWishListLoading };
};
