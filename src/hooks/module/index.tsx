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
        title: `course section updated`,
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

export const useDeleteModuleCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  
  const { mutate: deleteModule, isPending: deleteModuleLoading } = useMutation({
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
  return { deleteModule, deleteModuleLoading, };
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
  //content name video*************************************************************
  const [contentType, setContentType] = useState<{
    [key: number]: string;
  }>({});

  const toggleContentType = (arrayId: number, type: string) => {
    setContentType((prevContentTypeState) => ({
      ...prevContentTypeState,
      [arrayId]: prevContentTypeState[arrayId] === type ? "" : type,
    }));
  };
  // **********************article**********************************
  const [contentType2, setContentType2] = useState<{
    [key: number]: string;
  }>({});

  const toggleContentType2 = (arrayId: number, type: string) => {
    setContentType2((prevContentTypeState) => ({
      ...prevContentTypeState,
      [arrayId]: prevContentTypeState[arrayId] === type ? "" : type,
    }));
  };

  // **********************************RESOURCES***************
  const [contentType3, setContentType3] = useState<{
    [key: number]: string;
  }>({});

  const toggleContentType3 = (arrayId: number, type: string) => {
    setContentType3((prevContentTypeState) => ({
      ...prevContentTypeState,
      [arrayId]: prevContentTypeState[arrayId] === type ? "" : type,
    }));
  };

  const { data, isPending, isSuccess,refetch } = useQuery({
    queryKey: ["module", id],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey; // Destructure the queryKey to get the 'id'
      const { data } = await customFetch.get(`module/course/${id}`);
      return data;
    },
  });
  // **************************description and resources toggle************************
  const [isOpendescripRes, setIsOpenDescrpRes] = useState<{
    [key: number]: boolean;
  }>({});
  const toggleIsOpenDescripRes = (arrayId: number) => {
    setIsOpenDescrpRes((prevIsOpenDescripResTypeState) => ({
      ...prevIsOpenDescripResTypeState,
      [arrayId]: !prevIsOpenDescripResTypeState[arrayId],
    }));
  };

  // *************************description func*************************
  const [isOpendescription, setIsOpenDescription] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleIsOpenDescription = (arrayId: number) => {
    setIsOpenDescription((prevIsOpenDescriptionState) => ({
      ...prevIsOpenDescriptionState,
      [arrayId]: !prevIsOpenDescriptionState[arrayId],
    }));
  };

  const [isOpenInnerdescripRes, setIsOpenInnerdescripRes] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleIsOpenInnerdescripRes = (arrayId: number) => {
    setIsOpenInnerdescripRes((prevIsOpenInnerdescripRes) => ({
      ...prevIsOpenInnerdescripRes,
      [arrayId]: !prevIsOpenInnerdescripRes[arrayId],
    }));
  };

  // **************************************article edit section **************************

  const [isOpenEditArticle, setIsOpenEditArticle] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleIsOpenEditArticle = (arrayId: number) => {
    setIsOpenEditArticle((prevIsOpenEditArticle) => ({
      ...prevIsOpenEditArticle,
      [arrayId]: !prevIsOpenEditArticle[arrayId],
    }));
  };

  // **************************************video edit section **************************

  const [isOpenEditVideo, setIsOpenEditVideo] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleIsOpenEditVideo = (arrayId: number) => {
    setIsOpenEditVideo((prevIsOpenEditVideo) => ({
      ...prevIsOpenEditVideo,
      [arrayId]: !prevIsOpenEditVideo[arrayId],
    }));
  };


  
  return {
    data,
    isPending,
    isOpenState,
    toggleIsOpen,
    isSuccess,
    refetch,
    isOpenCurriculumState,
    toggleIsCurriculumOpen,
    toggleIsModuleLectureOpen,
    isOpenModuleLectureState,
    toggleIsOpenContentType,
    isOpenContentType,
    contentType,
    toggleContentType,
    toggleContentType2,
    contentType3,
    toggleContentType3,
    contentType2,
    isOpendescripRes,
    toggleIsOpenDescripRes,
    isOpendescription,
    toggleIsOpenDescription,
    isOpenInnerdescripRes,
    toggleIsOpenInnerdescripRes,
    isOpenEditArticle,
    toggleIsOpenEditArticle,
    isOpenEditVideo,
    toggleIsOpenEditVideo

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
  const [createLectureModuleSuccess, setCreateLectureModuleSuccess] = useState(true);
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
  return { moduleCreateLectureCourse, moduleLectureLoading ,createLectureModuleSuccess, setCreateLectureModuleSuccess};
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
        title: `successful`,
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

  const { mutate: deleteLectureModule, isPending: deleteLecutureModuleCourseLoading } =
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
  return { deleteLectureModule, deleteLecutureModuleCourseLoading };
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

// ****************************************article endpoint**************************************
export const useCreateArticleLectureCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: createArticleLectureCourse,isSuccess: createArticleSuccess } = useMutation({
    mutationFn: ({ lectureId, user }: any) => {
      return customFetch.post(
        `/lecture/content/lecture/${lectureId}/article
      `,
        user
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
      toast({
        title: `Article created`,
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
  return { createArticleLectureCourse,createArticleSuccess };
};

export const useEditArticleLectureCourse = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: editArticleLectureCourse } = useMutation({
    mutationFn: ({ articleId, user }: any) => {
      return customFetch.put(
        `/lecture/content/article/${articleId}
      `,
        user
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
      toast({
        title: `Article edited`,
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
  return { editArticleLectureCourse };
};

export const useDeleteArticleLecture = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteArticleLecture, isPending: deleteArticleLectureLoading} = useMutation({
    mutationFn: ({ articleId }: any) => {
      return customFetch.delete(`/lecture/content/article/${articleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
      toast({
        title: `ariticle deleted successfully`,
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
  return { deleteArticleLecture, deleteArticleLectureLoading};
};




// ****************************************video endpoint**************************************

export const useDeleteVideoLecture = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteVideoLecture, isPending: deleteVideoLectureLoding} = useMutation({
    mutationFn: ({ videoId }: any) => {
      return customFetch.delete(`/lecture/content/video/${videoId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
      toast({
        title: `video deleted successfully`,
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
  return { deleteVideoLecture, deleteVideoLectureLoding};
};




// ***********************external resource endpoint*****************************

export const useCreateExternalResourceLink = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: createExternalResourceLink } = useMutation({
    mutationFn: ({ lectureId, user }: any) => {
      return customFetch.post(
        `/lecture/resource/lecture/${lectureId}/external
      `,
        user
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
      toast({
        title: `link created`,
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
  return { createExternalResourceLink };
};

export const useDeleteExternalResource = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteExternalResource, isPending: deleteExternalResourceLoading} = useMutation({
    mutationFn: ({ resourceId }: any) => {
      return customFetch.delete(`/lecture/resource/${resourceId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
      toast({
        title: ` deleted successfully`,
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
  return { deleteExternalResource, deleteExternalResourceLoading};
};



