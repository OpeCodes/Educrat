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
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { useState } from "react";
import { HiOutlineChat } from "react-icons/hi";
import StudentCourseContent from "../../components/StudentCourseContent";
import { useGetStudentSingleCourse } from "../../hooks/studentCourse";

// const initialValues = {
//   title: "",
//   content: "",
// };
const SingleCourse = () => {
  const { slug } = useParams();
  const { getStudentSingleCourse } = useGetStudentSingleCourse(slug);
  // const handleSubmit = (values: any) => {
  //   console.log(values);
  // };

  const dateString = getStudentSingleCourse?.updatedAt;
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Adding 1 because getMonth returns zero-based index
  const year = date.getFullYear() % 100;
  const formattedDate = `${month.toString().padStart(2, "0")}/${year
    .toString()
    .padStart(2, "0")}`;

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

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
            <Flex
              w={"100%"}
              maxW={"90%"}
              mx="auto"
              justify={"space-between"}
              mt={"4rem"}
              columnGap={20}
              flexDirection={{ sm: "column", md: "row" }}
            >
              <Stack  rowGap={5}>
                <Text fontWeight={"bold"} fontSize={"2rem"}>
                  {getStudentSingleCourse?.title}
                </Text>
                <Text color={"#4f547b"}>
                  {getStudentSingleCourse?.subtitle}
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
                        >
                          <Flex>
                            <Text>Instructor Rating</Text>
                          </Flex>
                          <Flex
                            columnGap={1}
                            color={"#4f547b"}
                            align={"center"}
                          >
                            <Text>
                              <HiOutlineChat />
                            </Text>
                            <Text>23,987 Reviews</Text>
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
                    <Flex columnGap={3} mt={3}>
                      <Avatar size="lg" name="Adedokun Peter" />
                      <Stack>
                        <Flex columnGap={1} rowGap={3}>
                          <Text color={"black"}>Adedokun Peter</Text>
                          <Text>3 days ago</Text>
                        </Flex>
                        <Text color={"black"}>The best LMS Design</Text>
                        <Text>
                          This course is a very applicable. Professor Ng
                          explains precisely each algorithm and even tries to
                          give an intuition for mathematical and statistic
                          concepts behind each algorithm. Thank you very much.
                        </Text>
                      </Stack>
                    </Flex>
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
                  // height={"400px"}
                  p="2"
                  borderRadius="md"
                mx={2}


                >
                    <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
                    <Text>This is name of the obysjs alsdjf;a a;sldkfja;l a;sldkfj ;aslfd;laskjf;asdfasfdasfdasfdfdsf</Text>
                    <Text>This is name of the obysjs alsdjf;a a;sldkfja;l a;sldkfj ;aslfd;laskjf;asdfasfdasfdasfdfdsf</Text>
                    <Text>This is name of the obysjs alsdjf;a a;sldkfja;l a;sldkfj ;aslfd;laskjf;asdfasfdasfdasfdfdsf</Text>
                    <Text>This is name of the obysjs alsdjf;a a;sldkfja;l a;sldkfj ;aslfd;laskjf;asdfasfdasfdasfdfdsf</Text>
                    <Text>This is name of the obysjs alsdjf;a a;sldkfja;l a;sldkfj ;aslfd;laskjf;asdfasfdasfdasfdfdsf</Text>
                </Box>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      </Stack>
      <Text>klsd;jflaksj</Text>
      <Text>klsd;jflaksj</Text>
      <Text>klsd;jflaksj</Text>
      <Text>klsd;jflaksj</Text>
      <Text>klsd;jflaksj</Text>
    </Stack>
  );
};

export default SingleCourse;

{
  /* write review */
}
{
  /* <Stack mt={"1.8rem"} mb={"1.5rem"} color={"#4f547b"}>
                    <Text
                      color={"black"}
                      fontWeight={"bold"}
                      fontSize={"1.1rem"}
                    >
                      Write a Review
                    </Text>
                    <Text>What is it like about the Course?</Text>
                    <Text>Review star here </Text>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={reviewCourseValidationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ handleChange, handleSubmit, values, errors }) => (
                        <Flex
                          rowGap={"5px"}
                          flexDirection="column"
                          maxHeight={{ base: "100%", lg: "530px" }}
                          overflowY={"auto"}
                          pb={5}
                        >
                          <FormControl isRequired>
                            <FormLabel>Review Title</FormLabel>
                            <Input
                              type="text"
                              variant="filled"
                              placeholder="write your review"
                              value={values.title}
                              name="title"
                              onChange={handleChange}
                            />
                            {errors.title && (
                              <Text
                                style={{ color: "red", marginTop: 5 }}
                                fontSize="14px"
                              >
                                <>{errors.title}</>
                              </Text>
                            )}
                          </FormControl>
                          <FormControl isRequired mt={5}>
                            <FormLabel>Review Content</FormLabel>
                            <Textarea
                              variant="filled"
                              placeholder="Message"
                              value={values.content}
                              name="content"
                              onChange={handleChange}
                            />
                            {errors.content && (
                              <Text
                                style={{ color: "red", marginTop: 5 }}
                                fontSize="14px"
                              >
                                <>{errors.content}</>
                              </Text>
                            )}
                          </FormControl>

                          <Button
                            bg={"#00FF84"}
                            // isLoading={isPending}
                            loadingText="Loading"
                            variant="outline"
                            spinnerPlacement="end"
                            width="100%"
                            onClick={() => handleSubmit()}
                            mt={3}
                            borderWidth={2}
                            py={3}
                            borderColor={"#00FF84"}
                            _hover={{ background: "none", color: "#00FF84" }}
                          >
                            Submit Review
                          </Button>
                        </Flex>
                      )}
                    </Formik>
                  </Stack> */
}
