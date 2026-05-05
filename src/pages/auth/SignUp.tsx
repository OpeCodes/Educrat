import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  Icon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FiUser, FiAtSign, FiLock, FiMail } from "react-icons/fi";
import { SignUpSchema } from "../../schemas";
import { Link } from "react-router-dom";
import { useRegisterUser } from "../../hooks/auth";
import { AuthShell, authInputStyles, authLabelStyles } from "./AuthShell";
import { motion } from "framer-motion";

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
    <AuthShell
      eyebrow={"Get started"}
      title={"Create your account"}
      subtitle={"Your knowledge journey begins here — free forever."}
      footer={
        <>
          <Text>Already have an account?</Text>
          <Text fontWeight={600} color={"#6440fb"} as={Link} to="/sign-in">
            Sign in →
          </Text>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Flex flexDirection="column" gap={4}>
            <Grid templateColumns={"1fr 1fr"} gap={3}>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel {...authLabelStyles}>First name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Ada"
                    value={values.firstName}
                    name="firstName"
                    onChange={handleChange}
                    {...authInputStyles}
                  />
                  {errors.firstName && (
                    <Text color="red.500" fontSize="13px" mt={1.5}>
                      {errors.firstName}
                    </Text>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isRequired>
                  <FormLabel {...authLabelStyles}>Last name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Lovelace"
                    value={values.lastName}
                    name="lastName"
                    onChange={handleChange}
                    {...authInputStyles}
                  />
                  {errors.lastName && (
                    <Text color="red.500" fontSize="13px" mt={1.5}>
                      {errors.lastName}
                    </Text>
                  )}
                </FormControl>
              </GridItem>
            </Grid>

            <FormControl isRequired>
              <FormLabel {...authLabelStyles}>Username</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"} h={"100%"}>
                  <Icon as={FiAtSign} color={"#6440fb"} />
                </InputLeftElement>
                <Input
                  pl={10}
                  type="text"
                  placeholder="ada_dev"
                  value={values.username}
                  name="username"
                  onChange={handleChange}
                  {...authInputStyles}
                />
              </InputGroup>
              {errors.username && (
                <Text color="red.500" fontSize="13px" mt={1.5}>
                  {errors.username}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel {...authLabelStyles}>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"} h={"100%"}>
                  <Icon as={FiMail} color={"#6440fb"} />
                </InputLeftElement>
                <Input
                  pl={10}
                  type="email"
                  placeholder="you@example.com"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  {...authInputStyles}
                />
              </InputGroup>
              {errors.email && (
                <Text color="red.500" fontSize="13px" mt={1.5}>
                  {errors.email}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel {...authLabelStyles}>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"} h={"100%"}>
                  <Icon as={FiLock} color={"#6440fb"} />
                </InputLeftElement>
                <Input
                  pl={10}
                  pr={"3rem"}
                  type={showPassword ? "text" : "password"}
                  placeholder="Strong password"
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  {...authInputStyles}
                />
                <InputRightElement h={"100%"}>
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handlePasswordClick}
                    bg={"transparent"}
                    color={"gray.500"}
                    _hover={{ bg: "transparent", color: "#6440fb" }}
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
                <Text color="red.500" fontSize="13px" mt={1.5}>
                  {errors.password}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel {...authLabelStyles}>Confirm password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"} h={"100%"}>
                  <Icon as={FiLock} color={"#6440fb"} />
                </InputLeftElement>
                <Input
                  pl={10}
                  pr={"3rem"}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  {...authInputStyles}
                />
                <InputRightElement h={"100%"}>
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleConfirmPasswordClick}
                    bg={"transparent"}
                    color={"gray.500"}
                    _hover={{ bg: "transparent", color: "#6440fb" }}
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
                <Text color="red.500" fontSize="13px" mt={1.5}>
                  {errors.confirmPassword}
                </Text>
              )}
            </FormControl>

            <Text fontSize={"xs"} color={"gray.500"} mt={1}>
              <Icon as={FiUser} mr={1.5} mb={"-2px"} color={"#6440fb"} />
              By signing up, you agree to our Terms and Privacy Policy.
            </Text>

            <Button
              as={motion.button}
              whileHover={{
                y: -2,
                boxShadow: "0 14px 30px rgba(100,64,251,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              isLoading={isPending}
              loadingText="Creating account"
              spinnerPlacement="end"
              w="100%"
              onClick={() => handleSubmit()}
              mt={2}
              py={6}
              fontSize={"15px"}
              fontWeight={600}
              borderRadius={"12px"}
              bgGradient={"linear(to-r, #6440fb, #8b5cf6)"}
              color={"white"}
              _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
            >
              Create account
            </Button>
          </Flex>
        )}
      </Formik>
    </AuthShell>
  );
};

export default SignUp;
