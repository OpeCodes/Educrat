import { FileUploadComponent, InstructorNavbar } from "../../components";
import {
  Box,
  Stack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
import { Formik } from "formik";
import { instructorProfileSchema } from "../../schemas";
import { useMutation } from "@tanstack/react-query";
import customFetch from "../../utils/axios";
const initialValues = {
  headline: "",
  biography: "",
  socials: [
    { type: "facebook", url: "" },
    { type: "linkedin", url: "" },
    { type: "twitter", url: "" },
    { type: "website", url: "" },
    { type: "youtube", url: "" },
  ],
};

const BecomeInstructor = () => {
  const toast= useToast();
const {mutate: becomeInstructor,isPending} = useMutation({
  mutationFn: (user) => customFetch.put("/user/instructor", user),
  onSuccess: () => {
    toast({
      title: `You are now an instructor`,
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

})
  const handleSubmit = (values: any) => {
    console.log(values);
    becomeInstructor(values)
  };
  const handleImageUpload = (file: File) => {
    // Handle the file as needed (e.g., upload to a server)
    console.log('Uploaded file:', file);
  };
  return (
    <Stack>
      <InstructorNavbar />
      <Stack ml={{ base: 6, lg: 16 }} mr={{ base: 5, lg: 10 }}>
        <Box mt={3}>
          <Text fontSize={"4xl"} fontWeight={"bold"}>
            Sign Up
          </Text>
          <Text fontSize={"18px"}>Your impacting journey begins here!</Text>
        </Box>
        <Tabs position="relative">
          <TabList fontWeight={"bold"}>
            <Tab _selected={{ fontWeight: "bold" }} fontWeight={"bold"}>
              Educrat Profile
            </Tab>
            <Tab fontWeight={"bold"}>Profile Picture</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="black"
            borderRadius="1px"
            opacity={"0.5"}
            fontWeight={"bold"}
          />
          <TabPanels>
            <TabPanel>
              <Formik
                initialValues={initialValues}
                validationSchema={instructorProfileSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleSubmit, values, errors }) => (
                  <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={6}>
                    <GridItem w="100%">
                      <FormControl isRequired>
                        <FormLabel>HeadLine</FormLabel>
                        <Input
                          type="text"
                          variant="filled"
                          placeholder="headline"
                          value={values.headline}
                          name="headline"
                          onChange={handleChange}
                        />
                        {errors.headline && (
                          <Text
                            style={{ color: "red", marginTop: 5 }}
                            fontSize="14px"
                          >
                            {errors.headline}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem w="100%">
                      <FormControl isRequired>
                        <FormLabel>Biography</FormLabel>
                        <Input
                          type="text"
                          variant="filled"
                          placeholder="headline"
                          value={values.biography}
                          name="biography"
                          onChange={handleChange}
                        />
                        {errors.biography && (
                          <Text
                            style={{ color: "red", marginTop: 5 }}
                            fontSize="14px"
                          >
                            {errors.biography}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    {values.socials.map((social, index) => (
                      <GridItem w="100%">
                        <FormControl isRequired>
                          <FormLabel>{`${social.type
                            .charAt(0)
                            .toUpperCase()}${social.type.slice(
                            1
                          )} URL:`}</FormLabel>
                          <Input
                            type="text"
                            variant="filled"
                            placeholder="headline"
                            name={`socials[${index}].url`}
                            value={values.socials[index].url}
                            onChange={handleChange}
                          />
                          
                        </FormControl>
                      </GridItem>
                    ))}

                    <GridItem>
                      <Box display={"block"} mt={5}>
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
                          Save
                        </Button>
                      </Box>
                    </GridItem>
                  </Grid>
                )}
              </Formik>
            </TabPanel>
            <TabPanel>
              <Stack>
                <Text fontWeight={"bold"}>Image Preview</Text>
                <FileUploadComponent onImageUpload={handleImageUpload} />
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
};

export default BecomeInstructor;

// 1. ceg lab report
// 2. pgg lab report
// 3. pgg notes and test
// 4.
