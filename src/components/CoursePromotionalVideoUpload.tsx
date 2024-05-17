import React, { ChangeEvent, useState } from "react";
import {
  Progress,
  Input,
  useToast,
  Stack,
  Text,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import imagePlaceholder from "../assets/CourseImagePlaceholder.jpg";
import customFetch from "../utils/axios";
interface ImageUploadProps {
  onImageUpload2: (file: File) => void;
}

const MAX_FILE_SIZE_MB = 50;

const CoursePromotionalVideoUpload: React.FC<ImageUploadProps> = ({
  onImageUpload2,
}) => {
  const { id } = useParams();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const toast = useToast();
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if (!file.type.startsWith("video/")) {
        toast({
          title: "Please select a video file",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({
          title: `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await uploadImage(file);
      }
    }
  };

  const uploadImage = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      const endpoint = `/course/${id}/promotional-video`;
      try {
        await customFetch.put(
          endpoint,
          { video: base64Data },
          {
            headers: { "Content-Type": "application/json" },
            onUploadProgress: (progressEvent: {
              loaded: number;
              total?: number;
            }) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
              }
            },
          }
        );
        toast({
          title: `Video uploaded`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onImageUpload2(file);
      } catch (error: any) {
        if (error.response) {
          toast({
            title: `${error.response.data.error}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (error.request) {
          toast({
            title: "Network error occurred. Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "An error occurred. Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <Flex flexDirection={{ base: "column", md: "row" }}>
      <Box mb={4}>
        <Image
          src={imagePlaceholder}
          width="650px"
          height={"200px"}
          objectFit={"cover"}
        />
      </Box>
      <Stack ml={4} mt={5}>
        <Text>
          Your promo video is a quick and compelling way for students to preview
          what they’ll learn in your course. Students considering your course
          are more likely to enroll if your promo video is well-made.
        </Text>
        <Input
          type="file"
          accept="video/*"
          onChange={handleImageChange}
          mt={2}
        />
      </Stack>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} size="sm" mt={2} />
      )}
    </Flex>
  );
};

export default CoursePromotionalVideoUpload;
