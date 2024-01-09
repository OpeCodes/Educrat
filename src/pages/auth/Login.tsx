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
import { SignInSchema } from "../../schemas";
import { Link } from "react-router-dom";
import { useMutation, } from "@tanstack/react-query";
import { customFetch } from "../../utils/axios";
const initialValues = {
  credential: "peteradedokun2003@gmail.com",
  password: "Favour@2003",
};


const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const toast = useToast();
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (user) => customFetch.post("/auth/login", user),
    onSuccess: (user) => {
      toast({
        title: `welcome ${user.data.user.firstName}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.log(error)
      toast({
        title: `${error.response.data.error}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const handleSubmit = (values: any): void => {
    loginUser(values);
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
        <GridItem
          height="100vh"
          mx={{ base: "15px", lg: "20px" }}
          display="flex"
          flexDirection={"column"}
          justifyContent={{ base: "none", md: "center" }}
        >
          <Box textAlign="center" mt={5}>
            <Text fontSize={"4xl"} fontWeight={"bold"}>
              Welcome Back
            </Text>
            <Text fontSize={"18px"}>Please enter your login details</Text>
          </Box>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={SignInSchema}
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
                    <FormLabel>Username or email</FormLabel>
                    <Input
                      type="text"
                      variant="filled"
                      placeholder="username or email"
                      value={values.credential}
                      name="credential"
                      onChange={handleChange}
                    />
                    {errors.credential && (
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.credential}
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
                  <Button
                    color={"#00FF84"}
                    as={Link}
                    to="/reset-password"
                    variant="link"
                    display={"flex"}
                    fontSize="14px"
                    justifyContent={"end"}
                  >
                    Forgot Password?
                  </Button>
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
                    Login
                  </Button>
                </Flex>
              )}
            </Formik>
            <Flex
              columnGap={1}
              flexWrap={"wrap"}
              textAlign="center"
              justify={"center"}
            >
              <Text>Don't have an account yet?</Text>
              <Text
                fontWeight={"600"}
                color={"#00FF84"}
                as={Link}
                to="/sign-up"
              >
                Sign up for free
              </Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default Login;
