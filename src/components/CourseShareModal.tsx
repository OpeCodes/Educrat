import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  IconButton,
  useClipboard,
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

interface ModalShareProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const ModalShare: React.FC<ModalShareProps> = ({ isOpen, onClose, url }) => {
  const { hasCopied, onCopy } = useClipboard(url);

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };
  const shareOnLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  // Extract the base part of the URL up to the first two slashes after the domain
//   const baseURL = url.split('/', 4).join('/');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{url}</p>
          <Button onClick={onCopy} mt={4} colorScheme="blue">
            {hasCopied ? 'Copied!' : 'Copy URL'}
          </Button>
          <IconButton
            icon={<FaFacebook />}
            aria-label="Share on Facebook"
            onClick={shareOnFacebook}
            variant="outline"
            colorScheme="blue"
            mt={4}
          />
          <IconButton
            icon={<FaTwitter />}
            aria-label="Share on Twitter"
            onClick={shareOnTwitter}
            variant="outline"
            colorScheme="blue"
            mt={4}
          />
           <IconButton
            icon={<FaTwitter />}
            aria-label="Share on Twitter"
            onClick={shareOnLinkedIn}
            variant="outline"
            colorScheme="blue"
            mt={4}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalShare;
