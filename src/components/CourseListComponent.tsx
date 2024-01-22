// ListWithButtons.tsx
import { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Progress,
  Skeleton,
} from "@chakra-ui/react";
import { useGetAllUserCourse } from "../hooks/course";
import { Error } from "../pages/auth";
import dummyImg from "../assets/CourseImagePlaceholder.jpg"

const CourseListComponent = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleMouseEnter = (itemId: number) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
  const { data, isError, isPending } = useGetAllUserCourse();

  if (isPending) {
    return (
      <Stack>
        <Skeleton height="130px" mb={3} />
        <Skeleton height="130px" mb={3} />
        <Skeleton height="130px" mb={3} />
        <Skeleton height="130px" mb={3} />
      </Stack>
    );
  }
  if (isError) {
    return <Error />;
  }
  return (
    // <VStack align="start" spacing={4}>
    //   {items.map((item) => (
    //     <Box
    //       key={item.id}
    //       position="relative"
    //       onMouseEnter={() => handleMouseEnter(item.id)}
    //       onMouseLeave={handleMouseLeave}
    //     >
    //       {hoveredItem === item.id && (
    //         <Button size="sm" position="absolute" top={0} right={0} zIndex={1}>
    //           Action
    //         </Button>
    //       )}
    //       <Box>{item.content}</Box>
    //     </Box>
    //   ))}
    // </VStack>
    <>
      {data?.map((item: any) => (
        <Stack
          position={"relative"}
          onMouseEnter={() => handleMouseEnter(item._id)}
          onMouseLeave={handleMouseLeave}
        >
          <Flex
            borderColor="#d1d7dc"
            borderWidth="1px"
            justify={"space-between"}
            columnGap={5}
            mb={3}
            height="130px"
          >
            <Flex columnGap={4} w={{ base: "100%", md: "40%" }}>
              <Image
                src={item?.thumbnail || `${dummyImg}`}
                alt="course image here"
                w="120px"
                h="full"
                objectFit={"cover"}
              />
              <Flex
                flexDirection={"column"}
                justify={"space-between"}
                my={2}
                width="70%"
              >
                <Text fontWeight={"bold"}>{item.title}</Text>
                <Text fontWeight={"700"}>DRAFT</Text>
              </Flex>
            </Flex>
            <Flex
              display={{ base: "none", md: "flex" }}
              ml={5}
              w="60%"
              pl={2}
              align={"center"}
              mr={5}
              columnGap={5}
            >
              <Text fontWeight={"bold"}>Finish your course</Text>
              <Box maxWidth={"75%"} w="100%">
                <Progress value={20} size="sm" />
              </Box>
            </Flex>
          </Flex>
          {hoveredItem === item.id && (
            <Box width={"100%"} backgroundColor={"black"} h="100%">
              <Text
                size="sm"
                width="100%"
                h="100%"
                position="absolute"
                top={0}
                right={0}
                zIndex={1}
                fontSize={"20px"}
                bg={"#140342"}
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                color={"white"}
                cursor={"pointer"}
              >
                Edit/Manage Course
              </Text>
            </Box>
          )}
        </Stack>
      ))}
    </>
  );
};

export default CourseListComponent;
