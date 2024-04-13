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
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";
import logo from "../../assets/logo-3.svg";
import { IoIosArrowDown, IoIosShareAlt } from "react-icons/io";

import { Link, useParams, useNavigate } from "react-router-dom";
import { RiPlayCircleFill } from "react-icons/ri";
import { FaFolderOpen } from "react-icons/fa6";

import { Formik } from "formik";
import { reviewCourseValidationSchema } from "../../schemas";
import { FaStar, FaTrophy } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

import {
  useCreateEnrolledCourseReview,
  useGetSingleEnrolledStudentCourse,
  useMarkLectureCompleted,
  useMarkLectureUnfinished,
} from "../../hooks/studentCourse";
import {
  convertSecondsToHMS,
  formatEnrolledCourseDuration,
} from "../../components/TimeFormat";
import { LuStickyNote } from "react-icons/lu";
import { useGetSingleLectureCourse } from "../../hooks/module";
import { HiFolderDownload } from "react-icons/hi";
import { VscLinkExternal } from "react-icons/vsc";
import VideoDownloadButton from "../../components/VideoDownloadButton";

const initialValues = {
  stars: 0,
  title: "",
  content: "",
};

const VideoArticleSingleEnrollCoursePage = () => {
  const { id, lectureId } = useParams();
  const navigate = useNavigate();
  const [activeLectureID, setActiveLectureID] = useState<string | null>(null);

  const { getSingleEnrolledCourse } = useGetSingleEnrolledStudentCourse(id);
  const { singleLectureData, refetch } = useGetSingleLectureCourse(lectureId);
  const { createEnrolledCourseReview, createEnrolledCourseReviewLoading } =
    useCreateEnrolledCourseReview();

  useEffect(() => {
    refetch();
  }, [lectureId]);
  const handleSubmit = (values: any) => {
    createEnrolledCourseReview({
      courseId: getSingleEnrolledCourse?.courseId?.id,
      review: values,
    });
  };
  const initialFocusRef: any = useRef();
  const { markLectureCompleted } = useMarkLectureCompleted();
  const { markLectureUnfinshed } = useMarkLectureUnfinished();
  const lectureLength: string[] = (
    getSingleEnrolledCourse?.courseId?.modules ?? []
  ).flatMap((obj: any) => obj.lectures);

  const getTotalDurationPerModule = () => {
    return getSingleEnrolledCourse?.courseId?.modules?.map((module: any) => {
      let totalDuration = 0;
      if (module.lectures && Array.isArray(module.lectures)) {
        module.lectures.forEach((lecture: any) => {
          totalDuration += lecture?.content?.duration || 0;
        });
      }
      return totalDuration;
    });
  };

  // Get total duration for each module
  const totalDurationPerModule = getTotalDurationPerModule();

  let progressValue = Math.round(
    (getSingleEnrolledCourse?.completedLectures?.length /
      lectureLength.length) *
      100
  );

  //checkbok func
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  useEffect(() => {
    const initialCheckedItems = new Set<string>();
    getSingleEnrolledCourse?.completedLectures.forEach((lecture: any) => {
      if (lecture.lectureId) {
        initialCheckedItems.add(lecture.lectureId);
      }
    });
    setCheckedItems(initialCheckedItems);
  }, [getSingleEnrolledCourse]);

  //count lectures
  const countMarkedLectures = (item: any) => {
    const completedLecturesCounts: number[] = [];
    item?.courseId?.modules.forEach((module: any) => {
      let completedLectureCount = 0;
      module.lectures.forEach((lecture: any) => {
        const isLectureCompleted = item?.completedLectures?.some(
          (completed: any) => completed.lectureId === lecture.id
        );
        if (isLectureCompleted) {
          completedLectureCount++;
        }
      });
      completedLecturesCounts.push(completedLectureCount);
    });

    return completedLecturesCounts;
  };
  const numberOfMarkedLectures = countMarkedLectures(getSingleEnrolledCourse);
  const completedValue =
    Math.round(getSingleEnrolledCourse?.completedLectures?.length) ===
    Math.round(lectureLength.length);
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

          <Text
            fontWeight={"bold"}
            fontSize={14}
            color={"white"}
            as={Link}
            to={`/course/${getSingleEnrolledCourse?.courseId?.slug}`}
          >
            {getSingleEnrolledCourse?.courseId?.title}
          </Text>
        </Flex>
        <Flex
          align={"center"}
          columnGap={1}
          display={{ base: "none", md: "flex" }}
        >
          <Flex columnGap={4} align={"center"}>
            <Popover initialFocusRef={initialFocusRef} placement="bottom">
              <PopoverTrigger>
                <Flex align={"center"} columnGap={1}>
                  <CircularProgress
                    value={progressValue}
                    color="green.400"
                    thickness="5px"
                  >
                    <CircularProgressLabel color={"white"} cursor={"pointer"}>
                      <Text ml={"17.5px"}>
                        <FaTrophy color={"white"} fontSize={15} />
                      </Text>
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text as={"button"} color={"white"} fontSize={15}>
                    {completedValue ? "Get Certificate" : "Your Progress"}
                  </Text>
                  <Text mt={1} cursor={"pointer"}>
                    <FaAngleDown color="white" />
                  </Text>
                </Flex>
              </PopoverTrigger>
              <PopoverContent color="black" bg="white" borderRadius={0}>
                <PopoverHeader p={3} fontWeight="bold" border="0">
                  {getSingleEnrolledCourse?.completedLectures?.length} of{" "}
                  {lectureLength.length} completed.
                </PopoverHeader>
                <PopoverArrow bg="white" />
                {completedValue ? (
                  <PopoverBody>
                    <Text
                      backgroundColor={"black"}
                      as={"button"}
                      width={"100%"}
                      color={"white"}
                      textAlign={"center"}
                      fontSize={13}
                      fontWeight={"bold"}
                      py={2}
                    >
                      Get Cerificate
                    </Text>
                  </PopoverBody>
                ) : (
                  <PopoverBody>
                    Finish course to get your certificates
                  </PopoverBody>
                )}
              </PopoverContent>
            </Popover>
            <Flex
              cursor={"pointer"}
              align={"center"}
              py={2}
              px={2}
              columnGap={2}
              color={"white"}
              borderColor={"white"}
              borderWidth={1}
            >
              <Text>Share</Text>
              <Text>
                <IoIosShareAlt />
              </Text>
            </Flex>
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
            {singleLectureData?.contentType === "lecture_video" && (
              <AspectRatio
                maxW={{ base: "100%", xl: "900px", "2xl": "1700px" }}
                maxH={{ base: "900px", lg: "400px" }}
                ratio={{ base: 15 / 8, lg: 15 / 13 }}
              >
                <iframe
                  title="Learn frontend development from peter"
                  src={singleLectureData?.content?.url}
                  allowFullScreen
                />                
              </AspectRatio>
            )}

            {singleLectureData?.contentType === "lecture_article" && (
              /* article section*/
              <Stack
                w={{ base: "100%", xl: "923px", "2xl": "1700px" }}
                h={{ base: "900px", lg: "400px" }}
                overflowY={{ base: "hidden", xl: "scroll" }}
                borderBottomWidth={2}
                borderColor={"#f1f1f1"}
                mb={53}
              >
                <Stack ml={{ base: "2rem", md: "5rem" }} my={"2rem"}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: singleLectureData?.content.body,
                    }}
                  />
                </Stack>
              </Stack>
            )}

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
                              <Flex fontSize={14} columnGap={1}>
                                <Text>
                                  {numberOfMarkedLectures[index]} /{" "}
                                  {lectures?.length}
                                </Text>
                                <Text>|</Text>
                                <Text>
                                  {convertSecondsToHMS(
                                    totalDurationPerModule[index]
                                  )}
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
                        const {
                          title,
                          content,
                          contentType,
                          resources,
                          id: LectureID,
                        } = lecture;

                        const handleCheckboxChange = async (
                          lectureId: string,
                          isChecked: boolean
                        ) => {
                          try {
                            if (isChecked) {
                              markLectureCompleted({
                                enrollId: id,
                                lectureId,
                              });
                            } else {
                              markLectureUnfinshed({
                                enrollId: id,
                                lectureId,
                              });
                            }
                            // Update checkedItems set based on checkbox state change
                            setCheckedItems((prevCheckedItems) => {
                              const newCheckedItems = new Set(prevCheckedItems);
                              if (isChecked) {
                                newCheckedItems.add(lectureId);
                              } else {
                                newCheckedItems.delete(lectureId);
                              }
                              return newCheckedItems;
                            });
                          } catch (error) {}
                        };

                        return (
                          <AccordionPanel key={index}>
                            <Flex columnGap={3} align={"start"} width={"100%"}>
                              <Checkbox
                                mt={1}
                                iconColor={"black"}
                                size="lg"
                                borderColor={"black"}
                                colorScheme={"blackAlpha"}
                                isChecked={checkedItems.has(content?.lectureId)}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    content?.lectureId,
                                    e.target.checked
                                  )
                                }
                              />
                              <Stack
                                cursor={"pointer"}
                                onClick={() =>
                                  navigate(
                                    `/course/${getSingleEnrolledCourse?.courseId?.slug}/learn/lecture/${getSingleEnrolledCourse.id}/${LectureID}/reviews`
                                  )
                                }
                                width={"100%"}
                              >
                                <Text>
                                  {index + 1} {title}
                                </Text>
                                <Flex
                                  columnGap={1}
                                  align={"center"}
                                  color={"gray"}
                                >
                                  {contentType === "lecture_video" ? (
                                    <RiPlayCircleFill size={20} />
                                  ) : (
                                    <LuStickyNote size={20} />
                                  )}
                                  <Flex
                                    align={"center"}
                                    justify={"space-between"}
                                    width={"100%"}
                                  >
                                    <Text fontSize={14}>
                                      {formatEnrolledCourseDuration(
                                        content?.duration
                                      )}
                                    </Text>
                                    {resources?.length === 0 ? (
                                      ""
                                    ) : (
                                      <>
                                        <Popover placement="bottom-end">
                                          <PopoverTrigger>
                                            <Flex
                                              align={"center"}
                                              color={"black"}
                                              columnGap={1}
                                              px={2}
                                              borderWidth={1}
                                              borderColor={"black"}
                                              as={"button"}
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              }
                                            >
                                              <Text>
                                                <FaFolderOpen />
                                              </Text>
                                              <Text> Resources</Text>
                                              <Text>
                                                {" "}
                                                <IoIosArrowDown />
                                              </Text>
                                            </Flex>
                                          </PopoverTrigger>
                                          <PopoverContent
                                            bg="white"
                                            borderRadius={0}
                                          >
                                            <PopoverBody>
                                              {resources.map(
                                                (resource: any) => {
                                                  const {
                                                    id,
                                                    source,
                                                    title,
                                                    url,
                                                    type,
                                                  } = resource;
                                                  return (
                                                    <Flex
                                                      key={id}
                                                      columnGap={2}
                                                      align={"center"}
                                                      color={"black"}
                                                      pb={3}
                                                    >
                                                      {source ===
                                                      "downloadable" ? (
                                                        <Text>
                                                          <HiFolderDownload
                                                            size={20}
                                                          />{" "}
                                                        </Text>
                                                      ) : (
                                                        <Text
                                                          color={"black"}
                                                          _hover={{
                                                            color: "blue",
                                                          }}
                                                        >
                                                          <VscLinkExternal />
                                                        </Text>
                                                      )}
                                                      {!type ? (
                                                        <Text
                                                          as={"a"}
                                                          href={url}
                                                          target="_blank"
                                                        >
                                                          {title}
                                                        </Text>
                                                      ) : (
                                                        <VideoDownloadButton
                                                          fileUrl={url}
                                                          fileName={title}
                                                        />
                                                      )}
                                                    </Flex>
                                                  );
                                                }
                                              )}
                                            </PopoverBody>
                                          </PopoverContent>
                                        </Popover>
                                      </>
                                    )}
                                  </Flex>
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

export default VideoArticleSingleEnrollCoursePage;

// VideoArticleSingleEnrollCoursePage
