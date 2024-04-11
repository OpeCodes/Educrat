import { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
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
    <>
      <img
        src={imageUrl}
        width={"100%"}
        alt="promotional video"
        onClick={openModal}
        style={{ cursor: "pointer", height: "300px", objectFit: "cover" }}
      />

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
    </>
  );
};

export default PromotionalVideoPlayModal;

//
