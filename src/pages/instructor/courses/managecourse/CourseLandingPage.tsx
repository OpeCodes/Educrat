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
import {
  useCourseCategory,
  useGetSingleCourse,
  useSingleCourse,
} from "../../../../hooks/course";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import { CourseImageFileUpload, Loading } from "../../../../components";
import { Error } from "../../../auth";
import { useParams } from "react-router-dom";
import { CourseEditCreate } from "../../../../interface/courseInterface";

const CourseLandingPage = () => {
  const { id } = useParams();
  useEffect(() => {
    refetch();
  }, [id]);

  const {
    getSingleCourse,
    isError,
    isPending: singleCourseLoading,
    refetch,
  } = useGetSingleCourse(id);

  const initialValues: CourseEditCreate = {
    title: getSingleCourse?.title || "",
    subtitle: getSingleCourse?.subtitle || "",
    language: getSingleCourse?.language || "",
    preRequisites: getSingleCourse?.preRequisites || "",
    learningObjectives: getSingleCourse?.learningObjectives || ["", "", ""],
    category: getSingleCourse?.category?.id,
    description: getSingleCourse?.description || "",
    complexityLevel: getSingleCourse?.complexityLevel,
  };
  const { data } = useCourseCategory();
  const handleImageUpload = () => {};

  const { singleCourse, isPending: isLoading } = useSingleCourse();

  const handleSubmit = (values: any): void => {
    singleCourse({
      singleId: getSingleCourse?.id,
      user: values,
    });
  };

  if (singleCourseLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
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
                  as={"input"}
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

              <FormControl isRequired>
                <FormLabel>Course Description</FormLabel>
                <ReactQuill
                  theme="snow"
                  value={values.description}
                  onChange={handleChange("description")}
                />
                {errors.description && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    Please add description
                  </Text>
                )}
              </FormControl>
              <Stack>
                <Text fontWeight={"bold"}>
                  What will students learn in your course?
                </Text>
                <Text fontSize={13}>
                  You must enter at 4 learning objectives or outcomes that
                  learners can expect to achieve after completing your course.
                </Text>
                {values?.learningObjectives?.map((value: any, index: any) => (
                  <Stack key={index}>
                    <FormControl isRequired>
                      <Input
                        type="text"
                        variant="filled"
                        placeholder="learning objectives"
                        value={value}
                        name={`learningObjectives[${index}]`}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Stack>
                ))}
              </Stack>
              <Stack>
                <Text fontWeight={"bold"}>
                  What are the requirements or prerequisites for taking your
                  course?
                </Text>
                <Text fontSize={13}>
                  List the required skills, experience, tools or equipment
                  learners should have prior to taking your course. If there are
                  no requirements, use this space as an opportunity to lower the
                  barrier for beginners.
                </Text>

                <Stack>
                  <FormControl isRequired>
                    <Input
                      type="text"
                      variant="filled"
                      placeholder="Example: No programming experience.You will learn everything you need know"
                      value={values.preRequisites}
                      name="preRequisites"
                      onChange={handleChange}
                    />
                    {errors.preRequisites && (
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.preRequisites}
                      </Text>
                    )}
                  </FormControl>
                </Stack>
              </Stack>
              <Flex columnGap={5} flexDirection={{ base: "column", lg: "row" }}>
                <Stack w="100%">
                  <Select
                    placeholder="Select language"
                    name="language"
                    onChange={handleChange}
                    mt={6}
                    variant="filled"
                    value={values.language}
                    w="100%"
                  >
                    <option value="english">English</option>
                  </Select>
                  {errors.language && (
                    <Text
                      style={{ color: "red", marginTop: 2 }}
                      fontSize="14px"
                    >
                      {errors.language}
                    </Text>
                  )}
                </Stack>
                <Stack w="100%">
                  <Select
                    placeholder="Select Level"
                    name="complexityLevel"
                    onChange={handleChange}
                    mt={6}
                    variant="filled"
                    value={values.complexityLevel}
                    w="100%"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </Select>
                  {errors.complexityLevel && (
                    <Text
                      style={{ color: "red", marginTop: 2 }}
                      fontSize="14px"
                    >
                      <>{errors.complexityLevel}</>
                    </Text>
                  )}
                </Stack>
                <Stack w="100%">
                  <Select
                    placeholder="Select Category"
                    name="category"
                    onChange={handleChange}
                    mt={6}
                    variant="filled"
                    value={values.category}
                  >
                    {data?.map((values: any) => (
                      <option key={values.id} id={values.id} value={values.id}>
                        {values.name}
                      </option>
                    ))}
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
              {/* level */}

              <Stack>
                <Text fontWeight={"bold"} mt={2}>
                  Course Image
                </Text>
                <CourseImageFileUpload onImageUpload={handleImageUpload} />
              </Stack>

              <Flex justify={"flex-end"}>
                <Button
                  bg={"#00FF84"}
                  isLoading={isLoading}
                  loadingText="Loading"
                  colorScheme="teal"
                  variant="outline"
                  spinnerPlacement="end"
                  onClick={() => handleSubmit()}
                  mt={3}
                  borderWidth={2}
                  py={3}
                  borderColor={"#00FF84"}
                  _hover={{ background: "none", color: "#00FF84" }}
                >
                  Update
                </Button>
              </Flex>
            </Flex>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default CourseLandingPage;
