import { Box, Flex, Text, Stack, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setToggleOrder } from "../features/user/UserSlice";
import { useDispatch } from "react-redux";

const BuyNowModal = () => {
  const { orderBoolean } = useSelector((store: RootState) => store?.user);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setToggleOrder());
  };
  return (
    <>
      {orderBoolean && (
        <Flex
          position="fixed"
          top={0}
          left={0}
          height="100%"
          width={"100%"}
          backgroundColor="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex={999}
        >
          <Stack
            bg={"white"}
            rowGap={"5"}
            py={"4rem"}
            color={"black"}
            width={"500px"}
            height={"100px"}
            direction={"column"}
            align={"center"}
            justify={"center"}
          >
            <Stack>
              <Text fontSize={20} fontWeight={"bold"}>
                Will you like to proceed to purchase this course?
              </Text>
            </Stack>
            <Flex
              borderRadius="md"
              columnGap={4}
            >
              <Button
                onClick={closeModal}
                width={"100%"}
                bg={"black"}
                color={"white"}
              >
                No
              </Button>

              <Button
                onClick={closeModal}
                width={"100%"}
                bg={"black"}
                color={"white"}
              >
                Yes
              </Button>
            </Flex>
          </Stack>
        </Flex>
      )}
    </>
  );
};

export default BuyNowModal;

// PreviewContentModal;
