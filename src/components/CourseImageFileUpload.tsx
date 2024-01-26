import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Progress, Input, Image, useToast, Stack,Text ,Flex} from "@chakra-ui/react";
import customFetch from "../utils/axios";
// import imagePlaceholder from "../assets/image-placeholder.png";
import imagePlaceholder from "../assets/CourseImagePlaceholder.jpg";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import { useGetSingleCourse } from "../hooks/course";
import { useParams } from "react-router-dom";
interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const MAX_FILE_SIZE_MB = 5;
// const EXPECTED_WIDTH = 750;
// const EXPECTED_HEIGHT = 422;

const FileUploadComponent: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  // const { course} = useSelector((store: RootState) => store.user);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const toast = useToast();
  const { id } = useParams();

  const { getSingleCourse, refetch } = useGetSingleCourse(id);

  useEffect(() => {
    refetch();
  }, [id]);

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
        const imageUrl = URL.createObjectURL(file);

        // const dimensions = await getImageDimensions(imageUrl);

        // if (!areDimensionsValid(dimensions)) {
        //   toast({
        //     title: `Image dimensions must be 750x422 pixels`,
        //     status: "error",
        //     duration: 5000,
        //     isClosable: true,
        //   });
        //   return;
        // }

        setSelectedImage(imageUrl);
        setFileToUpload(file);
        await handleUploadClick();
      }
    }
  };

//   const getImageDimensions = async (imageUrl: string): Promise<{ width: number; height: number }> => {
//     return new Promise((resolve) => {
//       const img = new Image()
//       img.onload = () => {
//         resolve({ width: img.width, height: img.height });
//       };
//       img.src = imageUrl;
//     });
//   };

//   const areDimensionsValid = (dimensions: { width: number; height: number }): boolean => {
//     return dimensions.width === EXPECTED_WIDTH && dimensions.height === EXPECTED_HEIGHT;
//   };

  const handleUploadClick = () => {
    if (fileToUpload) {
      // Convert the image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;

        // Replace 'courseId' with the actual variable holding the course id
        // const dynamicEndpoint = `/course/${course?.id}/thumbnail`;

        const dynamicEndpoint = `/course/${getSingleCourse?.id}/thumbnail`;

        sendBase64Data(fileToUpload, base64Data, dynamicEndpoint);
      };
      reader.readAsDataURL(fileToUpload);
    }
  };

  const sendBase64Data = async (uploadedFile: File, base64Data: string, endpoint: string) => {
    try {
      const response = await customFetch.put(
        endpoint,
        { image: base64Data },
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

      console.log("Upload completed:", response.data);
      toast({
        title: `Profile picture uploaded`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Upload failed:", error);
    }
    onImageUpload(uploadedFile);
  };

  return (
    <Flex flexDirection={{base: "column", md: "row"}}>
      <Box mb={4}>
        {selectedImage ? (
          <Image
            src={selectedImage}
            width="650px" height={"200px"} 
            alt="Uploaded Image"
            mt={4}
          />
        ) : (
          <Image src={imagePlaceholder}/>
        )}
      </Box>
      <Stack ml={4}mt={5}>
        <Text>
          Upload your course image here. It must meet our course image quality
          standards to be accepted. Important guidelines: 750x422 pixels; .jpg,
          .jpeg,. gif, or .png. no text on the image.
        </Text>
        <Input
          type="file"
          accept="image/*"
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

export default FileUploadComponent;
