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
  Button,
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
import { Footer } from "../../constants";
import {
  useGetInstructorReview,
  useGetInstructorenrolledCourse,
  useGetSingleEducratInstructor,
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
  const { getSingleEducratInstructor } = useGetSingleEducratInstructor(slug);
  const { getInstructorenrolledCourse } = useGetInstructorenrolledCourse(
    getSingleEducratInstructor?.id
  );
  const { instructorReviewRating } = useInstructorReviewRating(
    getSingleEducratInstructor?.id
  );
  const averateinstructorReviewRating =
    instructorReviewRating?.average === "NaN"
      ? 0
      : instructorReviewRating?.average;

  const { getInstructorReview } = useGetInstructorReview(
    getSingleEducratInstructor?.id
  );
  const { user } = useSelector((store: RootState) => store?.user);
  return (
    <Stack pt={"4.3rem"}>
      <Stack bg={"#f5f7fe"} py={3}>
        <Flex
          w={"100%"}
          maxW={"90%"}
          mx="auto"
          columnGap={2}
          color={"#4F547B"}
          fontSize={14}
          mt={user ? "0.6rem": "1.3rem"}
        >
          <Text as={Link} to="/">
            Home
          </Text>
          <Flex columnGap={1} as={Link} to="/all-courses">
            <Text>&#x2022;</Text>
            <Text>All Courses</Text>
          </Flex>
          <Flex columnGap={1} display={{base: "none", md: "flex"}}>
            <Text>&#x2022;</Text>
            <Text>User Experience Design</Text>
          </Flex>
          <Flex columnGap={1}  display={{base: "none", md: "flex"}}>
            <Text>&#x2022;</Text>
            <Text>User Interface</Text>
          </Flex>
        </Flex>
      </Stack>
      <Stack
        color={"white"}
        mt={4}
        width={"100%"}
        bg={"#6440fb"}
        maxW={{ lg: "80%" }}
        mx={"auto"}
        borderRadius={5}
        py={{ base: "1rem", md: "5rem" }}
        px={{ base: "1rem", md: "5rem" }}
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
        <Flex
          align={{ md: "center" }}
          flexDirection={{ base: "column", md: "row" }}
          columnGap={3}
        >
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
            <Text>
              {getInstructorenrolledCourse?.length} Student
              {`${getInstructorenrolledCourse?.length <= 1 ? "" : "s"}`}
            </Text>
          </Flex>
          <Flex align={"center"} columnGap={1}>
            <Text>
              <HiOutlineChat />
            </Text>
            <Text>
              {getInstructorReview?.length} Review
              {`${getInstructorReview?.length <= 1 ? "" : "s"}`}
            </Text>
          </Flex>
          <Flex align={"center"} columnGap={1}>
            <Text>
              <LuClock3 />
            </Text>
            <Text>
              {getSingleEducratInstructor?.courses.length} course
              {`${getSingleEducratInstructor?.courses.length <= 1 ? "" : "s"}`}
            </Text>
          </Flex>
        </Flex>
        <Flex
          color={"white"}
          align={"center"}
          columnGap={4}
          mt={4}
          cursor={"pointer"}
        >
          <Button
            bg={"#00FF84"}
            as={"a"}
            href={`mailto:${getSingleEducratInstructor?.email}`}
            fontWeight={"400"}
          >
            Send Message
          </Button>

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
        maxW={{ base: "95%", lg: "80%" }}
        mx={"auto"}
        mb={"1rem"}
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
                  lg: "repeat(3, 1fr)",
                }}
                gap={"4rem"}
              >
                {getSingleEducratInstructor?.courses.length === 0 && (
                  <Text>No course available</Text>
                )}
                {getSingleEducratInstructor?.courses?.map(
                  ({
                    complexityLevel,
                    id,
                    thumbnail,
                    title,
                    slug,
                    modules,   
                    price               
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
                            maxH={{ base: "250px", md: "180px" }}
                            height={"100%"}
                            objectFit={{ base: "fill", lg: "scale-down" }}
                          />
                          <Stack>
                            {/* <Text>{getTotalStarsSum(reviews)}</Text> */}
                            <Text fontSize="20px">{title}</Text>
                            <Flex justify={"space-between"} fontSize={"19px"}>
                              <Flex
                                align="center"
                                columnGap={"4px"}
                                color="gray"
                              >
                                <CiPlay1 />
                                <Text fontSize="13px">
                                  {modules?.length} {"  "}
                                  Lesson{modules?.length > 1  && "s"}
                                </Text>
                              </Flex>
                              <Flex
                                align="center"
                                columnGap={"4px"}
                                color="gray"
                              >
                                <CiClock1 />
                                <Text fontSize="13px">
                                  {convertSecondsToHMS(getTotalLecturesDuration(modules))}
                                </Text>
                              </Flex>
                              <Flex
                                align="center"
                                columnGap={"4px"}
                                color="gray"
                              >
                                <BiSolidBarChartAlt2 color={"gray"} />
                                <Text fontSize="13px">{complexityLevel}</Text>
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
                            N{price}
                          </Text>
                        </Flex>
                      </Stack>
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
