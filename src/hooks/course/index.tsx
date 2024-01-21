import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCourse } from "../../features/user/UserSlice";
import { addCourseLocalStorage } from "../../store/localStorage";
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
    const dispatch = useDispatch();
    const { mutate: createCourse, isPending } = useMutation({
      mutationFn: (user: any) => {
        return customFetch.post("/course", user);
      },
      onSuccess: (user) => {
        dispatch(setCourse(user.data));
        addCourseLocalStorage(user.data);
        toast({
          title: `course create successfully`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate(`/instructor/courses/${user?.data?.id}/manage/basics`);
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
    return { createCourse, isPending };
  };
  
  export const useSingleCourse = () => {
    const toast = useToast();
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
  export const useGetSingleCourse = () => {
    const {
      mutate: getSingleCourse,
      isPending,
      error,
      isError,
    } = useMutation({
      mutationFn: ({ course }: any) => {
        return customFetch.get(`course/${course}`);
      },
    });
    return { getSingleCourse, isPending, error, isError };
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