import { Box, Stack, Text } from "@chakra-ui/react";
import { CourseManageNavItem } from "./CourseManageNavItem";

const links = [
  {
    id: 1,
    name: "intended Learners",
    href: "/instructor/courses/1/manage/basics",
  },
  {
    id: 2,
    name: "course structure",
    href: "/basics",
  },
  {
    id: 3,
    name: "Setup & test video",
    href: "/"
  },
  {
    id: 4,
    name: "Film and Edit",
    href: "/"
  },{
    id: 5,
    name: "Curriculum",
    href: "/"
  },
  {
    id: 6,
    name: "Captions(optional)",
    href: "/"
  },
  {
    id: 7,
    name: "Accessbility(optional)",
    href: "",
  },{
    id: 8,
    name: "Course Landing Page",
    href: `/instructor/courses/1/manage/basics`
  },{
    id: 9,
    name: "pricing",
    href: "pricing"
  },
  {
    id: 10,
    name: "Course Messages",
    href: "course messages"
  }

];

const CourseManageSidebar = () => {
  return (
    <Stack>
        <Text fontWeight={"bold"}>Plan your course</Text>
      {links.slice(0,3).map((link, i) => (
        <Box key={i} >
          <CourseManageNavItem to={link.href} key={i}>
         {link.name}
            {/* <Checkbox defaultChecked>   {link.name}</Checkbox>  */}
          </CourseManageNavItem>
        </Box>
      ))}
    </Stack>
  );
};

export default CourseManageSidebar;
