import {
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGetAllEducratInstructors } from "../../hooks/studentCourse";
import { Instructor } from "../../components";

const AllInstructorPage = () => {
  const { data, isPending } = useGetAllEducratInstructors();
  const dummyArray = [1, 2, 3, 4];
  const arrayOfIds = data?.map((obj: any) => obj?.id);
  return (
    <Stack pt={"4.3rem"}>
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
          <Flex
            columnGap={1}
            as={Link}
            to="/all-courses"
            display={{ base: "none", md: "flex" }}
          >
            <Text>&#x2022;</Text>
            <Text>User Experience Design</Text>
          </Flex>
          <Flex columnGap={1}>
            <Text>&#x2022;</Text>
            <Text>User Interface</Text>
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
      {isPending && (
        <Stack>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            maxW={"80%"}
            w={"100%"}
            mx={"auto"}
          >
            {dummyArray.map((_, index) => (
              <GridItem w="100%" key={index}>
                <Skeleton height="200px" />
                <Skeleton height="80px" mt={1} />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      )}

      <Grid
        mt={"1rem"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
        maxW={"90%"}
        w={"100%"}
        mx={"auto"}
      >
        {data?.map((instructor: any, index: any) => {
          return (
            <Instructor
              key={instructor.id}
              index={index}
              {...instructor}
              arrayOfIds={arrayOfIds}
            />
          );
        })}
      </Grid>
    </Stack>
  );
};

export default AllInstructorPage;
