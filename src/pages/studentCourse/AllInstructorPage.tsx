import { Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetAllEducratInstructors } from "../../hooks/studentCourse";
import { Instructor } from "../../components";

const AllInstructorPage = () => {
  const { data } = useGetAllEducratInstructors();

  return (
    <Stack mt={"4.3rem"}>
      <Stack bg={"#f5f7fe"} py={3}>
        <Flex
          w={"100%"}
          maxW={"90%"}
          mx="auto"
          columnGap={2}
          color={"#4F547B"}
          fontSize={14}
          mt={"0.7rem"}
        >
          <Text as={Link} to="/">
            Home
          </Text>
          <Flex columnGap={1} as={Link} to="/all-courses">
            <Text>&#x2022;</Text>
            <Text>All Courses</Text>
          </Flex>
          <Flex columnGap={1}>
            <Text>&#x2022;</Text>
            <Text>design</Text>
          </Flex>
        </Flex>
      </Stack>
      <Stack mt={"4rem"} textAlign={"center"}>
        <Heading as={"h1"} color={"#140342"} size={"xl"}>
          Instructors
        </Heading>
        <Text as={"p"} color={"gray.600"} my={2}>
          We’re on a mission to deliver engaging, curated courses at a
          reasonable price.
        </Text>
      </Stack>
      <Grid
        mt={"1rem"}
        templateColumns="repeat(4, 1fr)"
        gap={6}
        maxW={"80%"}
        w={"100%"}
        mx={"auto"}
      >
        {data?.map((instructor: any) => {
          return <Instructor key={instructor.id} {...instructor} />;
        })}
      </Grid>
    </Stack>
  );
};

export default AllInstructorPage;
