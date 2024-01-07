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
  ButtonGroup,
  Button,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { CgNotes } from "react-icons/cg";

const courses = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    titile: "Learn figma - ui/ux design Essential training",
    category: "art",
    instructor: "Adedokun Peter",
    price: "77",
    rating: 4.0,
    courseType: "free",
    level: "Beginner",
    language: "English",
    Duration: "7 hours",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    titile: "Learn frontend development from peter",
    category: "Animation",
    instructor: "Peter Opeymi",
    price: "77",
    rating: 4.5,
    courseType: "paid",
    level: "Expert",
    language: "French",
    Duration: "20 hours",
  },
];
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
      <Stack maxW={{ base: "95%", md: "90%" }} mx="auto" w="100%">
        <Grid templateColumns="repeat(4, 1fr)" columnGap={10}>
          <GridItem rowSpan={2}  borderWidth={0} >
            <Accordion
              defaultIndex={[0]}
              allowMultiple
              borderWidth={0}
              borderColor={"white"}
            >
              <AccordionItem _hover={{ backgroundColor: "none" }}>
                <h2>
                  <AccordionButton
                    borderColor={"white"}
                    _hover={{ backgroundColor: "none" }}
                  >
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
            <Divider orientation="horizontal" mt={3} />
          </GridItem>
          <GridItem width="100%" colSpan={{base: 4, md: 3}} p={2}>
            <Flex justify={"space-between"} mt={3} mb={10}>
              <Text>showing 30 results</Text>
              <Flex>
                <Text>a</Text>
                <Text>b</Text>
              </Flex>
            </Flex>
            <Grid templateColumns={{base: "repeat(1, 1fr)", md:"repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {courses.map((item) => (
                <GridItem w="100%">
                  <Stack>
                    <Stack>
                      <Image
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        alt="Green double couch with wooden legs"
                        borderRadius="lg"
                      />
                      <Stack>
                        <Text>4.3 rating</Text>
                        <Text fontSize="20px" mt="-12px">
                          {item.titile}
                        </Text>
                        <Flex justify={"space-between"}>
                          <Flex align="center" columnGap={"4px"} color="gray">
                            <CgNotes />
                            <Text fontSize="13px">6 Lessons</Text>
                          </Flex>
                          <Flex align="center" columnGap={"4px"} color="gray">
                            <CgNotes />
                            <Text fontSize="13px">6 Lessons</Text>
                          </Flex>
                          <Flex align="center" columnGap={"4px"} color="gray">
                            <CgNotes />
                            <Text fontSize="13px">6 Lessons</Text>
                          </Flex>
                        </Flex>
                        <Divider />

                      </Stack>
                    </Stack>
                    <Flex align={"center"} justify={"space-between"}> 
                      <Flex align={"center"} columnGap={2}>
                      <Avatar name='Dan Abrahmov' size={"sm"} />
                      <Text>{item.instructor}</Text>
                      </Flex>
                      <Text fontWeight={"500"} fontSize={"20px"}>
                        ${item.price}
                      </Text>
                    </Flex>
                  </Stack>
                </GridItem>
              ))}

              <GridItem w="100%" h="10" bg="blue.500" />
            </Grid>
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Courses;
