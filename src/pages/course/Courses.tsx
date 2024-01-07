import { Stack, Flex, Text, Box, Grid, GridItem } from "@chakra-ui/react";
const Courses = () => {
  return (
    <Stack>
      <Box padding={{ base: 5, lg: 20 }}>
        <Text fontSize={"40px"} fontWeight={"bold"}>
          User Inferface Course
        </Text>
        <Text fontSize={"17px"}>
          Write an introductory description of the category.
        </Text>
      </Box>
      <Stack maxW="90%" mx="auto" w="100%">
        <Grid h="200px" templateColumns="repeat(4, 1fr)" columnGap={10}>
          <GridItem rowSpan={2} colSpan={1} bg="tomato" />
          <GridItem width="100%" colSpan={3} bg="papayawhip">
            <Flex justify={"space-between"}>
              <Text>showing 30 results</Text>
              <Flex>
                <Text>a</Text>
                <Text>b</Text>
              </Flex>
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem w="100%" h="10" bg="blue.500" />
              <GridItem w="100%" h="10" bg="blue.500" />
              <GridItem w="100%" h="10" bg="blue.500" />
              <GridItem w="100%" h="10" bg="blue.500" />
              <GridItem w="100%" h="10" bg="blue.500" />
            </Grid>
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Courses;
