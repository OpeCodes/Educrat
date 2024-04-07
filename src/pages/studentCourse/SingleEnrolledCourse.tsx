import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import logo from "../../assets/logo-3.svg";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { RiPlayCircleFill } from "react-icons/ri";
import { Formik } from "formik";
import { reviewCourseValidationSchema } from "../../schemas";
import { FaStar, FaTrophy } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRef } from "react";
import {
  useCreateEnrolledCourseReview,
  useGetSingleEnrolledStudentCourse,
} from "../../hooks/studentCourse";

const initialValues = {
  stars: 0,
  title: "",
  content: "",
};
const SingleEnrolledCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSingleEnrolledCourse } = useGetSingleEnrolledStudentCourse(id);
  const { createEnrolledCourseReview, createEnrolledCourseReviewLoading } =
    useCreateEnrolledCourseReview();

  const handleSubmit = (values: any) => {
    createEnrolledCourseReview({
      courseId: getSingleEnrolledCourse?.courseId?.id,
      review: values,
    });
  };
  const initialFocusRef: any = useRef();
  return (
    <Stack>
      <Flex
        justify="space-between"
        width={"100%"}
        align={"center"}
        zIndex={10000}
        p={3}
        bg="black"
        position="fixed"
        right="0"
        top="0"
        borderBottomWidth={0.5}
        borderColor={"white"}
      >
        <Flex align={"center"}>
          <Box
            width={"160px"}
            as={Link}
            to={"/"}
            display={{ base: "none", md: "block" }}
          >
            <Image src={logo} alt="logo" color={"black"} />
          </Box>
          <Text
            display={{ base: "block", md: "none" }}
            mr={3}
            as={"button"}
            onClick={() => navigate(-1)}
          >
            <IoMdArrowRoundBack color={"white"} fontSize={24} />
          </Text>
          <Text fontWeight={"bold"} fontSize={14} color={"white"}>
            {getSingleEnrolledCourse?.courseId?.title}
          </Text>
        </Flex>
        <Flex
          align={"center"}
          columnGap={1}
          display={{ base: "none", md: "flex" }}
        >
          <CircularProgress value={40} color="green.400" thickness="4px">
            <CircularProgressLabel color={"white"}>
              <Text ml={"17.5px"}>
                <FaTrophy color={"white"} fontSize={15} />
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
          <Flex columnGap={4}>
            <Popover initialFocusRef={initialFocusRef} placement="bottom">
              <PopoverTrigger>
                <Text as={"button"} color={"white"} fontSize={15}>
                  Your Progress
                </Text>
              </PopoverTrigger>
              <PopoverContent color="black" bg="white" borderRadius={0}>
                <PopoverHeader pt={4} fontWeight="bold" border="0">
                  226 of 370 complete.
                </PopoverHeader>
                <PopoverArrow bg="white" />
                <PopoverBody>Finish course to get your certificate</PopoverBody>
              </PopoverContent>
            </Popover>
            <Text color={"white"}> Share this course</Text>
          </Flex>
        </Flex>
      </Flex>
      <Stack>
        <Flex
          justify={"space-between"}
          mt={{ base: "1.5rem", md: "3.1rem" }}
          flexDirection={{ base: "column", xl: "row" }}
        >
          <Stack mt={6} w={"100%"}>
            {/* video section */}
            <AspectRatio
              maxW={{ base: "100%", xl: "900px", "2xl": "1700px" }}
              maxH={{ base: "900px", lg: "400px" }}
              ratio={{ base: 15 / 8, lg: 15 / 13 }}
            >
              <iframe
                title="Learn frontend development from peter"
                src={
                  "https://res.cloudinary.com/dtori4rq2/video/upload/v1712143746/educrat/r0kttd4uzsjtdp2kq938.mp4"
                }
                allowFullScreen
              />
            </AspectRatio>
            {/* article section
            {/* <Stack
              w={{ base: "100%", xl: "923px", "2xl": "1700px" }}
              h={{ base: "900px", lg: "400px" }}
              overflowY={{ base: "hidden", xl: "scroll" }}
              borderBottomWidth={2}
              borderColor={"#f1f1f1"}
            >
              <Stack>
                <div dangerouslySetInnerHTML={{ __html: peter }} />
              </Stack>
            </Stack> */}
            <Stack
              maxW={{ base: "100%", xl: "900px", "2xl": "1700px" }}
              px={{ base: "2", xl: 20 }}
            >
              {/* review section */}

              <Stack mt={"1.8rem"} mb={"1.5rem"} color={"#4f547b"}>
                <Text color={"black"} fontWeight={"bold"} fontSize={"1.1rem"}>
                  Write a Review
                </Text>
                <Text>What is it like about the Course?</Text>

                <Formik
                  initialValues={initialValues}
                  validationSchema={reviewCourseValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleChange,
                    setFieldValue,
                    handleSubmit,
                    values,
                    errors,
                  }) => (
                    <Flex
                      rowGap={"5px"}
                      flexDirection="column"
                      maxHeight={{ base: "100%", lg: "530px" }}
                      overflowY={"auto"}
                      pb={5}
                    >
                      <>
                        <Flex align="center">
                          {Array.from({ length: 5 }, (_, index) => (
                            <IconButton
                              key={index}
                              icon={
                                values.stars >= index + 1 ? (
                                  index + 1 === values.stars ? (
                                    <FaStar color="#FFE234" />
                                  ) : (
                                    <FaStar color="#FFE234" />
                                  )
                                ) : (
                                  <FaStar color="gray" />
                                )
                              }
                              onClick={() => setFieldValue("stars", index + 1)}
                              variant="unstyled"
                              aria-label={`${index + 1} stars`}
                            />
                          ))}
                        </Flex>
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
                          isLoading={createEnrolledCourseReviewLoading}
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
                      </>
                    </Flex>
                  )}
                </Formik>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            width={{ base: "100%", xl: "30%" }}
            position={{ base: "static", xl: "fixed" }}
            right="12"
            top="90px"
            pl={{ base: 2, xl: 4 }}
            pr={{ base: 2, xl: 0 }}
            mt={{ base: 4, xl: 0 }}
          >
            <Text fontWeight={"bold"}>Course content</Text>
            <Accordion
              allowToggle
              maxH={{ base: "100%", lg: "490px" }}
              overflowY={{ base: "hidden", lg: "scroll" }}
            >
              {getSingleEnrolledCourse?.courseId?.modules?.map(
                (module: any, index: any) => {
                  const { lectures, title } = module;
                  return (
                    <AccordionItem
                      style={{ borderWidth: 1, borderRadius: 15 }}
                      mb={4}
                      key={index}
                      rowGap={6}
                    >
                      <Stack>
                        <AccordionButton
                          _hover={{ backgroundColor: "none" }}
                          py={3}
                          borderRadius={15}
                          backgroundColor={"#F7F8FB"}
                        >
                          <Flex
                            width={"100%"}
                            justify={"space-between"}
                            align={"center"}
                          >
                            <Stack>
                              <Flex columnGap={2} fontWeight={"bold"}>
                                <Text>Section {index + 1}:</Text>
                                <Text>{title}</Text>
                              </Flex>
                              <Flex>
                                <Text fontSize={14}>
                                  1/ {lectures?.length} | 6 mins
                                </Text>
                              </Flex>
                            </Stack>
                            <Text>
                              <AccordionIcon fontSize={23} />
                            </Text>
                          </Flex>
                        </AccordionButton>
                      </Stack>
                      {lectures?.map((lecture: any, index: number) => {
                        const { title } = lecture;
                        return (
                          <AccordionPanel>
                            <Flex columnGap={3} align={"start"}>
                              <Checkbox
                                mt={1}
                                iconColor={"black"}
                                size="lg"
                                borderColor={"black"}
                                colorScheme={"blackAlpha"}
                              />
                              <Stack>
                                <Text>
                                  {index + 1} {title}
                                </Text>
                                <Flex align={"center"} color={"gray"}>
                                  <RiPlayCircleFill size={25} />1 min
                                </Flex>
                              </Stack>
                            </Flex>
                          </AccordionPanel>
                        );
                      })}
                    </AccordionItem>
                  );
                }
              )}
            </Accordion>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default SingleEnrolledCourse;
