import { Box,  Stack, Text } from "@chakra-ui/react";
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
      name: "Withdrawal",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/withdrawal`,
    },
    // withdrawal
    {
      id: 6,
      name: "Settings",
      href: `/instructor/courses/${getSingleCourse?.id}/manage/settings`,
    },
  ];
  return (
    <Stack>
      <Stack>
        <Text fontWeight={"bold"}>Publish your course</Text>
        {links.map((link, i) => (
          <Box key={i}>
            <CourseManageNavItem to={link.href} key={i}>
              {link.name}
            </CourseManageNavItem>
          </Box>
        ))}
      </Stack>
      {/* <Button
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
      </Button> */}
    </Stack>
  );
};

export default CourseManageSidebar;
