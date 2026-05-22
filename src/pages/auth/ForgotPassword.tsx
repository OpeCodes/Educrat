import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Box,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { FiMail } from "react-icons/fi";
import { forgotPasswordSchema } from "../../schemas";
import { Link } from "react-router-dom";
import { useForgotPassword } from "../../hooks/auth";
import { AuthShell, authInputStyles, authLabelStyles } from "./AuthShell";
import { motion } from "framer-motion";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const { forgotPassword, isPending } = useForgotPassword();
  const handleSubmit = (values: any): void => {
    forgotPassword(values);
  };

  return (
    <AuthShell
      eyebrow={"Account recovery"}
      title={"Reset your password"}
      subtitle={"Enter your email and we will send reset instructions."}
      footer={
        <>
          <Text>Remembered it?</Text>
          <Text fontWeight={600} color={"#6440fb"} as={Link} to="/sign-in">
            {"Sign in ->"}
          </Text>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <Flex flexDirection="column" gap={4}>
            <Box
              p={4}
              borderRadius="16px"
              bg="rgba(100,64,251,0.06)"
              color="#4f547b"
              fontSize="sm"
            >
              We will email you a secure password reset link if this address is attached to an account.
            </Box>
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

            <Button
              as={motion.button}
              whileHover={{
                y: -2,
                boxShadow: "0 14px 30px rgba(100,64,251,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              isLoading={isPending}
              loadingText="Sending"
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
              Send reset link
            </Button>
          </Flex>
        )}
      </Formik>
    </AuthShell>
  );
};

export default ForgotPassword;
