import {
  Stack,
  Flex,
  Text,
  Box,
  Divider,
  Image,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { CiPlay1, CiClock1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { convertSecondsToHMS } from "./TimeFormat";
interface Review {
  stars: number;
}
type Props = {
  id?: number;
  thumbnail?: string;
  complexityLevel?: string;
  userId?: any;
  title?: string;
  slug: string;
  reviews: Review[];
  modules: any;
};

const Course = ({
  id,
  thumbnail,
  title,
  complexityLevel,
  userId,
  slug,
  reviews,
  modules,
}: Props) => {
  // Function to calculate the average stars and round up to whole number
  function calculateAverageStars(products: any) {
    let totalStars = 0;
    let totalReviews = 0;
    products.forEach(() => {
      reviews.forEach((review: Review) => {
        totalStars += review?.stars || 0;
        totalReviews++;
      });
    });
    if (totalReviews === 0) {
      return 0;
    }
    const averageStars = totalStars / totalReviews;
    const roundedAverageStars = Math.ceil(averageStars);
    return roundedAverageStars;
  }

  // Function to calculate the total stars
  function getTotalStarsSum(data: any) {
    const allStars = data.map((review: any) => review.stars);
    const totalStarsSum = allStars.reduce(
      (sum: number, stars: number) => sum + stars,
      0
    );

    return totalStarsSum;
  }

  const totalSumOfStars = getTotalStarsSum(reviews);
  const Reviewstars = [];
  // Fill stars based on the rating value
  for (let i = 1; i <= 5; i++) {
    Reviewstars.push(
      <FaStar
        key={i}
        color={i <= calculateAverageStars(reviews) ? "#FFD700" : "#EAEAEA"} // Fill color for filled stars based on rating
      />
    );
  }
  // Function to calculate the total duration
  const getTotalLecturesDuration = () => {
    let totalDuration = 0;
    modules.forEach((module: any) => {
      if (module.lectures && Array.isArray(module.lectures)) {
        module.lectures.forEach((lecture: any) => {
          totalDuration += lecture?.content?.duration || 0;
        });
      }
    });
    return totalDuration;
  };
  const totalDuration = getTotalLecturesDuration();

  return (
    <Box
      as="div"
      className="wrapper"
      width={{ base: "88vw", md: "345px", lg: "290px" }}
      height={"auto"}
      px={{ base: 2, lg: 0 }}
      cursor={"pointer"}
      key={id}
    >
      <Stack>
        <Box as={"div"} overflow={"hidden"} borderRadius={"10px"}>
          <Image
            src={thumbnail}
            className="img"
            maxH={"200px"}
            height={"100%"}
            style={{ borderRadius: "10px" }}
            alt={title}
            w={"100%"}
            objectFit={"cover"}
            borderRadius="lg"
          />
        </Box>
        <Box>
          <Flex justifyContent={"start"} alignItems={"center"}>
            <Text color={"#FFD700"}>{calculateAverageStars(reviews)}</Text>
            <Box color={"#e59819"} display={"flex"} ml={2} mr={3}>
              <Text display={"flex"} columnGap={1}>
                {Reviewstars}
              </Text>
            </Box>
            <Text color={"gray.600"}>({totalSumOfStars})</Text>
          </Flex>
        </Box>
        <Heading
          color={"#140342"}
          fontWeight={"normal"}
          as={Link}
          to={`/course/${slug}`}
          fontSize="20px"
          _hover={{ color: "blue" }}
          mt="-8px"
        >
          {title}
        </Heading>
        <Flex justify={"space-between"} fontSize={"19px"}>
          <Flex align="center" columnGap={"4px"} color="gray">
            <CiPlay1 />
            <Text fontSize="13px">{modules?.length} Lessons</Text>
          </Flex>
          <Flex align="center" columnGap={"4px"} color="gray">
            <CiClock1 />
            <Text fontSize="13px">{convertSecondsToHMS(totalDuration)}</Text>
          </Flex>
          <Flex align="center" columnGap={"4px"} color="gray">
            <BiSolidBarChartAlt2 color={"gray"} />
            <Text fontSize="13px">{complexityLevel}</Text>
          </Flex>
        </Flex>
        <Divider />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            columnGap={3}
          >
            <Avatar
              size="sm"
              name={`${userId?.firstName} ${userId.lastName}`}
              src={userId?.profilePicture}
            />
            <Text color={"gray.600"}>
              {`${userId?.firstName} ${userId.lastName}`}
            </Text>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text color={"#140342"} fontSize={"xl"}>
              $99
            </Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Course;
