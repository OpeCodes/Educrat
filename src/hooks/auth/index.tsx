import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCourseAuthNavigate, setUser } from "../../features/user/UserSlice";
import { addUserLocalStorage } from "../../store/localStorage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const useLoginUser = () => {
  const { courseNavigate } = useSelector((store: RootState) => store?.user);

  const toast = useToast();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, mutate: loginUser } = useMutation({
    mutationFn: (user) => {
      return customFetch.post("/auth/login", user);
    },
    onSuccess: (user) => {
      dispatch(setUser(user.data));
      addUserLocalStorage(user.data);
      queryClient.invalidateQueries();
      toast({
        title: `welcome ${user.data.user.firstName}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        {
          courseNavigate === 0 ? navigate("/") : navigate(-1);
        }
      }, 1000);
      dispatch(setCourseAuthNavigate(0))
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
  return { forgotPassword, isPending };
};

export const useVerifyAccount = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate: verifyAccount, isPending } = useMutation({
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
  return { verifyAccount,isPending };
};
