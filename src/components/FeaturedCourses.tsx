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
import { ModuleInterface, ReviewInterface } from "../interface/courseInterface";
import {
  calculateAverageStars,
  generateStarIcons,
  getTotalLecturesDuration,
  getTotalStarsSum,
} from "./CourseCalculations";

type Props = {
  id: number;
  thumbnail: string;
  complexityLevel?: string;
  userId: any;
  title: string;
  slug: string;
  reviews: ReviewInterface[];
  modules: ModuleInterface[];
  price: number;
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
  price,
}: Props) => {
  const Reviewstars = [];
  for (let i = 1; i <= 5; i++) {
    Reviewstars.push(
      <FaStar
        key={i}
        color={i <= calculateAverageStars(reviews) ? "#FFD700" : "#EAEAEA"}
      />
    );
  }
  const totalDuration = getTotalLecturesDuration(modules);

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
            maxH="180px"
            height={"100%"}
            objectFit={"scale-down"}
            style={{ borderRadius: "10px" }}
            alt={title}
            w={"100%"}
            borderRadius="lg"
          />
        </Box>
        <Box>
          <Flex justifyContent={"start"} alignItems={"center"}>
            <Text color={"#FFD700"}>{calculateAverageStars(reviews)}</Text>
            <Box color={"#e59819"} display={"flex"} ml={2} mr={3}>
              <Text display={"flex"} columnGap={1}>
                {generateStarIcons(calculateAverageStars(reviews))}
              </Text>
            </Box>
            <Text color={"gray.600"}>({getTotalStarsSum(reviews)})</Text>
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
            <Text fontSize="13px">
              {modules?.length} Lesson{modules?.length > 1 && "s"}
            </Text>
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
              name={`${userId?.firstName} ${userId?.lastName}`}
              src={userId?.profilePicture}
            />
            <Text color={"gray.600"}>
              {`${userId?.firstName} ${userId?.lastName}`}
            </Text>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text color={"#140342"} fontSize={"xl"}>
              N{price}
            </Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Course;
