import {
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Divider,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { courseLandingSchema } from "../../../../schemas";
import { Formik } from "formik";
const initialValues = {
  title: "",
  subtitle: "",
  description: "",
  language: "",
  category: "",
  learningObjectives: [""],
  preRequisities: [""],
  complexityLevel: "",
};
const CourseLandingPage = () => {
  const handleSubmit = (values: any): void => {
    // loginUser(values);
    console.log(values);
  };

  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Course Landing Page
      </Text>
      <Divider />
      <Text p={5} fontSize={14}>
        Your course landing page is crucial to your success on Educrat. If it’s
        done right, it can also help you gain visibility in search engines like
        Google. As you complete this section, think about creating a compelling
        Course Landing Page that demonstrates why someone would want to enroll
        in your course. Learn more about creating your course landing page and
        course title standards.
      </Text>

      <Stack p={5} mt={-8}>
        <Formik
          initialValues={initialValues}
          validationSchema={courseLandingSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <Flex rowGap={"5px"} flexDirection="column" pb={5}>
              <FormControl isRequired>
                <FormLabel>Course title</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="Insert your title"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                />
                {errors.title && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    {errors.title}
                  </Text>
                )}
                <FormHelperText fontSize={10}>
                  Your title should be a mix of attention-grabbing, informative,
                  and optimized for search
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Course subtitle</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="Insert your course subtitle"
                  value={values.subtitle}
                  name="subtitle"
                  onChange={handleChange}
                />
                {errors.subtitle && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    {errors.subtitle}
                  </Text>
                )}
                <FormHelperText fontSize={10}>
                  Use 1 or 2 related keywords, and mention 3-4 of the most
                  important areas that you've covered during your course.
                </FormHelperText>
              </FormControl>
              <Flex>
                <Stack w="100%">
                  <Select
                    placeholder="Select Category"
                    name="category"
                    onChange={handleChange}
                    mt={6}
                    variant="filled"
                    value={values.category}
                    w="100%"
                  >
                    <option value="english">English</option>
                  </Select>
                  {errors.category && (
                    <Text
                      style={{ color: "red", marginTop: 2 }}
                      fontSize="14px"
                    >
                      {errors.category}
                    </Text>
                  )}
                </Stack>
              </Flex>

              <Button
                bg={"#00FF84"}
                // isLoading={isPending}
                loadingText="Loading"
                colorScheme="teal"
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
                Register
              </Button>
            </Flex>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default CourseLandingPage;
