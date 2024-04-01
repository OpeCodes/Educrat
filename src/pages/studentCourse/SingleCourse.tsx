import {
  Stack,
  Text,
  Flex,
  Avatar,
  Grid,
  GridItem,
  Collapse,
  Button,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { useState } from "react";
import { HiOutlineChat } from "react-icons/hi";
import StudentCourseContent from "../../components/StudentCourseContent";
import { useGetSingleCourse } from "../../hooks/course";
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

// const initialValues = {
//   title: "",
//   content: "",
// };
const SingleCourse = () => {
  const { id } = useParams() ;
const { getSingleCourse, isPending } = useGetSingleCourse(id);
console.log(getSingleCourse)
  // const handleSubmit = (values: any) => {
  //   console.log(values);
  // };

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
                {/* course content */}
                <Stack mt={"1.8rem"} mb={"1.5rem"}>
                  <Text fontWeight={"bold"} fontSize={"1.1rem"}>
                    Course Content
                  </Text>
                  <StudentCourseContent />
                </Stack>

                <Stack mt={"1.8rem"} mb={"1.5rem"}>
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
                  <Stack mt={"1.8rem"} mb={"1.5rem"}>
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
                  {/* description */}
                  <Stack mb={"1.5rem"} color={"#4f547b"}>
                    <Text
                      color={"black"}
                      fontWeight={"bold"}
                      fontSize={"1.1rem"}
                    >
                      Description
                    </Text>
                    <Collapse startingHeight={150} in={show} color={"#4f547b"}>
                      Phasellus enim magna, varius et commodo ut, ultricies
                      vitae velit. Ut nulla tellus, eleifend euismod
                      pellentesque vel, sagittis vel justo. In libero urna,
                      venenatis sit amet ornare non, suscipit nec risus. Sed
                      consequat justo non mauris pretium at tempor justo
                      sodales. Quisque tincidunt laoreet malesuada. Cum sociis
                      natoque penatibus et magnis dis parturient montes,
                      nascetur. This course is aimed at people interested in
                      UI/UX Design. We’ll start from the very beginning and work
                      all the way through, step by step. If you already have
                      some UI/UX Design experience but want to get up to speed
                      using Adobe XD then this course is perfect for you too!
                      First, we will go over the differences between UX and UI
                      Design. We will look at what our brief for this real-world
                      project is, then we will learn about low-fidelity
                      wireframes and how to make use of existing UI design kits.
                    </Collapse>
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
                        name="Christian Nwamba"
                        src="https://bit.ly/code-beast"
                      />
                      <Stack>
                        <Text fontWeight={"bold"}>Adedokun Peter</Text>
                        <Text color={"#4f547b"}>Adedokun Peter</Text>
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
                      Back in 2010, I started brainspin with a desire to design
                      compelling and engaging apps. For over 7 years, I have
                      designed many high profile web and iPhone applications.
                      The applications range from 3D medical aided web
                      applications to project management applications for niche
                      industries. <br /> <br /> I am also the founder of a large
                      local design organization, Salt Lake Designers, where I
                      and other local influencers help cultivate the talents of
                      up and coming UX designers through workshops and panel
                      discussions.
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
                  {/* write review */}
                  {/* <Stack mt={"1.8rem"} mb={"1.5rem"} color={"#4f547b"}>
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
                  </Stack> */}
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
