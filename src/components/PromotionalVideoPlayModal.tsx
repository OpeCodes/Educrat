import {
  Modal,
  Text,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoPlayOutline } from "react-icons/io5";

interface Video {
  imageUrl: string;
  videoUrl: string;
}
const PromotionalVideoPlayModal = ({ imageUrl, videoUrl }: Video) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack position="relative">
      <img
        src={imageUrl}
        width={"100%"}
        alt="promotional video"
        style={{
          height: "300px",
          objectFit: "cover",
        }}
      />
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

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <Text
            cursor={"pointer"}
            textAlign={"end"}
            onClick={onClose}
            opacity={0}
          >
            X
          </Text>
          <ModalCloseButton p={2} mr={2} />

          <ModalBody>
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

//
