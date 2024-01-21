import { useToast } from "@chakra-ui/react";
import { setCourseModule } from "../../features/user/UserSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import {
  addCourseModuleStorage,
  removeCourseModuleromLocalStorage,
} from "../../store/localStorage";
import { useState } from "react";

export const useModuleCreateCourse = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["module"] });

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
  const queryClient = useQueryClient();

  const {
    mutate: moduleEditCourse,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ moduleId, user }: any) => {
      return customFetch.put(`/module/${moduleId}`, user);
    },
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["module"] });

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
  const queryClient = useQueryClient();

  const { mutate: deleteModule, isPending } = useMutation({
    mutationFn: ({ moduleId }: any) => {
      return customFetch.delete(`/module/${moduleId}`);
    },
    onSuccess: () => {
      removeCourseModuleromLocalStorage();
      queryClient.invalidateQueries({ queryKey: ["module"] });
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

export const useGetModuleCourse = (id: any) => {
  const [isOpenState, setIsOpenState] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleIsOpen = (arrayId: number) => {
    setIsOpenState((prevIsOpenState) => ({
      ...prevIsOpenState,
      [arrayId]: !prevIsOpenState[arrayId],
    }));
  };
  const { data, isLoading } = useQuery({
    queryKey: ["module", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Destructure the queryKey to get the 'id'
      const { data } = await customFetch.get(`module/course/${id}`);
      return data;
    },
  });

  return { data, isLoading, isOpenState, toggleIsOpen };
};
