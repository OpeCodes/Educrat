import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineChat } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { TbWorld } from "react-icons/tb";
import { Footer } from "../../constants";
import {
  useGetInstructorReview,
  useGetInstructorenrolledCourse,
  useGetSingleDevupshotInstructor,
  useInstructorReviewRating,
} from "../../hooks/studentCourse";
import { CourseInterface } from "../../interface/courseInterface";
import { convertSecondsToHMS } from "../../components/TimeFormat";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { CiClock1, CiPlay1 } from "react-icons/ci";
import { getTotalLecturesDuration } from "../../components/CourseCalculations";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Social {
  type: string;
  url: string;
  id: number;
}

const SingleInstructorPage = () => {
  const { slug } = useParams();
  const { getSingleDevupshotInstructor } = useGetSingleDevupshotInstructor(slug);
  const { getInstructorenrolledCourse } = useGetInstructorenrolledCourse(
    getSingleDevupshotInstructor?.id
  );
  const { instructorReviewRating } = useInstructorReviewRating(
    getSingleDevupshotInstructor?.id
  );
  const averateinstructorReviewRating =
    instructorReviewRating?.average === "NaN" ? 0 : instructorReviewRating?.average;

  const { getInstructorReview } = useGetInstructorReview(
    getSingleDevupshotInstructor?.id
  );
  const { user } = useSelector((store: RootState) => store?.user);

  return (
    <Stack pt={{ base: "104px", md: "118px" }} spacing={10}>
      <Box px={{ base: 5, md: 12, lg: 16 }}>
        <Flex columnGap={2} color="#4F547B" fontSize={14} mt={user ? "0.6rem" : "1.3rem"} wrap="wrap">
          <Text as={Link} to="/">
            Home
          </Text>
          <Text>&#x2022;</Text>
          <Text as={Link} to="/all-instructor">
            All Instructors
          </Text>
        </Flex>
      </Box>

      <Box px={{ base: 5, md: 12, lg: 16 }}>
        <Stack
          color="white"
          width="100%"
          bgGradient="linear(135deg, #140342 0%, #2d0b8a 52%, #6440fb 100%)"
          borderRadius="32px"
          py={{ base: 8, md: 12 }}
          px={{ base: 6, md: 10 }}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-20px"
            right="-20px"
            w="180px"
            h="180px"
            borderRadius="full"
            bg="whiteAlpha.100"
            filter="blur(10px)"
          />
          <Badge alignSelf="start" bg="whiteAlpha.200" color="white" px={3} py={1} borderRadius="full">
            Instructor Profile
          </Badge>
          <Avatar
            size="2xl"
            name={`${getSingleDevupshotInstructor?.firstName}${getSingleDevupshotInstructor?.lastName}`}
            src={getSingleDevupshotInstructor?.profilePicture}
            border="3px solid rgba(255,255,255,0.2)"
          />
          <Text fontSize={{ base: "30px", md: "42px" }} fontWeight={700} letterSpacing="-0.03em">
            {getSingleDevupshotInstructor?.firstName} {getSingleDevupshotInstructor?.lastName}
          </Text>
          <Text color="whiteAlpha.800" maxW="720px">
            {getSingleDevupshotInstructor?.headline}
          </Text>
          <Flex align={{ md: "center" }} flexDirection={{ base: "column", md: "row" }} gap={4} wrap="wrap">
            <Flex align="center" columnGap={2}>
              <AiFillStar size={18} />
              <Text>{averateinstructorReviewRating}</Text>
            </Flex>
            <Flex align="center" columnGap={2}>
              <IoPersonOutline />
              <Text>
                {getInstructorenrolledCourse?.length} Student
                {`${getInstructorenrolledCourse?.length <= 1 ? "" : "s"}`}
              </Text>
            </Flex>
            <Flex align="center" columnGap={2}>
              <HiOutlineChat />
              <Text>
                {getInstructorReview?.length} Review
                {`${getInstructorReview?.length <= 1 ? "" : "s"}`}
              </Text>
            </Flex>
            <Flex align="center" columnGap={2}>
              <LuClock3 />
              <Text>
                {getSingleDevupshotInstructor?.courses.length} course
                {`${getSingleDevupshotInstructor?.courses.length <= 1 ? "" : "s"}`}
              </Text>
            </Flex>
          </Flex>
          <Flex color="white" align="center" columnGap={4} mt={2} cursor="pointer" wrap="wrap">
            <Button
              bg="white"
              color="#140342"
              as="a"
              href={`mailto:${getSingleDevupshotInstructor?.email}`}
              fontWeight={600}
              _hover={{ bg: "#f5f3ff" }}
            >
              Send Message
            </Button>

            {getSingleDevupshotInstructor?.socials?.map(({ type, url, id }: Social) => (
              <Text
                as="a"
                href={url}
                target="_blank"
                key={id}
                w="38px"
                h="38px"
                borderRadius="full"
                bg="whiteAlpha.150"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {url && type === "facebook" && <FaFacebookF />}
                {url && type === "linkedin" && <FaLinkedinIn />}
                {url && type === "twitter" && <TiSocialTwitter />}
                {url && type === "website" && <TbWorld />}
                {url && type === "youtube" && <FaYoutube />}
              </Text>
            ))}
          </Flex>
        </Stack>
      </Box>

      <Stack width="100%" px={{ base: 5, md: 12, lg: 16 }} mb="1rem">
        <Tabs position="relative" variant="unstyled">
          <TabList gap={3} flexWrap="wrap">
            <Tab borderRadius="full" px={5} py={3} fontWeight={700} _selected={{ bg: "#6440fb", color: "white" }}>
              Overview
            </Tab>
            <Tab borderRadius="full" px={5} py={3} fontWeight={700} _selected={{ bg: "#6440fb", color: "white" }}>
              Courses
            </Tab>
          </TabList>
          <TabIndicator display="none" />
          <TabPanels px={0}>
            <TabPanel px={0} pt={8}>
              <Box className="surface-card" borderRadius="28px" p={{ base: 5, md: 7 }}>
                <Text color="#4f547b" lineHeight={1.8}>
                  {getSingleDevupshotInstructor?.biography}
                </Text>
              </Box>
            </TabPanel>
            <TabPanel px={0} pt={8}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={6}
              >
                {getSingleDevupshotInstructor?.courses.length === 0 && (
                  <Text>No course available</Text>
                )}
                {getSingleDevupshotInstructor?.courses?.map(
                  ({ complexityLevel, id, thumbnail, title, slug, modules, price }: CourseInterface) => (
                    <GridItem w="100%" key={id} as={Link} to={`/course/${slug}`}>
                      <Box className="surface-card wrapper" borderRadius="24px" overflow="hidden" h="100%">
                        <Image
                          src={thumbnail}
                          alt={title}
                          h="220px"
                          w="100%"
                          objectFit="cover"
                          className="img"
                        />
                        <Stack p={5} spacing={4}>
                          <Text fontSize="22px" fontWeight={700} color="#140342" noOfLines={2}>
                            {title}
                          </Text>
                          <Flex justify="space-between" fontSize="13px" color="gray.500" wrap="wrap" gap={3}>
                            <Flex align="center" columnGap="4px">
                              <CiPlay1 />
                              <Text>
                                {modules?.length} Lesson{modules?.length > 1 && "s"}
                              </Text>
                            </Flex>
                            <Flex align="center" columnGap="4px">
                              <CiClock1 />
                              <Text>{convertSecondsToHMS(getTotalLecturesDuration(modules))}</Text>
                            </Flex>
                            <Flex align="center" columnGap="4px">
                              <BiSolidBarChartAlt2 color="gray" />
                              <Text>{complexityLevel}</Text>
                            </Flex>
                          </Flex>
                          <Flex align="center" justify="space-between">
                            <Flex align="center" columnGap={2}>
                              <Avatar
                                src={getSingleDevupshotInstructor?.profilePicture}
                                name={`${getSingleDevupshotInstructor?.firstName} ${getSingleDevupshotInstructor?.lastName}`}
                                size="sm"
                              />
                              <Text fontSize="sm" color="#4f547b">
                                {getSingleDevupshotInstructor?.firstName} {getSingleDevupshotInstructor?.lastName}
                              </Text>
                            </Flex>
                            <Text fontWeight={700} fontSize="24px" color="#6440fb">
                              N{price}
                            </Text>
                          </Flex>
                        </Stack>
                      </Box>
                    </GridItem>
                  )
                )}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default SingleInstructorPage;
