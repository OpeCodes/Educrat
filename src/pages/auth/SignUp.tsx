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
import {Link} from "react-router-dom"
const initialValues = {
  firstName: "peter",
  lastName: "adedokun",
  email: "d@gmail.com",
  password: "Peter12",
  confirmPassword: "Peter12",
};
const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
    console.log("sucessfull");
  };
  return (
    <Stack>
      
      <Grid templateColumns={{lg: "repeat(2, 1fr)"}} columnGap={5}>
      <GridItem w='100%' bg={"#140342"} maxHeight={"100vh"}  >
        <Box boxSize="sm" display={{base: "none", lg:"block"}}>
          <Image src={backgroundImg} alt="Dan Abramov" />
        </Box>
        </GridItem>
      <GridItem height="100vh"  mx={{base: "15px", lg: "20px"}} >
      <Box textAlign="center" mt={5} >
        <Text fontSize={"4xl"} fontWeight={"bold"}>
          Sign Up
        </Text>
        <Text fontSize={"18px"}>Your knowledge journey begins here!</Text>
      </Box>
        <Box
        >
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <Flex rowGap={"5px"} flexDirection="column" maxHeight={{base: "100%", lg: "530px"}} overflowY={"auto"} pb={5} >
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
          <Flex columnGap={1}>
            <Text>Already have an account?</Text>
            <Text fontWeight={"600"} color={"#00FF84"}  as={Link} to="/sign-in">Login Here</Text>
          </Flex>
        </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default SignUp;
