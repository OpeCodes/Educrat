import { useState } from "react";
import {
  Modal,
  Text,
  Stack,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { IoPlayOutline } from "react-icons/io5";

interface Video {
  imageUrl: string;
  videoUrl: string;
}
const PromotionalVideoPlayModal = ({ imageUrl, videoUrl }: Video) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Stack position="relative">
      <img
        src={imageUrl}
        width={"100%"}
        alt="promotional video"
        style={{
          cursor: "pointer",
          height: "300px",
          objectFit: "cover",
          }}

      />
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="white"
        p={"1.2rem"}
        borderRadius={"100%"}
        cursor={"pointer"}
        onClick={openModal}
      >
        <IoPlayOutline color="black" size="30px" />
      </Text>
      <Modal isOpen={isOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <video controls autoPlay>
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
