import {
  Stack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter your firstname"),
  lastName: Yup.string().required("enter your lastname"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().required("enter password"),
});
const SignUp = () => {
  const initialValues = {
    firstName: "dddd",
    lastName: "d",
    email: "d@gmail.com",
    password: "kkkk",
    confirmPassword: "ssssss",
  };
    const handleSubmit = (values: typeof initialValues) => {
      console.log(values);
      console.log("sucessfull");
    };
  return (
    <Stack mt={5}>
      <Box textAlign="center">
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Sign Up
        </Text>
        <Text fontSize={"18px"}>Your knowledge journey begins here!</Text>
      </Box>
      <Text></Text>
      <Box mx="15px" rowGap={"20px"}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={ handleSubmit}
          //   onSubmit={handleSubmit}
        >
          {({ handleChange,  handleSubmit, values, errors }) => (
            <Flex  rowGap={"5px"} flexDirection="column">
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="Firstname"
                  value={values.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    {errors.firstName}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="LastName"
                  value={values.lastName}
                  name="lastName"
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    {errors.lastName}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  variant="filled"
                  placeholder="Email"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    {errors.email}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="type"
                  variant="filled"
                  placeholder="password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                />
                {errors.email && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    {errors.password}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                />
                {errors.email && (
                  <Text style={{ color: "red", marginTop: 5 }} fontSize="14px">
                    {errors.confirmPassword}
                  </Text>
                )}
              </FormControl>
              <Button
                colorScheme="blue"
                width="100%"
                onClick={() => handleSubmit()}
              >
                Button
              </Button>
            </Flex>
          )}
        </Formik>
      </Box>
    </Stack>
  );
};

export default SignUp;
