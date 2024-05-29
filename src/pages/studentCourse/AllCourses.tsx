import {
  Stack,
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
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
import { Loading } from "../../components";

const StudentCourse = () => {
  const { data, isPending } = useGetCourse();
  if (isPending) {
    return (
      <Text mt={"6rem"}>
        <Loading />
      </Text>
    );
  }
  return (
    <Stack pt={"4.3rem"}>
      <Box paddingTop={10} pl={{base: 5, md: 20}}>
        <Text fontSize={"40px"} fontWeight={"bold"}>
          User Inferface Course
        </Text>
        <Text fontSize={"17px"}>
          Write an introductory description of the category.
        </Text>
      </Box>
      <Stack maxW={{ base: "95%", md: "90%" }} mx="auto" w="100%">
        <Grid templateColumns="repeat(4, 1fr)" columnGap={10}>
          {/* <GridItem rowSpan={2} borderWidth={0}>
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
                  
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Divider orientation="horizontal" mt={3} />
          </GridItem> */}
          <GridItem width="100%" colSpan={{ base: 4, md: 3 }} p={2}>
            <Flex justify={"space-between"} mt={3} mb={10}>
              <Text>showing {data?.data?.length} results</Text>
              {/* <Flex>
                <Text>a</Text>
                <Text>b</Text>
              </Flex> */}
            </Flex>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
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
                  price,
                }: CourseInterface) => (
                  <GridItem w="100%" key={id} as={Link} to={`/course/${slug}`}>
                    <Stack>
                      <Stack
                       maxW={{base: "100%", lg :"300px"}}>
                        <Box > 
                        <Image
                          src={thumbnail}
                          alt={title}
                          borderRadius="lg"
                          maxH={{base: "200px",}}
                          height={"100%"}
                          className="img"
                          width={"100%"}
                          // objectFit={"scale-down"}
                        />
                        </Box>
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
                          <Text fontSize="20px" mt="-12px" sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
            width: '100%',
        }} >
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
                            name={`${userId?.firstName} ${userId?.lastName}`}
                            src={userId?.profilePicture}
                            size={"sm"}
                          />
                          <Text>
                            {userId?.firstName} {userId?.lastName}
                          </Text>
                        </Flex>
                        <Text fontWeight={"500"} fontSize={"20px"}>
                          N{price}
                        </Text>
                      </Flex>
                    </Stack>
                  </GridItem>
                )
              )}
            </Grid>
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default StudentCourse;
