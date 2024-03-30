import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Stack,
  Select,
  Button,
  Skeleton,
} from "@chakra-ui/react";

import { FiSearch } from "react-icons/fi";
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
    onSubmit: (values: any) => {
      console.log("Submitted:", values);
      
    },
  });
  const filteredItems = data
    ? data.filter((item: any) =>
        item.title.toLowerCase().includes(formik.values.search.toLowerCase())
      )
    : [];

  const sortedItems = React.useMemo(() => {
    if (!data) return [];
    return filteredItems.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (formik.values.sortBy === "newest") {
        return dateB - dateA;
      } else if (formik.values.sortBy === "oldest") {
        return dateA - dateB;
      } else if (formik.values.sortBy === "A_Z") {
        return a?.title?.localeCompare(b.title);
      } else if (formik.values.sortBy === "Z_A") {
        return b?.title?.localeCompare(a.title);
      } else {
        return 0;
      }
    });
  }, [data, filteredItems, formik.values.sortBy]);

  return (
    <Stack>
      <Text fontSize={45} fontWeight={"600"}>
        Courses
      </Text>
      <Flex
        justify={"space-between"}
        align={"center"}
        flexWrap={"wrap"}
        rowGap={0}
        mb={4}
      >
        <form onSubmit={formik.handleSubmit}>
          <Flex columnGap={7} flexWrap={"wrap"} rowGap={5}>
            <Stack width={{ base: "100%", md: "55%" }}>
              <InputGroup>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="search"
                  name="search"
                  value={formik.values.search}
                  onChange={formik.handleChange}
                />
                <InputRightElement>
                  <FiSearch />
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Select
              placeholder="Select option"
              variant={"filled"}
              width={{ base: "100%", md: "35%" }}
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
        <Button
          bg={"#00FF84"}
          colorScheme="teal"
          variant="outline"
          spinnerPlacement="end"
          // mt={3}
          mt={{ base: 3, lg: 0 }}
          borderWidth={2}
          py={2}
          borderColor={"#00FF84"}
          _hover={{ background: "none", color: "#00FF84" }}
          as={Link}
          to="/course/create/1"
          size="md"
        >
          New Course
        </Button>
      </Flex>
      {isPending ? (
        <Stack>
          <Skeleton height="130px" mb={3} />
          <Skeleton height="130px" mb={3} />
          <Skeleton height="130px" mb={3} />
          <Skeleton height="130px" mb={3} />
        </Stack>
      ) : (
        <>
          {sortedItems.length > 0 && (
            <Stack>
              {sortedItems?.map((item: any) => (
                <CourseListComponent key={item.id} {...item} />
              ))}
            </Stack>
          )}
          {sortedItems.length === 0 && formik.values.search && (
            <Text>No matching items found</Text>
          )}
        </>
      )}
    </Stack>
  );
};

export default Courses;
