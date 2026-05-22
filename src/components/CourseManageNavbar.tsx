import { Badge, Flex, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useGetSingleCourse } from "../hooks/course";
import { useEffect } from "react";

const CourseManageNavbar = () => {
  const { id } = useParams();
  const { getSingleCourse, refetch } = useGetSingleCourse(id);

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <Flex
      justify="space-between"
      align="center"
      color="white"
      px={{ base: 5, md: 8 }}
      py={4}
      bg="linear-gradient(135deg, #140342 0%, #2d0b8a 60%, #6440fb 100%)"
      boxShadow="0 18px 40px rgba(20,3,66,0.16)"
    >
      <Flex columnGap={5} align="center" flexWrap="wrap" rowGap={3}>
        <Flex align="center" columnGap={2} as={Link} to="/instructor/courses">
          <IoIosArrowBack />
          <Text fontSize="14px" fontWeight="bold">
          Back to courses
          </Text>
        </Flex>
        <Text fontWeight={700} fontSize="sm" color="whiteAlpha.900">
          {getSingleCourse?.title}
        </Text>
        <Badge bg="whiteAlpha.250" color="white" px={3} py={1} borderRadius="full">
          {(getSingleCourse?.status || "draft").toUpperCase()}
        </Badge>
      </Flex>
    </Flex>
  );
};

export default CourseManageNavbar;
