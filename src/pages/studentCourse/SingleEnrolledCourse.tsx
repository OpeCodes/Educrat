import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AspectRatio,
  Box,
  Checkbox,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "../../assets/logo-3.svg";
import { Link } from "react-router-dom";
import { RiPlayCircleFill } from "react-icons/ri";
const dummyData = [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
const dummyData2 = [1, 2, 3, 3];
const SingleEnrolledCourse = () => {
  const peter =
    "<div><h1>This is peter adedokun from another i dont know</h1><p> i just want to test the endpoint i am building that's all</p></div>";
  return (
    <Stack>
      <Flex
        justify="space-between"
        width={"100%"}
        align={"center"}
        zIndex={10000}
        p={4}
        bg="black"
        position="fixed"
        right="0"
        top="0"
      >
        <Flex align={"center"}>
          <Box width={"160px"} as={Link} to={"/"}>
            <Image src={logo} alt="logo" color={"black"} />
          </Box>
          <Text fontWeight={"bold"} mt={-1} fontSize={20} color={"white"}>
            Learn frontend development from peter
          </Text>
        </Flex>

        <Text>Back to courses</Text>
      </Flex>
      <Stack>
        <Flex
          justify={"space-between"}
          mt={"3.5rem"}
          flexDirection={{ base: "column", xl: "row" }}
        >
          <Stack mt={6} w={"100%"}>
            {/* <AspectRatio
              maxW={{ base: "100%", xl: "900px", "2xl": "1700px" }}
              maxH={{ base: "900px", lg: "400px" }}
              ratio={{ base: 15 / 8, lg: 15 / 13 }}
            >
              <iframe
                title="Learn frontend development from peter"
                src={
                  "https://res.cloudinary.com/dtori4rq2/video/upload/v1712143746/educrat/r0kttd4uzsjtdp2kq938.mp4"
                }
                allowFullScreen
              />
            </AspectRatio> */}
            <Stack
              w={{ base: "100%", xl: "920px", "2xl": "1700px" }}
              h={{ base: "900px", lg: "400px" }}
              overflowY={"scroll"}
              borderBottomWidth={2}
              borderColor={"gray"}
            >
              <Stack>
                <div dangerouslySetInnerHTML={{ __html: peter }} />
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
                <Text>kakad;dalkjf;lasdkf</Text>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            width={{ base: "100%", xl: "30%" }}
            position={{ base: "static", xl: "fixed" }}
            right="12"
            top="90px"
            pl={{ base: 2, xl: 4 }}
            pr={{ base: 2, xl: 0 }}
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
