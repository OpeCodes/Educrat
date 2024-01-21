import { Outlet, useParams } from "react-router-dom";
import { CourseManageNavbar, CourseManageSidebar } from ".";
import { Flex, Stack } from "@chakra-ui/react";
import { useGetSingleCourse } from "../hooks/course";
import { useEffect } from "react";
import { Error } from "../pages/auth";

const CourseManageDashboardLayout = () => {
  const { id } = useParams();
  const { getSingleCourse, isError } = useGetSingleCourse();
  useEffect(() => {
    getSingleCourse({ course: id });
  }, [id]);
  if (isError) {
    return <Error />;
  }
  return (
    <>
      <CourseManageNavbar />
      <Flex flexWrap={"wrap"}>
        <Stack ml={{ base: 5, lg: 20 }} mr={{ base: 5, lg: 20 }} mt={20}>
          <CourseManageSidebar />
        </Stack>
        <Stack
          bg="white"
          maxW={{ base: "100%", md: "70%" }}
          my={10}
          w="full"
          mr={{ base: 0, lg: 5 }}
          boxShadow="0 0.75rem 1rem rgb(189 197 209 / 90%)"
        >
          <Outlet />
        </Stack>
      </Flex>
    </>
  );
};

export default CourseManageDashboardLayout;
