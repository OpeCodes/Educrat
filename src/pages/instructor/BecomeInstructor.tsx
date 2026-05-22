import { FileUploadComponent } from "../../components";
import {
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { instructorProfileSchema } from "../../schemas";
import { useBecomeInstructor } from "../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
  const { user } = useSelector((store: RootState) => store?.user);
  const { becomeInstructor, isPending, tabIndex, handleTabChange } =
    useBecomeInstructor();

  const handleSubmit = (values: any) => {
    becomeInstructor(values);
  };

  const handleImageUpload = () => {};
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return !user ? (
    <Navigate to="/" />
  ) : (
    <Stack pt={{ base: "104px", md: "118px" }} pb={16} px={{ base: 5, md: 12, lg: 16 }} spacing={8}>
      <Box
        borderRadius="32px"
        bgGradient="linear(135deg, #140342 0%, #2d0b8a 55%, #6440fb 100%)"
        color="white"
        px={{ base: 6, md: 10 }}
        py={{ base: 8, md: 10 }}
      >
        <Badge alignSelf="start" bg="whiteAlpha.200" color="white" px={3} py={1} borderRadius="full">
          Instructor Onboarding
        </Badge>
        <Text mt={4} fontSize={{ base: "30px", md: "44px" }} fontWeight={700} letterSpacing="-0.03em">
          Turn your experience into a course people want to follow.
        </Text>
        <Text mt={3} color="whiteAlpha.800" maxW="720px">
          Set up your public instructor presence, shape your story, and prepare the profile learners will see first.
        </Text>
      </Box>

      <Tabs position="relative" index={tabIndex} onChange={handleTabChange} variant="unstyled">
        <TabList gap={3} flexWrap="wrap">
          <Tab borderRadius="full" px={5} py={3} fontWeight={700} _selected={{ bg: "#6440fb", color: "white" }}>
            DevUpshot Profile
          </Tab>
          <Tab borderRadius="full" px={5} py={3} fontWeight={700} isDisabled={tabIndex === 0 && true} _selected={{ bg: "#6440fb", color: "white" }}>
            Profile Picture
          </Tab>
        </TabList>
        <TabIndicator display="none" />
        <TabPanels px={0}>
          <TabPanel px={0} pt={8}>
            {tabIndex === 0 && (
              <Box className="surface-card" borderRadius="28px" p={{ base: 5, md: 7 }}>
                <Stack spacing={6} mb={8}>
                  <Text fontSize="2xl" fontWeight={700} color="#140342">
                    Build your public instructor profile
                  </Text>
                  <Text color="#4f547b" maxW="760px">
                    A clear headline, a strong biography, and a few social links make your teaching profile feel more credible and approachable.
                  </Text>
                </Stack>
                <Formik
                  initialValues={initialValues}
                  validationSchema={instructorProfileSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleChange, handleSubmit, values, errors }) => (
                    <Grid templateColumns={{ lg: "repeat(2, 1fr)" }} gap={6}>
                      <GridItem w="100%" colSpan={{ lg: 2 }}>
                        <FormControl isRequired>
                          <FormLabel>Headline</FormLabel>
                          <Input
                            type="text"
                            variant="filled"
                            placeholder="e.g. Senior frontend engineer teaching production-ready React"
                            value={values.headline}
                            name="headline"
                            onChange={handleChange}
                          />
                          {errors.headline && (
                            <Text color="red.500" mt={2} fontSize="14px">
                              {errors.headline}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      <GridItem w="100%" colSpan={{ lg: 2 }}>
                        <FormControl isRequired>
                          <FormLabel>Biography</FormLabel>
                          <Textarea
                            variant="filled"
                            placeholder="Tell learners about your background, your teaching style, and the value they will get from learning with you."
                            value={values.biography}
                            name="biography"
                            minH="180px"
                            onChange={handleChange}
                          />
                          {errors.biography && (
                            <Text color="red.500" mt={2} fontSize="14px">
                              {errors.biography}
                            </Text>
                          )}
                        </FormControl>
                      </GridItem>
                      {values.socials.map((social, index) => (
                        <GridItem w="100%" key={index}>
                          <FormControl>
                            <FormLabel>{`${social.type.charAt(0).toUpperCase()}${social?.type?.slice(1)} URL`}</FormLabel>
                            <Input
                              type="text"
                              variant="filled"
                              placeholder={`Add your ${social.type} link`}
                              name={`socials[${index}].url`}
                              value={values.socials[index].url}
                              onChange={handleChange}
                            />
                          </FormControl>
                        </GridItem>
                      ))}

                      <GridItem>
                        <Button
                          bgGradient="linear(to-r, #6440fb, #8b5cf6)"
                          isLoading={isPending}
                          loadingText="Saving"
                          color="white"
                          width="100%"
                          onClick={() => handleSubmit()}
                          mt={3}
                          py={6}
                          boxShadow="0 16px 32px rgba(100,64,251,0.24)"
                          _hover={{ bgGradient: "linear(to-r, #5232e8, #7c3aed)" }}
                        >
                          Save profile
                        </Button>
                      </GridItem>
                    </Grid>
                  )}
                </Formik>
              </Box>
            )}
          </TabPanel>
          <TabPanel px={0} pt={8}>
            {tabIndex === 1 && (
              <Box className="surface-card" borderRadius="28px" p={{ base: 5, md: 7 }}>
                <Stack spacing={5}>
                  <Text fontSize="2xl" fontWeight={700} color="#140342">
                    Add your profile picture
                  </Text>
                  <Text color="#4f547b">
                    Choose a clear headshot so your instructor profile feels personal and trustworthy.
                  </Text>
                  <FileUploadComponent onImageUpload={handleImageUpload} />
                </Stack>
              </Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default BecomeInstructor;
