import { Flex, Stack,Text } from "@chakra-ui/react";
import { TbInfoHexagonFilled } from "react-icons/tb";



interface NetworkToastProps{
    toast: any;
    errorToastShown: any;
    setErrorToastShown: any;
    isError: any
}
export const NetworkToast = ({toast,errorToastShown,setErrorToastShown, isError }: NetworkToastProps) => {
    if (isError && !errorToastShown) {
      setErrorToastShown(true);
      toast({
        title: "Error fetching data",
        status: "error",
        position: "bottom-right",
        duration: null,
        isClosable: false,
        render: ({ onClose }: any) => (
          <Stack bg={"#FCBCA0"} py={3} px={4}>
            <Flex align={"center"} columnGap={2}>
              <Text>
                <TbInfoHexagonFilled size={30} />
              </Text>
              <Text fontWeight={"bold"}>Network Error</Text>
            </Flex>
            <Flex columnGap={3} mt={4}>
              <Text
                as={"button"}
                fontWeight={"bold"}
                onClick={() => window.location.reload()}
                color={"white"}
                py={1}
                px={4}
                backgroundColor={"black"}
              >
                Reload page
              </Text>
              <Text as={"button"} fontWeight={"bold"} onClick={onClose}>
                Dismiss
              </Text>
            </Flex>
          </Stack>
        ),
      });
    }
  }
