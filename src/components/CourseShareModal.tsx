import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
  useClipboard,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { shareOnFacebook, shareOnLinkedIn, shareOnTwitter } from "./ShareFuncs";

interface ModalShareProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const ModalShare: React.FC<ModalShareProps> = ({ isOpen, onClose, url }) => {
  const { hasCopied, onCopy } = useClipboard(url);

  // const shareOnFacebook = () => {
  //   const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  //   window.open(shareUrl, '_blank');
  // };

  // const shareOnTwitter = () => {
  //   const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
  //   window.open(shareUrl, '_blank');
  // };
  // const shareOnLinkedIn = () => {
  //   const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  //   window.open(shareUrl, '_blank');
  // };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent color={"black"} pb={"2rem"}>
        <ModalHeader>Share this course</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            align={"center"}
            borderWidth={1}
            borderColor={"black"}
            overflow={"hidden"}
            justify={"space-between"}
          >
            <Text mx={2} isTruncated>
              {url}
            </Text>
            <Text
              p={3}
              px={4}
              cursor={"pointer"}
              onClick={onCopy}
              fontWeight={"bold"}
              color={"white"}
              bg={"black"}
            >
              {hasCopied ? "Copied!" : "Copy"}
            </Text>
          </Flex>
          <Flex align={"center"} justify={"center"} columnGap={3}>
            <IconButton
              icon={<FaFacebook />}
              aria-label="Share on Facebook"
              onClick={() => shareOnFacebook(url)}
              variant="outline"
              colorScheme="black"
              mt={4}
              borderRadius={"100%"}
              _hover={{ backgroundColor: "gray.100" }}
            />
            <IconButton
              icon={<FaTwitter />}
              aria-label="Share on Twitter"
              onClick={() => shareOnTwitter(url)}
              variant="outline"
              colorScheme="black"
              borderRadius={"100%"}
              _hover={{ backgroundColor: "gray.100" }}
              mt={4}
            />
            <IconButton
              icon={<FaLinkedin />}
              aria-label="Share on Twitter"
              onClick={() => shareOnLinkedIn(url)}
              variant="outline"
              borderRadius={"100%"}
              colorScheme="black"
              _hover={{ backgroundColor: "gray.100" }}
              mt={4}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalShare;
