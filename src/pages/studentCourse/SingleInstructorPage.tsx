import { Flex, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SingleInstructorPage = () => {
  return (
    <Stack mt={"4.3rem"}>
      <Stack bg={"#f5f7fe"} py={3}>
        <Flex
          w={"100%"}
          maxW={"90%"}
          mx="auto"
          columnGap={2}
          color={"#4F547B"}
          fontSize={14}
          mt={"0.7rem"}
        >
          <Text as={Link} to="/">
            Home
          </Text>
          <Flex columnGap={1} as={Link} to="/all-courses">
            <Text>&#x2022;</Text>
            <Text>All Courses</Text>
          </Flex>
          <Flex columnGap={1}>
            <Text>&#x2022;</Text>
            <Text>design</Text>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default SingleInstructorPage;
