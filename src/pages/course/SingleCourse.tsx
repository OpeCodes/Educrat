import { Stack, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const SingleCourse = () => {
  return (
    <Stack mt={"5.3rem"}>
      <Stack bg={"#f5f7fe"} pb={"10rem"}>
        <Flex
          columnGap={2}
          color={"#4F547B"}
          fontSize={14}
          mt={"0.6rem"}
          ml={"10rem"}
        >
          <Text as={Link} to="/">
            Home
          </Text>
          <Flex columnGap={1} as={Link} to="/all-courses">
            <Text>&#x2022;</Text>
            <Text>All Courses</Text>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default SingleCourse;
