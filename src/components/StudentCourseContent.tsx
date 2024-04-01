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

const StudentCourseContent = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const data = [
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
          <Text>27 sections</Text>
          <Flex align={"center"} columnGap={1}>
            <Text fontSize={"1.2rem"}>&#x2022;</Text>
            <Text>{data.length} Lectures</Text>
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
        {data.map((item) => {
          return (
            <AccordionItem style={{ borderWidth: 0 }} p={0}>
              <Stack>
                <AccordionButton
                  _hover={{ backgroundColor: "none" }}
                  my={4}
                  py={5}
                  borderRadius={15}
                  backgroundColor={"#F7F8FB"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Flex>
                    <Flex align={"center"} columnGap={5}>
                      <AccordionIcon fontSize={23} />
                      <Text fontSize={18}>Course Content</Text>
                    </Flex>
                  </Flex>
                  <Flex align={"center"} color={"#4f547b"} columnGap={2}>
                    <Text>27 sections</Text>
                    <Flex align={"center"} columnGap={1}>
                      <Text fontSize={"1.2rem"}>&#x2022;</Text>
                      <Text>{data.length}mins</Text>
                    </Flex>
                  </Flex>
                </AccordionButton>
              </Stack>
              <AccordionPanel p={0}>Content for Section 1</AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Stack>
  );
};

export default StudentCourseContent;
