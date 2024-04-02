import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { RiPlayCircleFill } from "react-icons/ri";
import { convertSecondsToTime } from "./TimeFormat";

interface SingleCourse {
  SingleCourseProp: any;
}

const StudentCourseContent = ({ SingleCourseProp }: SingleCourse) => {
  const lectureLength: string[] = (SingleCourseProp?.modules ?? []).flatMap(
    (obj: any) => obj.lectures
  );

  console.log(SingleCourseProp)
  const [isExpanded, setIsExpanded] = useState(true);
  const data = [
    {
      name: "kdkdk",
    },
    {
      name: "kdkdk",
    },
    {
      name: "kdkdk",
    },
    {
      name: "kdkdk",
    },
    {
      name: "kdkdk",
    },
  ];
  function getLastNumberFormat(arr: any) {
    const length = arr.length;
    const lastNumberFormat = Array.from({ length }, (_, i) => i);
    return lastNumberFormat;
  }

  const [index, setIndex] = React.useState<any>([]);

  const collapseAllAccordionItems = () => {
    setIsExpanded(!isExpanded);
    setIndex(getLastNumberFormat(data));
  };

  const expandAllAccordionItems = () => {
    setIsExpanded(!isExpanded);
    setIndex([]);
  };

  
  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"}>
        <Flex align={"center"} color={"#4f547b"} columnGap={2}>
          <Text>{SingleCourseProp?.modules?.length} sections</Text>
          <Flex align={"center"} columnGap={1}>
            <Text fontSize={"1.2rem"}>&#x2022;</Text>
            <Text>{lectureLength.length} Lectures</Text>
          </Flex>
        </Flex>
        <Stack>
          {isExpanded ? (
            <Button
              color={"#6440fb"}
              textAlign={"left"}
              display={"flex"}
              justifyContent={"left"}
              size="sm"
              mt="1rem"
              colorScheme="teal"
              variant="link"
              onClick={collapseAllAccordionItems}
            >
              Expand All Sections
            </Button>
          ) : (
            <Button
              color={"#6440fb"}
              textAlign={"left"}
              display={"flex"}
              justifyContent={"left"}
              size="sm"
              mt="1rem"
              colorScheme="teal"
              variant="link"
              onClick={expandAllAccordionItems}
            >
              Collapse All Sections
            </Button>
          )}
        </Stack>
      </Flex>

      <Accordion allowMultiple index={index} onChange={setIndex}>
        {SingleCourseProp?.modules?.map((module: any, index: any) => {
          return (
            <AccordionItem
              style={{ borderWidth: 1, borderRadius: 15 }}
              mb={4}
              rowGap={6}
              key={index}
            >
              <Stack>
                <AccordionButton
                  _hover={{ backgroundColor: "none" }}
                  py={5}
                  borderRadius={15}
                  backgroundColor={"#F7F8FB"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Flex>
                    <Flex align={"center"} columnGap={5}>
                      <AccordionIcon fontSize={23} />
                      <Text fontSize={18}>{module?.title}</Text>
                    </Flex>
                  </Flex>
                  <Flex align={"center"} color={"#4f547b"} columnGap={2}>
                    <Text>{module?.lectures.length} lectures</Text>
                    <Flex align={"center"} columnGap={1}>
                      <Text fontSize={"1.2rem"}>&#x2022;</Text>
                      <Text>{data.length}mins</Text>
                    </Flex>
                  </Flex>
                </AccordionButton>
              </Stack>
              {module?.lectures?.map((lecture: any) => {
                const {contentPreviewable, content} = lecture
                return (
                  <AccordionPanel key={lecture.id}>
                    <Flex align={"center"} justify={"space-between"}>
                      <Flex color={"#4f547b"} align={"center"} columnGap={5}>
                        <Text>
                          <RiPlayCircleFill size={25} color={"#4f547b"} />
                        </Text>
                        <Text>{lecture.title}</Text>
                      </Flex>
                      <Flex align={"center"} columnGap={4}>
                      {contentPreviewable && (
                          <Button
                            color={"#6440fb"}
                            textAlign={"left"}
                            display={"flex"}
                            justifyContent={"left"}
                            size="sm"
                            colorScheme="teal"
                            variant="link"
                          >
                            Preview
                          </Button>
                        )}
                        <Text color={"#4f547b"}>{convertSecondsToTime(content?.duration)} </Text>
                      </Flex>
                    </Flex>
                  </AccordionPanel>
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Stack>
  );
};

export default StudentCourseContent;
