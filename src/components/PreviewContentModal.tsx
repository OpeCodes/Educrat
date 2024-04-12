import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const PreviewContentModal = ({
  contentPreviewIsOpen,
  contentPreviewOnOpen,
  contentPreviewOnClose,
}: any) => {
  return (
    <>
      <Modal
        onClose={contentPreviewOnClose}
        size={"full"}
        isOpen={contentPreviewIsOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>body</ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewContentModal;
