import { Stack, Text, Flex, Avatar, Grid, GridItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";
import { MdOutlineCheckCircleOutline } from "react-icons/md";

const data = [
  {
    id: 1,
    name: "Become a UX designer.",
  },
  {
    id: 2,
    name: "You will be able to add UX designer to your CV",
  },
  {
    id: 3,
    name: "You will be able to talk correctly with other UX design",
  },
  {
    id: 4,
    name: "All the techniques used by UX professionals",
  },
];
const SingleCourse = () => {
  return (
    <Stack>
      <Stack>
        <Stack mt={"4.5rem"}>
          <Stack>
            <Stack bg={"#f5f7fe"} py={3}>
              <Flex
                w={"100%"}
                maxW={"80%"}
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
              </Flex>
            </Stack>
            <Flex
              w={"100%"}
              maxW={"80%"}
              mx="auto"
              justify={"space-between"}
              mt={"4rem"}
              flexDirection={{ sm: "column", md: "row" }}
            >
              <Stack width={{ md: "60%" }} rowGap={5}>
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
                <Stack mt={"1.8rem"} mb={"3rem"}>
                  <Text fontWeight={"bold"} fontSize={"1.1rem"}>
                    What you'll learn
                  </Text>
                  <Stack>
                    <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={3}>
                      {data?.map((item) => (
                        <GridItem w="100%">
                          <Flex
                            align={"center"}
                            columnGap={1}
                            color={"#4f547b"}
                          >
                            <Text>
                              <MdOutlineCheckCircleOutline
                                color={"#4f547b"}
                                size={20}
                              />
                            </Text>
                            <Text>{item.name}</Text>
                          </Flex>
                        </GridItem>
                      ))}
                    </Grid>
                  </Stack>
                  <Stack mt={"1.8rem"} mb={"3rem"}>
                    <Text fontWeight={"bold"} fontSize={"1.1rem"}>
                      Requirement
                    </Text>

                    <Flex align={"center"} color={"#4f547b"} columnGap={1}>
                      <Text mt={"-.2rem"} fontSize={"1.2rem"}>
                        &#x2022;
                      </Text>
                      <Text>
                        You will need a copy of Adobe XD 2019 or above. A free
                        trial can be.
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Text>something here</Text>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SingleCourse;
