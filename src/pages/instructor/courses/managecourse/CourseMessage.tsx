import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import ReactQuill from "react-quill";
import { courseMessageValidationSchema } from "../../../../schemas";
import { useSingleCourse } from "../../../../hooks/course";
import { useParams } from "react-router-dom";

const initialValues = {
  welcomeMessage: "",
  completionMessage: "",
};

const CourseMessage = () => {
  const { singleCourse, isPending: isLoading } = useSingleCourse();
  const { id } = useParams();

  const handleSubmit = (values: any): void => {
    singleCourse({
      singleId: id,
      user: values,
    });
  };

  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Text fontSize="2xl" fontWeight={700} color="#140342">
          Course Messages
        </Text>
        <Text color="#4f547b" maxW="820px">
          Write optional messages that are automatically sent when learners join or complete your course.
        </Text>
      </Stack>
      <Formik
        initialValues={initialValues}
        validationSchema={courseMessageValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Text fontWeight={700} color="#140342">
                Welcome message
              </Text>
              <ReactQuill
                theme="snow"
                value={values.welcomeMessage}
                onChange={handleChange("welcomeMessage")}
                className="reactQuillArticleCreate"
              />
              {errors.welcomeMessage && (
                <Text color="red.500" fontSize="14px">
                  <>{errors.welcomeMessage}</>
                </Text>
              )}
            </Stack>
            <Stack spacing={3}>
              <Text fontWeight={700} color="#140342">
                Completion message
              </Text>
              <ReactQuill
                theme="snow"
                value={values.completionMessage}
                onChange={handleChange("completionMessage")}
                className="reactQuillArticleCreate"
              />
              {errors.completionMessage && (
                <Text color="red.500" fontSize="14px">
                  <>{errors.completionMessage}</>
                </Text>
              )}
            </Stack>
            <Flex justifyContent={"end"}>
              <Button
                bgGradient="linear(to-r, #6440fb, #8b5cf6)"
                isLoading={isLoading}
                loadingText="Saving"
                color="white"
                onClick={() => handleSubmit()}
                width={"fit-content"}
                py={6}
                px={8}
                boxShadow="0 16px 32px rgba(100,64,251,0.24)"
                _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
              >
                Save
              </Button>
            </Flex>
          </Stack>
        )}
      </Formik>
    </Stack>
  );
};

export default CourseMessage;
