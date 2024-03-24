import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useState } from "react";

export const useModuleCreateCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [showSection, setShowSection] = useState<boolean>(false);
  const [success, setSucess] = useState<boolean>(false);
  const {
    mutate: moduleCreateCourse,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: ({ courseId, user }: any) => {
      return customFetch.post(`/module/course/${courseId}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
      setSucess(false);
      setShowSection(false);
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
  return {
    moduleCreateCourse,
    isPending,
    error,
    isError,
    success,
    showSection,
    setShowSection,
  };
};

export const useModuleEditCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: moduleEditCourse,
    isPending,
    error,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ moduleId, user }: any) => {
      return customFetch.put(`/module/${moduleId}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });

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
  return { moduleEditCourse, isPending, error, isError, isSuccess };
};

export const useDeleteModalCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteModule, isPending } = useMutation({
    mutationFn: ({ moduleId }: any) => {
      return customFetch.delete(`/module/${moduleId}`);
    },
    onSuccess: () => {
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
  const [isOpenCurriculumState, setIsOpenCurriculumState] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleIsOpen = (arrayId: number) => {
    setIsOpenState((prevIsOpenState) => ({
      ...prevIsOpenState,
      [arrayId]: !prevIsOpenState[arrayId],
    }));
  };
  const toggleIsCurriculumOpen = (arrayId: number) => {
    setIsOpenCurriculumState((prevIsOpenCurriculumState) => ({
      ...prevIsOpenCurriculumState,
      [arrayId]: !prevIsOpenCurriculumState[arrayId],
    }));
  };

  //lecture module
  const [isOpenModuleLectureState, setIsOpenModuleLectureState] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleIsModuleLectureOpen = (arrayId: number) => {
    setIsOpenModuleLectureState((prevIsModuleLectureState) => ({
      ...prevIsModuleLectureState,
      [arrayId]: !prevIsModuleLectureState[arrayId],
    }));
  };

  //context type*****************
  const [isOpenContentType, setIsOpenContentType] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleIsOpenContentType = (arrayId: number) => {
    setIsOpenContentType((prevIsOpenContentTypeState) => ({
      ...prevIsOpenContentTypeState,
      [arrayId]: !prevIsOpenContentTypeState[arrayId],
    }));
  };
  //content name*************************
  const [contentType, setContentType] = useState<{
    [key: number]: string;
  }>({});

  const toggleContentType = (arrayId: number, type: string) => {
    setContentType((prevContentTypeState) => ({
      ...prevContentTypeState,
      [arrayId]: prevContentTypeState[arrayId] === type ? "" : type,
    }));
  };

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["module", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Destructure the queryKey to get the 'id'
      const { data } = await customFetch.get(`module/course/${id}`);
      return data;
    },
  });

  return {
    data,
    isPending,
    isOpenState,
    toggleIsOpen,
    isSuccess,
    isOpenCurriculumState,
    toggleIsCurriculumOpen,
    toggleIsModuleLectureOpen,
    isOpenModuleLectureState,
    toggleIsOpenContentType,
    isOpenContentType,
    contentType,
    toggleContentType,
  };
};
export const useGetSingleModuleCourse = (id: any) => {
  const {
    data: getSingleModuleCourse,
    isPending,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["module", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Destructure the queryKey to get the 'id'
      const { data } = await customFetch.get(`module/${id}`);
      return data;
    },
  });

  return {
    getSingleModuleCourse,
    isPending,
    isError,
    refetch,
  };
};

export const useCreateModuleLectureCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: moduleCreateLectureCourse, isPending: moduleLectureLoading } =
    useMutation({
      mutationFn: ({ moduleId, user }: any) => {
        return customFetch.post(`/lecture/module/${moduleId}`, user);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["module"] });
        toast({
          title: `lecture created successfully`,
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
  return { moduleCreateLectureCourse, moduleLectureLoading };
};

export const useGetModuleLectureCourse = (id: any) => {
  const {
    data: moduleLectureData,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["LectureModule", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Destructure the queryKey to get the 'id'
      const { data } = await customFetch.get(`lecture/module/${id}`);
      return data;
    },
  });

  return {
    moduleLectureData,
    isPending,
    // isOpenState,
    isSuccess,
  };
};

//lectures*****************************************************************************************
export const useEditModuleLectureCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: moduleEditLectureCourse,
    isPending: moduleEditLectureLoading,
  } = useMutation({
    mutationFn: ({ lectureId, user }: any) => {
      return customFetch.put(`/lecture/${lectureId}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
      toast({
        title: `lecture edited successfully`,
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
  return { moduleEditLectureCourse, moduleEditLectureLoading };
};

export const useDeleteLectureModuleCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteLectureModule, isPending: lectureModuleLoading } =
    useMutation({
      mutationFn: ({ lectureId }: any) => {
        return customFetch.delete(`/lecture/${lectureId}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["module"] });

        toast({
          title: `lecture deleted successfully`,
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
  return { deleteLectureModule, lectureModuleLoading };
};

export const useGetLectureModuleCourse = (id: any) => {
  const {
    data: getLectureModuleCourse,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["moduleLectureCourse", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Destructure the queryKey to get the 'id'
      const { data } = await customFetch.get(`lecture/module/${id}`);
      return data;
    },
  });

  return {
    getLectureModuleCourse,
    isPending,
    isSuccess,
  };
};

// export const usetestingAPI = () => {
//   const toast = useToast();
//   const queryClient = useQueryClient();
//   const {
//     mutate: testingApi,
//     isPending: moduleEditLectureLoading,
//   } = useMutation({
//     mutationFn: ({ lectureId, user }: any) => {
//       return customFetch.put(`/lecture/${lectureId}`, user);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["module"] });
//       toast({
//         title: `lecture edited successfully`,
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//     onError: (error: any) => {
//       toast({
//         title: `${error.response.data.error}`,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//   });
//   return { testingApi, moduleEditLectureLoading };
// };

// const toggleIsContentType1 = () => {
//   setContentType((prevState) => ({
//     ...prevState,
//     "content1": !prevState["content1"],
//   }));
// };

// const toggleIsContentType2= () => {
//   setContentType((prevState) => ({
//     ...prevState,
//     "content2": !prevState["content2"],
//   }));
// };

// const toggleIsContentType = (arrayId: string) => {
//   setContentType((prevContentTypeState) => ({
//     ...prevContentTypeState,
//     [arrayId]: !prevContentTypeState[arrayId],
//   }));
// };
