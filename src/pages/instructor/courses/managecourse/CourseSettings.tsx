import { Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import {
  useDeleteCourseModule,
  useGetSingleCourse,
  useSingleStatusCourse,
} from "../../../../hooks/course";
import { useParams } from "react-router-dom";

const CourseSettings = () => {
  const { singleStatusCourse, isPending } = useSingleStatusCourse();
  const { id } = useParams();
  const { deleteCourseModule, deleteCourseModuleLoading } =
    useDeleteCourseModule();
  const { getSingleCourse } = useGetSingleCourse(id);
  return (
    <Stack mb={"12rem"}>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Settings
      </Text>
      <Divider />
      <Stack p={5}>
        <Text fontWeight={"bold"}>Course Status</Text>
        <Text>
          This course is{" "}
          {getSingleCourse?.status === "published" ? "now" : "not"} published on
          the Educrat marketplace.
        </Text>
        <Stack mt={"0.9rem"}>
          <Flex columnGap={4} align={"center"}>
            {getSingleCourse?.status === "published" ? (
              <Button
                borderRadius={0}
                borderColor={"black"}
                _hover={{ backgroundColor: "none" }}
                variant="outline"
                isLoading={isPending}
                loadingText="Loading"
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
                borderRadius={0}
                borderColor={"black"}
                _hover={{ backgroundColor: "none" }}
                variant="outline"
                isLoading={isPending}
                loadingText="Loading"
                spinnerPlacement="end"
                px={"2.7rem"}
                onClick={() => {
                  singleStatusCourse({ id, status: "published" });
                }}
              >
                publish
              </Button>
            )}

            <Text>
              New students cannot find your course via search, but existing
              students can still access content.
            </Text>
          </Flex>
          <Flex columnGap={4} align={"center"} mt={"1.5rem"}>
            <Button
              borderRadius={0}
              borderColor={"black"}
              _hover={{ backgroundColor: "none" }}
              variant="outline"
              px={"3.5rem"}
              isLoading={deleteCourseModuleLoading}
              loadingText="Loading"
              spinnerPlacement="end"
              onClick={() => {
                deleteCourseModule({ courseId: id });
              }}
            >
              Delete
            </Button>
            <Text>
              We promise students lifetime access, so courses cannot be deleted
              after students have enrolled.
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CourseSettings;
