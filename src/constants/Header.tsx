import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import heroImg from "../assets/hero_img.svg";

export const Header = () => {
  return (
    <Box
      as={"section"}
      px={{ base: "6", md: "12", lg: "16" }}
      pt={{ base: "130px", md: "160px", lg: "180px" }}
      pb={14}
    >
      <Stack>
        <Box
          display={"flex"}
          flexDirection={{ base: "column", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={"start"}
        >
          <Box mb={{ base: "16", lg: "0" }}>
            <Heading as={"h1"} color={"#140342"} fontSize={"45px"}>
              Master The Skills To Drive Your
              <Box as={"span"} textDecor={"underline"} color={"#6440fb"} pl={3}>
                Career
              </Box>
            </Heading>
            <Text as={"p"} color={"gray.400"} my={8}>
              Free online courses from the world’s leading experts. <br /> Join
              17 million learners today
            </Text>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              justifyContent={"start"}
              alignItems={{ base: "start", md: "center" }}
            >
              <Button
                variant={"outline"}
                px={12}
                py={7}
                bg={"#6440fb"}
                color={"white"}
                mr={4}
                mb={{ base: "4", md: "0" }}
                borderColor={"#6440fb"}
                borderRadius={"full"}
                borderWidth={"2px"}
                _hover={{
                  bg: "white",
                  color: "#6440fb",
                }}
              >
                Join For Free
              </Button>
              <Button
                variant={"outline"}
                px={12}
                py={7}
                color={"#140342"}
                borderColor={"#140342"}
                borderWidth={2}
                borderRadius={"full"}
                _hover={{ bg: "#140342", color: "white" }}
              >
                Find Courses
              </Button>
            </Flex>
          </Box>
          <Box>
            <Image src={heroImg} maxW={"100%"} alt="hero-img" />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
