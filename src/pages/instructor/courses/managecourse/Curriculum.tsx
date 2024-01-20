import { Divider, Stack, Flex, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { GoBookmark } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Formik } from "formik";
import { courseModelSchema } from "../../../../schemas";
const Curriculum = () => {
  const [edit, setEdit] = useState(false);
  console.log(edit)
  const initialValues ={
    title: "",
    learningObjective: ""
  }
  const handleSubmit = (values: any): void => {
    console.log(values);
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
                  Section 1:
                </Text>
                <Flex align={"center"} mr={3} columnGap={1}>
                  <Text>
                    <GoBookmark />
                  </Text>
                  <Text fontWeight={"500"}>Introductions</Text>
                </Flex>
              </Flex>
              <Flex align={"center"} columnGap={4}>
                <Text cursor={"pointer"} onClick={() => setEdit(true)}>
                  <MdEdit />
                </Text>
                <Text cursor={"pointer"}>
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
                    values={values.title}
                    focusBorderColor="black"
                    onChange={handleChange}
                  />
                </Stack>
              </Flex>
              <Stack ml={"5.5rem"}>
                <Text fontWeight={"bold"}>
                  What will students be able to do at the end of this section?
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

                  values={values.learningObjective}
                  onChange={handleChange}


                />
                {errors.title && (
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.title}
                      </Text>
                    )}
              </Stack>
              <Flex justify={"end"} mt={2} align={"center"} columnGap={5}>
                <Text
                  fontWeight={"bold"}
                  as={"button"}
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </Text>
                <Text
                  color="#ffffff"
                  fontWeight={"500"}
                  fontSize={14}
                  as={"button"}
                  py={2}
                  px={4}
                  // isLoading={isPending}
                  // loadingText="Loading"
                  // variant="outline"
                  // spinnerPlacement="end"
                  onClick={() => handleSubmit()}
                  backgroundColor={"black"}
                >
                  Save Section
                </Text>
              </Flex>
            </Stack>
             )}
             </Formik>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Curriculum;
