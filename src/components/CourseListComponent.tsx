import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import dummyImg from "../assets/CourseImagePlaceholder.jpg";
import { useNavigate } from "react-router-dom";

const CourseListComponent = ({ title, thumbnail,id }: any) => {
  const [isHovered, setIsHovered] = useState(false);
 const navigate = useNavigate()

  return (
    <Stack
      position={"relative"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <Button
          size="sm"
          position="absolute"
          top={0}
          right={0}
          zIndex={1}
          bg={"#140342"}
          width="100%"
          height={"100%"}
          _hover={{ backgroundColor: "none" }}
          borderRadius={"none"}
          fontSize="20px"
          color="white"
          onClick={() => navigate(`/instructor/courses/${id}/manage/basics`)}
        >
          Edit /Manage Course
        </Button>
      )}
      <Flex
        borderColor="#d1d7dc"
        borderWidth="1px"
        justify={"space-between"}
        columnGap={5}
        mb={3}
        height="130px"
        align={"center "}
      >
        <Flex columnGap={4} w={{ base: "100%", md: "40%" }}>
          <Image
            src={thumbnail || `${dummyImg}`}
            alt="course image here"
            w="120px"
            maxH={"125px"}
            h={"100%"}
            objectFit={"cover"}
          />
          <Flex
            flexDirection={"column"}
            justify={"space-between"}
            my={2}
            width="70%"
          >
            <Text fontWeight={"bold"}>{title}</Text>
            <Text fontWeight={"700"}> </Text>
          </Flex>
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          ml={5}
          w="60%"
          pl={2}
          align={"center"}
          mr={5}
          columnGap={5}
        >
          <Text fontWeight={"bold"}>Finish your course</Text>
          <Box maxWidth={"75%"} w="100%">
            <Progress value={20} size="sm" />
          </Box>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default CourseListComponent;
