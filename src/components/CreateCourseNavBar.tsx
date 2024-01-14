import { Box, Image, Text, Flex, Stack, Progress } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
type StepNumber = {
  step: number;
  progressValue: number;
};
const CreateCourseNavBar = ({ step, progressValue }: StepNumber) => {
  return (
    <Stack>
      <Flex
        bg={"#140342"}
        color="white"
        px={5}
        width={"100%"}
        justify={"space-between"}
        align={"center"}
      >
        <Flex align={"center"}>
          <Box width={"160px"}>
            <Image src={logo} alt="logo" />
          </Box>

          <Text height={"60px"} w="1px" bg="white" />
          <Box ml={5}>
            <Text fontSize={18}>Step {step} of 2</Text>
          </Box>
        </Flex>
        <Box>
          <Text as={Link} fontWeight={"bold"} to="/instructor/courses">
            Exit
          </Text>
        </Box>
      </Flex>
      <Box mt={-2}>
        <Progress value={progressValue} size="xs" />
      </Box>
    </Stack>
  );
};

export default CreateCourseNavBar;
