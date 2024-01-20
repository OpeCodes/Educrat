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
import React, { useEffect, useState } from "react";
import { GoBookmark } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Formik } from "formik";
import { courseModelSchema } from "../../../../schemas";
import {
  useDeleteModalCourse,
  useGetModuleCourse,
  useModuleEditCourse,
} from "../../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
const Curriculum = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: any = React.useRef();
  const [edit, setEdit] = useState<boolean>(false);
  const { moduleEditCourse, isPending } =useModuleEditCourse();
  const { deleteModule } = useDeleteModalCourse();
  const { courseModule,  } = useSelector(
    (store: RootState) => store.user
  );
  const initialValues = {
    title: courseModule.title || "Introductions",
    learningObjective: courseModule.learningObjective || "",
  };
 
  console.log(courseModule)

  const handleSubmit = (values: any): void => {
    moduleEditCourse({ courseId: courseModule.id, user: values });
    setTimeout(() => {
      setEdit(false);
    }, 2000);
  };
  const { getModuleCourse } = useGetModuleCourse();

  useEffect(() => {
    getModuleCourse({ course: courseModule.courseId });
  }, []);
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

      {/* {AllCourseModule.map((courseModule: any, index: any) => { */}
        {/* return (
          <> */}
            <Stack p={5}>
              <Stack
                bg={"#F7F8FB"}
                borderWidth={1}
                borderColor={"gray"}
                p={3}
                pb={10}
              >
                {!edit && (
                  <Flex align={"center"}>
                    <Flex align={"center"} columnGap={2}>
                      <Text fontWeight={"bold"} fontSize={17}>
                        Section 1
                      </Text>
                      <Flex align={"center"} mr={3} columnGap={1}>
                        <Text>
                          <GoBookmark />
                        </Text>
                        <Text fontWeight={"500"}>{initialValues.title}</Text>
                      </Flex>
                    </Flex>
                    <Flex align={"center"} columnGap={4}>
                      <Text cursor={"pointer"} onClick={() => setEdit(true)}>
                        <MdEdit />
                      </Text>
                      <Text cursor={"pointer"} onClick={onOpen}>
                        <MdDelete />
                      </Text>
                    </Flex>
                  </Flex>
                )}

                {edit && (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={courseModelSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ handleChange, handleSubmit, values, errors }) => (
                      <Stack
                        bg={"#FFFFFF"}
                        borderWidth={1}
                        // mt={6}
                        p={3}
                        borderColor={"gray"}
                      >
                        <Flex align={"center"} rowGap={2}>
                          <Text fontWeight={"bold"} fontSize={16} pr={4}>
                            Section 1:
                          </Text>
                          <Stack maxW="89%" w="100%">
                            <Input
                              variant="outline"
                              w="100%"
                              borderColor={"black"}
                              borderRadius={"0px"}
                              placeholder="title"
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
                        <Stack ml={"5.5rem"}>
                          <Text fontWeight={"bold"}>
                            What will students be able to do at the end of this
                            section?
                          </Text>
                          <Input
                            variant="outline"
                            w="100%"
                            borderColor={"black"}
                            borderRadius={"0px"}
                            placeholder="Filled"
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
                            onClick={() => setEdit(false)}
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
                            isLoading={isPending}
                            loadingText="Loading"
                            variant="outline"
                            spinnerPlacement="end"
                            onClick={() => handleSubmit()}
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
                  <Button
                    //  ref={cancelRef}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg="black"
                    color="white"
                    ml={3}
                    _hover={{ backgroundColor: "none", color: "none" }}
                    onClick={() => {
                      deleteModule({ courseId: courseModule?.id });
                    }}
                  >
                    OK
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
         
    </Stack>
  );
};

export default Curriculum;
