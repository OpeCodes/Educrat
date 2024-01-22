import {
  Divider,
  Stack,
  Flex,
  Text,
  Input,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GoBookmark } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Formik } from "formik";
import {
  courseEditModuleSchema,
  courseModuleSchema,
} from "../../../../schemas";
import {
  useDeleteModalCourse,
  useModuleCreateCourse,
  useGetModuleCourse,
  useModuleEditCourse,
} from "../../../../hooks/module";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { GoPlus } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";

const Curriculum = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = React.useRef();
  const [showSection, setShowSection] = useState<boolean>(false);
  const { course } = useSelector((store: RootState) => store.user);
  const { moduleEditCourse, isPending: editLoading } = useModuleEditCourse();
  const { deleteModule, isPending: deleteLoading } = useDeleteModalCourse();
  // const [moduleID, setModuleID] = useState("");
  const initialValues1 = {
    title: "",
    learningObjective: "",
  };
  const initialValues2 = {
    title: "",
    learningObjective: "",
  };
  const { moduleCreateCourse, isPending: moduleLoading } =
    useModuleCreateCourse();

  const handleSubmit = (values: any): void => {
    moduleCreateCourse({ courseId: course._id, user: values });
    setTimeout(() => {
      setShowSection(false);
    }, 3000);
    // setShowSection(success);
  };

  const { data, isOpenState, toggleIsOpen } = useGetModuleCourse(course._id);

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
      {data?.map((course: any, index: any) => {
        const { title, id } = course;
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
                <Flex align={"center"}>
                  <Flex align={"center"} columnGap={2}>
                    <Text fontWeight={"bold"} fontSize={17}>
                      Section {index + 1}
                    </Text>
                    <Flex align={"center"} mr={3} columnGap={1}>
                      <Text>
                        <GoBookmark />
                      </Text>
                      <Text fontWeight={"500"}>{title}</Text>
                    </Flex>
                  </Flex>
                  <Flex align={"center"} columnGap={4}>
                    <Text cursor={"pointer"} onClick={() => toggleIsOpen(id)}>
                      <MdEdit />
                    </Text>
                    <Text cursor={"pointer"} onClick={onOpen}>
                      <MdDelete />
                    </Text>
                  </Flex>
                </Flex>

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
                            isLoading={editLoading}
                            loadingText="Loading"
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
              </Stack>
            </Stack>

            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>Please Confirm</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  You are about to remove a curriculum item. Are you sure you
                  want to continue?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    bg="black"
                    color="white"
                    ml={3}
                    isLoading={deleteLoading}
                    loadingText="Loading"
                    variant="outline"
                    spinnerPlacement="end"
                    _hover={{ backgroundColor: "none", color: "none" }}
                    onClick={() => {
                      deleteModule({ moduleId: id });
                      setTimeout(() => {
                        onClose();
                      }, 1500);
                    }}
                  >
                    OK
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
