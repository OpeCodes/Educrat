// ListWithButtons.tsx
import { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Stack,
  Text,
  Progress,
  Button,
} from "@chakra-ui/react";
import { FaCircleExclamation } from "react-icons/fa6";

// interface ListItem {
//   id?:number;
//   content? : string;
// }

// interface ListWithButtonsProps {
//   items: ListItem[];
// }

const items = [
  {
    id: 1,
    content: "adedokunpeter",
  },
  {
    id: 2,
    content: "adedokunpetr",
  },
];

const CourseListComponent = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const handleMouseEnter = (itemId: number) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

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
      {items.map((item) => (
        <Stack
          position={"relative"}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          <Flex
            borderColor="gray"
            borderWidth="1px"
            justify={"space-between"}
            columnGap={5}
            mb={3}
            height="130px"
          >
            <Flex columnGap={4} w={{ base: "100%", md: "40%" }}>
              <Image
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
                w="120px"
                h="full"
              />
              <Flex
                flexDirection={"column"}
                justify={"space-between"}
                my={2}
                width="70%"
              >
                <Text fontWeight={"bold"}>Learn figma from peterdd</Text>
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
                <Progress value={20} />
              </Box>
            </Flex>
          </Flex>
          {hoveredItem === item.id && (
            <Box width={"100%"} backgroundColor={"black"}>
              <Text
                size="sm"
                // opacity={0.3}
                // background
                width="100%"
                h="100%"
                position="absolute"
                top={0}
                right={0}
                zIndex={1}
                fontSize={"20px"}
                bg="blue"
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                color={"white"}
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
