import { Divider, Stack, Flex, Text,  } from "@chakra-ui/react";
import { GoBookmark } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Curriculum = () => {
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Curriculum
      </Text>
      <Divider />
      <Text p={5} fontSize={14}>
        Start putting together your course by creating sections, lectures and
        practice (quizzes, coding exercises and assignments). Start putting
        together your course by creating sections, lectures and practice
        activities (quizzes, coding exercises and assignments). Use your course
        outline to structure your content and label your sections and lectures
        clearly. If you’re intending to offer your course for free, the total
        length of video content must be less than 2 hours.
      </Text>
      {/* Section stage */}

      <Stack p={5} >
        <Flex align={"center"} bg={"#F7F8FB"} borderWidth={1} borderColor={"gray"} p={3}>
          <Flex align={"center"} columnGap={2}>
            <Text fontWeight={"bold"} fontSize={17}>Section 1:</Text>
            <Flex align={"center"} mr={3} columnGap={1}>
            <Text>
              <GoBookmark />
            </Text>
            <Text>Introductions</Text>
            </Flex>
          </Flex>
          <Flex align={"center"} columnGap={4}  >
            <Text cursor={"pointer"}>
              <MdEdit />
            </Text>
            <Text cursor={"pointer"}>
              <MdDelete />
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default Curriculum;
