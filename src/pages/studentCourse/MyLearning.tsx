import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Progress,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  useGetAllUserEnrolledCourse,
  useGetStudentWishList,
} from "../../hooks/studentCourse";
import { Loading } from "../../components";
import {
  calculateAverageStars,
  generateStarIcons,
  getTotalStarsSum,
} from "../../components/CourseCalculations";
import {
  CourseInterface,
  LectureInterface,
  ModuleInterface,
} from "../../interface/courseInterface";
import { convertSecondsToHMS } from "../../components/TimeFormat";

const MyLearning = () => {
  const { data: enrolledCourse, isPending: enrolledCourseLoading } =
    useGetAllUserEnrolledCourse();
  const { getStudentWishList, isPending: getStudentWishListLoading } =
    useGetStudentWishList();

  const getTotalLecturesDurationForEachCourse = (wishList: CourseInterface[]): number[] => {
    const totalDurations: number[] = [];

    wishList?.forEach((course: CourseInterface) => {
      let totalDuration = 0;

      if (course && Array.isArray(course.modules)) {
        course.modules.forEach((module: ModuleInterface) => {
          if (module.lectures && Array.isArray(module.lectures)) {
            module.lectures.forEach((lecture: LectureInterface) => {
              totalDuration += lecture?.content?.duration || 0;
            });
          }
        });
      }
      totalDurations.push(totalDuration);
    });
    return totalDurations;
  };

  const lectureCountsForEachObject: number[] =
    getStudentWishList?.map((obj: any) =>
      obj.modules.reduce(
        (total: number, module: ModuleInterface) => total + module.lectures.length,
        0
      )
    ) || [];

  const totalDurationsForEachCourse =
    getTotalLecturesDurationForEachCourse(getStudentWishList);

  const getFirstLectureIds = (enrolledCourses: any[]) => {
    const firstLectureIds: string[] = [];
    enrolledCourses?.forEach((course) => {
      const { courseId } = course;
      if (
        courseId &&
        courseId?.modules &&
        Array.isArray(courseId?.modules) &&
        courseId.modules?.length > 0
      ) {
        const firstModule = courseId.modules[0];
        if (
          firstModule.lectures &&
          Array.isArray(firstModule.lectures) &&
          firstModule.lectures.length > 0
        ) {
          firstLectureIds.push(firstModule.lectures[0].id);
        }
      }
    });
    return firstLectureIds;
  };

  const firstLectureIds = getFirstLectureIds(enrolledCourse);

  return (
    <Stack pt={{ base: "104px", md: "118px" }} pb={16} px={{ base: 5, md: 12, lg: 16 }} spacing={8}>
      <Box
        borderRadius="32px"
        bgGradient="linear(135deg, #140342 0%, #2d0b8a 55%, #6440fb 100%)"
        color="white"
        px={{ base: 6, md: 10 }}
        py={{ base: 8, md: 10 }}
      >
        <Text textTransform="uppercase" letterSpacing="0.16em" fontWeight={700} fontSize="xs" color="whiteAlpha.700">
          My Learning
        </Text>
        <Text mt={3} fontSize={{ base: "30px", md: "44px" }} fontWeight={700} letterSpacing="-0.03em">
          Keep your momentum visible.
        </Text>
        <Text mt={3} color="whiteAlpha.800" maxW="620px">
          Track what you are actively learning, revisit saved courses, and jump back in where you left off.
        </Text>
      </Box>

      <Tabs position="relative" variant="unstyled">
        <TabList gap={3} flexWrap="wrap">
          <Tab
            borderRadius="full"
            px={5}
            py={3}
            fontWeight={700}
            _selected={{ bg: "#6440fb", color: "white" }}
          >
            All Courses
          </Tab>
          <Tab
            borderRadius="full"
            px={5}
            py={3}
            fontWeight={700}
            _selected={{ bg: "#6440fb", color: "white" }}
          >
            Wishlist
          </Tab>
        </TabList>
        <TabIndicator display="none" />
        <TabPanels px={0}>
          <TabPanel px={0} pt={8}>
            {enrolledCourseLoading ? (
              <Loading />
            ) : (
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={6}>
                {enrolledCourse?.map((course: any, index: number) => {
                  const { courseId, id, progress } = course;
                  if (!courseId) return null;
                  const { reviews, thumbnail, title } = courseId;
                  const averageStars = calculateAverageStars(reviews);

                  return (
                    <GridItem
                      key={id}
                      as={Link}
                      to={`/course/${courseId.slug}/learn/lecture/${id}/${firstLectureIds[index]}/reviews`}
                    >
                      <Box className="surface-card wrapper" borderRadius="24px" overflow="hidden" h="100%">
                        <Image
                          h="210px"
                          w="100%"
                          objectFit="cover"
                          src={thumbnail}
                          alt={title}
                          className="img"
                        />
                        <Stack p={5} spacing={4}>
                          <Text fontWeight={700} color="#140342" fontSize="xl" noOfLines={2}>
                            {title}
                          </Text>
                          <Flex align="center" gap={3}>
                            <Avatar
                              size="sm"
                              name={`${courseId?.userId?.firstName} ${courseId?.userId?.lastName}`}
                              src={courseId?.userId?.profilePicture}
                            />
                            <Text fontSize="sm" color="#4f547b">
                              {courseId?.userId?.firstName} {courseId?.userId?.lastName}
                            </Text>
                          </Flex>
                          <Stack spacing={2}>
                            <Progress
                              value={Math.round(progress * 100)}
                              height="8px"
                              borderRadius="full"
                              bg="rgba(100,64,251,0.08)"
                              sx={{
                                "> div": {
                                  background: "linear-gradient(90deg, #6440fb, #8b5cf6)",
                                  borderRadius: "999px",
                                },
                              }}
                            />
                            <Flex justify="space-between" fontSize="sm">
                              <Text color="#4f547b">{Math.round(progress * 100)}% complete</Text>
                              <Flex>{generateStarIcons(averageStars)}</Flex>
                            </Flex>
                          </Stack>
                        </Stack>
                      </Box>
                    </GridItem>
                  );
                })}
              </Grid>
            )}
          </TabPanel>
          <TabPanel px={0} pt={8}>
            {getStudentWishListLoading ? (
              <Loading />
            ) : (
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={6}>
                {getStudentWishList?.map((course: CourseInterface, index: number) => {
                  const { thumbnail, title, id, slug, reviews, price } = course;
                  return (
                    <GridItem key={id} as={Link} to={`/course/${slug}`}>
                      <Box className="surface-card wrapper" borderRadius="24px" overflow="hidden" h="100%">
                        <Image h="210px" w="100%" objectFit="cover" src={thumbnail} alt={title} className="img" />
                        <Stack p={5} spacing={4}>
                          <Text fontWeight={700} color="#140342" fontSize="xl" noOfLines={2}>
                            {title}
                          </Text>
                          <Flex columnGap={1} fontSize={13}>
                            <Text color="#e59819" fontWeight={700}>
                              {calculateAverageStars(reviews)}
                            </Text>
                            <Flex align="center">
                              {generateStarIcons(calculateAverageStars(reviews))}
                            </Flex>
                            <Text color="gray.500">({getTotalStarsSum(reviews)})</Text>
                          </Flex>
                          <Flex columnGap={1} fontSize={13} color="gray.500">
                            <Text>{convertSecondsToHMS(totalDurationsForEachCourse[index])}</Text>
                            <Text fontSize="0.8rem">&#x2022;</Text>
                            <Text>{lectureCountsForEachObject[index]} lectures</Text>
                          </Flex>
                          <Text fontWeight={700} color="#6440fb" fontSize="2xl">
                            N{price}
                          </Text>
                        </Stack>
                      </Box>
                    </GridItem>
                  );
                })}
              </Grid>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default MyLearning;
