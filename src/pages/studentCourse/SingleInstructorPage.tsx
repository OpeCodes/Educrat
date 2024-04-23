import {
  Avatar,
  Flex,
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
  Image,
  Divider,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineChat } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";
import { FaYoutube } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";
import { Footer } from "../../constants";
import {
  useGetSingleEducratInstructor,
  useInstructorReviewRating,
} from "../../hooks/studentCourse";
import { CourseInterface } from "../../interface/courseInterface";

interface Social {
  type: string;
  url: string;
  id: number;
}
const SingleInstructorPage = () => {
  const { slug } = useParams();
  const { getSingleEducratInstructor } = useGetSingleEducratInstructor(slug);
  console.log(getSingleEducratInstructor, "getSingleEducratInstructor");
  const { instructorReviewRating } = useInstructorReviewRating(
    getSingleEducratInstructor?.id
  );
  const averateinstructorReviewRating =
    instructorReviewRating?.average === "NaN"
      ? 0
      : instructorReviewRating?.average;

  return (
    <Stack mt={"4.3rem"}>
      <Stack bg={"#f5f7fe"} py={3}>
        <Flex
          w={"100%"}
          maxW={"90%"}
          mx="auto"
          columnGap={2}
          color={"#4F547B"}
          fontSize={14}
          mt={"0.7rem"}
        >
          <Text as={Link} to="/">
            Home
          </Text>
          <Flex columnGap={1} as={Link} to="/all-courses">
            <Text>&#x2022;</Text>
            <Text>All Courses</Text>
          </Flex>
          <Flex columnGap={1}>
            <Text>&#x2022;</Text>
            <Text>design</Text>
          </Flex>
        </Flex>
      </Stack>
      <Stack
        color={"white"}
        mt={4}
        width={"100%"}
        bg={"#6440fb"}
        maxW={{ lg: "70%" }}
        mx={"auto"}
        borderRadius={5}
        py={"5rem"}
        px={"5rem"}
      >
        <Avatar
          size="2xl"
          name={`${getSingleEducratInstructor?.firstName}${getSingleEducratInstructor?.lastName}`}
          src={getSingleEducratInstructor?.profilePicture}
        />
        <Text fontSize={30} fontWeight={"bold"}>
          {getSingleEducratInstructor?.firstName}{" "}
          {getSingleEducratInstructor?.lastName}
        </Text>
        <Text>{getSingleEducratInstructor?.headline}</Text>
        <Flex align={"center"} columnGap={3}>
          <Flex align={"center"} columnGap={1}>
            <Text>
              <AiFillStar size={20} />
            </Text>
            <Text>{averateinstructorReviewRating}</Text>
          </Flex>

          <Flex align={"center"} columnGap={1}>
            <Text>
              <IoPersonOutline />
            </Text>
            <Text>Students</Text>
          </Flex>
          <Flex align={"center"} columnGap={1}>
            <Text>
              <HiOutlineChat />
            </Text>
            <Text>
              {+parseFloat(instructorReviewRating?.total).toFixed()} Review
            </Text>
          </Flex>
          <Flex align={"center"} columnGap={1}>
            <Text>
              <LuClock3 />
            </Text>
            <Text> {getSingleEducratInstructor?.courses.length} course</Text>
          </Flex>
        </Flex>
        <Flex
          color={"white"}
          align={"center"}
          columnGap={4}
          mt={4}
          cursor={"pointer"}
        >
          {getSingleEducratInstructor?.socials?.map(
            ({ type, url, id }: Social) => {
              return (
                <Text as={"a"} href={url} target="_blank" key={id}>
                  {type === "facebook" && <FaFacebookF />}
                  {type === "linkedin" && <FaLinkedinIn />}
                  {type === "twitter" && <TiSocialTwitter />}
                  {type === "website" && <TbWorld />}
                  {type === "youtube" && <FaYoutube />}
                </Text>
              );
            }
          )}
        </Flex>
      </Stack>
      <Stack
        width={"100%"}
        mt={12}
        maxW={{ base: "95%", lg: "60%" }}
        mx={"auto"}
      >
        <Tabs position="relative">
          <TabList fontWeight={"bold"}>
            <Tab _selected={{ color: "#6440fb" }}>Overview </Tab>
            <Tab>Courses</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="#6440fb"
            borderRadius="1px"
            opacity={"0.5"}
            fontWeight={"bold"}
          />
          <TabPanels>
            <TabPanel>{getSingleEducratInstructor?.biography}</TabPanel>
            <TabPanel>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap={6}
              >
                {getSingleEducratInstructor?.courses.map(
                  ({
                    complexityLevel,
                    id,

                    thumbnail,
                    title,
                    slug,
                  }: CourseInterface) => (
                    <GridItem
                      w="100%"
                      key={id}
                      as={Link}
                      to={`/course/${slug}`}
                    >
                      <Stack>
                        <Stack>
                          <Image
                            src={thumbnail}
                            alt="Green double couch with wooden legs"
                            borderRadius="lg"
                          />
                          <Stack>
                            <Text>4.3 rating</Text>
                            <Text fontSize="20px" mt="-12px">
                              {title}
                            </Text>
                            <Flex justify={"space-between"}>
                              <Flex
                                align="center"
                                columnGap={"4px"}
                                color="gray"
                              >
                                <CgNotes />
                                <Text fontSize="13px"> Lessons</Text>
                              </Flex>
                              <Flex
                                align="center"
                                columnGap={"4px"}
                                color="gray"
                              >
                                <CgNotes />
                                <Text fontSize="13px">6 Lessons</Text>
                              </Flex>
                              <Flex
                                align="center"
                                columnGap={"4px"}
                                color="gray"
                              >
                                <CgNotes />
                                <Text fontSize="13px">6 {complexityLevel}</Text>
                              </Flex>
                            </Flex>
                            <Divider />
                          </Stack>
                        </Stack>
                        <Flex align={"center"} justify={"space-between"}>
                          <Flex align={"center"} columnGap={2}>
                            <Avatar
                              src={getSingleEducratInstructor?.profilePicture}
                              name={`${getSingleEducratInstructor?.firstName} ${getSingleEducratInstructor?.lastName}`}
                              size={"sm"}
                            />
                            <Text>
                              {getSingleEducratInstructor?.firstName}{" "}
                              {getSingleEducratInstructor?.lastName}
                            </Text>
                          </Flex>
                          <Text fontWeight={"500"} fontSize={"20px"}>
                            $30
                          </Text>
                        </Flex>
                      </Stack>
                    </GridItem>
                  )
                )}

                <GridItem w="100%" h="10" bg="blue.500" />
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
