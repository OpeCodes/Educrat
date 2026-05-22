import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useGetCourse } from "../../hooks/course";
import { CourseInterface } from "../../interface/courseInterface";
import { Link } from "react-router-dom";
import {
  calculateAverageStars,
  generateStarIcons,
  getTotalLecturesDuration,
  getTotalStarsSum,
} from "../../components/CourseCalculations";
import { convertSecondsToHMS } from "../../components/TimeFormat";
import { CiClock1, CiPlay1 } from "react-icons/ci";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { Loading } from "../../components";
import { MotionBox, MotionFlex, fadeUp, popIn, stagger } from "../../components/motion";

const StudentCourse = () => {
  const { data, isPending } = useGetCourse();

  if (isPending) {
    return (
      <Text mt="6rem">
        <Loading />
      </Text>
    );
  }

  return (
    <Stack pt={{ base: "104px", md: "118px" }} pb={16} spacing={10}>
      <Box px={{ base: 5, md: 12, lg: 16 }}>
        <Box
          borderRadius="32px"
          overflow="hidden"
          bgGradient="linear(135deg, #1A064F 0%, #2d0b8a 52%, #6440fb 100%)"
          color="white"
          px={{ base: 6, md: 10 }}
          py={{ base: 10, md: 12 }}
          position="relative"
          boxShadow="0 24px 60px rgba(20,3,66,0.16)"
        >
          <Box
            position="absolute"
            top="-50px"
            right="-20px"
            w="180px"
            h="180px"
            borderRadius="full"
            bg="whiteAlpha.200"
            filter="blur(10px)"
          />
          <Stack spacing={4} maxW="760px" position="relative">
            <Text
              textTransform="uppercase"
              letterSpacing="0.16em"
              fontWeight={700}
              fontSize="xs"
              color="whiteAlpha.700"
            >
              Course Discovery
            </Text>
            <Text fontSize={{ base: "32px", md: "48px" }} lineHeight={1.05} fontWeight={700} letterSpacing="-0.03em">
              Find courses that feel like momentum, not homework.
            </Text>
            <Text color="whiteAlpha.800" fontSize={{ base: "15px", md: "18px" }} maxW="620px">
              Explore practical engineering tracks, expert-led lessons, and projects built to move your skills forward.
            </Text>
            <HStack spacing={8} pt={2} flexWrap="wrap">
              <Box>
                <Text fontSize="2xl" fontWeight={700}>
                  {data?.data?.length || 0}
                </Text>
                <Text color="whiteAlpha.700" fontSize="sm">
                  active courses
                </Text>
              </Box>
              <Box>
                <Text fontSize="2xl" fontWeight={700}>
                  4.9
                </Text>
                <Text color="whiteAlpha.700" fontSize="sm">
                  learner satisfaction
                </Text>
              </Box>
            </HStack>
          </Stack>
        </Box>
      </Box>

      <Box px={{ base: 5, md: 12, lg: 16 }}>
        <Flex justify="space-between" align={{ base: "start", md: "center" }} gap={4} flexWrap="wrap" mb={8}>
          <Stack spacing={1}>
            <Text fontSize={{ base: "24px", md: "32px" }} fontWeight={700} color="#140342">
              Browse all courses
            </Text>
            <Text color="#4f547b">
              Showing {data?.data?.length || 0} opportunities to sharpen your craft.
            </Text>
          </Stack>
        </Flex>

        <MotionFlex
          wrap="wrap"
          gap={6}
          variants={stagger(0.08)}
          initial="hidden"
          animate="show"
        >
          {data?.data?.map(
            ({
              thumbnail,
              title,
              complexityLevel,
              userId,
              id,
              slug,
              modules,
              reviews,
              price,
            }: CourseInterface) => (
              <GridItem
                as={MotionBox}
                variants={fadeUp}
                key={id}
                flex={{ base: "1 1 100%", md: "1 1 calc(50% - 24px)", xl: "1 1 calc(25% - 24px)" }}
                minW={{ xl: "260px" }}
              >
                <Box
                  as={Link}
                  to={`/course/${slug}`}
                  display="block"
                  className="surface-card wrapper"
                  borderRadius="24px"
                  overflow="hidden"
                  h="100%"
                  transition="transform 0.25s ease, box-shadow 0.25s ease"
                  _hover={{ transform: "translateY(-6px)", boxShadow: "0 24px 50px rgba(20,3,66,0.12)" }}
                >
                  <Box position="relative" overflow="hidden">
                    <Image
                      src={thumbnail}
                      alt={title}
                      className="img"
                      width="100%"
                      h="220px"
                      objectFit="cover"
                    />
                    <Text
                      position="absolute"
                      top={4}
                      left={4}
                      px={3}
                      py={1.5}
                      borderRadius="full"
                      bg="rgba(255,255,255,0.9)"
                      color="#140342"
                      fontSize="xs"
                      fontWeight={700}
                      textTransform="capitalize"
                    >
                      {complexityLevel}
                    </Text>
                  </Box>

                  <Stack p={5} spacing={4}>
                    <Flex justifyContent="start" alignItems="center" wrap="wrap">
                      <Text color="#e59819" fontWeight={700}>
                        {calculateAverageStars(reviews)}
                      </Text>
                      <Box color="#e59819" display="flex" ml={2} mr={3}>
                        <Text display="flex" columnGap={1}>
                          {generateStarIcons(calculateAverageStars(reviews))}
                        </Text>
                      </Box>
                      <Text color="gray.500" fontSize="sm">
                        ({getTotalStarsSum(reviews)} reviews)
                      </Text>
                    </Flex>

                    <Text
                      fontSize="22px"
                      fontWeight={700}
                      color="#140342"
                      lineHeight={1.25}
                      noOfLines={2}
                      minH="56px"
                    >
                      {title}
                    </Text>

                    <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                      <Stack spacing={1}>
                        <Flex align="center" columnGap="4px" color="gray.500">
                          <CiPlay1 />
                          <Text fontSize="12px">Lessons</Text>
                        </Flex>
                        <Text fontSize="13px" fontWeight={600} color="#140342">
                          {modules.length}
                        </Text>
                      </Stack>
                      <Stack spacing={1}>
                        <Flex align="center" columnGap="4px" color="gray.500">
                          <CiClock1 />
                          <Text fontSize="12px">Duration</Text>
                        </Flex>
                        <Text fontSize="13px" fontWeight={600} color="#140342">
                          {convertSecondsToHMS(getTotalLecturesDuration(modules))}
                        </Text>
                      </Stack>
                      <Stack spacing={1}>
                        <Flex align="center" columnGap="4px" color="gray.500">
                          <BiSolidBarChartAlt2 color="gray" />
                          <Text fontSize="12px">Level</Text>
                        </Flex>
                        <Text fontSize="13px" fontWeight={600} color="#140342">
                          {complexityLevel}
                        </Text>
                      </Stack>
                    </Grid>

                    <Flex align="center" justify="space-between" pt={2}>
                      <Flex align="center" columnGap={2}>
                        <Avatar
                          name={`${userId?.firstName} ${userId?.lastName}`}
                          src={userId?.profilePicture}
                          size="sm"
                        />
                        <Box>
                          <Text fontSize="sm" color="#140342" fontWeight={600}>
                            {userId?.firstName} {userId?.lastName}
                          </Text>
                          <Text fontSize="xs" color="#4f547b">
                            Instructor
                          </Text>
                        </Box>
                      </Flex>
                      <MotionBox variants={popIn}>
                        <Text fontWeight={700} fontSize="24px" color="#6440fb">
                          N{price}
                        </Text>
                      </MotionBox>
                    </Flex>
                  </Stack>
                </Box>
              </GridItem>
            )
          )}
        </MotionFlex>
      </Box>
    </Stack>
  );
};

export default StudentCourse;
