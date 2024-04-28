import { useToast } from "@chakra-ui/react";
import { useMutation,  } from "@tanstack/react-query";
import customFetch from "../../../utils/axios";

export const useCreateOrder = () => {
    const toast = useToast();
    // const queryClient = useQueryClient();
    const {
      mutate: createOrder,
      isPending: createCourseWishListLoading,
    } = useMutation({
      mutationFn: ({ body}: any) => {
        return customFetch.post(`/order`,body);
      },
      onSuccess: () => {
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

//   export const useCheckoutOrder = () => {
//     const toast = useToast();
//     // const queryClient = useQueryClient();
//     const {
//       mutate: checkoutOrder,
//       isPending: createCourseWishListLoading,
//     } = useMutation({
//       mutationFn: ({ id}: any) => {
//         return customFetch.post(`/order/${id}/checkout`,);
//       },
//       onSuccess: (data) => {
//         const authorizationUrl = "https://checkout.paystack.com/2nl49v780mg69hm";
//         console.log(data)
//         // Redirect the user to the authorization URL
//         const redirectToPayment = () => {
//           window.location.href = authorizationUrl;
//         };
//         redirectToPayment()
//         // queryClient.invalidateQueries({ queryKey: ["getStudentWishList"] });
//       },
//       onError: (error: any) => {
//         if (error.response) {
//           toast({
//             title: `${error.response.data.error}`,
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//           });
//         } else if (error.request) {
//           toast({
//             title: "Network error occurred. Please try again later.",
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//           });
//         } else {
//           toast({
//             title: "An error occurred. Please try again later.",
//             status: "error",
//             duration: 5000,
//             isClosable: true,
//           });
//         }
//       },
//     });
//     return { checkoutOrder, createCourseWishListLoading };
//   };


export const useCheckoutOrder = () => {
  const toast = useToast();
  const { mutate: checkoutOrder, isPending: createCourseWishListLoading } = useMutation({
    mutationFn: ({ id }: any) => {
      return customFetch.post(`/order/${id}/checkout`);
    },
    onSuccess: () => {
      // Return the function to redirect the user to the authorization URL
      return redirectToPayment();
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

  // Function to redirect the user to the Paystack checkout URL
  const redirectToPayment = () => {
    const authorizationUrl = "https://checkout.paystack.com/2nl49v780mg69hm";
    window.location.href = authorizationUrl;
  };

  return { checkoutOrder, createCourseWishListLoading, redirectToPayment };
};
