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
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import backgroundImg from "../../assets/backimage.webp";
import { resetPasswordSchema } from "../../schemas";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { customFetch } from "../../utils/axios";

const initialValues = {
  password: "",
  confirmPassword: "",
};
const ResetPassword = () => {
  const { code, token } = useParams();
  const toast = useToast();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: (user: any) => customFetch.patch("auth/password/reset", user),
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
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="text"
                      variant="filled"
                      placeholder="confirmPassword"
                      value={values.confirmPassword}
                      name="confirmPassword"
                      onChange={handleChange}
                    />
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
