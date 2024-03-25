import React, { ChangeEvent, useState } from "react";
import {
  Progress,
  Input,
  useToast,
  Stack,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import customFetch from "../utils/axios";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  id: number;
}

const MAX_FILE_SIZE_MB = 5;

const CurriculumVideoUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  id,
}) => {
  const [selectedImageName, setSelectImageName] = useState<any>(null);
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
        // setSelectedImage(URL.createObjectURL(file));
        setSelectImageName(file);

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
          { file: base64Data, duration, title: selectedImageName },
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

  //date formatted code
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0
  const year = currentDate.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;
  return (
    <Stack>
      {!selectedImageName && (
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
            <Text>All files should be less than 4.0 GB.</Text>
          </Flex>
        </Stack>
      )}

      {selectedImageName && (
        <Stack>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr color={"black"}>
                  <Th color="black">Filename</Th>
                  <Th color="black">Type</Th>
                  <Th color="black">Status</Th>
                  <Th color="black">Date</Th>
                  <Th color="black">.</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{selectedImageName?.name}</Td>
                  <Td>Video</Td>
                  <Td width={"50%"}>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <Stack direction={"row"} align={"center"}>
                        <Progress
                          value={uploadProgress}
                          size="sm"
                          width="40%"
                          display={{ base: "none", md: "block" }}
                        />

                        <Text>{uploadProgress}%</Text>
                      </Stack>
                    )}
                    {uploadProgress === 0 && (
                      <Stack direction={"row"} align={"center"}>
                        <Progress
                          value={0}
                          size="sm"
                          width="40%"
                          display={{ base: "none", md: "block" }}
                        />

                        <Text>0%</Text>
                      </Stack>
                    )}
                    {uploadProgress >= 100 && (
                      <Text fontWeight={"500"}>Success</Text>
                    )}
                  </Td>
                  <Td>{formattedDate}</Td>
                  <Td
                    as={"button"}
                    fontSize={15}
                    fontWeight={"600"}
                    color={"#5624D0"}
                    onClick={() => {
                      setSelectImageName(null);
                      setUploadProgress(0);
                    }}
                  >
                    Replace
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  );
};

export default CurriculumVideoUpload;
