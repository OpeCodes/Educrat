import {
  Box,
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
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FiUser, FiLock } from "react-icons/fi";
import { SignInSchema } from "../../schemas";
import { Link } from "react-router-dom";
import { useLoginUser } from "../../hooks/auth";
import { AuthShell, authInputStyles, authLabelStyles } from "./AuthShell";
import { motion } from "framer-motion";

const initialValues = {
  credential: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const { isPending, loginUser } = useLoginUser();
  const handleSubmit = (values: any): void => {
    loginUser(values);
  };

  return (
    <AuthShell
      eyebrow={"Sign in"}
      title={"Welcome back"}
      subtitle={"Pick up where you left off."}
      footer={
        <>
          <Text>Don't have an account yet?</Text>
          <Text fontWeight={600} color={"#6440fb"} as={Link} to="/sign-up">
            Sign up for free →
          </Text>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Flex flexDirection="column" gap={4}>
            <FormControl isRequired>
              <FormLabel {...authLabelStyles}>Username or email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"} h={"100%"}>
                  <Icon as={FiUser} color={"#6440fb"} />
                </InputLeftElement>
                <Input
                  pl={10}
                  type="text"
                  placeholder="you@example.com"
                  value={values.credential}
                  name="credential"
                  onChange={handleChange}
                  {...authInputStyles}
                />
              </InputGroup>
              {errors.credential && (
                <Text color="red.500" fontSize="13px" mt={1.5}>
                  {errors.credential}
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
                  placeholder="Enter your password"
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

            <Box textAlign={"right"}>
              <Text
                as={Link}
                to="/reset-password"
                fontSize="13px"
                fontWeight={600}
                color={"#6440fb"}
                _hover={{ textDecoration: "underline" }}
              >
                Forgot password?
              </Text>
            </Box>

            <Button
              as={motion.button}
              whileHover={{
                y: -2,
                boxShadow: "0 14px 30px rgba(100,64,251,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              isLoading={isPending}
              loadingText="Signing in"
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
              Sign in
            </Button>
          </Flex>
        )}
      </Formik>
    </AuthShell>
  );
};

export default Login;
