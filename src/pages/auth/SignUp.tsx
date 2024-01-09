import {
  Stack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  InputRightElement,
  InputGroup,
  Image,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import backgroundImg from "../../assets/backimage.webp";
import { SignUpSchema } from "../../schemas";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../utils/axios";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialValues: User = {
  firstName: "opepe",
  lastName: "adedokun",
  username: "opeyemi1111",
  email: "d@gmail.com",
  password: "Peter12111",
  confirmPassword: "Peter12111",
};
const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const toast = useToast();
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (user: any) => customFetch.post("auth/register", user),
    onSuccess: (user) => {
      toast({
        title: `welcome ${user.data.user.firstName}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.log(error);
      toast({
        title: `${error.response.data.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const handleSubmit = (values: any) => {
    const { firstName, lastName, username, email, password } = values;
    registerUser({ firstName, lastName, username, email, password });
  };

  return (
    <Stack>
      <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} columnGap={5}>
        <GridItem w="100%">
          <Box
            boxSize="sm"
            w="50%"
            h="100vh"
            bg={"#140342"}
            display={{ base: "none", lg: "block" }}
            position={"fixed"}
          >
            <Image src={backgroundImg} alt="opeyemi" />
          </Box>
        </GridItem>
        <GridItem height="100vh" mx={{ base: "15px", lg: "20px" }}>
          <Box textAlign="center" mt={5}>
            <Text fontSize={"4xl"} fontWeight={"bold"}>
              Sign Up
            </Text>
            <Text fontSize={"18px"}>Your knowledge journey begins here!</Text>
          </Box>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleSubmit, values, errors }) => (
                <Flex rowGap={"5px"} flexDirection="column" pb={5}>
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
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
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
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.lastName}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>User Name</FormLabel>
                    <Input
                      type="text"
                      variant="filled"
                      placeholder="Userame"
                      value={values.username}
                      name="username"
                      onChange={handleChange}
                    />
                    {errors.username && (
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.username}
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
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.email}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={showPassword ? "text" : "password"}
                        variant="filled"
                        placeholder="password"
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handlePasswordClick}
                          backgroundColor={"none"}
                          _hover={{ background: "none" }}
                        >
                          {showPassword ? (
                            <IoIosEye fontSize="20px" />
                          ) : (
                            <IoIosEyeOff fontSize="20px" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    {errors.password && (
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.password}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="filled"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="md"
                          onClick={handleConfirmPasswordClick}
                          _hover={{ background: "none" }}
                        >
                          {showConfirmPassword ? (
                            <IoIosEye fontSize="20px" />
                          ) : (
                            <IoIosEyeOff fontSize="20px" />
                          )}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    {errors.confirmPassword && (
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </FormControl>
                  <Button
                    bg={"#00FF84"}
                    isLoading={isPending}
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
            <Flex columnGap={1} mt={"-3"} justify={"center"} pb={4}>
              <Text>Already have an account?</Text>
              <Text
                fontWeight={"600"}
                color={"#00FF84"}
                as={Link}
                to="/sign-in"
              >
                Login Here
              </Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default SignUp;
