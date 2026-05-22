import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CreateCourseNavBar, Loading } from "../../../components";
import { Formik } from "formik";
import { createCourseSchema } from "../../../schemas";
import { useCourseCategory, useCreateCourse } from "../../../hooks/course";
import { Navigate } from "react-router-dom";
import { useGetUser } from "../../../hooks";

const initialValues = {
  title: "",
  category: "",
};

const CreateCourse = () => {
  const { data: getUser } = useGetUser();
  const hasInstructorRole = getUser?.roles.some(
    (role: any) => role?.name === "instructor"
  );
  const { createCourse, isPending: loading } = useCreateCourse();
  const handleSubmit = (values: any): void => {
    createCourse(values);
  };
  const { data, isPending } = useCourseCategory();

  if (isPending) {
    return <Loading />;
  }

  return !hasInstructorRole ? (
    <Navigate to="/" />
  ) : (
    <Stack minH="100vh" bg="linear-gradient(180deg, #f7f6ff 0%, #ffffff 45%, #f5f3ff 100%)">
      <CreateCourseNavBar step={1} progressValue={100} />
      <Stack justify="center" align="center" mt="4rem" px={5}>
        <Text fontSize={{ base: "2rem", md: "3rem" }} fontWeight={700} textAlign="center" color="#140342" letterSpacing="-0.03em">
          Create your course
        </Text>
        <Text textAlign="center" color="#4f547b" maxW="640px">
          Start with a strong title and category. You can refine the details, curriculum, and pricing in the next steps.
        </Text>
      </Stack>
      <Box className="surface-card" maxW={{ base: "92%", lg: "760px" }} mx="auto" w="100%" mt={8} borderRadius="32px" p={{ base: 5, md: 8 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={createCourseSchema}
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
                  placeholder="e.g. Build production-ready React apps from scratch"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                />
                {errors.title && (
                  <Text color="red.500" mt={2} fontSize="14px">
                    {errors.title}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
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
                {errors.category && (
                  <Text color="red.500" mt={2} fontSize="14px">
                    {errors.category}
                  </Text>
                )}
              </FormControl>
              <Flex justify="flex-end">
                <Button
                  bgGradient="linear(to-r, #6440fb, #8b5cf6)"
                  isLoading={loading}
                  loadingText="Creating"
                  color="white"
                  onClick={() => handleSubmit()}
                  py={6}
                  px={8}
                  boxShadow="0 16px 32px rgba(100,64,251,0.24)"
                  _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
                >
                  Create course
                </Button>
              </Flex>
            </Flex>
          )}
        </Formik>
      </Box>
    </Stack>
  );
};

export default CreateCourse;
