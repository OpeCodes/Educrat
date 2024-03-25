import {
  Divider,
  Stack,
  Flex,
  Text,
  Input,
  useDisclosure,
  Button,
  Skeleton,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Formik } from "formik";
import {
  ArticleCreateLectureSchema,
  courseEditModuleSchema,
  courseModuleSchema,
  curriculumEditLectureSchema,
  curriculumLectureSchema,
} from "../../../../schemas";
import {
  useDeleteModalCourse,
  useModuleCreateCourse,
  useGetModuleCourse,
  useModuleEditCourse,
  useCreateModuleLectureCourse,
  useEditModuleLectureCourse,
  useDeleteLectureModuleCourse,
  useCreateArticleLectureCourse,
  useEditArticleLectureCourse,
  useDeleteVideoLecture,
} from "../../../../hooks/module";
import { GoPlus } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { LuStickyNote } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useGetSingleCourse } from "../../../../hooks/course";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { HiPlayCircle } from "react-icons/hi2";
import CurriculumVideoUpload from "../../../../components/CurriculumVideoUpload";
import ReactQuill from "react-quill";
const Curriculum = () => {
  const { onOpen } = useDisclosure();
  const { id } = useParams();
  const { getSingleCourse, refetch } = useGetSingleCourse(id);
  useEffect(() => {
    refetch();
  }, [id]);
  const { moduleEditCourse } = useModuleEditCourse();
  const { deleteModule } = useDeleteModalCourse();
  const { moduleEditLectureCourse, moduleEditLectureLoading } =
    useEditModuleLectureCourse();
  const { deleteLectureModule } = useDeleteLectureModuleCourse();
  const { moduleCreateLectureCourse } = useCreateModuleLectureCourse();

  const initialValues1 = {
    title: "",
    learningObjective: "",
  };

  const initialValues3 = {
    title: "",
  };
  const articleCreateInitialValue = {
    body: "",
  };

  const {
    moduleCreateCourse,
    isPending: moduleLoading,
    setShowSection,
    showSection,
  } = useModuleCreateCourse();

  const { createArticleLectureCourse } = useCreateArticleLectureCourse();
  const handleSubmit = (values: any): void => {
    moduleCreateCourse({ courseId: getSingleCourse?.id, user: values });
  };
  const { editArticleLectureCourse } = useEditArticleLectureCourse();
  const {deleteVideoLecture} = useDeleteVideoLecture();
  const {
    data,
    isPending: getCourseLoading,
    isOpenState,
    toggleIsOpen,
    isOpenCurriculumState,
    toggleIsCurriculumOpen,
    toggleIsModuleLectureOpen,
    isOpenModuleLectureState,
    toggleIsOpenContentType,
    isOpenContentType,
    contentType,
    toggleContentType,
    contentType2,
    toggleContentType2,
    isOpendescripRes,
    toggleIsOpenDescripRes,
    isOpendescription,
    toggleIsOpenDescription,
    contentType3,
    isOpenInnerdescripRes,
    toggleIsOpenInnerdescripRes,
    isOpenEditArticle,
    toggleIsOpenEditArticle,
  } = useGetModuleCourse(getSingleCourse?.id);
  interface Lecture {
    title: string;
  }
  interface MyObject {
    title?: string;
    learningObjective?: string;
    lectureTitle?: string;
    lectures: Lecture[];
  }
  const moduleTitle: string[] = (data ?? [])
    .flat(2)
    .map((obj: MyObject) => obj.title);
  const modulelearningObjective: string[] = (data ?? [])
    .flat(2)
    .map((obj: MyObject) => obj.learningObjective);
  // const lectureTitles: string[] = data?.flatMap((item: MyObject) => item.lectures.map((lecture: Lecture) => lecture.title));

  const handleUploadSuccess = () => {
    // Handle upload success event here
   
    console.log("Upload successful!");
  };

  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Curriculum
      </Text>
      <Divider />
      <Text p={5} fontSize={14}>
        Start putting together your course by creating sections, lectures and
        practice (quizzes, coding exercises and assignments). Start putting
        together your course by creating sections, lectures and practice
        activities (quizzes, coding exercises and assignments). Use your course
        outline to structure your content and label your sections and lectures
        clearly. If you’re intending to offer your course for free, the total
        length of video content must be less than 2 hours.
      </Text>

      {getCourseLoading && (
        <Stack px={5} py={2}>
          <Skeleton height="90px" mb={3} />
          <Skeleton height="90px" mb={3} />
          <Skeleton height="90px" mb={3} />
          <Skeleton height="90px" mb={3} />
        </Stack>
      )}
      {data?.map((course: any, index: any) => {
        const { title, id, lectures } = course;
        const initialValues2 = {
          title: moduleTitle[index],
          learningObjective: modulelearningObjective[index],
        };
        return (
          <Stack key={id}>
            <Stack px={5} py={2}>
              <Stack
                bg={"#F7F8FB"}
                borderWidth={1}
                borderColor={"gray"}
                p={3}
                pb={10}
              >
                {!isOpenState[id] && (
                  // main section
                  <Stack direction={{ base: "column", lg: "row" }}>
                    <Flex>
                      <Text fontWeight={"bold"} fontSize={17} mr={4}>
                        Section {index + 1}
                      </Text>
                      <Flex
                        align={"center"}
                        columnGap={4}
                        display={{ base: "flex", lg: "none" }}
                      >
                        <Text
                          cursor={"pointer"}
                          onClick={() => toggleIsOpen(id)}
                        >
                          <MdEdit />
                        </Text>
                        <Text
                          cursor={"pointer"}
                          onClick={() => deleteModule({ moduleId: id })}
                        >
                          <MdDelete />
                        </Text>
                      </Flex>
                    </Flex>
                    <Box
                      alignItems={{ base: "none", lg: "center" }}
                      mr={3}
                      columnGap={1}
                      display={{ base: "block", lg: "flex" }}
                    >
                      <Text display={{ base: "none", lg: "flex" }}>
                        <LuStickyNote />
                      </Text>
                      <Text fontWeight={"500"}>{title}</Text>
                    </Box>
                    <Flex
                      align={"center"}
                      columnGap={4}
                      display={{ base: "none", lg: "flex" }}
                    >
                      <Text cursor={"pointer"} onClick={() => toggleIsOpen(id)}>
                        <MdEdit />
                      </Text>
                      <Text cursor={"pointer"} onClick={onOpen}>
                        <MdDelete />
                      </Text>
                    </Flex>
                  </Stack>
                )}
                {/* edit part */}
                {isOpenState[id] && (
                  <Formik
                    initialValues={initialValues2}
                    validationSchema={courseEditModuleSchema}
                    onSubmit={(values: any) => {
                      moduleEditCourse({ moduleId: id, user: values });
                      setTimeout(() => {
                        toggleIsOpen(id);
                      }, 2000);
                    }}
                  >
                    {({
                      handleChange,
                      handleSubmit: handleEditSubmit,
                      values,
                      errors,
                    }) => (
                      <Stack
                        bg={"#FFFFFF"}
                        borderWidth={1}
                        p={3}
                        borderColor={"gray"}
                      >
                        <Flex
                          rowGap={2}
                          flexDirection={{ base: "column", lg: "row" }}
                        >
                          <Text
                            fontWeight={"bold"}
                            fontSize={16}
                            mt={1}
                            width={{ base: "100%", lg: "12%" }}
                          >
                            Edit Section:
                          </Text>
                          <Stack w={{ base: "100%", lg: "88%" }}>
                            <Input
                              variant="outline"
                              w="100%"
                              borderColor={"black"}
                              borderRadius={"0px"}
                              placeholder="Enter a title"
                              _focus={{ borderColor: "black" }}
                              name="title"
                              value={values.title}
                              focusBorderColor="black"
                              onChange={handleChange}
                            />
                            {errors?.title && (
                              <Text
                                style={{ color: "red", marginTop: 0 }}
                                fontSize="14px"
                              >
                                Pls add title
                              </Text>
                            )}
                          </Stack>
                        </Flex>
                        <Stack
                          maxW={{ base: "100%", lg: "88%" }}
                          w="100%"
                          ml="auto"
                        >
                          <Text fontWeight={"bold"}>
                            What will students be able to do at the end of this
                            section?
                          </Text>
                          <Input
                            variant="outline"
                            w="100%"
                            borderColor={"black"}
                            borderRadius={"0px"}
                            placeholder="Enter a a learning objectives"
                            _focus={{ borderColor: "black" }}
                            focusBorderColor="black"
                            name="learningObjective"
                            value={values.learningObjective}
                            onChange={handleChange}
                          />
                          {errors.learningObjective && (
                            <Text
                              style={{ color: "red", marginTop: 0 }}
                              fontSize="14px"
                            >
                              pls add learning objectives
                            </Text>
                          )}
                        </Stack>
                        <Flex
                          justify={"end"}
                          mt={2}
                          align={"center"}
                          columnGap={5}
                        >
                          <Text
                            fontWeight={"bold"}
                            as={"button"}
                            onClick={() => toggleIsOpen(id)}
                          >
                            Cancel
                          </Text>
                          <Button
                            color="#ffffff"
                            fontWeight={"500"}
                            fontSize={14}
                            as={"button"}
                            py={2}
                            px={4}
                            variant="outline"
                            spinnerPlacement="end"
                            onClick={() => handleEditSubmit()}
                            type="button"
                            backgroundColor={"black"}
                          >
                            Save Section
                          </Button>
                        </Flex>
                      </Stack>
                    )}
                  </Formik>
                )}
                <Stack mt={6} pl={{ base: 1, lg: 12 }}>
                  {/* new curriculum */}
                  {lectures?.map((lecture: any, index: any) => {
                    const {
                      id,
                      title,
                      content,
                      contentType: contentEndPointType,
                    } = lecture;
                    console.log(content,contentEndPointType)
                    const initialValues4 = {
                      title: "",
                    };
                    const articleEditInitialValue = {
                      body: content?.body,
                    };
                    const dateString = content?.updatedAt;

                    const date = new Date(dateString);

                    // Extract day, month, and year components
                    const day = String(date.getUTCDate()).padStart(2, "0");
                    const month = String(date.getUTCMonth() + 1).padStart(
                      2,
                      "0"
                    ); // January is 0
                    const year = date.getUTCFullYear();

                    // Format the components into the desired format
                    const formattedDate = `${month}/${day}/${year}`;
                    return (
                      <Stack>
                        <Stack key={id}>
                          <Stack position="relative">
                            {/* list of lecture starts here */}
                            {!isOpenModuleLectureState[id] && (
                              <Stack
                                bg={"white"}
                                borderWidth={1}
                                borderColor={"gray"}
                                p={3}
                              >
                                <Flex justify={"space-between"}>
                                  <Flex
                                    columnGap={3}
                                    flexDirection={{
                                      base: "column",
                                      md: "row",
                                    }}
                                  >
                                    <Flex align={"center"} columnGap={1}>
                                      <RiCheckboxCircleFill />

                                      <Text fontWeight={"500"} mr={4}>
                                        Lecture {index + 1}
                                      </Text>
                                      <Flex
                                        align={"center"}
                                        columnGap={4}
                                        display={{ base: "flex", lg: "none" }}
                                      >
                                        <Text
                                          cursor={"pointer"}
                                          onClick={() =>
                                            toggleIsModuleLectureOpen(id)
                                          }
                                        >
                                          <MdEdit />
                                        </Text>
                                        <Text
                                          cursor={"pointer"}
                                          onClick={() => {
                                            deleteLectureModule({
                                              lectureId: id,
                                            });
                                          }}
                                        >
                                          <MdDelete />
                                        </Text>
                                      </Flex>
                                    </Flex>
                                    <Flex align={"center"} columnGap={1}>
                                      <Text
                                        display={{ base: "none", lg: "flex" }}
                                      >
                                        <LuStickyNote />
                                      </Text>
                                      {title.length > 60
                                        ? `${title.slice(0, 60)}...`
                                        : `${title}`}

                                      <Flex
                                        display={{ base: "none", lg: "flex" }}
                                      >
                                        <Text
                                          cursor={"pointer"}
                                          onClick={() =>
                                            toggleIsModuleLectureOpen(id)
                                          }
                                        >
                                          <MdEdit />
                                        </Text>
                                        <Text
                                          cursor={"pointer"}
                                          ml={3}
                                          onClick={() => {
                                            deleteLectureModule({
                                              lectureId: id,
                                            });
                                          }}
                                        >
                                          <MdDelete />
                                        </Text>
                                      </Flex>
                                    </Flex>
                                  </Flex>

                                  {!isOpenContentType[id] &&
                                    !isOpenInnerdescripRes[id] && (
                                      <Flex
                                        marginRight={"10px"}
                                        columnGap={"15px"}
                                        align={"center"}
                                        // display={{ base: "none", lg: "flex" }}
                                      >
                                        {!contentEndPointType && (
                                          <Button
                                            borderRadius={0}
                                            borderWidth={1}
                                            borderColor={"black"}
                                            color="black"
                                            _hover={{
                                              backgroundColor: "#F7F8FB",
                                            }}
                                            width={"100px"}
                                            height={"30px"}
                                            leftIcon={
                                              <GoPlus fontSize={"20px"} />
                                            }
                                            variant="outline"
                                            onClick={() => {
                                              toggleIsOpenContentType(id);
                                            }}
                                          >
                                            Content
                                          </Button>
                                        )}

                                        <Box>
                                          <Text
                                            as={"button"}
                                            onClick={() =>
                                              toggleIsOpenDescripRes(id)
                                            }
                                          >
                                            {!isOpendescripRes[id] ? (
                                              <FaChevronDown size="12px" />
                                            ) : (
                                              <FaChevronUp size="12px" />
                                            )}
                                          </Text>
                                        </Box>
                                      </Flex>
                                    )}
                                </Flex>
                              </Stack>
                            )}

                            {/* video and article section */}
                            {isOpenContentType[id] &&
                              !isOpenModuleLectureState[id] && (
                                <Stack
                                  bg={"white"}
                                  borderWidth={1}
                                  borderColor={"gray"}
                                  mt={-3}
                                  height="250px"
                                  // height="fit-content"
                                  pb={2}
                                >
                                  <Flex width="100%" justifyContent="end">
                                    <Flex
                                      fontSize={14}
                                      mt={-8}
                                      backgroundColor="white"
                                      textAlign={"center"}
                                      fontWeight={"bold"}
                                      borderTopWidth={1}
                                      borderRightWidth={1}
                                      borderLeftWidth={1}
                                      borderColor={"gray"}
                                      align={"center"}
                                      columnGap={2}
                                      marginRight={7}
                                    >
                                      <Text marginLeft={2} fontSize={14}>
                                        {contentType[id] && "Add Video"}
                                        {contentType2[id] && "Add Article"}
                                        {contentType3[id] && "Add Resources"}
                                        {!contentType[id] &&
                                          !contentType2[id] &&
                                          !contentType3[id] &&
                                          "Select content Type"}
                                      </Text>
                                      <Text
                                        as={"button"}
                                        fontWeight="bold"
                                        onClick={() => {
                                          toggleIsOpenContentType(id);
                                          toggleContentType(id, "");
                                          toggleContentType2(id, "");
                                        }}
                                      >
                                        <IoCloseSharp size={20} />
                                      </Text>
                                    </Flex>
                                  </Flex>

                                  {/* Select the main type of content. video or article */}
                                  {isOpenContentType[id] &&
                                    !contentType[id] &&
                                    !contentType2[id] &&
                                    !contentType3[id] && (
                                      <Stack>
                                        <Text
                                          textAlign={"center"}
                                          fontSize={14}
                                        >
                                          Select the main type of content. Files
                                          and links can be added as resources.
                                        </Text>
                                        <Flex justify={"center"} columnGap={5}>
                                          <Stack
                                            justify="center"
                                            direction="row"
                                          >
                                            <Flex
                                              position="relative"
                                              onClick={() =>
                                                toggleContentType(
                                                  id,
                                                  "Add Video"
                                                )
                                              }
                                            >
                                              <Flex>
                                                <Stack
                                                  width="70px"
                                                  align={"center"}
                                                  borderWidth={1}
                                                  borderColor="#D1D7DC"
                                                  bg="#F7F9FA"
                                                  borderRadius={2}
                                                >
                                                  <Text my={1}>
                                                    <FaPlayCircle
                                                      size={35}
                                                      color={"#D1D7DC"}
                                                    />
                                                  </Text>
                                                  <Text
                                                    width={"100%"}
                                                    fontSize={12}
                                                    textAlign={"center"}
                                                    bg="#D1D7DC"
                                                  >
                                                    Video
                                                  </Text>
                                                </Stack>
                                              </Flex>
                                              {/* overlay */}
                                              <Stack
                                                direction="row"
                                                justify={"center"}
                                                position={"absolute"}
                                                top={0}
                                                left={0}
                                                width={"100%"}
                                                height={"100%"}
                                                backgroundColor="black"
                                                opacity={0}
                                                transition="opacity 0.3s"
                                                _hover={{
                                                  opacity: 1,
                                                  borderRadius: 2,
                                                }}
                                                as={"button"}
                                              >
                                                <Stack>
                                                  <Text my={1}>
                                                    <FaPlayCircle
                                                      size={35}
                                                      color={"#D1D7DC"}
                                                    />
                                                  </Text>
                                                  <Text
                                                    fontSize={12}
                                                    color="white"
                                                    textAlign={"center"}
                                                  >
                                                    Video
                                                  </Text>
                                                </Stack>
                                              </Stack>
                                            </Flex>
                                          </Stack>

                                          <Stack
                                            justify="center"
                                            direction="row"
                                          >
                                            <Flex
                                              position="relative"
                                              onClick={() =>
                                                toggleContentType2(
                                                  id,
                                                  "Add Article"
                                                )
                                              }
                                            >
                                              <Flex>
                                                <Stack
                                                  width="70px"
                                                  align={"center"}
                                                  borderWidth={1}
                                                  borderColor="#D1D7DC"
                                                  bg="#F7F9FA"
                                                  borderRadius={2}
                                                >
                                                  <Text my={1}>
                                                    <LuStickyNote
                                                      size={35}
                                                      color={"#D1D7DC"}
                                                    />
                                                  </Text>
                                                  <Text
                                                    width={"100%"}
                                                    fontSize={12}
                                                    textAlign={"center"}
                                                    bg="#D1D7DC"
                                                  >
                                                    Article
                                                  </Text>
                                                </Stack>
                                              </Flex>
                                              {/* overlay */}
                                              <Stack
                                                direction="row"
                                                justify={"center"}
                                                position={"absolute"}
                                                top={0}
                                                left={0}
                                                width={"100%"}
                                                height={"100%"}
                                                backgroundColor="black"
                                                opacity={0}
                                                transition="opacity 0.3s"
                                                _hover={{
                                                  opacity: 1,
                                                  borderRadius: 2,
                                                }}
                                                as={"button"}
                                              >
                                                <Stack>
                                                  <Text my={1}>
                                                    <LuStickyNote
                                                      size={35}
                                                      color={"#D1D7DC"}
                                                    />
                                                  </Text>
                                                  <Text
                                                    fontSize={12}
                                                    color="white"
                                                    textAlign={"center"}
                                                  >
                                                    Article
                                                  </Text>
                                                </Stack>
                                              </Stack>
                                            </Flex>
                                          </Stack>
                                        </Flex>
                                      </Stack>
                                    )}
                                  {/* video  */}
                                  {contentType[id] && isOpenContentType[id] && (
                                    <Stack mx={3}>
                                      <Tabs>
                                        <TabList>
                                          <Tab
                                            fontWeight={"bold"}
                                            color="black"
                                          >
                                            Upload Video
                                          </Tab>
                                          <Tab
                                            fontWeight={"bold"}
                                            color="black"
                                          >
                                            Add from library
                                          </Tab>
                                        </TabList>
                                        <TabPanels>
                                          <TabPanel>
                                            <Stack>
                                              <CurriculumVideoUpload
                                                onImageUpload={
                                                  handleUploadSuccess
                                                }
                                                id={id}
                                              />
                                            </Stack>
                                          </TabPanel>
                                          <TabPanel>
                                            <Stack>
                                              <Text
                                                fontSize={16}
                                                fontWeight={"bold"}
                                              >
                                                Feature incoming soon.......
                                              </Text>
                                            </Stack>
                                          </TabPanel>
                                        </TabPanels>
                                      </Tabs>
                                    </Stack>
                                  )}

                                  {/* **************************************************article part********************* */}
                                  {contentType2[id] &&
                                    isOpenContentType[id] && (
                                      <Stack mx={3}>
                                        <Text fontWeight={"bold"}>Text</Text>
                                        <Formik
                                          initialValues={
                                            articleCreateInitialValue
                                          }
                                          validationSchema={
                                            ArticleCreateLectureSchema
                                          }
                                          onSubmit={(values: any) => {
                                            createArticleLectureCourse({
                                              lectureId: id,
                                              user: { ...values, title },
                                            });
                                            setTimeout(() => {
                                              toggleContentType2(id, "");
                                              toggleIsOpenContentType(id);
                                            }, 2000);
                                          }}
                                        >
                                          {({
                                            handleChange,
                                            handleSubmit: handleArticleSubmit,
                                            values,
                                            errors,
                                          }) => (
                                            <Stack>
                                              <ReactQuill
                                                theme="snow"
                                                value={values.body}
                                                onChange={handleChange("body")}
                                              />
                                              {errors?.body && (
                                                <Text
                                                  style={{
                                                    color: "red",
                                                    marginTop: 5,
                                                  }}
                                                  fontSize="14px"
                                                >
                                                  enter title
                                                </Text>
                                              )}
                                              <Flex
                                                justify={"end"}
                                                mt={"2.9rem"}
                                                align={"center"}
                                              >
                                                <Button
                                                  color="#ffffff"
                                                  fontWeight={"500"}
                                                  fontSize={14}
                                                  as={"button"}
                                                  py={2}
                                                  px={4}
                                                  loadingText="Loading"
                                                  variant="outline"
                                                  spinnerPlacement="end"
                                                  onClick={() =>
                                                    handleArticleSubmit()
                                                  }
                                                  type="button"
                                                  backgroundColor={"black"}
                                                >
                                                  save
                                                </Button>
                                              </Flex>
                                            </Stack>
                                          )}
                                        </Formik>
                                      </Stack>
                                    )}
                                </Stack>
                              )}
                            {/*dsecription and resources section*/}

                            <Stack>
                              {!isOpenInnerdescripRes[id] &&
                                !isOpenContentType[id] &&
                                !isOpenModuleLectureState[id] && (
                                  <>
                                    {isOpendescripRes[id] && (
                                      <>
                                        {/* article endpoint display**************/}
                                        {contentEndPointType ===
                                          "lecture_article" && (
                                          <Stack
                                            borderBottom={"1px"}
                                            cursor={"pointer"}
                                            bg={"white"}
                                            borderWidth={1}
                                            borderColor={"gray"}
                                            mt={-3}
                                            pb={2}
                                            p={3}
                                            display={
                                              contentEndPointType
                                                ? "block"
                                                : "none"
                                            }
                                          >
                                            <Flex columnGap={2}>
                                              <Flex>
                                                <Box backgroundColor={"black"}>
                                                  <IoDocumentTextSharp
                                                    color="white"
                                                    size={75}
                                                  />
                                                </Box>
                                              </Flex>
                                              <Box>
                                                <Text>00:00</Text>
                                                <Flex
                                                  align={"center"}
                                                  fontWeight={"600"}
                                                  columnGap={1}
                                                  color={"#5624D0"}
                                                  onClick={() => {
                                                    toggleIsOpenEditArticle(id);
                                                  }}
                                                >
                                                  <Text>
                                                    <MdModeEditOutline />
                                                  </Text>
                                                  <Text>Edit Content</Text>
                                                </Flex>
                                                <Flex
                                                  align={"center"}
                                                  fontWeight={"600"}
                                                  columnGap={1}
                                                  color={"#5624D0"}
                                                >
                                                  <Text>
                                                    <HiPlayCircle />
                                                  </Text>
                                                  <Text>
                                                    Replace With Video
                                                  </Text>
                                                </Flex>
                                              </Box>
                                            </Flex>
                                          </Stack>
                                        )}

                                        {/* video endpoint display************************* */}
                                        {contentEndPointType ===
                                          "lecture_video" && (
                                          <Stack
                                            borderBottom={"1px"}
                                            cursor={"pointer"}
                                            bg={"white"}
                                            borderWidth={1}
                                            borderColor={"gray"}
                                            mt={-3}
                                            pb={2}
                                            p={3}
                                            display={
                                              contentEndPointType
                                                ? "block"
                                                : "none"
                                            }
                                          >
                                            <TableContainer>
                                              <Table variant="simple">
                                                <Thead>
                                                  <Tr color={"black"}>
                                                    <Th color="black">
                                                      Filename
                                                    </Th>
                                                    <Th color="black">Type</Th>
                                                    <Th color="black">
                                                      Status
                                                    </Th>
                                                    <Th color="black">Date</Th>
                                                    <Th color="black">.</Th>
                                                  </Tr>
                                                </Thead>
                                                <Tbody>
                                                  <Tr>
                                                    <Td>{content?.title}</Td>
                                                    <Td>Video</Td>
                                                    <Td>
                                                      <Text fontWeight={"500"}>
                                                        Success
                                                      </Text>
                                                    </Td>
                                                    <Td>{formattedDate}</Td>
                                                    <Td
                                                      onClick={() => {
                                                        deleteVideoLecture({videoId: content?.id})
                                                      }}
                                                    >
                                                    < MdDelete/>
                                                    </Td>
                                                  </Tr>
                                                </Tbody>
                                              </Table>
                                            </TableContainer>
                                          </Stack>
                                        )}

                                        {/* ***********article text editor */}
                                        {/* ************************************article edit section ************* */}
                                        {isOpenEditArticle[id] &&
                                          !isOpenContentType[id] &&
                                          !isOpenModuleLectureState[id] && (
                                            <Stack
                                              bg={"white"}
                                              borderWidth={1}
                                              borderColor={"gray"}
                                              mt={-3}
                                              pb={2}
                                              p={3}
                                            >
                                              <Text fontWeight={"bold"}>
                                                Text
                                              </Text>
                                              <Formik
                                                initialValues={
                                                  articleEditInitialValue
                                                }
                                                validationSchema={
                                                  ArticleCreateLectureSchema
                                                }
                                                onSubmit={(values: any) => {
                                                  editArticleLectureCourse({
                                                    articleId: content?.id,
                                                    user: values,
                                                  });
                                                  setTimeout(() => {
                                                    toggleIsOpenEditArticle(id);
                                                  }, 2000);
                                                }}
                                              >
                                                {({
                                                  handleChange,
                                                  handleSubmit:
                                                    handleEditArticleSubmit,
                                                  values,
                                                  errors,
                                                }) => (
                                                  <Stack>
                                                    <ReactQuill
                                                      theme="snow"
                                                      value={values.body}
                                                      onChange={handleChange(
                                                        "body"
                                                      )}
                                                    />
                                                    {errors?.body && (
                                                      <Text
                                                        style={{
                                                          color: "red",
                                                          marginTop: 5,
                                                        }}
                                                        fontSize="14px"
                                                      >
                                                        enter title
                                                      </Text>
                                                    )}

                                                    <Flex
                                                      justify={"end"}
                                                      align={"center"}
                                                      columnGap={5}
                                                      mt={"2.9rem"}
                                                    >
                                                      <Text
                                                        fontWeight={"bold"}
                                                        as={"button"}
                                                        onClick={() => {
                                                          toggleIsOpenEditArticle(
                                                            id
                                                          );
                                                        }}
                                                      >
                                                        Cancel
                                                      </Text>
                                                      <Button
                                                        color="#ffffff"
                                                        fontWeight={"500"}
                                                        fontSize={14}
                                                        as={"button"}
                                                        py={2}
                                                        px={4}
                                                        variant="outline"
                                                        spinnerPlacement="end"
                                                        onClick={() =>
                                                          handleEditArticleSubmit()
                                                        }
                                                        type="button"
                                                        backgroundColor={
                                                          "black"
                                                        }
                                                      >
                                                        Save
                                                      </Button>
                                                    </Flex>
                                                  </Stack>
                                                )}
                                              </Formik>
                                            </Stack>
                                          )}
                                        {/* end */}
                                        <Stack
                                          bg={"white"}
                                          borderWidth={1}
                                          borderColor={"gray"}
                                          mt={-3}
                                          pb={2}
                                          p={3}
                                        >
                                          {!isOpendescription[id] &&
                                            !isOpenEditArticle[id] && (
                                              <Button
                                                borderRadius={0}
                                                borderWidth={1}
                                                borderColor={"black"}
                                                color="black"
                                                _hover={{
                                                  backgroundColor: "#F7F8FB",
                                                }}
                                                width={"130px"}
                                                height={"30px"}
                                                leftIcon={
                                                  <GoPlus fontSize={"20px"} />
                                                }
                                                variant="outline"
                                                onClick={() =>
                                                  toggleIsOpenDescription(id)
                                                }
                                              >
                                                Description
                                              </Button>
                                            )}
                                          {/* ************************description container************************** */}
                                          {isOpendescription[id] && (
                                            <Stack>
                                              <Text fontWeight={"bold"}>
                                                Lecture Description
                                              </Text>
                                              <Text
                                                onClick={() =>
                                                  toggleIsOpenDescription(id)
                                                }
                                              >
                                                Cancel
                                              </Text>
                                            </Stack>
                                          )}
                                          {!isOpenEditArticle[id] && (
                                            <Button
                                              borderRadius={0}
                                              borderWidth={1}
                                              borderColor={"black"}
                                              color="black"
                                              _hover={{
                                                backgroundColor: "#F7F8FB",
                                              }}
                                              width={"120px"}
                                              height={"30px"}
                                              leftIcon={
                                                <GoPlus fontSize={"20px"} />
                                              }
                                              variant="outline"
                                              onClick={() => {
                                                toggleIsOpenInnerdescripRes(id);
                                              }}
                                            >
                                              Resources
                                            </Button>
                                          )}
                                        </Stack>
                                      </>
                                    )}
                                  </>
                                )}
                              {isOpenInnerdescripRes[id] &&
                                !isOpenContentType[id] &&
                                !isOpenModuleLectureState[id] && (
                                  <Stack
                                    bg={"white"}
                                    borderWidth={1}
                                    borderColor={"gray"}
                                    mt={-3}
                                    pb={2}
                                    p={3}
                                  >
                                    <Flex
                                      width="100%"
                                      justifyContent="end"
                                      mt={"-37px"}
                                    >
                                      <Flex
                                        fontSize={14}
                                        zIndex="80000"
                                        backgroundColor="white"
                                        textAlign={"center"}
                                        fontWeight={"bold"}
                                        borderTopWidth={1}
                                        borderRightWidth={1}
                                        borderLeftWidth={1}
                                        borderColor={"gray"}
                                        align={"center"}
                                        columnGap={2}
                                        marginRight={7}
                                        pt={"3px"}
                                      >
                                        <Text marginLeft={2} fontSize={14}>
                                          Add Resources
                                        </Text>
                                        <Text
                                          as={"button"}
                                          fontWeight="bold"
                                          onClick={() => {
                                            toggleIsOpenInnerdescripRes(id);
                                          }}
                                        >
                                          <IoCloseSharp size={20} />
                                        </Text>
                                      </Flex>
                                    </Flex>
                                    <Stack mt={7}>
                                      <Text>resources</Text>
                                    </Stack>
                                  </Stack>
                                )}
                            </Stack>
                          </Stack>

                          {/* edit curriculum lecture input field */}
                          {isOpenModuleLectureState[id] && (
                            <Formik
                              initialValues={initialValues4}
                              validationSchema={curriculumEditLectureSchema}
                              onSubmit={(values: any) => {
                                moduleEditLectureCourse({
                                  lectureId: id,
                                  user: values,
                                });
                                setTimeout(() => {
                                  toggleIsModuleLectureOpen(id);
                                }, 2000);
                              }}
                            >
                              {({
                                handleChange,
                                handleSubmit: handleCurriculumSubmit,
                                values,
                                errors,
                              }) => (
                                <Stack
                                  bg={"#FFFFFF"}
                                  borderWidth={1}
                                  p={3}
                                  borderColor={"gray"}
                                >
                                  <Flex
                                    rowGap={2}
                                    flexDirection={{
                                      base: "column",
                                      lg: "row",
                                    }}
                                  >
                                    <Flex columnGap={1} mr={2} mt={2}>
                                      <Text mt={1}>
                                        <RiCheckboxCircleFill />
                                      </Text>
                                      <Text fontWeight={"500"}>
                                        Lecture {index + 1}{" "}
                                      </Text>
                                    </Flex>
                                    <Stack w={{ base: "100%", lg: "88%" }}>
                                      <Input
                                        variant="outline"
                                        w="100%"
                                        borderColor={"black"}
                                        borderRadius={"0px"}
                                        placeholder="Enter a title"
                                        _focus={{ borderColor: "black" }}
                                        name="title"
                                        value={values.title}
                                        focusBorderColor="black"
                                        onChange={handleChange}
                                      />

                                      {errors?.title && (
                                        <Text
                                          style={{ color: "red", marginTop: 0 }}
                                          fontSize="14px"
                                        >
                                          Pls add title
                                        </Text>
                                      )}
                                    </Stack>
                                  </Flex>
                                  <Flex
                                    justify={"end"}
                                    mt={2}
                                    align={"center"}
                                    columnGap={5}
                                  >
                                    <Text
                                      fontWeight={"bold"}
                                      as={"button"}
                                      onClick={() =>
                                        toggleIsModuleLectureOpen(id)
                                      }
                                    >
                                      Cancel
                                    </Text>
                                    <Button
                                      color="#ffffff"
                                      fontWeight={"500"}
                                      fontSize={14}
                                      as={"button"}
                                      py={2}
                                      px={4}
                                      isLoading={moduleEditLectureLoading}
                                      loadingText="Loading"
                                      variant="outline"
                                      spinnerPlacement="end"
                                      onClick={() => handleCurriculumSubmit()}
                                      type="button"
                                      backgroundColor={"black"}
                                    >
                                      Save Lecture
                                    </Button>
                                  </Flex>
                                </Stack>
                              )}
                            </Formik>
                          )}
                        </Stack>
                      </Stack>
                    );
                  })}
                  {isOpenCurriculumState[id] ? (
                    <Text
                      onClick={() => toggleIsCurriculumOpen(id)}
                      cursor={"pointer"}
                    >
                      <IoCloseSharp fontSize={"25px"} />
                    </Text>
                  ) : (
                    <Button
                      borderRadius={0}
                      bg={"#F7F8FB"}
                      borderWidth={1}
                      borderColor={"black"}
                      color="black"
                      _hover={{ backgroundColor: "none" }}
                      height={"30px"}
                      width="fit-content"
                      leftIcon={<GoPlus fontSize={"20px"} />}
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => {
                        toggleIsCurriculumOpen(id);
                        toggleIsOpenContentType(id);
                      }}
                    >
                      New Curriculum
                    </Button>
                  )}
                  {/* new curriculum input section */}
                  {isOpenCurriculumState[id] && (
                    <Formik
                      initialValues={initialValues3}
                      validationSchema={curriculumLectureSchema}
                      onSubmit={(values: any) => {
                        moduleCreateLectureCourse({
                          moduleId: id,
                          user: values,
                        });
                        setTimeout(() => {
                          toggleIsCurriculumOpen(id);
                        }, 2000);
                      }}
                    >
                      {({
                        handleChange,
                        handleSubmit: handleCurriculumSubmit,
                        values,
                        errors,
                      }) => (
                        <Stack
                          bg={"#FFFFFF"}
                          borderWidth={1}
                          p={3}
                          borderColor={"gray"}
                        >
                          <Flex
                            rowGap={2}
                            flexDirection={{ base: "column", lg: "row" }}
                          >
                            <Text
                              fontSize={16}
                              mt={1}
                              width={{ base: "100%", lg: "12%" }}
                            >
                              New Lecture:
                            </Text>
                            <Stack w={{ base: "100%", lg: "88%" }}>
                              <Input
                                variant="outline"
                                w="100%"
                                borderColor={"black"}
                                borderRadius={"0px"}
                                placeholder="Enter a title"
                                _focus={{ borderColor: "black" }}
                                name="title"
                                value={values.title}
                                focusBorderColor="black"
                                onChange={handleChange}
                              />
                              {errors?.title && (
                                <Text
                                  style={{ color: "red", marginTop: 0 }}
                                  fontSize="14px"
                                >
                                  Pls add title
                                </Text>
                              )}
                            </Stack>
                          </Flex>
                          <Flex
                            justify={"end"}
                            mt={2}
                            align={"center"}
                            columnGap={5}
                          >
                            <Text
                              fontWeight={"bold"}
                              as={"button"}
                              onClick={() => toggleIsCurriculumOpen(id)}
                            >
                              Cancel
                            </Text>
                            <Button
                              color="#ffffff"
                              fontWeight={"500"}
                              fontSize={14}
                              as={"button"}
                              py={2}
                              px={4}
                              variant="outline"
                              spinnerPlacement="end"
                              onClick={() => handleCurriculumSubmit()}
                              type="button"
                              backgroundColor={"black"}
                            >
                              Add Lecture
                            </Button>
                          </Flex>
                        </Stack>
                      )}
                    </Formik>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
      <Stack p={5}>
        {showSection ? (
          <Text onClick={() => setShowSection(!showSection)} cursor={"pointer"}>
            <IoCloseSharp fontSize={"25px"} />
          </Text>
        ) : (
          <Button
            borderRadius={0}
            bg={"#F7F8FB"}
            borderWidth={1}
            borderColor={"black"}
            color="black"
            _hover={{ backgroundColor: "none" }}
            width={"100px"}
            height={"30px"}
            leftIcon={<GoPlus fontSize={"20px"} />}
            colorScheme="teal"
            variant="outline"
            onClick={() => setShowSection(!showSection)}
          >
            Section
          </Button>
        )}
      </Stack>
      {/* NEW SECTION */}
      <Stack p={5}>
        {showSection && (
          <Formik
            initialValues={initialValues1}
            validationSchema={courseModuleSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <Stack
                bg={"#FFFFFF"}
                borderWidth={1}
                p={3}
                borderColor={"gray"}
                mt={-8}
              >
                <Flex rowGap={2} flexDirection={{ base: "column", lg: "row" }}>
                  <Text
                    fontWeight={"bold"}
                    fontSize={16}
                    mt={1}
                    width={{ base: "100%", lg: "12%" }}
                  >
                    New Section:
                  </Text>

                  <Stack w={{ base: "100%", lg: "88%" }}>
                    <Input
                      variant="outline"
                      w="100%"
                      borderColor={"black"}
                      borderRadius={"0px"}
                      placeholder="Enter a title"
                      _focus={{ borderColor: "black" }}
                      name="title"
                      value={values.title}
                      focusBorderColor="black"
                      onChange={handleChange}
                    />
                    {errors?.title && (
                      <Text
                        style={{ color: "red", marginTop: 0 }}
                        fontSize="14px"
                      >
                        Pls add title
                      </Text>
                    )}
                  </Stack>
                </Flex>
                <Stack maxW={{ base: "100%", lg: "88%" }} w="100%" ml="auto">
                  <Text fontWeight={"bold"}>
                    What will students be able to do at the end of this section?
                  </Text>
                  <Input
                    variant="outline"
                    w="100%"
                    borderColor={"black"}
                    borderRadius={"0px"}
                    placeholder="Enter a a learning objectives"
                    _focus={{ borderColor: "black" }}
                    focusBorderColor="black"
                    name="learningObjective"
                    value={values.learningObjective}
                    onChange={handleChange}
                  />
                  {errors.learningObjective && (
                    <Text
                      style={{ color: "red", marginTop: 0 }}
                      fontSize="14px"
                    >
                      pls add learning objectives
                    </Text>
                  )}
                </Stack>
                <Flex justify={"end"} mt={2} align={"center"} columnGap={5}>
                  <Text
                    fontWeight={"bold"}
                    as={"button"}
                    onClick={() => setShowSection(false)}
                  >
                    Cancel
                  </Text>
                  <Button
                    color="#ffffff"
                    fontWeight={"500"}
                    fontSize={14}
                    as={"button"}
                    py={2}
                    px={4}
                    isLoading={moduleLoading}
                    loadingText="Loading"
                    variant="outline"
                    spinnerPlacement="end"
                    onClick={() => handleSubmit()}
                    type="button"
                    backgroundColor={"black"}
                  >
                    Add Section
                  </Button>
                </Flex>
              </Stack>
            )}
          </Formik>
        )}
      </Stack>
    </Stack>
  );
};

export default Curriculum;
