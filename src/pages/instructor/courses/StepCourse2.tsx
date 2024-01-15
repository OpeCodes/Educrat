import {
  Button,
  Flex,
  FormControl,
  Input,
  Stack,
  Text,
  Box,
  Select,
} from "@chakra-ui/react";
import { CreateCourseNavBar } from "../../../components";
import { Formik } from "formik";
import { createCourseSchema } from "../../../schemas";
import { useCourseCategory, useCreateCourse } from "../../../hooks";

const initialValues = {
  title: "",
  category: "",
};
const StepCourse2 = () => {
 const {createCourse} = useCreateCourse();
  const handleSubmit = (values: any): void => {
    createCourse(values)
  };
  const { data } = useCourseCategory();

  return (
    <Stack>
      <CreateCourseNavBar step={2} progressValue={100} />
      second step
      <Stack justify={"center"} align={"center"} mt={"7rem"}>
        <Text fontSize={"2.5rem"} fontWeight={"bold"} textAlign={"center"}>
          Create your course
        </Text>
        <Text textAlign={"center"}>
          It's ok if you can't think of a good title and category now. You can
          change it later.
        </Text>
      </Stack>
      <Box maxW={{base : "90%", lg: "50%"}} mx="auto" w="100%" mt={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={createCourseSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <Flex
              rowGap={"5px"}
              flexDirection="column"
              maxHeight={{ base: "100%", lg: "530px" }}
              overflowY={"auto"}
              pb={5}
            >
              <FormControl isRequired>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="e.g learn learn photoshop cs6 from photoshop"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                />
                {errors.title && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    {errors.title}
                  </Text>
                )}
              </FormControl>
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
                <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                  {errors.category}
                </Text>
              )}
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
                Login
              </Button>
            </Flex>
          )}
        </Formik>
      </Box>
    </Stack>
  );
};

export default StepCourse2;
