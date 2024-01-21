import { useToast } from "@chakra-ui/react";
import { setCourseModule } from "../../features/user/UserSlice";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import {
  addCourseModuleStorage,
  removeCourseModuleromLocalStorage,
} from "../../store/localStorage";


export const useModuleCreateCourse = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const {
    mutate: moduleCreateCourse,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ courseId, user }: any) => {
      return customFetch.post(`/module/course/${courseId}`, user);
    },
    onSuccess: (user) => {
      dispatch(setCourseModule(user.data));
      addCourseModuleStorage(user.data);

      toast({
        title: `course created successfully`,
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
  return { moduleCreateCourse, isPending, error, isError };
};



export const useModuleEditCourse = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const {
    mutate: moduleEditCourse,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ courseId, user }: any) => {
      return customFetch.put(`/module/${courseId}`, user);
    },
    onSuccess: (user) => {
      dispatch(setCourseModule(user.data));
      addCourseModuleStorage(user.data);

      toast({
        title: `course section successfully`,
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
  return { moduleEditCourse, isPending, error, isError };
};

export const useDeleteModalCourse = () => {
  const toast = useToast();
  const { mutate: deleteModule, isPending } = useMutation({
    mutationFn: ({ courseId }: any) => {
      return customFetch.delete(`/module/${courseId}`);
    },
    onSuccess: () => {
      removeCourseModuleromLocalStorage();

      toast({
        title: `course deleted successfully`,
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
  return { deleteModule, isPending };
};

export const useGetModuleCourse = () => {
  const {
    mutate: getModuleCourse,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ course }: any) => {
      return customFetch.get(`module/course/${course}`);
    },
    onSuccess: () => {
      // dispatch(setAllCourseModule(data.data))
    },
  });
  return { getModuleCourse, isPending, error, isError };
};
