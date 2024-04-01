import { Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import ReactQuill from "react-quill";
import { courseMessageValidationSchema } from "../../../../schemas";
const initialValues = {
  welcomeMessage: "",
  completionMessage: "",
};
const CourseMessage = () => {
  const handleSubmit = () => {};
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Course Messages
      </Text>
      <Divider />
      <Text p={5} fontSize={14}>
        Write messages to your students (optional) that will be sent
        automatically when they join or complete your course to encourage
        students to engage with course content. If you do not wish to send a
        welcome or congratulations message, leave the text box blank.
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={courseMessageValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Stack p={5}>
            <Stack>
              <Text fontWeight={"bold"}>Welcome Message</Text>
              <ReactQuill
                theme="snow"
                value={values.welcomeMessage}
                onChange={handleChange("welcomeMessage")}
                className="reactQuillArticleCreate"
              />
              {errors.welcomeMessage && (
                <Text
                  style={{
                    color: "red",
                  }}
                  fontSize="14px"
                >
                  <>{errors.welcomeMessage}</>
                </Text>
              )}
            </Stack>
            <Stack>
              <Text fontWeight={"bold"}>Congratulations Message</Text>
              <ReactQuill
                theme="snow"
                value={values.completionMessage}
                onChange={handleChange("completionMessage")}
                className="reactQuillArticleCreate"
              />
              {errors.completionMessage && (
                <Text
                  style={{
                    color: "red",
                  }}
                  fontSize="14px"
                >
                  <>{errors.completionMessage}</>
                </Text>
              )}
            </Stack>
            <Flex display={"flex"} justifyContent={"end"}>
              <Button
                bg={"#00FF84"}
                // isLoading={isLoading}
                loadingText="Loading"
                variant="outline"
                spinnerPlacement="end"
                onClick={() => handleSubmit()}
                mt={3}
                borderWidth={2}
                width={"fit-content"}
                py={3}
                borderColor={"#00FF84"}
                _hover={{ background: "none", color: "#00FF84" }}
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
