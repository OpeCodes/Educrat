import { Navigate, Outlet,  } from "react-router-dom";
import { CourseManageNavbar, CourseManageSidebar } from ".";
import { Flex, Stack,  } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const CourseManageDashboardLayout = () => {
  const { user } = useSelector((store: RootState) => store?.user);
  const hasInstructorRole = user?.user?.roles.some(
    (role: any) => role?.name === "instructor"
  );
  return !hasInstructorRole ? (
    <Navigate to={"/"} />
  ) : (
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
          boxShadow={{ base: "", lg: "0 0.75rem 1rem rgb(189 197 209 / 90%)" }}
        >
          <Outlet />
        </Stack>
      </Flex>
    </>
  );
};

export default CourseManageDashboardLayout;
