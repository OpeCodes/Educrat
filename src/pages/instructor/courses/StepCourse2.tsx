import {
  Button,
  Flex,
  FormControl,
  Input,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { CreateCourseNavBar } from "../../../components";
import { Formik } from "formik";
import { createCourseSchema } from "../../../schemas";

const initialValues = {
  title: "",
  category: "",
};
const StepCourse2 = () => {
  const handleSubmit = (values: any): void => {
    // loginUser(values);
    console.log(values);
  };
  return (
    <Stack>
      <CreateCourseNavBar step={2} progressValue={40} />
      second step
      <Stack justify={"center"} align={"center"} mt={"7rem"}>
        <Text fontSize={"2.5rem"} fontWeight={"bold"}>
          Create your course
        </Text>
        <Text>
          It's ok if you can't think of a good title and category now. You can
          change it later.
        </Text>
      </Stack>
      <Box maxW={"50%"} mx="auto" w="100%" mt={5}>
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
