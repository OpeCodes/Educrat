import {
  Stack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Grid,
  GridItem,
  Image,
  Progress,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  useGetAllUserEnrolledCourse,
  useGetStudentWishList,
} from "../../hooks/studentCourse";
import { Loading } from "../../components";
import { calculateAverageStars, generateStarIcons } from "../../components/CourseCalculations";

const MyLearning = () => {
  const { data: enrolledCourse, isPending: enrolledCourseLoading } =
    useGetAllUserEnrolledCourse();
  const { getStudentWishList, isPending: getStudentWishListLoading } =
    useGetStudentWishList();
// console.log(getStudentWishList,"getStudentWishList")
    // console.log(getStudentWishList,"getStudentWishList")
  //get first id for each lecture in the enrolled array
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
          const firstLectureId = firstModule.lectures[0].id;
          firstLectureIds.push(firstLectureId);
        }
      }
    });

    return firstLectureIds;
  };
  const firstLectureIds = getFirstLectureIds(enrolledCourse);
  return (
    <Stack mt="4.6rem">
      <Stack>
        <Stack backgroundColor="black">
          <Text
            maxW="80%"
            w="100%"
            mx="auto"
            color="white"
            fontSize="2.9rem"
            my="1.2rem"
            mb="2.9rem"
          >
            My Learning
          </Text>
        </Stack>
        <Stack maxW="80%" w="100%" mx="auto" color="#D1D7DC" mt="-3.3rem">
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Tab fontWeight="bold">All Courses</Tab>
              <Tab fontWeight="bold">Wishlist</Tab>
            </TabList>
            <TabIndicator
              mt="-1.9px"
              height="7px"
              bg="white"
              borderRadius="1px"
            />
            <TabPanels color="black">
              <TabPanel>
                {enrolledCourseLoading ? (
                  <Loading />
                ) : (
                  <Grid
                    templateColumns={{
                      md: "repeat(2, 1fr)",
                      lg: "repeat(4, 1fr)",
                    }}
                    gap={6}
                    mt={6}
                  >
                    {enrolledCourse?.map((course: any, index: number) => {
                      const { courseId, id,progress } = course;
                      if (!courseId) {
                        return null; // Skip rendering if courseId is null
                      }
                      const { reviews, thumbnail, title } = courseId;
                      const averageStars = calculateAverageStars(reviews);
                      return (
                        <GridItem
                          w="100%"
                          key={id}
                          as={Link}
                          h={"100%"}
                          to={`/course/${courseId.slug}/learn/lecture/${id}/${firstLectureIds[index]}/reviews`}
                        >
                          <Image
                            maxHeight={"250px"}
                            height={"100%"}
                            width={"100%"}
                            objectFit="cover"
                            src={thumbnail}
                            alt={title}
                          />
                          <Text mt={2} fontWeight={"bold"}>
                            {title}
                          </Text>
                          <Text fontSize={"15px"} color={"gray"}>
                            Peter Adedokun
                          </Text>
                          <Progress value={ Math.round(progress *100)} height={"2px"} mt={2} />
                          <Flex justify={"space-between"} fontSize={13} mt={1}>
                            <Text>{ Math.round(progress *100)}% complete</Text>
                            <Stack>
                              <Flex>{generateStarIcons(averageStars)}</Flex>
                            </Stack>
                          </Flex>
                        </GridItem>
                      );
                    })}
                  </Grid>
                )}
              </TabPanel>
              <TabPanel>
                {getStudentWishListLoading ? (
                  <Loading />
                ) : (
                  <Grid
                    templateColumns={{
                      md: "repeat(2, 1fr)",
                      lg: "repeat(4, 1fr)",
                    }}
                    gap={6}
                    mt={6}
                  >
                    {getStudentWishList?.map((course: any) => {
                      const { thumbnail, title, id, slug } = course;
                      return (
                        <GridItem key={id} as={Link} to={`/course/${slug}`}>
                          <Image
                            maxHeight="250px"
                            height="100%"
                            width="100%"
                            objectFit="cover"
                            src={thumbnail}
                            alt={title}
                          />
                          <Text mt={2} fontWeight="bold">
                            {title}
                          </Text>
                          <Flex columnGap={1} fontSize={13}>
                            <Text>4.5 stars</Text>
                            <Text color="gray">(993)</Text>
                          </Flex>
                          <Flex columnGap={1} fontSize={13} color="gray">
                            <Text>4.5 hours</Text>
                            <Text>444 lectures</Text>
                          </Flex>
                          <Text fontWeight="bold" color="black">
                            N40000
                          </Text>
                        </GridItem>
                      );
                    })}
                  </Grid>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MyLearning;
