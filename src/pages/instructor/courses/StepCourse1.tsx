import { CreateCourseNavBar } from "../../../components";
import { Stack, Text } from "@chakra-ui/react";

const StepCourse1 = () => {
  return (
    <Stack>
      <CreateCourseNavBar step={1} progressValue={50} />
      <Text>Step one</Text>
    </Stack>
  );
};

export default StepCourse1;
