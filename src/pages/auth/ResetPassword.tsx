import {
  Stack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Image,
  Grid,
  GridItem,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { Formik } from "formik";
import backgroundImg from "../../assets/backimage.webp";
// import logo from "../../assets/logo.svg";
import { resetPasswordSchema } from "../../schemas";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/auth";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
const initialValues = {
  password: "",
  confirmPassword: "",
};
const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const { code, token } = useParams();

  const { resetPassword, isPending } = useResetPassword();
  const handleSubmit = (values: typeof initialValues) => {
    const { password } = values;
    resetPassword({ code, token, password });
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
        <GridItem
          height="100vh"
          mx={{ base: "15px", lg: "20px" }}
          display="flex"
          flexDirection={"column"}
          justifyContent={{ base: "none", md: "center" }}
        >
          <Box textAlign="center" mt={5}>
            <Text fontSize={"4xl"} fontWeight={"bold"}>
              Password Reset
            </Text>
            <Text fontSize={"18px"}>
              Please provide a secure but memorable password
            </Text>
          </Box>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordSchema}
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
                  {/* <FormControl isRequired>
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type="text"
                      variant="filled"
                      placeholder="password"
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <Text
                        style={{ color: "red", marginTop: 5 }}
                        fontSize="14px"
                      >
                        {errors.password}
                      </Text>
                    )}
                  </FormControl> */}
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
                    Password Reset
                  </Button>
                </Flex>
              )}
            </Formik>
            <Flex columnGap={1} justify={"center"}>
              <Text>Don't have an account?</Text>
              <Text
                fontWeight={"600"}
                color={"#00FF84"}
                as={Link}
                to="/sign-in"
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

export default ResetPassword;
