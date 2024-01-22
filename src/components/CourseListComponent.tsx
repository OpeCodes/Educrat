// ListWithButtons.tsx
import { useState } from "react";
import { Box,  Flex, Image, Stack,Text, Progress } from "@chakra-ui/react";

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
    {/* jjjj */}
    <Stack>
        <Flex>
        <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov'  w="120px" h="120px"/>
        <Box>
            <Text>TITLE</Text>
            <Text>DRAFT</Text>
        </Box>
        </Flex>
        <Box>
            <Text>Finish your course</Text>
        <Progress value={80} />
        </Box>
    </Stack>
    </>
  );
};

export default CourseListComponent;
