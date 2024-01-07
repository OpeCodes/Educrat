import { Stack, Flex, Text, Box } from "@chakra-ui/react";
const Courses = () => {
  return (
    <Stack>
      <Box padding={{base: 5, lg: 20}}>
        <Text fontSize={"40px"} fontWeight={"bold"}>User Inferface Course</Text>
        <Text fontSize={"17px"}>Write an introductory description of the category.</Text>
      </Box>
    </Stack>
  );
};

export default Courses;
