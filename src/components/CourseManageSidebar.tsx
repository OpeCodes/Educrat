import { Box, Button, Stack, Text } from "@chakra-ui/react";
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
      name: "intended Learners",
      href: "/",
    },
    {
      id: 2,
      name: "course structure",
      href: "/basics",
    },
    {
      id: 3,
      name: "Setup & test video",
      href: "/",
    },
    {
      id: 4,
      name: "Film and Edit",
      href: "/",
    },
    {
      id: 5,
      name: "Curriculum",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/curriculum`,
    },
    {
      id: 6,
      name: "Captions(optional)",
      href: "/",
    },
    {
      id: 7,
      name: "Accessbility(optional)",
      href: "",
    },
    {
      id: 8,
      name: "Course Landing Page",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/basics`,
    },
    {
      id: 9,
      name: "pricing",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/pricing`,
    },
    {
      id: 10,
      name: "Course Messages",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/communications/messages`,
    },
  ];
  return (
    <Stack>
      <Stack>
        <Text fontWeight={"bold"}>Plan your course</Text>
        {links.slice(0, 3).map((link, i) => (
          <Box key={i}>
            <CourseManageNavItem to={link.href} key={i}>
              {link.name}
            </CourseManageNavItem>
          </Box>
        ))}
      </Stack>
      <Stack>
        <Text fontWeight={"bold"}>Create your content</Text>
        {links.slice(3, 7).map((link, i) => (
          <Box key={i}>
            <CourseManageNavItem to={link.href} key={i}>
              {link.name}
            </CourseManageNavItem>
          </Box>
        ))}
      </Stack>
      <Stack>
        <Text fontWeight={"bold"}>Publish your course</Text>
        {links.slice(7, 11).map((link, i) => (
          <Box key={i}>
            <CourseManageNavItem to={link.href} key={i}>
              {link.name}
            </CourseManageNavItem>
          </Box>
        ))}
      </Stack>
      <Button
        bg={"#00FF84"}
        variant="outline"
        spinnerPlacement="end"
        mt={3}
        borderWidth={2}
        py={3}
        borderColor={"#00FF84"}
        _hover={{ background: "none", color: "#00FF84" }}
      >
        Submit for Review
      </Button>
    </Stack>
  );
};

export default CourseManageSidebar;
