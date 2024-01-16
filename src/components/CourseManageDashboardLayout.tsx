import { Outlet } from "react-router-dom";
import { CourseManageNavbar, CourseManageSidebar } from ".";
import { Flex, Stack } from "@chakra-ui/react";

const CourseManageDashboardLayout = () => {
  return (
    <>
      <CourseManageNavbar />
      <Flex m={20}>
        <Stack mr={20}>
          <CourseManageSidebar />
        </Stack>
        <Outlet />
      </Flex>
    </>
  );
};

export default CourseManageDashboardLayout;
