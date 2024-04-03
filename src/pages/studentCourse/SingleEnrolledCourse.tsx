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
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import logo from "../../assets/logo-3.svg";
import { Link } from "react-router-dom";
import { RiPlayCircleFill } from "react-icons/ri";
import { Formik } from "formik";
import { reviewCourseValidationSchema } from "../../schemas";
const dummyData = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
const dummyData2 = [1, 2, 3, 3];
const initialValues = {
  title: "",
  content: "",
};
const SingleEnrolledCourse = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Stack>
      <Flex
        justify="space-between"
        width={"100%"}
        align={"center"}
        zIndex={10000}
        p={4}
        bg="black"
        position="fixed"
        right="0"
        top="0"
      >
        <Flex align={"center"}>
          <Box width={"160px"} as={Link} to={"/"}>
            <Image src={logo} alt="logo" color={"black"} />
          </Box>
          <Text fontWeight={"bold"} mt={-1} fontSize={16} color={"white"}>
            Learn frontend development from peter
          </Text>
        </Flex>

        {/* <Text>Back to courses</Text> */}
      </Flex>
      <Stack>
        <Flex
          justify={"space-between"}
          mt={"3.5rem"}
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
              {dummyData.map((_, index) => {
                return (
                  <AccordionItem
                    style={{ borderWidth: 1, borderRadius: 15 }}
                    mb={4}
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
                              <Text>Introduction</Text>
                            </Flex>
                            <Flex>
                              <Text fontSize={14}>5 / 6 | 6 mins</Text>
                            </Flex>
                          </Stack>
                          <Text>
                            <AccordionIcon fontSize={23} />
                          </Text>
                        </Flex>
                      </AccordionButton>
                    </Stack>
                    {dummyData2.map(() => {
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
                              <Text>1. What is NodeJs</Text>
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
              })}
            </Accordion>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default SingleEnrolledCourse;
