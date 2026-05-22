import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { courseLandingSchema } from "../../../../schemas";
import { Formik } from "formik";
import {
  useCourseCategory,
  useGetSingleCourse,
  useSingleCourse,
} from "../../../../hooks/course";
import { useEffect } from "react";
import {
  CourseImageFileUpload,
  CoursePromotionalVideoUpload,
  Loading,
} from "../../../../components";
import { Error } from "../../../auth";
import { useParams } from "react-router-dom";
import { CourseEditCreate } from "../../../../interface/courseInterface";

const CourseLandingPage = () => {
  const { id } = useParams();

  const {
    getSingleCourse,
    isError,
    isPending: singleCourseLoading,
    refetch,
  } = useGetSingleCourse(id);

  useEffect(() => {
    refetch();
  }, [id]);

  const checkLearningObjective = getSingleCourse?.learningObjectives.length === 0;

  const initialValues: CourseEditCreate = {
    title: getSingleCourse?.title || "",
    subtitle: getSingleCourse?.subtitle || "",
    language: getSingleCourse?.language || "",
    preRequisites: getSingleCourse?.preRequisites || "",
    learningObjectives: checkLearningObjective
      ? ["", "", "", ""]
      : getSingleCourse?.learningObjectives,
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
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Text fontSize="2xl" fontWeight={700} color="#140342">
          Course Landing Page
        </Text>
        <Text color="#4f547b" maxW="840px">
          Build a compelling landing page that clearly explains what your course covers and why learners should trust it.
        </Text>
      </Stack>

      <Formik
        initialValues={initialValues}
        validationSchema={courseLandingSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Flex rowGap={6} flexDirection="column" pb={5}>
            <FormControl isRequired>
              <Text mb={2} fontWeight={700} color="#140342">
                Course title
              </Text>
              <Input
                type="text"
                variant="filled"
                placeholder="Insert your title"
                value={values.title}
                name="title"
                onChange={handleChange}
              />
              {errors.title && (
                <Text color="red.500" mt={2} fontSize="14px">
                  {errors.title}
                </Text>
              )}
              <FormHelperText fontSize={12}>
                Make it attention-grabbing, informative, and easy to find in search.
              </FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <Text mb={2} fontWeight={700} color="#140342">
                Course subtitle
              </Text>
              <Input
                type="text"
                variant="filled"
                placeholder="Insert your course subtitle"
                value={values.subtitle}
                name="subtitle"
                onChange={handleChange}
              />
              {errors.subtitle && (
                <Text color="red.500" mt={2} fontSize="14px">
                  {errors.subtitle}
                </Text>
              )}
              <FormHelperText fontSize={12}>
                Mention a few of the most valuable outcomes learners will get.
              </FormHelperText>
            </FormControl>

            <FormControl isRequired>
              <Text mb={2} fontWeight={700} color="#140342">
                Course description
              </Text>
              <Textarea
                variant="filled"
                placeholder="Describe what learners will build, understand, and achieve."
                value={values.description}
                name="description"
                minH="220px"
                onChange={handleChange}
              />
              {errors.description && (
                <Text color="red.500" mt={2} fontSize="14px">
                  Please add a description
                </Text>
              )}
            </FormControl>

            <Stack spacing={3}>
              <Text fontWeight={700} color="#140342">
                What will students learn?
              </Text>
              <Text fontSize={13} color="#4f547b">
                Add at least four learning outcomes learners can expect after completing your course.
              </Text>
              {values.learningObjectives.map((value: any, index: any) => (
                <FormControl isRequired key={index}>
                  <Input
                    type="text"
                    variant="filled"
                    placeholder={`Learning objective ${index + 1}`}
                    value={value}
                    name={`learningObjectives[${index}]`}
                    onChange={handleChange}
                  />
                </FormControl>
              ))}
            </Stack>

            <Stack spacing={3}>
              <Text fontWeight={700} color="#140342">
                Prerequisites
              </Text>
              <Text fontSize={13} color="#4f547b">
                List the required skills, experience, tools, or equipment needed before learners begin.
              </Text>
              <FormControl isRequired>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="Example: No programming experience required."
                  value={values.preRequisites}
                  name="preRequisites"
                  onChange={handleChange}
                />
                {errors.preRequisites && (
                  <Text color="red.500" mt={2} fontSize="14px">
                    {errors.preRequisites}
                  </Text>
                )}
              </FormControl>
            </Stack>

            <Flex columnGap={5} rowGap={5} flexDirection={{ base: "column", lg: "row" }}>
              <Stack w="100%">
                <Text mb={2} fontWeight={700} color="#140342">
                  Language
                </Text>
                <Select
                  placeholder="Select language"
                  name="language"
                  onChange={handleChange}
                  variant="filled"
                  value={values.language}
                  w="100%"
                >
                  <option value="english">English</option>
                </Select>
                {errors.language && <Text color="red.500" mt={2} fontSize="14px">{errors.language}</Text>}
              </Stack>
              <Stack w="100%">
                <Text mb={2} fontWeight={700} color="#140342">
                  Level
                </Text>
                <Select
                  placeholder="Select level"
                  name="complexityLevel"
                  onChange={handleChange}
                  variant="filled"
                  value={values.complexityLevel}
                  w="100%"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="expert">Expert</option>
                </Select>
                {errors.complexityLevel && (
                  <Text color="red.500" mt={2} fontSize="14px">
                    <>{errors.complexityLevel}</>
                  </Text>
                )}
              </Stack>
              <Stack w="100%">
                <Text mb={2} fontWeight={700} color="#140342">
                  Category
                </Text>
                <Select
                  placeholder="Select category"
                  name="category"
                  onChange={handleChange}
                  variant="filled"
                  value={values.category}
                >
                  {data?.map((values: any) => (
                    <option key={values.id} id={values.id} value={values.id}>
                      {values.name}
                    </option>
                  ))}
                </Select>
                {errors.category && <Text color="red.500" mt={2} fontSize="14px">{errors.category}</Text>}
              </Stack>
            </Flex>

            <Stack spacing={3}>
              <Text fontWeight={700} color="#140342">
                Course image
              </Text>
              <CourseImageFileUpload onImageUpload={handleImageUpload} />
            </Stack>

            <Stack spacing={3}>
              <Text fontWeight={700} color="#140342">
                Promotional video
              </Text>
              <CoursePromotionalVideoUpload onImageUpload2={handleImageUpload} />
            </Stack>

            <Flex justify="flex-end">
              <Button
                bgGradient="linear(to-r, #6440fb, #8b5cf6)"
                isLoading={isLoading}
                loadingText="Saving"
                color="white"
                onClick={() => handleSubmit()}
                py={6}
                px={8}
                boxShadow="0 16px 32px rgba(100,64,251,0.24)"
                _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
              >
                Update
              </Button>
            </Flex>
          </Flex>
        )}
      </Formik>
    </Stack>
  );
};

export default CourseLandingPage;
