import {  Flex, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetSingleCourse } from "../hooks/course";
import { useEffect } from "react";
const CourseManageNavbar = () => {
  const { id } = useParams();
  const {
    getSingleCourse,
    refetch,
  } = useGetSingleCourse(id);
  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <Flex justify={"space-between"} bg={"#140342"} color="white" p={3}>
    <Flex columnGap={5} align={"center"}>
      <Flex align={"center"} columnGap={2} as={Link} to="/instructor/courses">
        <Text>
          <IoIosArrowBack />
        </Text>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          Back to courses
        </Text>
      </Flex>
      <Text fontWeight={"bold"} fontSize="13px">{getSingleCourse?.title}</Text>
      <Text bg="red" px={2} borderRadius={5} fontSize={"14px"}>
      {(getSingleCourse?.status)?.toUpperCase()}
      </Text>
    </Flex>
    {/* <Flex align={"center"} columnGap={4}>
      <Button
        display={{ base: "none", md: "flex" }}
        px={5}
        bg="white"
        color="black"
        variant="solid"
        borderColor={"white"}
        borderWidth={2}
        _hover={{ background: "#140342", color: "white" }}
      >
        Save
      </Button>
      <Text cursor={"pointer"}>
        <IoMdSettings fontSize={"25px"} />
      </Text>
    </Flex> */}
  </Flex>
  )
}

export default CourseManageNavbar