import React, {  useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
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
    <div>
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
    </div>
  );
};

export default StudentCourseContent;

// StudentCourseContent
