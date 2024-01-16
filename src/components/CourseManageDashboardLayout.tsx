import { Flex, Text } from "@chakra-ui/react";

const CourseManageDashboardLayout = () => {
  return (
    <Flex justify={"space-between"} bg={"#140342"} color="white" p={3}>
      <Flex columnGap={5}>
        <Flex>
          <Text>back</Text>
          <Text>Back to courses</Text>
        </Flex>
        <Text fontWeight={"bold"}>Learn Frontend Development from peter</Text>
        <Text>Draft</Text>

      </Flex>
      <Text>buttons here</Text>
    </Flex>
  );
};

export default CourseManageDashboardLayout;
