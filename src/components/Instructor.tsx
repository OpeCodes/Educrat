import { Box, Heading, Text, Flex, Stack } from "@chakra-ui/react";
import { CiPlay1, CiUser } from "react-icons/ci";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

type Instructor = {
  id: number;
  img: string;
  name: string;
  job: string;
  icon: JSX.Element;
  course: number;
  student: number;
};
const Instructor = ({
  id,
  img,
  name,
  job,
  icon,
  course,
  student,
}: Instructor) => {
  return (
    <Box
      as="div"
      className="card"
      width={"100%"}
      height={"auto"}
      cursor={"pointer"}
      key={id}
      mb={{ base: 8 }}
    >
      <Stack>
        <Box as="div" position={"relative"}>
          <img
            src={img}
            style={{ borderRadius: "10px", width: "100%" }}
            alt={name}
          />
          <Box
            as={"div"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"absolute"}
            bottom={"0%"}
            w={"100%"}
            h={"30%"}
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
            {name}
          </Heading>
          <Text color={"gray.600"} fontSize={"15px"} mb={2}>
            {job}
          </Text>
          <Flex justifyContent={"start"} alignItems={"center"}>
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Box as="span" color={"#e59819"} mr={1}>
                {icon}
              </Box>
              <Text color={"#e59819"}>4.5</Text>
            </Flex>

            <Box
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              mx={4}
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
