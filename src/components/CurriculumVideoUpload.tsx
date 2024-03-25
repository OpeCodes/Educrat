import React, { ChangeEvent, useState } from "react";
import { Progress, Input, useToast, Stack, Text, Flex } from "@chakra-ui/react";
import customFetch from "../utils/axios";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  title: string;
  id: number;
}

const MAX_FILE_SIZE_MB = 5;

const CurriculumVideoUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  title,
  id,
}) => {
  const [selectedImageName, setSelectImageName] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const toast = useToast();
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectImageName(file);
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
        // setSelectedImage(URL.createObjectURL(file));
        const duration = await getVideoDuration(file);
        await uploadImage(file, duration);
      }
    }
  };

  const getVideoDuration = async (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const uploadImage = async (file: File, duration: number) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      const endpoint = `/lecture/content/lecture/${id}/video`;
      try {
        const response = await customFetch.post(
          endpoint,
          { file: base64Data, duration, title },
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

        console.log("Upload completed:", response.data);
        toast({
          title: `Video uploaded`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onImageUpload(file);
      } catch (error: any) {
        toast({
          title: `${error.response.data.error}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Upload failed:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Stack>
      <Stack width={"100%"}>
        <Input
          type="file"
          accept="video/*"
          onChange={handleImageChange}
          mt={2}
          width={"100%"}
        />
      </Stack>
      <Flex fontSize={13} columnGap={1}>
        <Text fontWeight={"600"}>Note:</Text>
        <Text>All files should be at least 720p and less than 4.0 GB.</Text>
      </Flex>
<Text>{selectedImageName?.name}</Text>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <>
          <Progress value={uploadProgress} size="md" mt={2} />
          <Text>{uploadProgress}%</Text>
        </>
      )}
    </Stack>
  );
};


export default CurriculumVideoUpload;
