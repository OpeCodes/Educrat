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
import { useGetModuleCourse } from "../hooks/module";
import { useGetSingleCourse } from "../hooks/course";
import { useParams } from "react-router-dom";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  id: number;
}

const MAX_FILE_SIZE_MB = 4;

const ExternalResourceDownloadableFile: React.FC<ImageUploadProps> = ({
  onImageUpload,
  id,
}) => {
  const { id: ID } = useParams();
  const { getSingleCourse } = useGetSingleCourse(ID);
  const { refetch } = useGetModuleCourse(getSingleCourse?.id);

  const [selectedImageName, setSelectImageName] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [success, setSucess] = useState(false);
  const toast = useToast();
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
        setSelectImageName(file);

        await uploadImage(file, file?.type, file?.name, file?.size);
      }
    }
  };

  const uploadImage = async (
    file: File,
    type: string,
    title: string,
    size: number
  ) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      const endpoint = `/lecture/resource/lecture/${id}/downloadable`;
      try {
        const response = await customFetch.post(
          endpoint,
          { file: base64Data, type, title, size },
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
        refetch();
        console.log("Upload completed:", response.data);
        toast({
          title: `uploaded`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onImageUpload(file);
        setSucess(true);
      } catch (error: any) {
        setSucess(false);
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
    refetch();
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
              onChange={handleImageChange}
              mt={2}
              width={"100%"}
            />
          </Stack>
          <Flex fontSize={13} columnGap={1}>
            <Text fontWeight={"600"}>Note:</Text>
            <Text>
              A resource is for any type of document that can be used to help
              students in the lecture. This file is going to be seen as a
              lecture extra. Make sure everything is legible and the file size
              is less than 1 GiB
            </Text>
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
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{selectedImageName?.name}</Td>
                  <Td>{selectedImageName?.type}</Td>
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
                    {uploadProgress >= 100 && !success && (
                      <Text fontWeight={"500"}>Proccessing</Text>
                    )}
                    {uploadProgress >= 100 && success && (
                      <Text fontWeight={"500"}>success</Text>
                    )}
                  </Td>
                  <Td>{formattedDate}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  );
};

export default ExternalResourceDownloadableFile;

// ExternalResourceDownloadableFile
