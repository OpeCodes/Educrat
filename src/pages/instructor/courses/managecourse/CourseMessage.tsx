import { Divider, Stack, Text } from "@chakra-ui/react";

const CourseMessage = () => {
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Course Messages
      </Text>
      <Divider />
      <Text p={5} fontSize={14}>
        Write messages to your students (optional) that will be sent
        automatically when they join or complete your course to encourage
        students to engage with course content. If you do not wish to send a
        welcome or congratulations message, leave the text box blank.
      </Text>
    </Stack>
  );
};

export default CourseMessage;
