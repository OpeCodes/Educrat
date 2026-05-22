import { useState } from "react";
import {
  Badge,
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

const CourseListComponent = ({ title, thumbnail, id }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Box
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="surface-card"
      borderRadius="24px"
      overflow="hidden"
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{ transform: "translateY(-4px)", boxShadow: "0 22px 45px rgba(20,3,66,0.12)" }}
    >
      {isHovered && (
        <Flex
          position="absolute"
          inset={0}
          zIndex={2}
          bg="rgba(20,3,66,0.72)"
          align="center"
          justify="center"
          p={6}
        >
          <Button
            bg="white"
            color="#140342"
            _hover={{ bg: "#f5f3ff" }}
            onClick={() => navigate(`/instructor/courses/${id}/manage/basics`)}
          >
            Edit Course
          </Button>
        </Flex>
      )}

      <Flex direction={{ base: "column", md: "row" }} minH={{ md: "178px" }}>
        <Box w={{ base: "100%", md: "260px" }} minH={{ base: "200px", md: "178px" }}>
          <Image
            src={thumbnail || `${dummyImg}`}
            alt="course image here"
            h="100%"
            w="100%"
            objectFit="cover"
          />
        </Box>

        <Flex flex="1" p={{ base: 5, md: 6 }} justify="space-between" direction="column" gap={5}>
          <Stack spacing={3}>
            <Flex justify="space-between" align="start" gap={4}>
              <Text fontWeight={700} fontSize={{ base: "lg", md: "xl" }} color="#140342">
                {title}
              </Text>
              <Badge borderRadius="full" px={3} py={1} colorScheme="purple">
                Draft
              </Badge>
            </Flex>
            <Text color="#4f547b" fontSize="sm">
              Finish your landing page, curriculum, and pricing to get this course ready for learners.
            </Text>
          </Stack>

          <Stack spacing={2}>
            <Flex justify="space-between" fontSize="sm" color="#4f547b">
              <Text>Course completion</Text>
              <Text fontWeight={700} color="#140342">
                20%
              </Text>
            </Flex>
            <Progress
              value={20}
              size="sm"
              borderRadius="full"
              bg="rgba(100,64,251,0.08)"
              sx={{
                "> div": {
                  background: "linear-gradient(90deg, #6440fb, #8b5cf6)",
                  borderRadius: "999px",
                },
              }}
            />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CourseListComponent;
