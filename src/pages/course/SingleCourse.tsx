import { Stack, Text, Flex, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";

const SingleCourse = () => {
  return (
    <Stack>
      <Stack bg={"#f5f7fe"}>
        <Stack mt={"5.3rem"} width="100%" maxW={"80%"} mx="auto">
          <Stack pb={"10rem"}>
            <Flex columnGap={2} color={"#4F547B"} fontSize={14} mt={"0.7rem"}>
              <Text as={Link} to="/">
                Home
              </Text>
              <Flex columnGap={1} as={Link} to="/all-courses">
                <Text>&#x2022;</Text>
                <Text>All Courses</Text>
              </Flex>
            </Flex>
            <Flex justify={"space-between"} mt={"4rem"}>
              <Stack width={"60%"} rowGap={5}>
                <Text fontWeight={"bold"} fontSize={"2rem"}>
                  Angular - The Complete Guide (2022 Edition)
                </Text>
                <Text color={"#4f547b"}>
                  Use XD to get a job in UI Design, User Interface, User
                  Experience design, UX design & Web Design
                </Text>
                <Flex color={"#4f547b"} align={"center"} columnGap={6}>
                  <Flex>
                    <Text>star review here</Text>
                  </Flex>
                  <Flex align={"center"} columnGap={2}>
                    <Text>
                      <LuClock3 />
                    </Text>
                    <Text>853 enrolled on this course</Text>
                  </Flex>
                  <Flex align={"center"} columnGap={2}>
                    <Text>
                      <LuClock3 />
                    </Text>
                    <Text>Last updated 11/2021</Text>
                  </Flex>
                </Flex>
                <Flex align={"center"} columnGap={2} color={"#4f547b"}>
                  <Avatar
                    size="sm"
                    name="Kola Tioluwani"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <Text fontWeight={"400"}>Adedokun Peter</Text>
                </Flex>
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
