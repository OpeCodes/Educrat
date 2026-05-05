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
} from "@chakra-ui/react";
import { Formik } from "formik";
import { resetPasswordSchema } from "../../schemas";
import { Link, useParams } from "react-router-dom";
import { useResetPassword } from "../../hooks/auth";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FiLock } from "react-icons/fi";
import { useState } from "react";
import { AuthShell, authInputStyles, authLabelStyles } from "./AuthShell";
import { motion } from "framer-motion";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    <AuthShell
      eyebrow={"Almost there"}
      title={"Set a new password"}
      subtitle={"Choose something secure but memorable."}
      footer={
        <>
          <Text>Don't have an account?</Text>
          <Text fontWeight={600} color={"#6440fb"} as={Link} to="/sign-up">
            Sign up for free →
          </Text>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Flex flexDirection="column" gap={4}>
            <FormControl isRequired>
              <FormLabel {...authLabelStyles}>New password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"} h={"100%"}>
                  <Icon as={FiLock} color={"#6440fb"} />
                </InputLeftElement>
                <Input
                  pl={10}
                  pr={"3rem"}
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
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

            <Button
              as={motion.button}
              whileHover={{
                y: -2,
                boxShadow: "0 14px 30px rgba(100,64,251,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              isLoading={isPending}
              loadingText="Resetting"
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
              Reset password
            </Button>
          </Flex>
        )}
      </Formik>
    </AuthShell>
  );
};

export default ResetPassword;
