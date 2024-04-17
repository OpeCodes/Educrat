import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";
import { Instructor } from "../components";
import { useGetAllEducratInstructors } from "../hooks/studentCourse";
import { Link } from "react-router-dom";

export const Instructors = () => {
  const { data } = useGetAllEducratInstructors();
  return (
    <Box
      as={"section"}
      px={{ base: "6", md: "12", lg: "16" }}
      py={{ base: 12, md: 16, lg: 16 }}
      bg={"#fefbf4"}
    >
      <Stack>
        <Box
          as={"div"}
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={{ base: "start", lg: "center" }}
        >
          <Box mb={{ base: "10px" }}>
            <Heading as={"h1"} color={"#140342"} size={"xl"}>
              Learn From The Best Instructors
            </Heading>
            <Text as={"p"} color={"gray.600"} my={2}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
          </Box>
          <Box>
            <Button
              variant={"outline"}
              px={6}
              py={6}
              bg={"#f4f1fe"}
              color={"#6440fb"}
              mb={{ base: "4px" }}
              border={"none"}
              borderRadius={"full"}
              fontWeight={"normal"}
              _hover={{
                bg: "#6440fb",
                color: "white",
              }}
              rightIcon={<MdArrowOutward size={20} />}
              as={Link}
              to={"/all-instructor"}
            >
              View All Instructors
            </Button>
          </Box>
        </Box>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {data?.slice(0,4).map((instructor: any) => {
            return <Instructor key={instructor.id} {...instructor} />;
          })}
        </Grid>
        <Flex
          flexDir={{ base: "column" }}
          justify={"center"}
          align={"center"}
          my={5}
        >
          <Text color={"gray.600"} fontSize={"15px"}>
            Want to help people learn, grow and achieve more in life?
          </Text>
          <Text
            color={"#6440fb"}
            as={Link}
            fontSize={"15px"}
            ml={1}
            to={"become-instructor"}
          >
            Become an instructor
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};
