import { InstructorNavbar } from "../../components";
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
  InputGroup,
  InputLeftAddon,
  Button,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { instructorProfileSchema } from "../../schemas";

const initialValues = {
  headline: "",
  biography: "",
  website: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
};
const BecomeInstructor = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Stack>
      <InstructorNavbar />
      <Stack ml={16} mr={10}>
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
            <Tab fontWeight={"bold"}>Three</Tab>
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
                    <GridItem w="100%">
                      <FormControl>
                        <FormLabel>Website</FormLabel>
                        <Input
                          type="text"
                          variant="filled"
                          placeholder="website"
                          value={values.website}
                          name="website"
                          onChange={handleChange}
                        />
                        {errors.website && (
                          <Text
                            style={{ color: "red", marginTop: 5 }}
                            fontSize="14px"
                          >
                            {errors.website}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem w="100%">
                      <FormControl>
                        <FormLabel>Twitter</FormLabel>
                        <InputGroup>
                          <InputLeftAddon>
                            http://www.twitter.com/
                          </InputLeftAddon>
                          <Input
                            type="text"
                            variant="filled"
                            placeholder="username"
                            value={values.twitter}
                            name="twitter"
                            onChange={handleChange}
                          />
                        </InputGroup>

                        {errors.twitter && (
                          <Text
                            style={{ color: "red", marginTop: 5 }}
                            fontSize="14px"
                          >
                            {errors.twitter}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem w="100%">
                      <FormControl>
                        <FormLabel>Facebook</FormLabel>
                        <InputGroup>
                          <InputLeftAddon>
                            http://www.facebook.com/
                          </InputLeftAddon>
                          <Input
                            type="text"
                            variant="filled"
                            placeholder="username"
                            value={values.facebook}
                            name="facebook"
                            onChange={handleChange}
                          />
                        </InputGroup>

                        {errors.facebook && (
                          <Text
                            style={{ color: "red", marginTop: 5 }}
                            fontSize="14px"
                          >
                            {errors.facebook}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem w="100%">
                      <FormControl>
                        <FormLabel>LinkedIn</FormLabel>
                        <InputGroup>
                          <InputLeftAddon>
                            http://www.linkedin.com/
                          </InputLeftAddon>
                          <Input
                            type="text"
                            variant="filled"
                            placeholder="resource ID"
                            value={values.linkedin}
                            name="linkedin"
                            onChange={handleChange}
                          />
                        </InputGroup>

                        {errors.linkedin && (
                          <Text
                            style={{ color: "red", marginTop: 5 }}
                            fontSize="14px"
                          >
                            {errors.linkedin}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem w="100%">
                      <FormControl>
                        <FormLabel>Youtube</FormLabel>
                        <InputGroup>
                          <InputLeftAddon>
                            http://www.youtube.com/
                          </InputLeftAddon>
                          <Input
                            type="text"
                            variant="filled"
                            placeholder="username"
                            value={values.linkedin}
                            name="youtube"
                            onChange={handleChange}
                          />
                        </InputGroup>

                        {errors.youtube && (
                          <Text
                            style={{ color: "red", marginTop: 5 }}
                            fontSize="14px"
                          >
                            {errors.youtube}
                          </Text>
                        )}
                      </FormControl>
                    </GridItem>
                    <GridItem>
                    <Box display={"block"} mt={5}>
                      <Button
                        bg={"#00FF84"}
                        // isLoading={isPending}
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
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
};

export default BecomeInstructor;
