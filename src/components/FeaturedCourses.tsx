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
import { FaRegStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BiSolidBarChartAlt2 } from "react-icons/bi";

type Props = {
  id?: number;
  thumbnail?: string;
  complexityLevel?: string;
  userId?: any;
  title?: string;
  slug: string;
};

const Course = ({
  id,
  thumbnail,
  title,
  complexityLevel,
  userId,
  slug,
}: Props) => {
  return (
    <Box
      as="div"
      className="wrapper"
      width={{ base: "88vw", md: "345px", lg: "290px" }}
      height={"auto"}
      px={{base: 2,lg: 0}}
      cursor={"pointer"}
      key={id}
    >
      <Stack>
        <Box as={"div"} bg="red" overflow={"hidden"} borderRadius={"10px"}>
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
            <Text color={"#e59819"}>4.5</Text>
            <Box color={"#e59819"} display={"flex"} ml={2} mr={3}>
              <Box mr={1}>
                <FaRegStar />
              </Box>
              <Box mr={1}>
                <FaRegStar />
              </Box>
              <Box mr={1}>
                <FaRegStar />
              </Box>
              <Box mr={1}>
                <FaRegStar />
              </Box>
            </Box>
            <Text color={"gray.600"}>(1991)</Text>
          </Flex>
        </Box>
        <Heading
          color={"#140342"}
          fontWeight={"normal"}
          as={Link}
          to={`/course/${slug}`}
          fontSize="20px"
          _hover={{color: "blue"}}
          mt="-8px"
        >
          {title}
        </Heading>
        <Flex justify={"space-between"} fontSize={"19px"}>
          <Flex align="center" columnGap={"4px"} color="gray">
            <CiPlay1 />
            <Text fontSize="13px">6 Lessons</Text>
          </Flex>
          <Flex align="center" columnGap={"4px"} color="gray">
            <CiClock1 />
            <Text fontSize="13px">6 Lessons</Text>
          </Flex>
          <Flex align="center" columnGap={"4px"} color="gray">
            <BiSolidBarChartAlt2 color={"gray"}/>
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
            <Text color={"gray.600"} >
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
