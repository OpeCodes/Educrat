import {
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Grid,
  GridItem,
  Image,
  Progress,
  Flex,
} from "@chakra-ui/react";
import { useGetAllUserEnrolledCourse,  } from "../../hooks/studentCourse";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const { data: enrolledCourse } = useGetAllUserEnrolledCourse();
  return (
    <Stack mt={"4.6rem"}>
      <Stack>
        <Stack backgroundColor={"black"}>
          <Text
            maxW={"80%"}
            w="100%"
            mx={"auto"}
            color={"white"}
            fontSize={"2.9rem"}
            my={"1.2rem"}
            mb={"2.9rem"}
          >
            My learning
          </Text>
        </Stack>
        <Stack maxW={"80%"} w="100%" mx={"auto"} color="#D1D7DC" mt={"-3.3rem"}>
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab fontWeight={"bold"}>All Courses</Tab>
              <Tab fontWeight={"bold"}>Wishlist</Tab>
            </TabList>
            <TabIndicator
              mt="-1.9px"
              height="7px"
              bg="white"
              borderRadius="1px"
            />
            <TabPanels color="black">
              <TabPanel>
                <Grid
                  templateColumns={{
                    md: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={6}
                  mt={6}
                >
                  {enrolledCourse?.map((course: any) => {
                    const { courseId, id } = course;

                    return (
                      <GridItem
                        w="100%"
                        key={id}
                        as={Link}
                        to={`/course/${courseId.slug}/learn/lecture/${id}/660d3c593a19ced801d39aab/reviews`}
                      >
                        <Image
                          maxHeight={"250px"}
                          height={"100%"}
                          width={"100%"}
                          objectFit="cover"
                          src={courseId.thumbnail}
                          alt={courseId.title}
                        />
                        <Text mt={2} fontWeight={"bold"}>
                          {courseId.title}
                        </Text>
                        <Text fontSize={"15px"} color={"gray"}>
                          Peter Adedokun
                        </Text>
                        <Progress value={40} size="xs" mt={2} />
                        <Flex justify={"space-between"} fontSize={13}>
                          <Text>40% complete</Text>
                          <Stack>
                            <Text>stars icon</Text>
                            <Text>Your Rating</Text>
                          </Stack>
                        </Flex>
                      </GridItem>
                    );
                  })}
                </Grid>
              </TabPanel>
              <TabPanel>
              <Grid
                  templateColumns={{
                    md: "repeat(2, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={6}
                  mt={6}
                >
                  {enrolledCourse?.map((course: any) => {
                    const { courseId, id } = course;

                    return (
                      <GridItem
                        w="100%"
                        key={id}
                        as={Link}
                        to={`/course/${courseId.slug}`}
                      >
                        <Image
                          maxHeight={"250px"}
                          height={"100%"}
                          width={"100%"}
                          objectFit="cover"
                          src={courseId.thumbnail}
                          alt={courseId.title}
                        />
                        <Text mt={2} fontWeight={"bold"}>
                          {courseId.title}
                        </Text>
                        <Text fontSize={"15px"} color={"gray"}>
                          Peter Adedokun
                        </Text>
                        <Flex columnGap={1} fontSize={13}>
                          <Text>4.5</Text>
                            <Text>stars</Text>
                            <Text color={"gray"}>(993)</Text>
                        </Flex>
                        <Flex columnGap={1} fontSize={13} color={"gray"}>
                          <Text>4.5 hours</Text>
                            <Text>444 lectures</Text>
                        </Flex>
                        <Text fontWeight={"bold"} color={"black"}>N40000</Text>
                      </GridItem>
                    );
                  })}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MyLearning;
