import { useDisclosure,  useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setWalletLoading } from "../../features/user/UserSlice";



export const useVerifyUserPassword = () => {
  const {withdrawWallet, } = useWithdrawWallet()
  const { accountDetails } = useSelector((store: RootState) => store?.user);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
 const dispatch = useDispatch();
  const { mutate: verifyUserPassword, isPending: verifyUserPasswordLoading,isSuccess } =
    useMutation({
      mutationFn: ({ password }: any) => {
        return customFetch.post(`/payment/withdrawal/auth`, { password });
      },
      onSuccess: (data) => {
        toast({
          title: `password verified`,
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        onClose();
        withdrawWallet({AcountWithdrawDetails: {...accountDetails, token:data.data.token }})
        dispatch(setWalletLoading(true))
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
  return {
    verifyUserPassword,
    verifyUserPasswordLoading,
    isOpen,
    onOpen,
    onClose,
    isSuccess
  };
};

export const useWithdrawWallet = () => {
  const toast = useToast();
  const dispatch=  useDispatch()
  const { mutate: withdrawWallet, isPending: withdrawWalletLoading } =
    useMutation({
      mutationFn: ({ AcountWithdrawDetails }: any) => {
        return customFetch.post(
          `/payment/withdrawal/withdraw`,
          AcountWithdrawDetails
        );
      },
      onSuccess: () => {
        toast({
          title: `withdrawal successful`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error: any) => {
        dispatch(setWalletLoading(false))
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
  return {
    withdrawWallet,
    withdrawWalletLoading,
  };
};



