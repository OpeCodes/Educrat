import { Divider, Stack, Text } from "@chakra-ui/react";

const CourseLandingPage = () => {
  return (
    <Stack>
      <Text p={5} fontSize={20} fontWeight={"bold"}>
        Course Landing Page
      </Text>
      <Divider />
      <Text p={5} fontSize={14}>
        Your course landing page is crucial to your success on Educrat. If it’s
        done right, it can also help you gain visibility in search engines like
        Google. As you complete this section, think about creating a compelling
        Course Landing Page that demonstrates why someone would want to enroll
        in your course. Learn more about creating your course landing page and
        course title standards.
      </Text>

      <Stack p={5}></Stack>
    </Stack>
  );
};

export default CourseLandingPage;
