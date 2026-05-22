import { Badge, Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import {
  useDeleteCourseModule,
  useGetSingleCourse,
  useSingleStatusCourse,
} from "../../../../hooks/course";
import { useParams } from "react-router-dom";

const CourseSettings = () => {
  const { singleStatusCourse, isPending } = useSingleStatusCourse();
  const { id } = useParams();
  const { deleteCourseModule, deleteCourseModuleLoading } = useDeleteCourseModule();
  const { getSingleCourse } = useGetSingleCourse(id);

  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Text fontSize="2xl" fontWeight={700} color="#140342">
          Settings
        </Text>
        <Text color="#4f547b" maxW="820px">
          Control the visibility of your course and manage high-impact actions like publishing or deletion.
        </Text>
      </Stack>

      <Box className="surface-card" borderRadius="24px" p={{ base: 5, md: 6 }}>
        <Stack spacing={4}>
          <Flex justify="space-between" align={{ base: "start", md: "center" }} gap={4} flexWrap="wrap">
            <Stack spacing={1}>
              <Text fontWeight={700} color="#140342">
                Course status
              </Text>
              <Text color="#4f547b">
                This course is {getSingleCourse?.status === "published" ? "currently" : "not"} published on the DevUpshot marketplace.
              </Text>
            </Stack>
            <Badge
              borderRadius="full"
              px={3}
              py={1}
              colorScheme={getSingleCourse?.status === "published" ? "green" : "purple"}
            >
              {(getSingleCourse?.status || "draft").toUpperCase()}
            </Badge>
          </Flex>

          <Flex columnGap={4} rowGap={4} align={{ base: "start", md: "center" }} flexDirection={{ base: "column", md: "row" }}>
            {getSingleCourse?.status === "published" ? (
              <Button
                borderRadius="full"
                bg="white"
                borderColor={"#140342"}
                borderWidth={1}
                variant="outline"
                isLoading={isPending}
                loadingText="Updating"
                spinnerPlacement="end"
                px={"2.7rem"}
                onClick={() => {
                  singleStatusCourse({ id, status: "draft" });
                }}
              >
                Unpublish
              </Button>
            ) : (
              <Button
                borderRadius="full"
                bgGradient="linear(to-r, #6440fb, #8b5cf6)"
                color="white"
                isLoading={isPending}
                loadingText="Updating"
                spinnerPlacement="end"
                px={"2.7rem"}
                boxShadow="0 16px 32px rgba(100,64,251,0.24)"
                _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
                onClick={() => {
                  singleStatusCourse({ id, status: "published" });
                }}
              >
                Publish
              </Button>
            )}

            <Text color="#4f547b">
              New students
              {getSingleCourse?.status === "published"
                ? " can find your course via search."
                : " cannot find your course via search, but existing students can still access content."}
            </Text>
          </Flex>
        </Stack>
      </Box>

      <Box className="surface-card" borderRadius="24px" p={{ base: 5, md: 6 }}>
        <Stack spacing={4}>
          <Text fontWeight={700} color="#140342">
            Danger zone
          </Text>
          <Text color="#4f547b">
            We promise students lifetime access, so courses cannot be deleted after students have enrolled.
          </Text>
          <Flex columnGap={4} rowGap={4} align={{ base: "start", md: "center" }} flexDirection={{ base: "column", md: "row" }}>
            <Button
              borderRadius="full"
              borderColor={"#ef4444"}
              color="#ef4444"
              bg="white"
              _hover={{ backgroundColor: "#fff1f2" }}
              variant="outline"
              px={"3.5rem"}
              isLoading={deleteCourseModuleLoading}
              loadingText="Deleting"
              spinnerPlacement="end"
              onClick={() => {
                deleteCourseModule({ courseId: id });
              }}
            >
              Delete
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CourseSettings;
