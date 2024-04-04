import {
  Stack,
  Text,
  Flex,
  Avatar,
  Grid,
  GridItem,
  Collapse,
  Button,
  Box,
  Image,
  Divider,
  Skeleton,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";
import {
  MdOutlineCheckCircleOutline,
  MdOutlinePlayLesson,
} from "react-icons/md";
import { FcInfo } from "react-icons/fc";
import { WiTime3 } from "react-icons/wi";
import { FiBarChart2 } from "react-icons/fi";
import { IoLanguage } from "react-icons/io5";
import { FaCertificate } from "react-icons/fa6";
import { useState } from "react";
import { HiOutlineChat } from "react-icons/hi";
import StudentCourseContent from "../../components/StudentCourseContent";
import {
  useCourseEnrollment,
  useGetAllUEnrolledCourse,
  useGetCourseReview,
  useGetCourseReviewRating,
  useGetStudentSingleCourse,
  useInstructorReviewRating,
  // useInstructorReviewRating,
} from "../../hooks/studentCourse";
import { FaStar } from "react-icons/fa";
import {
  convertSecondsToHMS,
  getTimeDifference,
} from "../../components/TimeFormat";

const SingleCourse = () => {
  const { slug, index } = useParams();
  const { getStudentSingleCourse, isPending } = useGetStudentSingleCourse(slug);
  const { getCourseReview } = useGetCourseReview(getStudentSingleCourse?.id);

  const { instructorReviewRating } = useInstructorReviewRating(
    getStudentSingleCourse?.userId?.id
  );
  const { courseReviewRating } = useGetCourseReviewRating(
    getStudentSingleCourse?.id
  );
  console.log(courseReviewRating, "course");
  console.log(instructorReviewRating, "instructor");
  const dateString = getStudentSingleCourse?.updatedAt;
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Adding 1 because getMonth returns zero-based index
  const year = date.getFullYear() % 100;
  const formattedDate = `${month.toString().padStart(2, "0")}/${year
    .toString()
    .padStart(2, "0")}`;

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const getTotalLecturesDuration = () => {
    let totalDuration = 0;
    getStudentSingleCourse?.modules.forEach((module: any) => {
      if (module.lectures && Array.isArray(module.lectures)) {
        module.lectures.forEach((lecture: any) => {
          totalDuration += lecture?.content?.duration || 0;
        });
      }
    });
    return totalDuration;
  };
  // Calculate total duration
  const totalDuration = getTotalLecturesDuration();

  const { data } = useGetAllUEnrolledCourse();
  const { courseEnroll } = useCourseEnrollment();
  const singleID: string[] = (data ?? []).flat(2).map((obj: any) => obj.id);
  const singleSlug: string[] = (data ?? [])
    .flat(2)
    .map((obj: any) => obj?.courseId?.slug);

  let exists = false;
  if (slug) {
    exists = singleSlug.includes(slug.toLowerCase());
  }

  //instuctor star
  const stars = [];
  // Fill stars based on the rating value
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        color={i <= courseReviewRating?.average ? "#FFD700" : "#EAEAEA"} // Fill color for filled stars based on rating
      />
    );
  }

  return (
    <Stack>
      <Stack>
        <Stack mt={"4.5rem"}>
          <Stack>
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
              </Flex>
            </Stack>
            {isPending ? (
              <Stack mx={"4.3rem"}>
                <Skeleton height="60px" />
                <Stack>
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                  <Skeleton height="60px" />
                </Stack>
              </Stack>
            ) : (
              <Flex
                w={"100%"}
                maxW={"90%"}
                mx="auto"
                justify={"space-between"}
                mt={"1.6rem"}
                columnGap={20}
                flexDirection={{ base: "column-reverse", lg: "row" }}
              >
                <Stack rowGap={5}>
                  <Text fontWeight={"bold"} fontSize={"2rem"}>
                    {getStudentSingleCourse?.title}
                  </Text>
                  <Text color={"#4f547b"}>
                    {getStudentSingleCourse?.subtitle}
                  </Text>
                  <Flex
                    flexDirection={{ base: "column", lg: "row" }}
                    color={"#4f547b"}
                    align={{ base: "start", lg: "center" }}
                    columnGap={6}
                  >
                    <Flex align={"center"} columnGap={1}>
                      <Text color={"#FFD700"}>
                        {courseReviewRating?.average}
                      </Text>
                      <Text display={"flex"} columnGap={1}>
                        {stars}
                      </Text>
                      <Text>({courseReviewRating?.total})</Text>
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
                      <Text>Last updated {formattedDate}</Text>
                    </Flex>
                  </Flex>
                  <Flex align={"center"} columnGap={2} color={"#4f547b"}>
                    <Avatar
                      size="sm"
                      name={`${getStudentSingleCourse?.userId?.firstName} ${getStudentSingleCourse?.userId.lastName}`}
                      src={getStudentSingleCourse?.userId?.profilePicture}
                    />
                    <Text
                      fontWeight={"400"}
                    >{`${getStudentSingleCourse?.userId?.firstName} ${getStudentSingleCourse?.userId.lastName}`}</Text>
                  </Flex>
                  {/* course content */}
                  <Stack mt={"1.8rem"}>
                    <Text fontWeight={"bold"} fontSize={"1.1rem"}>
                      Course Content
                    </Text>
                    <StudentCourseContent
                      SingleCourseProp={getStudentSingleCourse}
                    />
                  </Stack>

                  <Stack mb={"1.5rem"}>
                    <Text fontWeight={"bold"} fontSize={"1.1rem"}>
                      What you'll learn
                    </Text>
                    <Stack>
                      <Grid templateColumns={{ md: "repeat(2, 1fr)" }} gap={3}>
                        {getStudentSingleCourse?.learningObjectives?.map(
                          (learn: any, index: any) => {
                            return (
                              <GridItem w="100%" key={index}>
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
                                  <Text>{learn}</Text>
                                </Flex>
                              </GridItem>
                            );
                          }
                        )}
                      </Grid>
                    </Stack>
                    <Stack mt={"1.8rem"} mb={"1.5rem"}>
                      <Text fontWeight={"bold"} fontSize={"1.1rem"}>
                        Requirements
                      </Text>

                      <Flex align={"center"} color={"#4f547b"} columnGap={1}>
                        <Text mt={"-.2rem"} fontSize={"1.2rem"}>
                          &#x2022;
                        </Text>
                        <Text>{getStudentSingleCourse?.preRequisites}</Text>
                      </Flex>
                    </Stack>
                    {/* description */}
                    <Stack mb={"1.5rem"} color={"#4f547b"}>
                      <Text
                        color={"black"}
                        fontWeight={"bold"}
                        fontSize={"1.1rem"}
                      >
                        Description
                      </Text>
                      <Collapse
                        dangerouslySetInnerHTML={{
                          __html: getStudentSingleCourse?.description,
                        }}
                        startingHeight={150}
                        in={show}
                        color={"#4f547b"}
                      ></Collapse>
                      {getStudentSingleCourse?.description.length > 150 && (
                        <Button
                          color={"#6440fb"}
                          textAlign={"left"}
                          display={"flex"}
                          justifyContent={"left"}
                          size="sm"
                          onClick={handleToggle}
                          mt="1rem"
                          colorScheme="teal"
                          variant="link"
                        >
                          Show {show ? "Less" : "More"}
                        </Button>
                      )}
                    </Stack>
                    {/* instructor profile */}
                    <Stack>
                      <Text
                        color={"black"}
                        fontWeight={"bold"}
                        fontSize={"1.1rem"}
                      >
                        Instructor
                      </Text>
                      <Flex columnGap={5} mt={"1rem"}>
                        <Avatar
                          size="xl"
                          name={`${getStudentSingleCourse?.userId?.firstName} ${getStudentSingleCourse?.userId.lastName}`}
                          src={getStudentSingleCourse?.userId?.profilePicture}
                        />
                        <Stack>
                          <Text
                            fontWeight={"bold"}
                          >{`${getStudentSingleCourse?.userId?.firstName} ${getStudentSingleCourse?.userId.lastName}`}</Text>
                          <Text color={"#4f547b"}>
                            {getStudentSingleCourse?.userId?.headline}
                          </Text>
                          <Flex
                            color={"#4f547b"}
                            columnGap={5}
                            fontSize={"0.9rem"}
                            flexDirection={{ base: "column", lg: "row" }}
                          >
                            <Flex columnGap={1}>
                              <Text color={"#FFD700"}>
                                {" "}
                                {
                                  +parseFloat(
                                    instructorReviewRating?.average
                                  ).toFixed(2)
                                }{" "}
                              </Text>
                              <Text>Instructor Rating</Text>
                            </Flex>
                            <Flex
                              columnGap={2}
                              color={"#4f547b"}
                              align={"center"}
                            >
                              <Text>
                                <HiOutlineChat />
                              </Text>
                              <Text>
                                {
                                  +parseFloat(
                                    instructorReviewRating?.total
                                  ).toFixed(2)
                                }
                              </Text>
                              <Text> Reviews</Text>
                            </Flex>
                            <Flex
                              columnGap={1}
                              color={"#4f547b"}
                              align={"center"}
                            >
                              <Text>
                                <HiOutlineChat />
                              </Text>
                              <Text>692 Students</Text>
                            </Flex>
                            <Flex
                              columnGap={1}
                              color={"#4f547b"}
                              align={"center"}
                            >
                              <Text>
                                <LuClock3 />
                              </Text>
                              <Text>15 Course</Text>
                            </Flex>
                          </Flex>
                        </Stack>
                      </Flex>
                      <Text color={"#4f547b"} mt={"0.8rem"}>
                        {getStudentSingleCourse?.userId?.biography}
                      </Text>
                    </Stack>
                    {/* Student review */}
                    <Stack mt={"1.8rem"} mb={"1.5rem"} color={"#4f547b"}>
                      <Text
                        color={"black"}
                        fontWeight={"bold"}
                        fontSize={"1.1rem"}
                      >
                        Reviews
                      </Text>
                      {getCourseReview?.map((review: any) => {
                        const { reviewer, title, content, updatedAt } = review;
                        return (
                          <Flex columnGap={3} mt={3}>
                            <Avatar
                              size="lg"
                              name={`${reviewer?.firstName} ${reviewer?.lastName}`}
                              src={""}
                            />
                            <Stack>
                              <Flex columnGap={1} rowGap={3}>
                                <Text color={"black"}>
                                  {reviewer?.firstName} {reviewer?.lastName}
                                </Text>
                                <Text>{getTimeDifference(updatedAt)}</Text>
                              </Flex>
                              <Text color={"black"}>{title}</Text>
                              <Text>{content}</Text>
                            </Stack>
                          </Flex>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  bg="white"
                  // zIndex={30}
                  boxShadow={{
                    base: "",
                    lg: "0 0 1rem rgb(189 197 200 / 99%)",
                  }}
                >
                  <Box
                    position="sticky"
                    top="95px"
                    zIndex="1"
                    p="2"
                    borderRadius="md"
                    width={{ base: "100%", lg: "350px" }}
                    mx={{ base: 0, lg: 1 }}
                  >
                    <Image
                      mx="auto"
                      src="https://bit.ly/dan-abramov"
                      alt="Dan Abramov"
                      width={"100%"}
                    />
                    <Stack
                      maxHeight={{ base: "100%", lg: "200px" }}
                      overflowY={{ base: "hidden", lg: "scroll" }}
                    >
                      <Stack mx={{ base: 0, lg: 4 }}>
                        {!exists ? (
                          <Stack>
                            <Text mt={3} fontSize={"1.5rem"}>
                              $120
                            </Text>
                            <Button
                              bg={"#6440FB"}
                              py={"25px"}
                              variant="solid"
                              color={"white"}
                              as={Link}
                              to={`/course/${slug}/learn/lecture/${
                                singleID[parseInt(index ?? "0")]
                              }`}
                            >
                              Add to Cart
                            </Button>

                            <Button
                              borderColor={"#140342"}
                              py={"25px"}
                              variant="outline"
                              onClick={() =>
                                courseEnroll({
                                  courseId: getStudentSingleCourse?.id,
                                })
                              }
                            >
                              Buy Now
                            </Button>
                          </Stack>
                        ) : (
                          <Stack mt={3}>
                            <Flex columnGap={4} align={"center"}>
                              <FcInfo size={35} />
                              <Text fontWeight={"bold"}>
                                You purchased this course on mar, 11,2024
                              </Text>
                            </Flex>
                            <Button
                              bg={"#6440FB"}
                              py={"25px"}
                              variant="solid"
                              color={"white"}
                              as={Link}
                              to={`/course/${slug}/learn/lecture/${
                                singleID[parseInt(index ?? "0")]
                              }`}
                            >
                              Go to Course
                            </Button>
                          </Stack>
                        )}

                        <Stack>
                          <Stack mt={"1rem"}>
                            {/* lessons */}
                            <Stack fontSize={17} color={"#140342"}>
                              <Flex justify={"space-between"} align={"center"}>
                                <Flex columnGap={3} align={"center"}>
                                  <MdOutlinePlayLesson />
                                  <Text>Lesson</Text>
                                </Flex>
                                <Text>
                                  {getStudentSingleCourse?.modules?.length}
                                </Text>
                              </Flex>
                              <Divider />
                            </Stack>
                            {/* duration */}
                            <Stack fontSize={17} color={"#140342"}>
                              <Flex justify={"space-between"} align={"center"}>
                                <Flex columnGap={3} align={"center"}>
                                  <WiTime3 />
                                  <Text>Duration</Text>
                                </Flex>
                                <Text>
                                  {convertSecondsToHMS(totalDuration)}
                                </Text>
                              </Flex>
                              <Divider />
                            </Stack>
                            {/* skill level */}
                            <Stack fontSize={17} color={"#140342"}>
                              <Flex justify={"space-between"} align={"center"}>
                                <Flex columnGap={3} align={"center"}>
                                  <FiBarChart2 />

                                  <Text>Skill level</Text>
                                </Flex>
                                <Text>
                                  {getStudentSingleCourse?.complexityLevel}
                                </Text>
                              </Flex>
                              <Divider />
                            </Stack>
                            {/* language */}
                            <Stack fontSize={17} color={"#140342"}>
                              <Flex justify={"space-between"} align={"center"}>
                                <Flex columnGap={3} align={"center"}>
                                  <IoLanguage />

                                  <Text>Language</Text>
                                </Flex>
                                <Text>{getStudentSingleCourse?.language}</Text>
                              </Flex>
                              <Divider />
                            </Stack>
                            {/* certificate */}
                            <Stack fontSize={17} color={"#140342"}>
                              <Flex justify={"space-between"} align={"center"}>
                                <Flex columnGap={3} align={"center"}>
                                  <FaCertificate />

                                  <Text>Certificate</Text>
                                </Flex>
                                <Text>yes</Text>
                              </Flex>
                              <Divider />
                            </Stack>
                            {/* full lifetime access */}
                            <Stack fontSize={17} color={"#140342"}>
                              <Flex justify={"space-between"} align={"center"}>
                                <Flex columnGap={3} align={"center"}>
                                  <MdOutlinePlayLesson />
                                  <Text>Full lifetime access</Text>
                                </Flex>
                                <Text>yes</Text>
                              </Flex>
                              <Divider />
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Text>other part here</Text>
    </Stack>
  );
};

export default SingleCourse;

{
  /* write review */
}
