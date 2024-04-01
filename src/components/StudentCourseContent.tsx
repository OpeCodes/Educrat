import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
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

  const toggleAllAccordionItems = () => {
    setIsExpanded(!isExpanded);
    setIndex(getLastNumberFormat(data));
  };

  const toggleAllAccordionItems2 = () => {
    setIsExpanded(!isExpanded);
    setIndex([]);
  };
  return (
    <Stack>
      <Flex align={"center"} justify={"space-between"}>
        <Flex align={"center"} color={"#4f547b"} columnGap={2}>
          <Text>27 sections</Text>
          <Flex align={"center"}>
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
            >
              Expand All Sections
            </Button>
          ) : (
            <Button
              color={"#6440fb"}
              textAlign={"left"}
              display={"flex"}
              justifyContent={"left"}
              size="md"
              mt="1rem"
              colorScheme="teal"
              variant="link"
            >
              Collapse All Sections
            </Button>
          )}
        </Stack>
      </Flex>

      {isExpanded ? (
        <Button onClick={toggleAllAccordionItems} mb={4}>
          Expand all
        </Button>
      ) : (
        <Button onClick={toggleAllAccordionItems2} mb={4}>
          collapse all
        </Button>
      )}

      <Accordion allowMultiple index={index} onChange={setIndex}>
        {/* First accordion item */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 1 Title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>Content for Section 1</AccordionPanel>
        </AccordionItem>

        {/* Second accordion item */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Section 2 Title
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>Content for Section 2</AccordionPanel>
        </AccordionItem>

        {/* Additional accordion items can be added here */}
      </Accordion>
    </Stack>
  );
};

export default StudentCourseContent;

// StudentCourseContent
