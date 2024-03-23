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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Formik } from "formik";
import {
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
} from "../../../../hooks/module";
import { GoPlus } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { LuStickyNote } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { useGetSingleCourse } from "../../../../hooks/course";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
{/* <FaPlayCircle /> */}



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

  // const initialValues4 = {
  //   title: "a",
  // };
  const {
    moduleCreateCourse,
    isPending: moduleLoading,
    setShowSection,
    showSection,
  } = useModuleCreateCourse();

  const handleSubmit = (values: any): void => {
    moduleCreateCourse({ courseId: getSingleCourse?.id, user: values });
  };
  const {
    data,
    isPending: getCourseLoading,
    isOpenState,
    toggleIsOpen,
    isOpenCurriculumState,
    toggleIsCurriculumOpen,
    toggleIsModuleLectureOpen,
    isOpenModuleLectureState,
  } = useGetModuleCourse(getSingleCourse?.id);

  console.log(data);
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

  //start
  const [content, setContent] = useState(false);
  //end
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
                        Section {index + 1}:
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
                    const { id, title } = lecture;
                    const initialValues4 = {
                      title: "",
                    };
                    return (
                      <Stack>
                        <Stack
                          key={id}
                        >
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

                                  {content ? (
                                    <Flex
                                      marginRight={"10px"}
                                      columnGap={"15px"}
                                      align={"center"}
                                      display={{ base: "none", lg: "flex" }}
                                    >
                                      <Button
                                        borderRadius={0}
                                        borderWidth={1}
                                        borderColor={"black"}
                                        color="black"
                                        _hover={{ backgroundColor: "#F7F8FB" }}
                                        width={"100px"}
                                        height={"30px"}
                                        leftIcon={<GoPlus fontSize={"20px"} />}
                                        variant="outline"
                                      >
                                        Content
                                      </Button>
                                      <Box>
                                        <Text as={"button"}>
                                          <FaChevronDown size="12px" />
                                        </Text>
                                      </Box>
                                    </Flex>
                                  ) : (
                                    ""
                                  )}
                                </Flex>
                              </Stack>
                            )}
                            <Stack
                              bg={"white"}
                              borderWidth={1}
                              borderColor={"gray"}
                              mt={-3}
                            >
                              <Flex                               
                                width="100%"
                                justifyContent="end"
                              >
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
                                    Select content type
                                  </Text>
                                  <Text as={"button"} fontWeight="bold">
                                    <IoCloseSharp size={20}  />
                                  </Text>
                                </Flex>
                              </Flex>
                              <Text textAlign={"center"} fontSize={14}>
                                Select the main type of content. Files and links
                                can be added as resources.
                              </Text>
                              <Flex>

                              </Flex>
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
                      onClick={() => toggleIsCurriculumOpen(id)}
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
