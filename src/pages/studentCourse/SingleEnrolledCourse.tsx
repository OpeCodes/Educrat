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
const SingleEnrolledCourse = () => {
  return (
    <Stack>
      <Flex justify="space-between" align={"center"} p={4} bg="red">
        <Box width={"160px"} as={Link} to={"/"}>
          <Image src={logo} alt="logo" />
        </Box>
        <Text fontWeight={"bold"} fontSize={20} color={"white"}>
          Learn frontend development from peter
        </Text>

        <Text>Back to courses</Text>
      </Flex>
      <Stack maxW={"90%"} width={"100%"} mx={"auto"} mt={10}>
        <Flex justify={"space-between"}>
          <Flex>video content here</Flex>
          <Stack width={"30%"}>
            <Accordion allowToggle>
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
                          <Text>Section 1:</Text>
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
              </AccordionItem>
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
