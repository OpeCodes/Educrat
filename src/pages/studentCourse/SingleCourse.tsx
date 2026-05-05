import {
  Stack,
  Text,
  Flex,
  Avatar,
  Grid,
  GridItem,
  Collapse,
  Button,
  Box,
  Divider,
  useToast,
  Skeleton,
  Spinner,
  Heading,
  HStack,
  Tag,
  TagLabel,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";
import {
  MdOutlineCheckCircleOutline,
  MdOutlinePlayLesson,
} from "react-icons/md";
import { FcInfo } from "react-icons/fc";
import { WiTime3 } from "react-icons/wi";
import { FiBarChart2, FiUsers, FiShare2, FiAward, FiRefreshCw } from "react-icons/fi";
import { IoLanguage, IoPersonOutline } from "react-icons/io5";
import { FaCertificate } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { HiOutlineChat } from "react-icons/hi";
import StudentCourseContent from "../../components/StudentCourseContent";
import {
  useCourseEnrollment,
  useCreateCourseWishList,
  useDeleteCourseWishList,
  useGetAlInstructorPublishedCourse,
  useGetCourseReview,
  useGetCourseReviewRating,
  useGetInstructorReview,
  useGetInstructorenrolledCourse,
  useGetSingleEnrolledCourse,
  useGetStudentEnrolledCourse,
  useGetStudentSingleCourse,
  useGetStudentWishList,
  useInstructorReviewRating,
} from "../../hooks/studentCourse";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaStar } from "react-icons/fa";
import {
  convertSecondsToHMS,
  formatEnrollDate,
  getTimeDifference,
} from "../../components/TimeFormat";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { PromotionalVideoPlayModal } from "../../components";
import { setCourseAuthNavigate } from "../../features/user/UserSlice";
import { useDispatch } from "react-redux";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { Footer } from "../../constants";
import { TiSocialTwitter } from "react-icons/ti";

import {
  shareOnFacebook,
  shareOnInstagram,
  shareOnLinkedIn,
  shareOnTwitter,
} from "../../components/ShareFuncs";
import {
  CourseInterface,
  ModuleInterface,
} from "../../interface/courseInterface";
import { useCreateOrder } from "../../hooks/auth/price";
import {
  addCourseToCart,
  setSingleCartCourse,
} from "../../features/cart/CartSlice";
import {
  CourseItemToLocalStorage,
  addUserSingleCartItem,
} from "../../store/localStorage";
import {
  MotionBox,
  MotionFlex,
  fadeUp,
  stagger,
  orbDrift,
} from "../../components/motion";
import { motion } from "framer-motion";

interface ObjectWithId {
  id: string;
}

const SingleCourse = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { user } = useSelector((store: RootState) => store?.user);
  const { courses } = useSelector((store: RootState) => store?.cart);
  const { getStudentSingleCourse, isPending } = useGetStudentSingleCourse(slug);
  const { getStudentWishList } = useGetStudentWishList();

  const studentCourseId: string | undefined = getStudentSingleCourse?.id;
  const objectToCheck: ObjectWithId = { id: studentCourseId ?? "" };

  const doesIdExistInArray = (
    array: ObjectWithId[],
    objectToCheck: ObjectWithId
  ): boolean => {
    return array.some((item) => item.id === objectToCheck.id);
  };
  const studentWishList: ObjectWithId[] = getStudentWishList ?? [];
  const idExists = doesIdExistInArray(studentWishList, objectToCheck);

  const { getCourseReview, isPending: getCourseReviewLoading } =
    useGetCourseReview(getStudentSingleCourse?.id);
  const { instructorReviewRating } = useInstructorReviewRating(
    getStudentSingleCourse?.userId?.id
  );
  const { getInstructorReview } = useGetInstructorReview(
    getStudentSingleCourse?.userId?.id
  );
  const { courseReviewRating } = useGetCourseReviewRating(
    getStudentSingleCourse?.id
  );
  const { getStudentEnrolledCourse } = useGetStudentEnrolledCourse(
    getStudentSingleCourse?.id
  );

  const dateString = getStudentSingleCourse?.updatedAt;
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;
  const formattedDate = `${month.toString().padStart(2, "0")}/${year
    .toString()
    .padStart(2, "0")}`;
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  const getTotalLecturesDuration = () => {
    let totalDuration = 0;
    getStudentSingleCourse?.modules.forEach((module: ModuleInterface) => {
      if (module.lectures && Array.isArray(module.lectures)) {
        module.lectures.forEach((lecture: any) => {
          totalDuration += lecture?.content?.duration || 0;
        });
      }
    });
    return totalDuration;
  };
  const totalDuration = getTotalLecturesDuration();
  const { courseEnroll, isPending: handleEnrolledCourseLoading } =
    useCourseEnrollment();
  const { getSingleEnrolledCourse, isPending: getSingleEnrolledCourseLoading } =
    useGetSingleEnrolledCourse(getStudentSingleCourse?.id);
  const { getAlInstructorPublishedCourse } = useGetAlInstructorPublishedCourse(
    getStudentSingleCourse?.userId?.id
  );
  const { getInstructorenrolledCourse } = useGetInstructorenrolledCourse(
    getStudentSingleCourse?.userId?.id
  );
  const { createCourseWishList, createCourseWishListLoading } =
    useCreateCourseWishList();
  const { deleteCourseWishList, deleteCourseWishListLoading } =
    useDeleteCourseWishList();

  const extractFirstLectureIds = (course: CourseInterface) => {
    const firstLectureIds: string[] = [];
    course?.modules.forEach((module: any) => {
      const { lectures } = module;
      if (lectures && lectures.length > 0) {
        const firstLectureId = lectures[0].id;
        firstLectureIds.push(firstLectureId);
      }
    });
    return firstLectureIds;
  };

  const firstLectureIds = extractFirstLectureIds(getStudentSingleCourse);
  const { createOrder } = useCreateOrder();

  const handleEnrolledCourse = () => {
    if (!user) {
      navigate("/sign-in");
      toast({
        title: `Sign in to enroll for course`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      dispatch(setCourseAuthNavigate(-1));
      return;
    } else {
      if (getStudentSingleCourse?.price === 0) {
        courseEnroll({ courseId: getStudentSingleCourse?.id });
      } else {
        createOrder({
          body: {
            totalAmount: getStudentSingleCourse?.price,
            courses: [getStudentSingleCourse?.id],
          },
        });
        navigate(`/payment/checkout/express/${getStudentSingleCourse?.id}`);
        dispatch(
          setSingleCartCourse({
            id: getStudentSingleCourse?.id,
            title: getStudentSingleCourse?.title,
            description: getStudentSingleCourse?.description,
            price: getStudentSingleCourse?.price,
            img: getStudentSingleCourse?.thumbnail,
          })
        );
        addUserSingleCartItem({
          id: getStudentSingleCourse?.id,
          title: getStudentSingleCourse?.title,
          description: getStudentSingleCourse?.description,
          price: getStudentSingleCourse?.price,
          img: getStudentSingleCourse?.thumbnail,
        });
      }
    }
  };
  const handleGoToCourse = () => {
    if (!user) {
      navigate("/sign-in");
      toast({
        title: `Sign in to purchase a course`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      dispatch(setCourseAuthNavigate(-1));
      return;
    } else {
      navigate(
        `/course/${slug}/learn/lecture/${getSingleEnrolledCourse?.id}/${firstLectureIds[0]}/reviews`
      );
    }
  };
  const handleWishCourse = () => {
    if (!user) {
      navigate("/sign-in");
      toast({
        title: `Sign in to add a wishlist`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      dispatch(setCourseAuthNavigate(-1));
      return;
    } else {
      createCourseWishList({ courseId: getStudentSingleCourse?.id });
    }
  };

  const handleAddToCart = (cart: any) => {
    if (!user) {
      navigate("/sign-in");
      toast({
        title: `Sign in to add course to cart`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      dispatch(setCourseAuthNavigate(-1));
      return;
    } else {
      dispatch(addCourseToCart(cart));
      CourseItemToLocalStorage(cart);
    }
  };
  let ratingFormat = parseFloat(
    courseReviewRating?.average === "NaN" ? "0" : courseReviewRating?.average
  );

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        color={i <= Math.round(ratingFormat) ? "#FFD700" : "#EAEAEA"}
      />
    );
  }

  const [visibleReviews, setVisibleReviews] = useState(3);
  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  const getCourseUrlFromCurrentUrl = (): string => {
    const baseUrl = window.location.origin;
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("/");
    const courseIndex = urlParts.indexOf("course");
    if (courseIndex !== -1 && courseIndex + 1 < urlParts.length) {
      const coursePath = urlParts
        ?.slice(courseIndex, courseIndex + 2)
        .join("/");
      return `${baseUrl}/${coursePath}`;
    }
    return baseUrl;
  };
  const url = getCourseUrlFromCurrentUrl();
  const checkCourseID = (course: any, idToCheck: number) => {
    return course.some((obj: any) => obj?.id === idToCheck);
  };
  const exists = checkCourseID(courses, getStudentSingleCourse?.id);

  const isLoadingPage =
    getCourseReviewLoading && isPending && getSingleEnrolledCourseLoading;

  const sectionCard = {
    bg: "white",
    borderRadius: "16px",
    border: "1px solid",
    borderColor: "blackAlpha.100",
    p: { base: 5, md: 7 },
    boxShadow: "0 2px 12px rgba(20,3,66,0.04)",
  };

  const detailRow = (
    icon: any,
    label: string,
    value: React.ReactNode,
    last = false
  ) => (
    <Box>
      <Flex justify={"space-between"} align={"center"} py={3}>
        <Flex columnGap={3} align={"center"} color={"#4f547b"}>
          <Icon as={icon} color={"#6440fb"} boxSize={"18px"} />
          <Text fontSize={"sm"}>{label}</Text>
        </Flex>
        <Text fontWeight={600} color={"#140342"} fontSize={"sm"}>
          {value}
        </Text>
      </Flex>
      {!last && <Divider opacity={0.5} />}
    </Box>
  );

  return (
    <>
      <Stack mb={"2rem"}>
        {isLoadingPage ? (
          <Stack pt={"5rem"} px={{ base: 5, md: 12 }} spacing={4}>
            <Skeleton height="220px" borderRadius={"16px"} />
            <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
              <Stack spacing={3}>
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} height="60px" borderRadius={"12px"} />
                ))}
              </Stack>
              <Stack spacing={3}>
                <Skeleton height="220px" borderRadius={"16px"} />
                <Skeleton height="60px" borderRadius={"12px"} />
                <Skeleton height="60px" borderRadius={"12px"} />
              </Stack>
            </Grid>
          </Stack>
        ) : (
          !isPending && (
            <Box position={"relative"}>
              {/* HERO */}
              <Box
                position={"relative"}
                overflow={"hidden"}
                bgGradient={"linear(135deg, #1A064F 0%, #2d0b8a 50%, #4c1ed4 100%)"}
                color={"white"}
                pt={{ base: "100px", md: "120px" }}
                pb={{ base: 14, md: 20, lg: 28 }}
                px={{ base: 5, md: 12, lg: 16 }}
              >
                <MotionBox
                  position={"absolute"}
                  top={"-120px"}
                  right={"-120px"}
                  w={"380px"}
                  h={"380px"}
                  borderRadius={"full"}
                  bg={"#a78bfa"}
                  opacity={0.25}
                  filter={"blur(80px)"}
                  {...orbDrift(0)}
                />
                <MotionBox
                  position={"absolute"}
                  bottom={"-160px"}
                  left={"-100px"}
                  w={"360px"}
                  h={"360px"}
                  borderRadius={"full"}
                  bg={"#0ea5e9"}
                  opacity={0.18}
                  filter={"blur(90px)"}
                  {...orbDrift(2)}
                />
                <Box
                  position={"absolute"}
                  inset={0}
                  opacity={0.06}
                  backgroundImage={
                    "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)"
                  }
                  backgroundSize={"22px 22px"}
                />

                <Box position={"relative"} zIndex={1} maxW={"900px"}>
                  <MotionFlex
                    columnGap={2}
                    color={"whiteAlpha.700"}
                    fontSize={"13px"}
                    flexWrap={"wrap"}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Text as={Link} to="/" _hover={{ color: "white" }}>
                      Home
                    </Text>
                    <Text>›</Text>
                    <Text as={Link} to="/all-courses" _hover={{ color: "white" }}>
                      All Courses
                    </Text>
                    <Text>›</Text>
                    <Text color={"white"}>
                      {getStudentSingleCourse?.category?.name}
                    </Text>
                  </MotionFlex>

                  <MotionFlex
                    flexDirection={"column"}
                    rowGap={5}
                    mt={6}
                    variants={stagger(0.1)}
                    initial={"hidden"}
                    animate={"show"}
                  >
                    <MotionBox variants={fadeUp}>
                      <Tag
                        size={"md"}
                        bg={"whiteAlpha.200"}
                        color={"white"}
                        borderRadius={"full"}
                        px={4}
                        py={1.5}
                        backdropFilter={"blur(10px)"}
                        border={"1px solid"}
                        borderColor={"whiteAlpha.300"}
                      >
                        <TagLabel fontWeight={600}>
                          {getStudentSingleCourse?.category?.name}
                        </TagLabel>
                      </Tag>
                    </MotionBox>

                    <MotionBox variants={fadeUp}>
                      <Heading
                        as={"h1"}
                        fontSize={{ base: "30px", md: "44px", lg: "52px" }}
                        lineHeight={1.1}
                        letterSpacing={"-0.02em"}
                      >
                        {getStudentSingleCourse?.title}
                      </Heading>
                    </MotionBox>

                    <MotionBox variants={fadeUp}>
                      <Text
                        color={"whiteAlpha.800"}
                        fontSize={{ base: "md", md: "lg" }}
                        maxW={"720px"}
                      >
                        {getStudentSingleCourse?.subtitle}
                      </Text>
                    </MotionBox>

                    <MotionFlex
                      variants={fadeUp}
                      flexWrap={"wrap"}
                      align={"center"}
                      rowGap={3}
                      columnGap={6}
                      color={"whiteAlpha.800"}
                      fontSize={"sm"}
                    >
                      <Flex align={"center"} columnGap={2}>
                        <Text color={"#FFD700"} fontWeight={700}>
                          {Math.round(ratingFormat) || 0}.0
                        </Text>
                        <HStack spacing={0.5}>{stars}</HStack>
                        <Text>({courseReviewRating?.total || 0} reviews)</Text>
                      </Flex>
                      <Flex align={"center"} columnGap={2}>
                        <Icon as={FiUsers} />
                        <Text>
                          {getStudentEnrolledCourse?.length || 0} enrolled
                        </Text>
                      </Flex>
                      <Flex align={"center"} columnGap={2}>
                        <Icon as={LuClock3} />
                        <Text>Updated {formattedDate}</Text>
                      </Flex>
                      <Flex align={"center"} columnGap={2}>
                        <Icon as={IoLanguage} />
                        <Text>{getStudentSingleCourse?.language}</Text>
                      </Flex>
                    </MotionFlex>

                    <MotionFlex
                      variants={fadeUp}
                      align={"center"}
                      columnGap={3}
                      pt={2}
                    >
                      <Avatar
                        size="md"
                        name={`${getStudentSingleCourse?.userId?.firstName} ${getStudentSingleCourse?.userId.lastName}`}
                        src={getStudentSingleCourse?.userId?.profilePicture}
                        border={"2px solid"}
                        borderColor={"whiteAlpha.400"}
                      />
                      <Box>
                        <Text fontSize={"xs"} color={"whiteAlpha.700"}>
                          Created by
                        </Text>
                        <Text fontWeight={600} fontSize={"sm"}>
                          {`${getStudentSingleCourse?.userId?.firstName} ${getStudentSingleCourse?.userId.lastName}`}
                        </Text>
                      </Box>
                    </MotionFlex>
                  </MotionFlex>
                </Box>
              </Box>

              {/* MAIN CONTENT */}
              <Box
                position={"relative"}
                px={{ base: 5, md: 12, lg: 16 }}
                mt={{ base: -10, lg: -20 }}
                pb={16}
              >
                <Grid
                  templateColumns={{ base: "1fr", lg: "1fr 380px" }}
                  gap={{ base: 6, lg: 10 }}
                  alignItems={"start"}
                >
                  <Stack spacing={6}>
                    {/* What you'll learn */}
                    <MotionBox
                      {...sectionCard}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heading
                        as={"h2"}
                        fontSize={"xl"}
                        color={"#140342"}
                        mb={4}
                        letterSpacing={"-0.01em"}
                      >
                        What you'll learn
                      </Heading>
                      <Grid
                        templateColumns={{ md: "repeat(2, 1fr)" }}
                        gap={3}
                      >
                        {getStudentSingleCourse?.learningObjectives?.map(
                          (learn: any, index: number) => (
                            <GridItem w="100%" key={index}>
                              <Flex columnGap={2} color={"#4f547b"}>
                                <Icon
                                  as={MdOutlineCheckCircleOutline}
                                  color={"#10b981"}
                                  boxSize={"20px"}
                                  flexShrink={0}
                                  mt={"2px"}
                                />
                                <Text fontSize={"sm"} lineHeight={1.6}>
                                  {learn}
                                </Text>
                              </Flex>
                            </GridItem>
                          )
                        )}
                      </Grid>
                    </MotionBox>

                    {/* Course content */}
                    <MotionBox
                      {...sectionCard}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Flex
                        justify={"space-between"}
                        align={{ base: "start", md: "center" }}
                        flexDir={{ base: "column", md: "row" }}
                        mb={4}
                        gap={2}
                      >
                        <Heading
                          as={"h2"}
                          fontSize={"xl"}
                          color={"#140342"}
                          letterSpacing={"-0.01em"}
                        >
                          Course content
                        </Heading>
                        <Text fontSize={"sm"} color={"#4f547b"}>
                          {getStudentSingleCourse?.modules?.length} sections
                          ·{" "}
                          {convertSecondsToHMS(totalDuration)} total
                        </Text>
                      </Flex>
                      <StudentCourseContent
                        SingleCourseProp={getStudentSingleCourse}
                      />
                    </MotionBox>

                    {/* Requirements */}
                    <MotionBox
                      {...sectionCard}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heading
                        as={"h2"}
                        fontSize={"xl"}
                        color={"#140342"}
                        mb={4}
                        letterSpacing={"-0.01em"}
                      >
                        Requirements
                      </Heading>
                      <Flex columnGap={2} color={"#4f547b"}>
                        <Box
                          w={"6px"}
                          h={"6px"}
                          mt={"9px"}
                          borderRadius={"full"}
                          bg={"#6440fb"}
                          flexShrink={0}
                        />
                        <Text fontSize={"sm"} lineHeight={1.7}>
                          {getStudentSingleCourse?.preRequisites}
                        </Text>
                      </Flex>
                    </MotionBox>

                    {/* Description */}
                    <MotionBox
                      {...sectionCard}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heading
                        as={"h2"}
                        fontSize={"xl"}
                        color={"#140342"}
                        mb={4}
                        letterSpacing={"-0.01em"}
                      >
                        Description
                      </Heading>
                      <Box color={"#4f547b"} lineHeight={1.7} fontSize={"sm"}>
                        <Collapse
                          dangerouslySetInnerHTML={{
                            __html: getStudentSingleCourse?.description,
                          }}
                          startingHeight={150}
                          in={show}
                        />
                      </Box>
                      {getStudentSingleCourse?.description?.length > 500 && (
                        <Button
                          color={"#6440fb"}
                          size="sm"
                          onClick={handleToggle}
                          mt={3}
                          variant="link"
                          fontWeight={600}
                        >
                          Show {show ? "less" : "more"}
                        </Button>
                      )}
                    </MotionBox>

                    {/* Instructor */}
                    <MotionBox
                      {...sectionCard}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heading
                        as={"h2"}
                        fontSize={"xl"}
                        color={"#140342"}
                        mb={5}
                        letterSpacing={"-0.01em"}
                      >
                        Meet your instructor
                      </Heading>
                      <Flex
                        columnGap={5}
                        rowGap={4}
                        flexDir={{ base: "column", sm: "row" }}
                      >
                        <Avatar
                          size="xl"
                          name={`${getStudentSingleCourse?.userId?.firstName} ${getStudentSingleCourse?.userId.lastName}`}
                          src={getStudentSingleCourse?.userId?.profilePicture}
                          as={Link}
                          to={`/user/${getStudentSingleCourse?.userId?.slug}`}
                          ring={2}
                          ringColor={"#6440fb"}
                        />
                        <Stack flex={1} spacing={3}>
                          <Box
                            as={Link}
                            to={`/user/${getStudentSingleCourse?.userId?.slug}`}
                          >
                            <Text fontWeight={700} color={"#140342"} fontSize={"lg"}>
                              {`${getStudentSingleCourse?.userId?.firstName} ${getStudentSingleCourse?.userId.lastName}`}
                            </Text>
                            <Text color={"#4f547b"} fontSize={"sm"}>
                              {getStudentSingleCourse?.userId?.headline}
                            </Text>
                          </Box>

                          <Grid
                            templateColumns={{
                              base: "repeat(2, 1fr)",
                              md: "repeat(4, 1fr)",
                            }}
                            gap={3}
                          >
                            <Box
                              p={3}
                              bg={"#f4f1fe"}
                              borderRadius={"10px"}
                            >
                              <Flex align={"center"} columnGap={1.5} color={"#140342"}>
                                <Icon as={FaStar} color={"#FFD700"} />
                                <Text fontWeight={700} fontSize={"sm"}>
                                  {instructorReviewRating?.average === "NaN"
                                    ? 0
                                    : +parseFloat(
                                        instructorReviewRating?.average
                                      ).toFixed(2)}
                                </Text>
                              </Flex>
                              <Text fontSize={"xs"} color={"#4f547b"} mt={0.5}>
                                Rating
                              </Text>
                            </Box>
                            <Box
                              p={3}
                              bg={"#f4f1fe"}
                              borderRadius={"10px"}
                            >
                              <Flex align={"center"} columnGap={1.5} color={"#140342"}>
                                <Icon as={HiOutlineChat} color={"#6440fb"} />
                                <Text fontWeight={700} fontSize={"sm"}>
                                  {getInstructorReview?.length || 0}
                                </Text>
                              </Flex>
                              <Text fontSize={"xs"} color={"#4f547b"} mt={0.5}>
                                Review
                                {getInstructorReview?.length === 1 ? "" : "s"}
                              </Text>
                            </Box>
                            <Box
                              p={3}
                              bg={"#f4f1fe"}
                              borderRadius={"10px"}
                            >
                              <Flex align={"center"} columnGap={1.5} color={"#140342"}>
                                <Icon as={IoPersonOutline} color={"#6440fb"} />
                                <Text fontWeight={700} fontSize={"sm"}>
                                  {getInstructorenrolledCourse?.length || 0}
                                </Text>
                              </Flex>
                              <Text fontSize={"xs"} color={"#4f547b"} mt={0.5}>
                                Student
                                {getInstructorenrolledCourse?.length === 1
                                  ? ""
                                  : "s"}
                              </Text>
                            </Box>
                            <Box
                              p={3}
                              bg={"#f4f1fe"}
                              borderRadius={"10px"}
                            >
                              <Flex align={"center"} columnGap={1.5} color={"#140342"}>
                                <Icon as={LuClock3} color={"#6440fb"} />
                                <Text fontWeight={700} fontSize={"sm"}>
                                  {getAlInstructorPublishedCourse?.length || 0}
                                </Text>
                              </Flex>
                              <Text fontSize={"xs"} color={"#4f547b"} mt={0.5}>
                                Course
                                {getAlInstructorPublishedCourse?.length === 1
                                  ? ""
                                  : "s"}
                              </Text>
                            </Box>
                          </Grid>

                          <Text color={"#4f547b"} fontSize={"sm"} lineHeight={1.7}>
                            {getStudentSingleCourse?.userId?.biography}
                          </Text>
                        </Stack>
                      </Flex>
                    </MotionBox>

                    {/* Reviews */}
                    <MotionBox
                      {...sectionCard}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Flex
                        justify={"space-between"}
                        align={"center"}
                        mb={5}
                      >
                        <Heading
                          as={"h2"}
                          fontSize={"xl"}
                          color={"#140342"}
                          letterSpacing={"-0.01em"}
                        >
                          Student reviews
                        </Heading>
                        {getCourseReview?.length > 0 && (
                          <Flex
                            align={"center"}
                            columnGap={2}
                            bg={"#fffbeb"}
                            border={"1px solid"}
                            borderColor={"#fde68a"}
                            borderRadius={"full"}
                            px={3}
                            py={1}
                          >
                            <Icon as={FaStar} color={"#FFD700"} />
                            <Text fontWeight={700} color={"#92400e"} fontSize={"sm"}>
                              {Math.round(ratingFormat) || 0}.0
                            </Text>
                          </Flex>
                        )}
                      </Flex>

                      {getCourseReview?.length === 0 && (
                        <Box
                          p={8}
                          textAlign={"center"}
                          bg={"#f9f8ff"}
                          borderRadius={"12px"}
                          color={"#4f547b"}
                        >
                          <Text fontSize={"sm"}>
                            No reviews yet. Be the first to share your
                            experience.
                          </Text>
                        </Box>
                      )}

                      <Stack spacing={5} divider={<Divider opacity={0.5} />}>
                        {getCourseReview
                          ?.slice(0, visibleReviews)
                          ?.map((review: any) => {
                            const {
                              reviewer,
                              title,
                              content,
                              updatedAt,
                              id,
                            } = review;
                            return (
                              <motion.div
                                key={id}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                              >
                                <Flex columnGap={4}>
                                  <Avatar
                                    size="md"
                                    name={`${reviewer?.firstName} ${reviewer?.lastName}`}
                                  />
                                  <Stack spacing={1.5} flex={1}>
                                    <Flex
                                      align={"center"}
                                      columnGap={2}
                                      flexWrap={"wrap"}
                                    >
                                      <Text
                                        fontWeight={600}
                                        color={"#140342"}
                                        fontSize={"sm"}
                                      >
                                        {reviewer?.firstName}{" "}
                                        {reviewer?.lastName}
                                      </Text>
                                      <Text
                                        fontSize={"xs"}
                                        color={"#4f547b"}
                                      >
                                        · {getTimeDifference(updatedAt)}
                                      </Text>
                                    </Flex>
                                    {title && (
                                      <Text
                                        fontWeight={600}
                                        color={"#140342"}
                                        fontSize={"sm"}
                                      >
                                        {title}
                                      </Text>
                                    )}
                                    <Text
                                      color={"#4f547b"}
                                      fontSize={"sm"}
                                      lineHeight={1.6}
                                    >
                                      {content}
                                    </Text>
                                  </Stack>
                                </Flex>
                              </motion.div>
                            );
                          })}
                      </Stack>

                      {visibleReviews < getCourseReview?.length && (
                        <Button
                          onClick={handleShowMore}
                          variant="link"
                          color={"#6440fb"}
                          fontSize={"sm"}
                          fontWeight={600}
                          mt={5}
                        >
                          Show more reviews
                        </Button>
                      )}
                    </MotionBox>
                  </Stack>

                  {/* STICKY PURCHASE CARD */}
                  <Box
                    position={{ base: "static", lg: "sticky" }}
                    top={"95px"}
                    alignSelf={"start"}
                  >
                    <MotionBox
                      bg={"white"}
                      borderRadius={"16px"}
                      border={"1px solid"}
                      borderColor={"blackAlpha.100"}
                      overflow={"hidden"}
                      boxShadow={"0 18px 50px rgba(20,3,66,0.12)"}
                      initial={{ opacity: 0, y: -16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Box position={"relative"}>
                        <PromotionalVideoPlayModal
                          imageUrl={getStudentSingleCourse?.thumbnail}
                          videoUrl={getStudentSingleCourse?.promotionalVideo}
                          title={getStudentSingleCourse?.title}
                        />
                      </Box>

                      <Box p={6}>
                        {!getSingleEnrolledCourse || !user ? (
                          <Stack spacing={4}>
                            <Flex align={"baseline"} columnGap={2}>
                              <Heading
                                as={"h3"}
                                fontSize={"3xl"}
                                color={"#140342"}
                                letterSpacing={"-0.02em"}
                              >
                                ₦{getStudentSingleCourse?.price?.toLocaleString() || 0}
                              </Heading>
                              {getStudentSingleCourse?.price === 0 && (
                                <Badge
                                  colorScheme={"green"}
                                  fontSize={"xs"}
                                  borderRadius={"full"}
                                  px={2}
                                >
                                  Free
                                </Badge>
                              )}
                            </Flex>

                            <Flex columnGap={3}>
                              {!exists ? (
                                <Button
                                  as={motion.button}
                                  whileHover={{ y: -2 }}
                                  whileTap={{ scale: 0.97 }}
                                  bg={"#6440FB"}
                                  py={"25px"}
                                  variant="solid"
                                  color={"white"}
                                  flex={1}
                                  fontWeight={600}
                                  borderRadius={"12px"}
                                  _hover={{ bg: "#5232e8" }}
                                  onClick={() => {
                                    handleAddToCart({
                                      id: getStudentSingleCourse?.id,
                                      title: getStudentSingleCourse?.title,
                                      description:
                                        getStudentSingleCourse?.description,
                                      price: getStudentSingleCourse?.price,
                                      img: getStudentSingleCourse?.thumbnail,
                                    });
                                  }}
                                >
                                  Add to Cart
                                </Button>
                              ) : (
                                <Button
                                  bg={"#10b981"}
                                  py={"25px"}
                                  variant="solid"
                                  color={"white"}
                                  flex={1}
                                  fontWeight={600}
                                  borderRadius={"12px"}
                                  _hover={{ bg: "#059669" }}
                                  cursor={"default"}
                                >
                                  Already in Cart
                                </Button>
                              )}

                              <Flex
                                align={"center"}
                                px={4}
                                justify={"center"}
                                borderColor={"blackAlpha.200"}
                                borderWidth={1}
                                borderRadius={"12px"}
                                _hover={{
                                  bg: "#fff5f5",
                                  borderColor: "#f87171",
                                }}
                                cursor={"pointer"}
                                transition={"all 0.2s"}
                                color={idExists ? "#ef4444" : "#140342"}
                              >
                                {createCourseWishListLoading ||
                                deleteCourseWishListLoading ? (
                                  <Spinner size={"sm"} />
                                ) : !idExists ? (
                                  <Box onClick={handleWishCourse}>
                                    <IoMdHeartEmpty size={22} />
                                  </Box>
                                ) : (
                                  <Box
                                    onClick={() => {
                                      deleteCourseWishList({
                                        courseId:
                                          getStudentSingleCourse?.id,
                                      });
                                    }}
                                  >
                                    <IoMdHeart size={22} />
                                  </Box>
                                )}
                              </Flex>
                            </Flex>

                            <Button
                              as={motion.button}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              borderColor={"#140342"}
                              py={"25px"}
                              variant="outline"
                              fontWeight={600}
                              borderRadius={"12px"}
                              color={"#140342"}
                              onClick={handleEnrolledCourse}
                              isLoading={handleEnrolledCourseLoading}
                              loadingText="Loading"
                              spinnerPlacement="end"
                              _hover={{ bg: "#140342", color: "white" }}
                            >
                              Enroll now
                            </Button>

                            <Text
                              fontSize={"xs"}
                              color={"#4f547b"}
                              textAlign={"center"}
                            >
                              30-day money-back guarantee
                            </Text>
                          </Stack>
                        ) : (
                          <Stack spacing={4}>
                            <Flex
                              columnGap={3}
                              align={"center"}
                              p={3}
                              bg={"#f0fdf4"}
                              borderRadius={"10px"}
                              border={"1px solid"}
                              borderColor={"#bbf7d0"}
                            >
                              <FcInfo size={28} />
                              <Text
                                fontSize={"sm"}
                                color={"#140342"}
                                fontWeight={600}
                              >
                                Purchased{" "}
                                {formatEnrollDate(
                                  getSingleEnrolledCourse?.createdAt
                                )}
                              </Text>
                            </Flex>
                            <Button
                              as={motion.button}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              bg={"#6440FB"}
                              py={"25px"}
                              variant="solid"
                              color={"white"}
                              fontWeight={600}
                              borderRadius={"12px"}
                              onClick={handleGoToCourse}
                              _hover={{ bg: "#5232e8" }}
                            >
                              Go to Course
                            </Button>
                          </Stack>
                        )}

                        <Divider my={5} opacity={0.5} />

                        <Text
                          textTransform={"uppercase"}
                          letterSpacing={"0.12em"}
                          fontSize={"xs"}
                          fontWeight={700}
                          color={"#4f547b"}
                          mb={2}
                        >
                          This course includes
                        </Text>
                        <Stack spacing={0}>
                          {detailRow(
                            MdOutlinePlayLesson,
                            "Lessons",
                            getStudentSingleCourse?.modules?.length
                          )}
                          {detailRow(
                            WiTime3,
                            "Duration",
                            convertSecondsToHMS(totalDuration)
                          )}
                          {detailRow(
                            FiBarChart2,
                            "Skill level",
                            getStudentSingleCourse?.complexityLevel
                          )}
                          {detailRow(
                            IoLanguage,
                            "Language",
                            getStudentSingleCourse?.language
                          )}
                          {detailRow(
                            FaCertificate,
                            "Certificate",
                            <Icon as={FiAward} color={"#10b981"} />
                          )}
                          {detailRow(
                            FiRefreshCw,
                            "Lifetime access",
                            <Icon
                              as={MdOutlineCheckCircleOutline}
                              color={"#10b981"}
                            />,
                            true
                          )}
                        </Stack>

                        <Divider my={5} opacity={0.5} />

                        <Flex align={"center"} columnGap={3}>
                          <Icon
                            as={FiShare2}
                            color={"#4f547b"}
                            boxSize={"16px"}
                          />
                          <Text
                            fontSize={"xs"}
                            color={"#4f547b"}
                            fontWeight={600}
                          >
                            Share
                          </Text>
                          <Flex columnGap={2} ml={1}>
                            {[
                              {
                                icon: FaFacebookF,
                                fn: () => shareOnFacebook(url),
                              },
                              {
                                icon: FaLinkedinIn,
                                fn: () => shareOnLinkedIn(url),
                              },
                              {
                                icon: TiSocialTwitter,
                                fn: () => shareOnTwitter(url),
                              },
                              {
                                icon: FaInstagram,
                                fn: () => shareOnInstagram(url),
                              },
                            ].map(({ icon, fn }, i) => (
                              <motion.button
                                key={i}
                                onClick={fn}
                                whileHover={{ y: -3, scale: 1.1 }}
                                whileTap={{ scale: 0.92 }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 32,
                                  height: 32,
                                  borderRadius: 9999,
                                  background: "#f4f1fe",
                                  color: "#6440fb",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <Icon as={icon} boxSize={"14px"} />
                              </motion.button>
                            ))}
                          </Flex>
                        </Flex>
                      </Box>
                    </MotionBox>
                  </Box>
                </Grid>
              </Box>
            </Box>
          )
        )}
      </Stack>
      <Footer />
    </>
  );
};

export default SingleCourse;
