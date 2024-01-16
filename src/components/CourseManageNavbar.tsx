import { Button, Flex, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
const CourseManageNavbar = () => {
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
      <Text fontWeight={"bold"}>Learn Frontend Development from peter</Text>
      <Text bg="red" px={2} borderRadius={5} fontSize={"14px"}>
        DRAFT
      </Text>
    </Flex>
    <Flex align={"center"} columnGap={4}>
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
    </Flex>
  </Flex>
  )
}

export default CourseManageNavbar