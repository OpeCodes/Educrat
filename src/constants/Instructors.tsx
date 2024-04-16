import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  Link,
} from "@chakra-ui/react";
import { MdArrowOutward } from "react-icons/md";
import { Instructor } from "../components";
import { useGetAllEducratInstructors } from "../hooks/studentCourse";

export const Instructors = () => {
  const {data} = useGetAllEducratInstructors()
  console.log(data)
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
            >
              View All Instructors
            </Button>
          </Box>
        </Box>
        <Box
          as="div"
          display={{ md: "grid", lg: "flex" }}
          flexDir={{ base: "column", lg: "row" }}
          gridTemplateColumns={{ md: "repeat(2,1fr)" }}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={10}
          gap={6}
        >
          {data.map((instructor: any) => {
            return <Instructor key={instructor.id} {...instructor} />;
          })}
        </Box>
        <Flex
          flexDir={{ base: "column" }}
          justifyContent={"center"}
          alignItems={"center"}
          my={8}
        >
          <Text color={"gray.600"} fontSize={"15px"}>
            Want to help people learn, grow and achieve more in life?
          </Text>
          <Link color={"#6440fb"} fontSize={"15px"} ml={1}>
            Become an instructor
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
};
