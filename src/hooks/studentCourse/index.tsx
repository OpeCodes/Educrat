import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useToast } from "@chakra-ui/react";
export const useGetStudentSingleCourse = (slug: any) => {
  const {
    data: getStudentSingleCourse,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["singleCourse", slug],
    queryFn: async ({ queryKey }) => {
      const [, slug] = queryKey; // Destructure the queryKey to get the 'id'
      const { data } = await customFetch.get(`/course/slug/${slug}`);
      return data;
    },
  });

  return { getStudentSingleCourse, isPending, isError, refetch };
};

export const useGetAllUEnrolledCourse = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ["allEnrolledCourse"],
    queryFn: async () => {
      const { data } = await customFetch.get("/enrollment");
      return data;
    },
  });
  return { data, isPending, isError, refetch };
};

export const useCourseEnrollment = () => {
  const toast = useToast();
  // const queryClient = useQueryClient();

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
      // queryClient.invalidateQueries({ queryKey: ["module"] });

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

export const useGetSingleEnrolledCourse = (id: any) => {
  const {
    data: getSingleEnrolledCourse,
    isPending,
  } = useQuery({
    queryKey: ["getCourseReview", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; 
      const { data } = await customFetch.get(`/enrollment/${id}`);
      return data;
    },
  });
  return {
    getSingleEnrolledCourse,
    isPending,
  };
};

// ***************************************************reviews***************************************

export const useCreateEnrolledCourseReview = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: createEnrolledCourseReview,
    isPending: createEnrolledCourseReviewLoading,
  } = useMutation({
    mutationFn: ({ courseId ,review }: any) => {
      return customFetch.post(`/course/review/course/${courseId}`, review);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["getCourseReview"] });
      queryClient.invalidateQueries({ queryKey: ["singleCourse"] });
      // singleCourse

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
  const {
    data: getCourseReview,
    isPending,
  } = useQuery({
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
  const {
    data: instructorReviewRating,
    isPending,
  } = useQuery({
    queryKey: ["instructorReviewRating", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; 
      const { data } = await customFetch.get(`/course/review/instructor/${id}/rating`);
      return data;
    },
  });
  return {
    instructorReviewRating,
    isPending,
  };
};
