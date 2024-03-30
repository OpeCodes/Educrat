import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const useCourseCategory = () => {
  const { data, isPending } = useQuery({
    queryKey: ["courseCategory"],
    queryFn: async () => {
      const { data } = await customFetch.get("/course/category");
      return data;
    },
  });
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

  return { getSingleCourse, isPending, isError, refetch };
};

export const useGetCourse = () => {
  const { data } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const { data } = await customFetch.get("/course");
      return data;
    },
  });
  return { data };
};

export const useGetAllUserCourse = () => {
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ["allUserCourse"],
    queryFn: async () => {
      const { data } = await customFetch.get("/course/user");
      return data;
    },
  });
  return { data, isPending, isError, refetch };
};
