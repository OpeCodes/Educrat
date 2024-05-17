import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Progress,
  Input,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import customFetch from "../utils/axios";
import imagePlaceholder from "../assets/image-placeholder.png";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks";
interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}
const MAX_FILE_SIZE_MB = 5;
const FileUploadComponent: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const toast = useToast();
  const navigate = useNavigate();
  const {refetch} =useGetUser();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setFileToUpload(file);
      }
    }
  };

  const handleUploadClick = () => {
    if (fileToUpload) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        sendBase64Data(fileToUpload, base64Data);
      };
      reader.readAsDataURL(fileToUpload);
    }
    setTimeout(() => {
      navigate("/instructor/courses");
    }, 2000);
  };
  const sendBase64Data = async (uploadedFile: File, base64Data: string) => {
    try {
      await customFetch.put(
        "/user/profile-picture",
        { profilePicture: base64Data },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
        title: `Profile picture uploaded`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      refetch()
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
    onImageUpload(uploadedFile);
  };

  return (
    <Box>
      <Box mb={4}>
        {selectedImage ? (
          <Image
            src={selectedImage}
            boxSize="200px"
            alt="Uploaded Image"
            mt={4}
          />
        ) : (
          <Image src={imagePlaceholder} />
        )}
      </Box>
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      <Button onClick={handleUploadClick} mt={2} disabled={!fileToUpload}>
        Upload
      </Button>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} size="sm" mt={2} />
      )}
    </Box>
  );
};

export default FileUploadComponent;
