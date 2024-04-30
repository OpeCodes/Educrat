import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { setOrder, setToggleOrder } from "../../../features/user/UserSlice";

export const useCreateOrder = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { mutate: createOrder } = useMutation({
    mutationFn: ({ body }: any) => {
      return customFetch.post(`/order`, body);
    },
    onSuccess: (data) => {
      dispatch(setToggleOrder());
      dispatch(setOrder(data.data));
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
  return { createOrder };
};

export const useCheckoutOrder = () => {
  const toast = useToast();
  const { mutate: checkoutOrder, isPending: createCourseWishListLoading } =
    useMutation({
      mutationFn: ({ id }: any) => {
        return customFetch.post(`/order/${id}/checkout`);
      },
      onSuccess: (data) => {
        redirectToPayment(data.data.authorization_url);
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
  const redirectToPayment = (authorizationUrl: string) => {
    window.location.href = authorizationUrl;
  };

  return { checkoutOrder, createCourseWishListLoading, redirectToPayment };
};

// ****************************payment***************************

export const usePaymentTransaction = () => {
  const toast = useToast();
  const { mutate: paymentTransaction } = useMutation({
    mutationFn: ({ status }: any) => {
      return customFetch.post(`/payment/transaction/status`, status);
    },
    onSuccess: () => {},
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
  return { paymentTransaction };
};
