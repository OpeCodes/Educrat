import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import logo from "../../assets/logo-2.svg";
import { Link } from "react-router-dom";
const SingleEnrolledCourse = () => {
  return (
    <Stack>
      <Flex justify="space-between" align={"center"} p={4} bg="red">
        <Box width={"160px"} as={Link} to={"/"}>
          <Image src={logo} alt="logo" />
        </Box>
        <Text fontWeight={"bold"} fontSize={20} color={"white"}>Learn frontend development from peter</Text>

        <Text>Back to courses</Text>
      </Flex>
    </Stack>
  );
};

export default SingleEnrolledCourse;

// <video controls controlsList="nodownload" width="600" height="400">
//           <source src={"https://res.cloudinary.com/dtori4rq2/video/upload/v1712063516/educrat/tqreteiyjik06l1ztccx.mp4"} />
//           Your browser does not support the video tag.
//         </video>
