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
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          justifyContent="center"
          alignItems="center"
          zIndex={999}
        >
          <Flex
            backgroundColor="white"
            borderRadius="md"
            flexDirection="column"
            padding={6}
            maxWidth="400px"
            boxShadow="lg"
          >
            hi
            <Button onClick={closeModal} marginTop={4}>
              Close
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default BuyNowModal;

// PreviewContentModal;
