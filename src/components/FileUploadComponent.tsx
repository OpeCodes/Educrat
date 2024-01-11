
import React, { ChangeEvent, useState } from "react";
import { Box, Progress, Input, Image, Button } from "@chakra-ui/react";
import customFetch from "../utils/axios";
// import { FileUploadComponent } from ".";
// import { useQueryClient } from 'react-query';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const FileUploadComponent: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  //   const queryClient = useQueryClient();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFileToUpload(file);
    }
  };

  const handleUploadClick = () => {
    if (fileToUpload) {
      // Convert the image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        sendBase64Data(fileToUpload, base64Data);
      };
      reader.readAsDataURL(fileToUpload);
    }
  };

  const sendBase64Data = async (uploadedFile: File, base64Data: string) => {
    try {
      const response = await customFetch.put(
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

      // Do something with the response, e.g., update state or trigger a callback
      console.log("Upload completed:", response.data);

      // Invalidate any queries that depend on the upload state
      //   queryClient.invalidateQueries('uploads');
    } catch (error) {
      // Handle error
      console.error("Upload failed:", error);
    }

    // Callback to parent component
    onImageUpload(uploadedFile);
  };

  return (
    <Box>
      <Input type="file" accept="image/*" onChange={handleImageChange} />
      <Button onClick={handleUploadClick} mt={2} disabled={!fileToUpload}>
        Upload
      </Button>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Progress value={uploadProgress} size="sm" mt={2} />
      )}
      {selectedImage ? (
        <Image src={selectedImage} alt="Uploaded Image" mt={4} />
      ) : (
        <Image src="https://via.placeholder.com/150" />
      )}
      {/* <Image src={selectedImage} alt="uploadimage" fallbackSrc='https://via.placeholder.com/150' /> */}
    </Box>
  );
};

export default FileUploadComponent;
