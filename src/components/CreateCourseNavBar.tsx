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
          <Box width={{base: "110px", md: "160px"}}>
            <Image src={logo} alt="logo" />
          </Box>

          <Text height={"60px"} w="1px" bg="white" ml ={4}  />
          <Box ml={5}>
            <Text fontSize={{base: 14, md: 18}}>Step {step} of 1</Text>
          </Box>
        </Flex>
        <Box>
          <Text as={Link} fontWeight={{base: "500", md: "bold"}} to="/instructor/courses">
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
