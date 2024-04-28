import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { setOrder, setToggleOrder } from "../../../features/user/UserSlice";

export const useCreateOrder = () => {
  const toast = useToast();
  // const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate: createOrder, isPending: createCourseWishListLoading } =
    useMutation({
      mutationFn: ({ body }: any) => {
        return customFetch.post(`/order`, body);
      },
      onSuccess: (data) => {
        console.log(data.data, "Data here");
        dispatch(setToggleOrder());
        dispatch(setOrder(data.data));
        // queryClient.invalidateQueries({ queryKey: ["getStudentWishList"] });
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
  return { createOrder, createCourseWishListLoading };
};

export const useCheckoutOrder = () => {
  const toast = useToast();
  const { mutate: checkoutOrder, isPending: createCourseWishListLoading } =
    useMutation({
      mutationFn: ({ id }: any) => {
        return customFetch.post(`/order/${id}/checkout`);
      },
      onSuccess: (data) => {
        // Redirect the user to the authorization URL returned by the checkout endpoint
        redirectToPayment(data.data.authorization_url);
      },
      onError: (error: any) => {
        // Handle errors
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

  // Function to redirect the user to the dynamic authorization URL
  const redirectToPayment = (authorizationUrl: string) => {
    window.location.href = authorizationUrl;
  };

  return { checkoutOrder, createCourseWishListLoading, redirectToPayment };
};
