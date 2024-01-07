import {
  Stack,
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";
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
      <Stack maxW={{base: "95%", md: "90%"}} mx="auto" w="100%">
        <Grid templateColumns="repeat(4, 1fr)" columnGap={10}>
          <GridItem rowSpan={2} colSpan={1}  borderWidth={0}  >
            <Accordion defaultIndex={[0]} allowMultiple borderWidth={0} borderColor={"white"} >
              <AccordionItem  _hover={{backgroundColor: "none"}}>
                <h2>
                  <AccordionButton borderColor={"white"} _hover={{backgroundColor: "none"}}>
                    <Box as="span" flex="1" textAlign="left" fontSize={"20px"}>
                      Category
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Divider orientation='horizontal' mt={3}/>
          </GridItem>
          <GridItem width="100%" colSpan={3}  p={2}>
            <Flex justify={"space-between"} mt={3}>
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
