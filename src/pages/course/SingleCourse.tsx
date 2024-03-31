import { Stack, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const SingleCourse = () => {
  return (
    <Stack>
      <Stack bg={"#f5f7fe"}>
        <Stack mt={"5.3rem"}  width="100%" maxW={"80%"} mx="auto">
          <Stack pb={"10rem"} >
            <Flex
              columnGap={2}
              color={"#4F547B"}
              fontSize={14}
              mt={"0.6rem"}
            >
              <Text as={Link} to="/">
                Home
              </Text>
              <Flex columnGap={1} as={Link} to="/all-courses">
                <Text>&#x2022;</Text>
                <Text>All Courses</Text>
              </Flex>
            </Flex>
            <Flex>
            <Stack>
              <Text fontSize={"3rem"}>
                Angular - The Complete Guide (2022 Edition)
              </Text>
              <Text></Text>
            </Stack>
            <Text>something here</Text>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
      <Text>ald;jfaksljf</Text>
    </Stack>
  );
};

export default SingleCourse;
