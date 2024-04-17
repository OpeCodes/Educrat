import { Box, Heading, Text, Flex, Stack, Image } from "@chakra-ui/react";
import { CiPlay1, CiUser } from "react-icons/ci";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaStar,
} from "react-icons/fa";

type Instructor = {
  headline: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  job: string;
  course: number;
  student: number;
};
const Instructor = ({
  profilePicture,
  lastName,
  firstName,
  course,
  student,
  headline,
}: Instructor) => {
  return (
    <Box
      as="div"
      className="card"
      width={"100%"}
      height={"auto"}
      cursor={"pointer"}
      mb={{ base: 8 }}
    >
      <Stack>
        <Box as="div" position={"relative"}>
          <Image
            src={profilePicture}
            style={{ borderRadius: "10px", width: "100%" }}
            alt={firstName}
            maxH={"300px"}
            height={"100%"}
            objectFit={"cover"}
          />
          <Box
            as={"div"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"absolute"}
            bottom={"0%"}
            w={"100%"}
            h={"100%"}
            opacity={"0"}
            _hover={{
              h: "100%",
              bg: "#140342",
              color: "white",
              opacity: "0.6",
              borderRadius: "10px",
              transitionDuration: "500ms",
            }}
          >
            <FaFacebookF size={22} />
            <Box as={"span"} mx={4}>
              <FaInstagram size={22} />
            </Box>
            <Box as={"span"} mr={4}>
              <FaTwitter size={22} />
            </Box>
            <FaLinkedinIn size={22} />
          </Box>
        </Box>
        <Box>
          <Heading
            as={"h3"}
            fontSize={"20px"}
            color={"#140342"}
            fontWeight={"normal"}
            my={2}
          >
            {firstName} {lastName}
          </Heading>
          <Text color={"gray.600"} fontSize={"15px"} mb={2}>
            {headline}
          </Text>
          <Flex justifyContent={"start"} alignItems={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Box as="span" color={"#e59819"} mr={1}>
                <Text>
                  <FaStar color={"#FFD700"} />
                </Text>
              </Box>
              <Text color={"#FFD700"}>4.5</Text>
            </Flex>

            <Box
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              mx={4}
              columnGap={1}
            >
              <CiUser color={"gray"} size={15} />
              <Text color={"gray.600"} fontSize={"14px"}>
                {student} Students
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              columnGap={1}
            >
              <CiPlay1 color={"gray"} size={15} />
              <Text color={"gray.600"} fontSize={"14px"}>
                {course} Courses
              </Text>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};
export default Instructor;
