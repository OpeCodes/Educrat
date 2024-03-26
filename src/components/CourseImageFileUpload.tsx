import React, { ChangeEvent,  useState } from "react";
import { Box, Progress, Input, Image, useToast, Stack, Text, Flex } from "@chakra-ui/react";
import customFetch from "../utils/axios";
import imagePlaceholder from "../assets/CourseImagePlaceholder.jpg";
import { useGetSingleCourse } from "../hooks/course";
import { useParams } from "react-router-dom";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const MAX_FILE_SIZE_MB = 5;

const FileUploadComponent: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const toast = useToast();
  const { id } = useParams();
  const { getSingleCourse } = useGetSingleCourse(id);

  // useEffect(() => {
  //   refetch();
  // }, [id]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({
          title: `File size exceeds ${MAX_FILE_SIZE_MB}MB`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setSelectedImage(URL.createObjectURL(file));
        await uploadImage(file);
      }
    }
  };

  const uploadImage = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      const endpoint = `/course/${getSingleCourse?.id}/thumbnail`;

      try {
        const response = await customFetch.put(
          endpoint,
          { image: base64Data },
          {
            headers: { "Content-Type": "application/json" },
            onUploadProgress: (progressEvent: { loaded: number; total?: number }) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
              }
            },
          }
        );

        console.log("Upload completed:", response.data);
        toast({
          title: `Profile picture uploaded`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onImageUpload(file);
      } catch (error) {
        toast({
          title: `${error}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Flex flexDirection={{ base: "column", md: "row" }}>
      <Box mb={4}>
        {selectedImage ? (
          <Image src={selectedImage} width="650px" height={"200px"} alt="Uploaded Image" mt={4} />
        ) : (
          <Image src={imagePlaceholder} />
        )}
      </Box>
      <Stack ml={4} mt={5}>
        <Text>
          Upload your course image here. It must meet our course image quality
          standards to be accepted. Important guidelines: 750x422 pixels; .jpg,
          .jpeg, .gif, or .png. no text on the image.
        </Text>
        <Input type="file" accept="image/*" onChange={handleImageChange} mt={2} />
      </Stack>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} size="sm" mt={2} />
      )}
    </Flex>
  );
};

export default FileUploadComponent;
