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
  
} from "@chakra-ui/react";
import { Formik } from "formik";
import backgroundImg from "../../assets/backimage.webp";
// import logo from "../../assets/logo.svg";
import { forgotPasswordSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../hooks/auth";

const initialValues = {
  email: "",
};
const ForgotPassword = () => {
  const { forgotPassword, isPending } = useForgotPassword();
  const navigate= useNavigate();
  const handleSubmit = (values: any): void => {
    forgotPassword(values);
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
              Request Password Reset
            </Text>
            <Text fontSize={"18px"} mb={"0.9rem"}>
              Enter your email to receive reset instructions.
            </Text>
          </Box>
          <Box>
            <Formik
              initialValues={initialValues}
              validationSchema={forgotPasswordSchema}
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
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="text"
                      variant="filled"
                      placeholder="email"
                      value={values.email}
                      name="email"
                      onChange={handleChange}
                      focusBorderColor='black'
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
                  <Button
                    bg={"black"}                   
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
                    _hover={{ background: "none", color: "black" }}
                  >
                    Password Reset
                  </Button>
                </Flex>
              )}
            </Formik>
            <Flex columnGap={1} justify={"center"}>
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

export default ForgotPassword;
