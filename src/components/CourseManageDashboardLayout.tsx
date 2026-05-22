import { Navigate, Outlet } from "react-router-dom";
import { CourseManageNavbar, CourseManageSidebar } from ".";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { useGetUser } from "../hooks";

const CourseManageDashboardLayout = () => {
  const { data: getUser, isPending } = useGetUser();
  const hasInstructorRole = getUser?.roles.some(
    (role: any) => role?.name === "instructor"
  );

  return !hasInstructorRole && !isPending ? (
    <Navigate to={"/"} />
  ) : (
    <Box className="page-shell" minH="100vh">
      <CourseManageNavbar />
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="start"
        gap={8}
        px={{ base: 5, lg: 12 }}
        py={{ base: 24, lg: 28 }}
      >
        <Stack
          flexShrink={0}
          w={{ base: "100%", lg: "300px" }}
        >
          <CourseManageSidebar />
        </Stack>
        <Stack
          className="surface-card"
          borderRadius="28px"
          flex="1"
          minW={0}
          w="100%"
          p={{ base: 4, md: 6 }}
        >
          <Outlet />
        </Stack>
      </Flex>
    </Box>
  );
};

export default CourseManageDashboardLayout;
