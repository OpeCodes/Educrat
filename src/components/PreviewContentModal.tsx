import { Button, Box, Flex, Text } from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean;
  onToggleModal: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onToggleModal }) => {
  const closeModal = () => {
    onToggleModal();
  };

  return (
    <>
      {/* Modal overlay */}
      {isOpen && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)" // Semi-transparent black background
          zIndex="9999"
          alignItems="center"
          justifyContent="center"
        >
          {/* Modal content */}
          <Box
            p="4"
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            maxW="80%"
            position="relative"
            zIndex="10000"
          >
            {/* Modal title */}
            <Text fontSize="xl" fontWeight="bold" mb="4">
              Modal Title
            </Text>

            {/* Modal body */}
            <Text mb="4">
              This is the content of the modal. You can add any content here.
            </Text>

            {/* Close button */}
            <Button
              position="absolute"
              top="1"
              right="1"
              size="sm"
              onClick={closeModal}
              colorScheme="gray"
            >
              Close
            </Button>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default CustomModal;


// PreviewContentModal;
