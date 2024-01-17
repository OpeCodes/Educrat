import { useMutation, useQuery } from "@tanstack/react-query";
import customFetch from "../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addUserLocalStorage } from "../store/localStorage";
import { setUser } from "../features/user/UserSlice";
import { useNavigate } from "react-router-dom";
export const useGetUser = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/user");
      return data;
    },
  });
  return { data };
};

export const useLoginUser = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPending, mutate: loginUser } = useMutation({
    mutationFn: (user) => {
      return customFetch.post("/auth/login", user);
    },
    onSuccess: (user) => {
      dispatch(setUser(user.data));
      addUserLocalStorage(user.data);
      toast({
        title: `welcome ${user.data.user.firstName}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
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
  return { isPending, loginUser };
};

export const useRegisterUser = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.post("/auth/register", user);
    },
    onSuccess: () => {
      toast({
        title: `check your email to verify your account`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/sign-in");
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
  return { isPending, registerUser };
};

export const useResetPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.patch("auth/password/reset", user);
    },
    onSuccess: () => {
      toast({
        title: `Password set successfully redirecting you in few seconds`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: `${error.response.data.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { resetPassword, isPending };
};

export const useForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.post("auth/password/forgot", user);
    },
    onSuccess: () => {
      toast({
        title: `password reset link sent`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/sign-in");
    },

    onError: (error: any) => {
      console.log(error);
      toast({
        title: `${error.response.data.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { forgotPassword, isPending };
};

export const useVerifyAccount = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: verifyAccount } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.post("auth/verification", user);
    },
    onSuccess: () => {
      toast({
        title: `verification successful redirecting you in few seconds`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/sign-in");
      }, 3000);
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
  return { verifyAccount };
};
export const useBecomeInstructor = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: becomeInstructor, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.patch("/user/instructor", user);
    },
    onSuccess: () => {
      toast({
        title: `You are now an instructor`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/instructor/courses");
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: `${error.response.data.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { becomeInstructor, isPending };
};
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
  const { mutate: createCourse, isPending } = useMutation({
    mutationFn: (user: any) => {
      return customFetch.post("/course", user);
    },
    onSuccess: (user) => {
      navigate(`/instructor/courses/${user?.data?.id}/manage/basics`);
      toast({
        title: `course create successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.log(error);
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
  const { mutate: singleCourse, isPending } = useMutation({
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
      console.log(error);
      toast({
        title: `${error.response.data.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { singleCourse, isPending };
};
export const useGetSingleCourse = () => {
  const toast = useToast()
  const { mutate: getSingleCourse, isPending } = useMutation({
    mutationFn: ({ course }: any) => {
      return customFetch.get(`course/${course}`);
    },
    onSuccess: (user) => {
      console.log(user)
      toast({
        title: `course updated successfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { getSingleCourse, isPending };
};
export const useGetCourse = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await customFetch.get("/user");
      return data;
    },
  });
  return { data };
};
