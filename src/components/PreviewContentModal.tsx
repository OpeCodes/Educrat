import {  Box, Flex, Text, Stack,  } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

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
            bg={`${contentType === "lecture_video" ? "black" : "white"}`}
            borderRadius="md"
            boxShadow="lg"
            maxW="580px"
            position="relative"
            zIndex="10000"
            w="100%"
            h="90vh"
          >
            {/* Modal title */}
            <Stack color={`${contentType === "lecture_video" ? "white" : "black"}`} fontWeight={"bold"} mb={2}>
              <Text fontSize={14}>Course Review</Text>
              <Text fontSize={18}> {title}</Text>
            </Stack>
            {/* Modal body */}
            {contentType === "lecture_video" ? (
              // <Stack w="100%" bg={"white"} >
              //   <AspectRatio maxW="600px" w="100%" ratio={1}>
              //     <iframe title={title} src={Content?.url} allowFullScreen />
              //   </AspectRatio>
              // </Stack>
              <Stack mt={10}>
              <video controls autoPlay style={{ width: "100%",}}>
              <source src={Content?.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            </Stack>
            ) : (
              <Stack mx={3} maxH={"470px"} mb={3} overflowY={"scroll"}>
                  <div dangerouslySetInnerHTML={{ __html: Content?.body }} />
              </Stack>
            )}

            <Text
              position="absolute"
              top="2"
              right="3"
              size="sm"
              onClick={closeModal}
              as={"button"}
              color={`${contentType === "lecture_video" ? "white" : "black"}`} 
            >
              <IoClose size={25} />
            </Text>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default PreviewContentModal;

// PreviewContentModal;
