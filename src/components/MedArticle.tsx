import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const MedArticle = () => {
  return (
    <Flex justifyContent={"start"} alignItems={"center"} mb={4}>
      <Box
        bg={"#e5f0fd"}
        color={"gray.600"}
        mr={4}
        p={4}
        textAlign={"center"}
        borderRadius={10}
        _hover={{ bg: "#6440fb", color: "white" }}
      >
        <Heading as={"h2"} fontSize={"28px"}>
          20{" "}
          <Box as="span" fontWeight={"normal"} fontSize={"22px"}>
            JAN
          </Box>
        </Heading>
      </Box>
      <Box>
        <Text color={"#6440fb"} fontSize={"16px"} mb={2}>
          COURSES
        </Text>
        <Text color={"#140342"} fontSize={"16px"} mb={2}>
          Medical Chemistry: The Molecular Basis
        </Text>
      </Box>
    </Flex>
  );
};
export default MedArticle;
