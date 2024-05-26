import { Box, Flex, Heading, Select, Text, Button } from "@chakra-ui/react";
import { recommendationImg } from "../assets/export";
import { useCourseCategory } from "../hooks/course";

export const Recommendations = () => {
  const { data } = useCourseCategory();
  return (
    <Box
      as={"section"}
      px={{ base: 6, md: 12, lg: 16 }}
      pt={{ base: 10, md: 16, lg: 8 }}
      bg={"#1A064F"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"start"}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Box maxW={"600px"} mr={{ md: 16 }} pt={12}>
          <Heading as={"h2"} color={"white"} size={"lg"}>
            Get Personal Learning Recommendations
          </Heading>
          <Text as={"p"} color={"white"} my={2}>
            Enhance your skills with best online courses
          </Text>
          <Box
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
            alignItems={{ base: "start", md: "center" }}
            mt={16}
          >
            <Flex w={"full"}>
              <Select
                size={"lg"}
                variant={"outline"}
                placeholder="Category"
                color={"white"}
                bg={"#140342"}
                border={"none"}
                borderRadius={"10px"}
                outline={"none"}
                focusBorderColor="#140342"
                fontSize={"16px"}
              >
                {data?.map((values: any) => (
                  <option
                    key={values.id}
                    id={values.id}
                    value={values.id}
                    style={{ color: "black" }}
                  >
                    {values.name}
                  </option>
                ))}
              </Select>
              <Select
                size={"lg"}
                variant={"outline"}
                placeholder="Difficulty"
                color={"white"}
                bg={"#140342"}
                border={"none"}
                outline={"none"}
                focusBorderColor="#140342"
                ml={8}
                fontSize={"16px"}
              >
                <option value={"Easy"} style={{ color: "gray" }}>
                  Easy
                </option>
                <option value={"Medium"} style={{ color: "gray" }}>
                  Medium
                </option>
                <option value={"Hard"} style={{ color: "gray" }}>
                  Hard
                </option>
              </Select>
            </Flex>
            <Button
              px={12}
              py={6}
              ml={4}
              // mt={{ base: 4 }}
              bg="#6440fb"
              color="white"
              variant="solid"
              borderColor={"#6440fb"}
              borderWidth={2}
              borderRadius={"10px"}
              _hover={{ background: "#140342", color: "white" }}
            >
              Get Started Now
            </Button>
          </Box>
        </Box>
        <Box flex={1} mt={{ base: 16 }}>
          <img src={recommendationImg} alt="recommendations" />
        </Box>
      </Box>
    </Box>
  );
};
