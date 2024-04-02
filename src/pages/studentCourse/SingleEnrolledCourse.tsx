import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "../../assets/logo-2.svg";
import { Link } from "react-router-dom";
import { RiPlayCircleFill } from "react-icons/ri";
const dummyData = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
const dummyData2 = [1, 2, 3, 3];
const SingleEnrolledCourse = () => {
  return (
    <Stack>
      <Flex
        justify="space-between"
        width={"100%"}
        align={"center"}
        zIndex={10000}
        p={4}
        bg="red"
        position="fixed"
        right="0"
        top="0"
      >
        <Box width={"160px"} as={Link} to={"/"}>
          <Image src={logo} alt="logo" />
        </Box>
        <Text fontWeight={"bold"} fontSize={20} color={"white"}>
          Learn frontend development from peter
        </Text>

        <Text>Back to courses</Text>
      </Flex>
      <Stack maxW={"90%"} width={"100%"} mx={"auto"} mt={10}>
        <Flex
          justify={"space-between"}
          mt={"3.5rem"}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Stack>
            <Text>peter</Text>
            <Text>
              ads;flkjsd;llkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfjk
            </Text>
          </Stack>

          <Stack
            width={{ base: "100%", lg: "30%" }}
            position={{ base: "static", lg: "fixed" }}
            right="12"
            top="125px"
          >
            <Text fontWeight={"bold"}>Course content</Text>

            <Accordion
              allowToggle
              maxH={{ base: "100%", lg: "490px" }}
              overflowY={{ base: "hidden", lg: "scroll" }}
            >
              {dummyData.map((_, index) => {
                return (
                  <AccordionItem
                    style={{ borderWidth: 1, borderRadius: 15 }}
                    mb={4}
                    rowGap={6}
                  >
                    <Stack>
                      <AccordionButton
                        _hover={{ backgroundColor: "none" }}
                        py={3}
                        borderRadius={15}
                        backgroundColor={"#F7F8FB"}
                      >
                        <Flex
                          width={"100%"}
                          justify={"space-between"}
                          align={"center"}
                        >
                          <Stack>
                            <Flex columnGap={2} fontWeight={"bold"}>
                              <Text>Section {index + 1}:</Text>
                              <Text>Introduction</Text>
                            </Flex>
                            <Flex>
                              <Text fontSize={14}>5 / 6 | 6 mins</Text>
                            </Flex>
                          </Stack>
                          <Text>
                            <AccordionIcon fontSize={23} />
                          </Text>
                        </Flex>
                      </AccordionButton>
                    </Stack>
                    {dummyData2.map(() => {
                      return (
                        <AccordionPanel>
                          <Flex columnGap={3} align={"start"}>
                            <Checkbox
                              mt={1}
                              iconColor={"black"}
                              size="lg"
                              borderColor={"black"}
                              colorScheme={"blackAlpha"}
                            />
                            <Stack>
                              <Text>1. What is NodeJs</Text>
                              <Flex align={"center"} color={"gray"}>
                                <RiPlayCircleFill size={25} />1 min
                              </Flex>
                            </Stack>
                          </Flex>
                        </AccordionPanel>
                      );
                    })}
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Stack>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default SingleEnrolledCourse;

// <video controls controlsList="nodownload" width="600" height="400">
//           <source src={"https://res.cloudinary.com/dtori4rq2/video/upload/v1712063516/educrat/tqreteiyjik06l1ztccx.mp4"} />
//           Your browser does not support the video tag.
//         </video>
