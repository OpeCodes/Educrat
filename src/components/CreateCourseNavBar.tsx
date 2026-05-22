import { Box, Flex, Image, Progress, Stack, Text } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

type StepNumber = {
  step: number;
  progressValue: number;
};

const CreateCourseNavBar = ({ step, progressValue }: StepNumber) => {
  return (
    <Stack spacing={0} position="sticky" top={0} zIndex={20}>
      <Flex
        bg="linear-gradient(135deg, #140342 0%, #2d0b8a 60%, #6440fb 100%)"
        color="white"
        px={{ base: 5, md: 8 }}
        py={4}
        justify="space-between"
        align="center"
        boxShadow="0 18px 40px rgba(20,3,66,0.16)"
      >
        <Flex align="center" columnGap={4}>
          <Box width={{ base: "118px", md: "160px" }} as={Link} to="/">
            <Image src={logo} alt="logo" />
          </Box>
          <Box w="1px" h="44px" bg="whiteAlpha.400" display={{ base: "none", md: "block" }} />
          <Box>
            <Text fontSize={{ base: 13, md: 15 }} color="whiteAlpha.700" textTransform="uppercase" letterSpacing="0.12em">
              Course creation
            </Text>
            <Text fontSize={{ base: 15, md: 18 }} fontWeight={700}>
              Step {step} of 1
            </Text>
          </Box>
        </Flex>
        <Text as={Link} fontWeight={700} to="/instructor/courses">
          Exit
        </Text>
      </Flex>
      <Progress
        value={progressValue}
        size="xs"
        sx={{
          "> div": {
            background: "linear-gradient(90deg, #10b981, #34d399)",
          },
        }}
      />
    </Stack>
  );
};

export default CreateCourseNavBar;
