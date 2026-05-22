import { Box, Badge, Stack, Text } from "@chakra-ui/react";
import { CourseManageNavItem } from "./CourseManageNavItem";
import { useParams } from "react-router-dom";
import { useGetSingleCourse } from "../hooks/course";
import { useEffect } from "react";

const CourseManageSidebar = () => {
  const { id } = useParams();
  const { getSingleCourse, refetch } = useGetSingleCourse(id);
  useEffect(() => {
    refetch();
  }, [id]);
  const links = [
    {
      id: 1,
      name: "Course Landing Page",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/basics`,
    },
    {
      id: 2,
      name: "Curriculum",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/curriculum`,
    },
    {
      id: 3,
      name: "pricing",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/pricing`,
    },
    {
      id: 4,
      name: "Course Messages",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/communications/messages`,
    },
    {
      id: 5,
      name: "Settings",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/settings`,
    },
  ];
  return (
    <Stack
      className="surface-card"
      borderRadius="24px"
      p={5}
      minW={{ lg: "280px" }}
      spacing={4}
      position="sticky"
      top="120px"
    >
      <Stack spacing={1}>
        <Badge alignSelf="start" colorScheme="purple" borderRadius="full" px={3} py={1}>
          Course Setup
        </Badge>
        <Text fontWeight={700} fontSize="lg" color="#140342">
          Publish your course
        </Text>
        <Text fontSize="sm" color="#4f547b">
          Complete each section to make your course ready for review.
        </Text>
      </Stack>
      <Stack spacing={1}>
        {links.map((link, i) => (
          <Box key={i}>
            <CourseManageNavItem to={link.href}>
              {link.name}
            </CourseManageNavItem>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

export default CourseManageSidebar;
