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
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import backgroundImg from "../../assets/backimage.webp";
import { SignUpSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUser } from "../../hooks/auth";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialValues: User = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const { registerUser, isPending } = useRegisterUser();

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
            <Stack position={"relative"}>
              <Image src={backgroundImg} alt="background" />
              {/* <Image
                src={logo}
                cursor={"pointer"}
                alt="background"
                position={"absolute"}
                top={"18px"}
                left={"25px"}
                onClick={() => navigate("/")}
              /> */}
              <Stack
                top={"18px"}
                left={"25px"}
                onClick={() => navigate("/")}
                position={"absolute"}
                cursor={"pointer"}
              >
                <Text fontSize={"1.7rem"} fontWeight={"bold"} color={"blue"}>
                  DevUpshot
                </Text>
              </Stack>
            </Stack>
          </Box>
        </GridItem>
        <GridItem height="100vh" mx={{ base: "15px", lg: "20px" }} >
        <Stack
            mb={"0.5rem"}
            mt={"0.9rem"}
            display={{ base: "block", lg: "none" }}
            onClick={() => navigate("/")}
            cursor={"pointer"}
          >
            <Text fontSize={"1.7rem"} fontWeight={"bold"} color={"blue"}>
              DevUpshot
            </Text>
          </Stack>
          <Box textAlign="center" mt={5}>
            <Text fontSize={"4xl"} fontWeight={"bold"}>
              Sign Up
            </Text>
            <Text fontSize={"18px"} mb={"0.9rem"}>Your knowledge journey begins here!</Text>
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
                    <FormLabel>Firstname</FormLabel>
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
                    <FormLabel>Lastname</FormLabel>
                    <Input
                      type="text"
                      variant="filled"
                      placeholder="Lastname"
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
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      variant="filled"
                      placeholder="username"
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
                    bg={"#6440fb"}                   
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
                    color={"white"}
                    _hover={{ background: "none", color: "#6440fb" }}
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
                color={"#6440fb"}
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
