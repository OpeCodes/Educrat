import { Button, Box, Flex, Text, Stack, AspectRatio } from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onToggleModal: () => void;
  contentType: string;
  Content?: string;
  title: string;
}

const PreviewContentModal: React.FC<ModalProps> = ({
  isOpen,
  onToggleModal,
  contentType,
  Content,
  title,
}) => {
  const closeModal = () => {
    onToggleModal();
  };

  console.log(Content, "one");
  return (
    <>
      {isOpen && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex="9999"
          alignItems="center"
          justifyContent="center"
          h="100vh"
        >
          <Box
            p="4"
            bg="black"
            borderRadius="md"
            boxShadow="lg"
            maxW="450px"
            position="relative"
            zIndex="10000"
            w="100%"
            h="90vh"
          >
            {/* Modal title */}
            <Stack color="white" fontWeight={"bold"} mb={2}>
              <Text fontSize={14}>Course Review</Text>
              <Text fontSize={18}> {title}</Text>
            </Stack>
            {/* Modal body */}
            {contentType === "lecture_video" ? (
              <Stack w="100%">
                <AspectRatio maxW="600px" w="100%" ratio={1}>
                  <iframe title={title} src={Content} allowFullScreen />
                </AspectRatio>
              </Stack>
            ) : (
              <Text color={"white"}>article area</Text>
            )}

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

export default PreviewContentModal;

// PreviewContentModal;
