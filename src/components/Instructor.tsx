import { Box, Heading, Text, Flex, Stack, Image } from "@chakra-ui/react";
import { CiPlay1, CiUser } from "react-icons/ci";
import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaStar,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useInstructorReviewRating } from "../hooks/studentCourse";
import { SocialsInterface } from "../interface/UserInterface";
import { CourseInterface } from "../interface/courseInterface";

type Instructor = {
  headline: number;
  profilePicture: string;
  firstName: string;
  lastName: string;
  job: string;
  courses: CourseInterface[];
  slug: string;
  index: number;
  arrayOfIds: number[];
  socials: SocialsInterface[];
};
const Instructor = ({
  profilePicture,
  lastName,
  firstName,
  headline,
  courses,
  slug,
  index,
  arrayOfIds,
  socials,
}: Instructor) => {
  const { instructorReviewRating } = useInstructorReviewRating(
    arrayOfIds[index]
  );
  const averateinstructorReviewRating =
    instructorReviewRating?.average === "NaN"
      ? 0
      : instructorReviewRating?.average;
  return (
    <Box
      className="card"
      width={"100%"}
      height={"auto"}
      cursor={"pointer"}
      mb={{ base: 8 }}
      as={Link}
      to={`/user/${slug}`}
    >
      <Stack>
        <Box as="div" position={"relative"}>
          <Box  overflow={"hidden"} >
          <Image
            src={profilePicture}
            style={{ borderRadius: "10px", width: "100%" }}
            alt={firstName}
            maxH={"250px"}
            height={"100%"}
            objectFit={"cover"}
            width={"100%"}
          />
          </Box>
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
            columnGap={3}
          >
            {socials.map(({ id, type, url }: SocialsInterface) => {
              return (
                <Text
                  key={id}
                  as={"a"}
                  href={url}
                  cursor={"pointer"}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  {type === "facebook" && <FaFacebookF size={22} />}
                  {type === "linkedin" && <FaLinkedinIn size={22} />}
                  {type === "twitter" && <FaTwitter size={22} />}
                  {type === "youtube" && <FaYoutube size={22} />}
                </Text>
              );
            })}
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
          <Flex justifyContent={"start"} alignItems={"center"} >
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Box as="span" color={"#e59819"} mr={1}>
                <Text>
                  <FaStar color={"#FFD700"} />
                </Text>
              </Box>
              <Text color={"#FFD700"}>{averateinstructorReviewRating}</Text>
            </Flex>

            <Box
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              mx={4}
              columnGap={1}
            >
              <CiUser color={"gray"} size={13} />
              <Text color={"gray.600"} fontSize={"12px"}>
                {courses.length} Students
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
                {courses.length} Courses
              </Text>
            </Box>
          </Flex>
        </Box>
      </Stack>
    </Box>
  );
};
export default Instructor;
