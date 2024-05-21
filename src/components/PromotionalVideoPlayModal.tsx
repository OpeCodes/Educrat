import {
  Modal,
  Text,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Box,
} from "@chakra-ui/react";
import { IoPlayOutline } from "react-icons/io5";

interface Video {
  imageUrl: string;
  videoUrl: string;
  title: string;
}
const PromotionalVideoPlayModal = ({ imageUrl, videoUrl, title }: Video) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack position="relative">
      <Box   maxH="500px">
      <Image
        src={imageUrl}
        width={"100%"}
        alt="promotional video"
        // style={{
        //   height: "300px",
        //   objectFit: "cover",
        // }}
      
        maxH={"300px"}
        height={"100%"}
        objectFit={"revert"}
      />
      </Box>
      {videoUrl && (
        <Text
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          p={"1.2rem"}
          borderRadius={"100%"}
          cursor={"pointer"}
          as={"button"}
          onClick={onOpen}
        >
          <IoPlayOutline color="black" size="30px" />
        </Text>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton p={0} m={0} color={"white"} pl={3} />
          <ModalBody width={"100%"} bg="black">
            <Stack color={"white"} fontWeight={"bold"} mb={2}>
              <Text fontSize={14}>Course Review</Text>
              <Text fontSize={18}> {title}</Text>
            </Stack>
            <video controls autoPlay style={{ width: "100%", height: "100vh" }}>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default PromotionalVideoPlayModal;
