import { Outlet, useParams } from "react-router-dom";
import { CourseManageNavbar, CourseManageSidebar } from ".";
import { Flex, Stack } from "@chakra-ui/react";
import { useSingleCourse } from "../hooks";

const CourseManageDashboardLayout = () => {
  const {singleId} = useParams()
  return (
    <>
      <CourseManageNavbar />
      <Flex>
        <Stack mr={20} m={20}>
          <CourseManageSidebar />
        </Stack>
        <Stack
          bg="white"
          maxW={"70%"}
          my={10}
          w="full"
          boxShadow="0 0.75rem 1rem rgb(189 197 209 / 90%)"
        >
          <Outlet />
        </Stack>
      </Flex>
    </>
  );
};

export default CourseManageDashboardLayout;
