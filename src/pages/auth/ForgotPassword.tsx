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
import { forgotPasswordSchema } from "../../schemas";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { forgotPassword } from "../../features/user/UserSlice";
import { Link , Navigate} from "react-router-dom";

const initialValues = {
  email: "",
};
const ForgotPassword = () => {
  const { isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = (values: typeof initialValues) => {
    dispatch(forgotPassword(values));
    // const data = await dispatch(
    //     changePassword({ data: { oldPassword, newPassword }, token })
    //   );
    // changePassword({ data: { oldPassword, newPassword }, token })
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
              Request Password Reset
            </Text>
            <Text fontSize={"18px"}>
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
                    bg={"#00FF84"}
                    isLoading={isLoading}
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

export default ForgotPassword;
