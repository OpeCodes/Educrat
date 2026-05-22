import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CourseListComponent } from "../../../components";
import { useGetAllUserCourse } from "../../../hooks/course";
import { Error } from "../../auth";
import { useFormik } from "formik";
import React from "react";

const Courses = () => {
  const { data, isError, isPending } = useGetAllUserCourse();

  if (isError) {
    return <Error />;
  }

  const formik = useFormik({
    initialValues: {
      search: "",
      sortBy: "newest",
    },
    onSubmit: () => {},
  });

  const filteredItems = data
    ? data.filter((item: any) =>
        item.title.toLowerCase().includes(formik.values.search.toLowerCase())
      )
    : [];

  const sortedItems = React.useMemo(() => {
    if (!data) return [];

    return [...filteredItems].sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (formik.values.sortBy === "newest") return dateB - dateA;
      if (formik.values.sortBy === "oldest") return dateA - dateB;
      if (formik.values.sortBy === "A_Z") return a?.title?.localeCompare(b.title);
      if (formik.values.sortBy === "Z_A") return b?.title?.localeCompare(a.title);

      return 0;
    });
  }, [data, filteredItems, formik.values.sortBy]);

  return (
    <Stack spacing={8}>
      <Box
        borderRadius="28px"
        px={{ base: 5, md: 7 }}
        py={{ base: 6, md: 8 }}
        bgGradient="linear(135deg, #1A064F 0%, #2d0b8a 48%, #6440fb 100%)"
        color="white"
        boxShadow="0 24px 55px rgba(20,3,66,0.16)"
      >
        <Flex justify="space-between" align={{ base: "start", lg: "center" }} gap={6} flexWrap="wrap">
          <Stack spacing={2} maxW="680px">
            <Text
              textTransform="uppercase"
              letterSpacing="0.16em"
              fontWeight={700}
              fontSize="xs"
              color="whiteAlpha.700"
            >
              Instructor Studio
            </Text>
            <Text fontSize={{ base: "30px", md: "40px" }} fontWeight={700} letterSpacing="-0.03em">
              Build courses that feel premium before learners even press play.
            </Text>
            <Text color="whiteAlpha.800" maxW="560px">
              Organize your catalog, tighten course setup, and move unfinished drafts toward launch.
            </Text>
          </Stack>

          <Button
            leftIcon={<FiPlus />}
            bg="white"
            color="#140342"
            _hover={{ bg: "#f5f3ff" }}
            as={Link}
            to="/course/create/1"
          >
            New Course
          </Button>
        </Flex>
      </Box>

      <Grid templateColumns={{ base: "1fr", xl: "1.5fr 0.8fr 0.8fr" }} gap={4}>
        <Box className="surface-card" borderRadius="24px" p={5}>
          <Text color="#4f547b" fontSize="sm">
            Total courses
          </Text>
          <Text fontSize="3xl" fontWeight={700} color="#140342">
            {data?.length || 0}
          </Text>
        </Box>
        <Box className="surface-card" borderRadius="24px" p={5}>
          <Text color="#4f547b" fontSize="sm">
            Search results
          </Text>
          <Text fontSize="3xl" fontWeight={700} color="#140342">
            {sortedItems.length}
          </Text>
        </Box>
        <Box className="surface-card" borderRadius="24px" p={5}>
          <Text color="#4f547b" fontSize="sm">
            Current sort
          </Text>
          <Text fontSize="xl" fontWeight={700} color="#140342" textTransform="capitalize">
            {formik.values.sortBy.replace("_", " ")}
          </Text>
        </Box>
      </Grid>

      <Box className="surface-card" borderRadius="28px" p={{ base: 5, md: 6 }}>
        <Flex justify="space-between" flexWrap="wrap" gap={4} mb={6}>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Flex columnGap={4} flexWrap="wrap" rowGap={4}>
              <InputGroup flex={{ base: "1 1 100%", md: "1.4" }}>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="Search your course library"
                  name="search"
                  value={formik.values.search}
                  onChange={formik.handleChange}
                />
                <InputRightElement>
                  <FiSearch />
                </InputRightElement>
              </InputGroup>
              <Select
                variant="filled"
                flex={{ base: "1 1 100%", md: "0.6" }}
                name="sortBy"
                value={formik.values.sortBy}
                onChange={formik.handleChange}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="A_Z">A-Z</option>
                <option value="Z_A">Z-A</option>
              </Select>
            </Flex>
          </form>
        </Flex>

        {isPending ? (
          <Stack>
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} height="180px" borderRadius="24px" mb={3} />
            ))}
          </Stack>
        ) : (
          <>
            {data?.length === 0 && (
              <Text color="#4f547b">No courses available yet. Create your first one to get started.</Text>
            )}
            {sortedItems.length > 0 && (
              <Stack spacing={5}>
                {sortedItems.map((item: any) => (
                  <CourseListComponent key={item.id} {...item} />
                ))}
              </Stack>
            )}
            {sortedItems.length === 0 && formik.values.search && (
              <Text color="#4f547b">No matching items found for that search.</Text>
            )}
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Courses;
