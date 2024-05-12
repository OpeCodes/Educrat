import {  useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
import { useNavigate } from "react-router-dom";






export const useVerifyUserPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: verifyUserPassword, isPending: verifyUserPasswordLoading } =
    useMutation({
      mutationFn: ({ password }: any) => {
        return customFetch.post(`/payment/withdrawal/auth`, { password });
      },
      onSuccess: () => {
        toast({
          title: `successful`,
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
  return {
    verifyUserPassword,
    verifyUserPasswordLoading,
    isOpen, onOpen, onClose
  };
};



export const useWithdrawWallet = () => {
  const toast = useToast();

  const { mutate: withdrawWallet , isPending: withdrawWalletLoading } =
    useMutation({
      mutationFn: ({ AcountWithdrawDetails }: any) => {
        return customFetch.post(`/payment/withdrawal/withdraw`,  AcountWithdrawDetails );
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
    withdrawWalletLoading
  };
};