import {
  Stack,
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { useGetCourse } from "../../hooks/course";
import { CourseInterface } from "../../interface/courseInterface";
import { Link } from "react-router-dom";
import {
  calculateAverageStars,
  generateStarIcons,
  getTotalLecturesDuration,
  getTotalStarsSum,
} from "../../components/CourseCalculations";
import { convertSecondsToHMS } from "../../components/TimeFormat";
import { CiClock1, CiPlay1 } from "react-icons/ci";
import { BiSolidBarChartAlt2 } from "react-icons/bi";

const StudentCourse = () => {
  const { data } = useGetCourse();

  return (
    <Stack>
      <Box padding={{ base: 5, lg: 20 }}>
        <Text fontSize={"40px"} fontWeight={"bold"}>
          User Inferface Course
        </Text>
        <Text fontSize={"17px"}>
          Write an introductory description of the category.
        </Text>
      </Box>
      <Stack maxW={{ base: "95%", md: "90%" }} mx="auto" w="100%">
        <Grid templateColumns="repeat(4, 1fr)" columnGap={10}>
          <GridItem rowSpan={2} borderWidth={0}>
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              borderWidth={0}
              borderColor={"white"}
            >
              <AccordionItem _hover={{ backgroundColor: "none" }}>
                <h2>
                  <AccordionButton
                    borderColor={"white"}
                    _hover={{ backgroundColor: "none" }}
                  >
                    <Box as="span" flex="1" textAlign="left" fontSize={"20px"}>
                      Category
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Divider orientation="horizontal" mt={3} />
          </GridItem>
          <GridItem width="100%" colSpan={{ base: 4, md: 3 }} p={2}>
            <Flex justify={"space-between"} mt={3} mb={10}>
              <Text>showing 30 results</Text>
              <Flex>
                <Text>a</Text>
                <Text>b</Text>
              </Flex>
            </Flex>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {data?.data?.map(
                ({
                  thumbnail,
                  title,
                  complexityLevel,
                  userId,
                  id,
                  slug,
                  modules,
                  reviews,
                }: CourseInterface) => (
                  <GridItem w="100%" key={id} as={Link} to={`/course/${slug}`}>
                    <Stack>
                      <Stack>
                        <Image src={thumbnail} alt={title} borderRadius="lg" />
                        <Stack>
                          <Flex justifyContent={"start"} alignItems={"center"}>
                            <Text color={"#FFD700"}>
                              {calculateAverageStars(reviews)}
                            </Text>
                            <Box
                              color={"#e59819"}
                              display={"flex"}
                              ml={2}
                              mr={3}
                            >
                              <Text display={"flex"} columnGap={1}>
                                {generateStarIcons(
                                  calculateAverageStars(reviews)
                                )}
                              </Text>
                            </Box>
                            <Text color={"gray.600"}>
                              ({getTotalStarsSum(reviews)})
                            </Text>
                          </Flex>
                          <Text fontSize="20px" mt="-12px">
                            {title}
                          </Text>
                          <Flex justify={"space-between"}>
                            <Flex align="center" columnGap={"4px"} color="gray">
                              <CiPlay1 />
                              <Text fontSize="13px">
                                {modules.length} Lessons
                              </Text>
                            </Flex>
                            <Flex align="center" columnGap={"4px"} color="gray">
                              <CiClock1 />
                              <Text fontSize="13px">
                                {" "}
                                {convertSecondsToHMS(
                                  getTotalLecturesDuration(modules)
                                )}
                              </Text>
                            </Flex>
                            <Flex align="center" columnGap={"4px"} color="gray">
                              <BiSolidBarChartAlt2 color={"gray"} />
                              <Text fontSize="13px">{complexityLevel}</Text>
                            </Flex>
                          </Flex>
                          <Divider />
                        </Stack>
                      </Stack>
                      <Flex align={"center"} justify={"space-between"}>
                        <Flex align={"center"} columnGap={2}>
                          <Avatar
                            name={`${userId.firstName} ${userId.lastName}`}
                            src={userId.profilePicture}
                            size={"sm"}
                          />
                          <Text>
                            {userId?.firstName} {userId.lastName}
                          </Text>
                        </Flex>
                        <Text fontWeight={"500"} fontSize={"20px"}>
                          $99
                        </Text>
                      </Flex>
                    </Stack>
                  </GridItem>
                )
              )}

              <GridItem w="100%" h="10" bg="blue.500" />
            </Grid>
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default StudentCourse;
